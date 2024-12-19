import { createSchemaFactory } from "drizzle-typebox";
import { t } from "elysia";

import { usersTable } from "./users";

const { createInsertSchema, createSelectSchema } = createSchemaFactory({ typeboxInstance: t })

export const insertUserSchema = createInsertSchema(usersTable);
export const selectUserSchema = createSelectSchema(usersTable);

export type InsertUser = typeof insertUserSchema.static;
export type User = typeof selectUserSchema.static;
