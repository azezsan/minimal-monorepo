import type { D1Database } from "@cloudflare/workers-types";
import { drizzle } from "drizzle-orm/d1";

import * as schema from "./schema";

export const initializeD1 = (env: D1Database) => drizzle(env, { schema });
