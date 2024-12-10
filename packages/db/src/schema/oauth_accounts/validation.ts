import { createSchemaFactory } from "drizzle-typebox";
import { t, Static } from "elysia";

import { oauthAccountsTable } from "./oauthAccounts";

const { createInsertSchema, createSelectSchema } = createSchemaFactory({ typeboxInstance: t })

export const insertOauthAccountSchema = createInsertSchema(oauthAccountsTable);
export const selectOauthAccountSchema = createSelectSchema(oauthAccountsTable);

export type InsertOauthAccount = Static<typeof insertOauthAccountSchema>;
export type OauthAccount = Static<typeof selectOauthAccountSchema>;
