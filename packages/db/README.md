# DB Package

Shared Drizzle ORM package for database management.

## Usage
```ts
import { initializeD1, usersTable } from '@acme/db';

const db = initializeD1(env.D1Database);
const users = await db.select().from(usersTable).all();
```

## Structure
```
db/
├─ src/
│  ├─ drizzle/        # Generated files
│  ├─ schema/         # Table definitions
│  │  ├─ users/       
│  │  │  ├─ users.ts      # Schema
│  │  │  ├─ validation.ts # TypeBox schemas
│  │  │  └─ index.ts      # Exports
│  ├─ db.ts          # Database initialization
│  ├─ migrate.ts     # Migration utilities
│  └─ codegen.ts     # Schema generation
├─ drizzle.config.ts # Drizzle configuration
└─ wrangler.toml     # Cloudflare configuration
```

## Scripts
- `generate`: Create migrations
- `migrate`: Apply migrations
- `codegen`: Generate validation schemas

## Codegen Example
Create a table schema:
```ts
// schema/users/users.ts
export const usersTable = sqliteTable("users", {
    id: integer("id").primaryKey(),
    email: text("email").notNull()
});
```

Run codegen to auto-generate validation schemas:
```bash
bun run codegen
```

Generated output:
```ts
// schema/users/validation.ts
import { createSchemaFactory } from "drizzle-typebox";
import { t, Static } from "elysia";

const { createInsertSchema, createSelectSchema } = createSchemaFactory({ typeboxInstance: t })

export const insertUserSchema = createInsertSchema(usersTable);
export const selectUserSchema = createSelectSchema(usersTable);

export type InsertUser = Static<typeof insertUserSchema>;
export type User = Static<typeof selectUserSchema>;
```

```ts
// schema/users/index.ts
export * from "./users"
export * from "./validation"
```

