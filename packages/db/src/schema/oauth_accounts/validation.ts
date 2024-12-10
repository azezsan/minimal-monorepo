import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import type { Static } from "@sinclair/typebox";

import { oauthAccountsTable } from "./oauthAccounts";

export const insertOauthAccountSchema = createInsertSchema(oauthAccountsTable);
export const selectOauthAccountSchema = createSelectSchema(oauthAccountsTable);

export type InsertOauthAccount = Static<typeof insertOauthAccountSchema>;
export type OauthAccount = Static<typeof selectOauthAccountSchema>;
