import type { PlopTypes } from "@turbo/gen";
import { execSync } from "node:child_process";

execSync("pnpm install", { stdio: "inherit" });

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("init", {
    description: "Generate a new package for the Acme Monorepo",
    prompts: [
      {
        type: "input",
        name: "name",
        message:
          "What is the name of the package? (You can skip the `@acme/` prefix)",
      },
    ],
    actions: [
      (answers) => {
        if ("name" in answers && typeof answers.name === "string") {
          if (answers.name.startsWith("@acme/")) {
            answers.name = answers.name.replace("@acme/", "");
          }
        }
        return "Config sanitized";
      },
      {
        type: "add",
        path: "packages/{{ name }}/package.json",
        templateFile: "templates/package.json.hbs"
      },
      {
        type: "add",
        path: "packages/{{ name }}/tsconfig.json",
        templateFile: "templates/tsconfig.json.hbs"
      },
      {
        type: "add",
        path: "packages/{{ name }}/eslint.config.js",
        templateFile: "templates/eslint.config.js.hbs"
      },
      {
        type: "add",
        path: "packages/{{ name }}/src/index.ts",
        template: "export const name = '{{ name }}';"
      },
      async (answers) => {
        /**
         * Install deps and format everything
         */
        if ("name" in answers && typeof answers.name === "string") {
          // execSync("pnpm dlx sherif@latest --fix", {
          //   stdio: "inherit",
          // });
          execSync("pnpm i", { stdio: "inherit" });
          execSync(
            `pnpm prettier --write packages/${answers.name}/** --list-different`,
          );
          return "Package scaffolded";
        }
        return "Package not scaffolded";
      },
    ],
  });
}