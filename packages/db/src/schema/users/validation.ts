import { createInsertSchema, createSelectSchema } from "drizzle-typebox";

import { usersTable } from "./users";

export const insertUserSchema = createInsertSchema(usersTable);
export const selectUserSchema = createSelectSchema(usersTable);

export type InsertUser = typeof insertUserSchema.static;
export type User = typeof selectUserSchema.static;
