import { createSchemaFactory } from "drizzle-typebox";
import { t } from "elysia";

import { oauthAccountsTable } from "./oauthAccounts";

const { createInsertSchema, createSelectSchema } = createSchemaFactory({ typeboxInstance: t })

export const insertOauthAccountSchema = createInsertSchema(oauthAccountsTable);
export const selectOauthAccountSchema = createSelectSchema(oauthAccountsTable);

export type InsertOauthAccount = typeof insertOauthAccountSchema.static;
export type OauthAccount = typeof selectOauthAccountSchema.static;
