import { createSchemaFactory } from "drizzle-typebox";
import { t, Static } from "elysia";

import { usersTable } from "./users";

const { createInsertSchema, createSelectSchema } = createSchemaFactory({ typeboxInstance: t })

export const insertUserSchema = createInsertSchema(usersTable);
export const selectUserSchema = createSelectSchema(usersTable);

export type InsertUser = Static<typeof insertUserSchema>;
export type User = Static<typeof selectUserSchema>;
