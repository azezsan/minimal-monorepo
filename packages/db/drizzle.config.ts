import type { Config } from "drizzle-kit";

import fs from 'fs';
import path from 'path';

function getLocalD1DB() {
  try {
    const basePath = path.resolve('../../v3');
    const dbFile = fs
      .readdirSync(basePath, { encoding: 'utf-8', recursive: true })
      .find((f) => f.endsWith('.sqlite'));

    if (!dbFile) {
      throw new Error(`.sqlite file not found in ${basePath}`);
    }

    const url = path.resolve(basePath, dbFile);
    return url;
  } catch (err) {
    throw err.message;
  }
}

export default {
  dialect: "sqlite",
  out: "./drizzle",
  schema: "./src/schema/index.ts",
  strict: true,
  ...(process.argv[2] === "studio" ? {
    dbCredentials: {
      url: getLocalD1DB()
    }
  } : {})
} satisfies Config;