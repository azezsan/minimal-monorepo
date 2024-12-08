import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

import { oauthAccountsTable } from "./oauthAccounts";

export const insertOauthAccountSchema = createInsertSchema(oauthAccountsTable);
export const selectOauthAccountSchema = createSelectSchema(oauthAccountsTable);

export type InsertOauthAccount = z.infer<typeof insertOauthAccountSchema>;
export type OauthAccount = z.infer<typeof selectOauthAccountSchema>;
