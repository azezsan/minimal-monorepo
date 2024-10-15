import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import type { z } from "zod"

import { oauthAccountsTable } from "./oauthAccounts";

export const oauthAccountsInsertSchema = createInsertSchema(oauthAccountsTable);
export const oauthAccountsSelectSchema = createSelectSchema(oauthAccountsTable);

export type OAuthAccountsInsert = z.infer<typeof oauthAccountsInsertSchema>;
export type OAuthAccounts = z.infer<typeof oauthAccountsSelectSchema>;