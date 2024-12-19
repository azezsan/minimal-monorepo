import { readdir, readFile, writeFile, access } from "fs/promises";
import { join } from "path";

const SCHEMA_DIR = join(__dirname, "schema");

async function fileExists(path: string): Promise<boolean> {
    try {
        await access(path);
        return true;
    } catch {
        return false;
    }
}

async function getTableName(filePath: string): Promise<string | null> {
    const content = await readFile(filePath, "utf-8");
    const match = content.match(/export const (\w+)Table =/);
    return match ? match[1] : null;
}

async function generateValidationFile(folderPath: string, tableName: string): Promise<void> {
    const singularName = tableName.endsWith('s') ? tableName.slice(0, -1) : tableName;
    
    const content = `import { createSchemaFactory } from "drizzle-typebox";
import { t } from "elysia";

import { ${tableName}Table } from "./${tableName}";

const { createInsertSchema, createSelectSchema } = createSchemaFactory({ typeboxInstance: t })

export const insert${capitalize(singularName)}Schema = createInsertSchema(${tableName}Table);
export const select${capitalize(singularName)}Schema = createSelectSchema(${tableName}Table);

export type Insert${capitalize(singularName)} = typeof insert${capitalize(singularName)}Schema.static;
export type ${capitalize(singularName)} = typeof select${capitalize(singularName)}Schema.static;
`;

    await writeFile(join(folderPath, "validation.ts"), content);
    console.log(`Created validation.ts for ${tableName}`);
}

async function generateIndexFile(folderPath: string, tableName: string): Promise<void> {
    const content = `export * from "./${tableName}"
export * from "./validation"
`;

    await writeFile(join(folderPath, "index.ts"), content);
    console.log(`Created index.ts for ${tableName}`);
}

function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

async function main() {
    try {
        // Get all folders in schema directory
        const folders = await readdir(SCHEMA_DIR);

        for (const folder of folders) {
            const folderPath = join(SCHEMA_DIR, folder);

            // Skip if it's not a directory or if it's the index.ts file
            if (folder === "index.ts") continue;

            try {
                const files = await readdir(folderPath);

                // Find the table definition file
                const tableFile = files.find(f =>
                    f.endsWith(".ts") &&
                    !f.includes("validation") &&
                    !f.includes("index")
                );

                if (!tableFile) continue;

                const tableName = await getTableName(join(folderPath, tableFile));
                if (!tableName) continue;

                // Check if validation.ts exists
                const validationExists = await fileExists(join(folderPath, "validation.ts"));
                if (!validationExists) {
                    await generateValidationFile(folderPath, tableName);
                }

                // Check if index.ts exists
                const indexExists = await fileExists(join(folderPath, "index.ts"));
                if (!indexExists) {
                    await generateIndexFile(folderPath, tableName);
                }

            } catch (err) {
                console.error(`Error processing folder ${folder}:`, err);
            }
        }

        console.log("Code generation completed successfully!");
    } catch (err) {
        console.error("Error during code generation:", err);
        process.exit(1);
    }
}

main(); 