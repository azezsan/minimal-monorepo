import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";
import type { D1Database } from "@cloudflare/workers-types";

export const initializeD1 = (env: D1Database) => drizzle(env, { schema });