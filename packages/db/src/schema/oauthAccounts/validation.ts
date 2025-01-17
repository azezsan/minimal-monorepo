import { createInsertSchema, createSelectSchema } from "drizzle-typebox";

import { oauthAccountsTable } from "./schema";

export const insertOauthAccountSchema = createInsertSchema(oauthAccountsTable);
export const selectOauthAccountSchema = createSelectSchema(oauthAccountsTable);

export type InsertOauthAccount = typeof insertOauthAccountSchema.static;
export type OauthAccount = typeof selectOauthAccountSchema.static;
