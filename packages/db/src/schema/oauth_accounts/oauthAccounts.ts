import { relations } from "drizzle-orm";
import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { usersTable } from "../users";

export const oauthAccountsTable = sqliteTable("oauth_accounts", {
    providerId: text("provider_id").notNull(),
    providerUserId: text("provider_user_id").notNull().unique(),
    userId: integer("user_id", { mode: "number" }).notNull().unique().references(() => usersTable.id),
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.providerId, table.providerUserId] })
    }
})

export const oauthAccountsRelations = relations(oauthAccountsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [oauthAccountsTable.userId],
        references: [usersTable.id]
    })
}))