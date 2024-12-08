import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

import { usersTable } from "./users";

export const insertUserSchema = createInsertSchema(usersTable);
export const selectUserSchema = createSelectSchema(usersTable);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = z.infer<typeof selectUserSchema>;
