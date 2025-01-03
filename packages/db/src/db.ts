import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "./schema";

interface Env {
  TURSO_AUTH_TOKEN?: string;
  TURSO_URL?: string;
}

export const initializeDB = (env: Env) => {
  const url = env.TURSO_URL?.trim();
  if (!url) {
    throw new Error("TURSO_URL is missing");
  }
  const authToken = env.TURSO_AUTH_TOKEN?.trim();
  if (!authToken) {
    throw new Error("TURSO_AUTH_TOKEN is missing");
  }
  return drizzle(createClient({ url, authToken }), { schema });
};
