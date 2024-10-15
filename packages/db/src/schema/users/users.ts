import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { oauthAccountsTable } from "../oauth_accounts"

export const usersTable = sqliteTable("users", {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    publicId: text("public_id").notNull().unique(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
    updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`)
})

export const usersRelations = relations(usersTable, ({ many }) => ({
    accounts: many(oauthAccountsTable)
}))