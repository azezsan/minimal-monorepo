import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import type { Static } from "@sinclair/typebox";

import { usersTable } from "./users";

export const insertUserSchema = createInsertSchema(usersTable);
export const selectUserSchema = createSelectSchema(usersTable);

export type InsertUser = Static<typeof insertUserSchema>;
export type User = Static<typeof selectUserSchema>;
