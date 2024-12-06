# Drizzle ORM DB Package

This is a shared Drizzle Database ORM package that serves as the central database management system for the monorepo. Since this package manages our database, it naturally holds many of the monorepo's [single source of truths](https://en.wikipedia.org/wiki/Single_source_of_truth). It's **CRITICAL** not to duplicate what's in here inside apps or other packages.

## Package Architecture

This package follows a simple and scalable structure. Below is a detailed explanation of each component:

```
db/
├─ src/
│  ├─ drizzle/        # Generated migrations and types
│  ├─ schema/         # Shared schema types and utilities
│  ├─ <table_name>/   # Individual table modules
│  │  ├─ <table_name>.ts    # Table schema definition
│  │  ├─ index.ts           # Exports and helper functions
│  │  ├─ validation.ts      # Zod validation schemas
│  ├─ index.ts       # Main package exports
│  ├─ db.ts          # Database connection configuration
│  └─ migrate.ts     # Migration utilities
├─ drizzle.config.ts # Drizzle configuration
├─ package.json
└─ wrangler.toml     # Cloudflare configuration
```

## Component Details

### Database Connection (`src/db.ts`)
Contains the database connection configuration and client setup. This is where we initialize our connection to the database using Drizzle ORM.


### Migrations (`src/drizzle/`)
Contains automatically generated migration files and TypeScript types. Never modify these files manually - they should only be updated through Drizzle's migration tools.

### Schema Organization
Each database table has its own directory under `src/schema/<table_name>/` with three main files:

1. `<table_name>.ts`: Defines the table schema using Drizzle's schema builder
2. `index.ts`: Exports table schema and provides helper functions for common operations
3. `validation.ts`: Contains Zod validation schemas for type-safe data handling, whenever you're in a situation where you need a zod schema, think about this file, it's very likely it already has the schema you're looking for

## Usage Guide

### 1. Creating a New Table

To add a new table to the database:

1. Create a new directory under `src/schema/` with your table name
2. Create the required files:

```typescript
// src/schema/users/users.ts
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
})
```

```typescript
// src/schema/users/validation.ts
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import type { z } from "zod"

import { usersTable } from "./users.ts";

export const insertUserSchema = createInsertSchema(usersTable);
export const selectUserSchema = createSelectSchema(usersTable);

export type InsertUser = z.infer<typeof usersInsertSchema>;
export type User = z.infer<typeof usersSelectSchema>;
```
```typescript
// src/schema/users/index.ts
export * from './users';
export * from './validation';
```

### 2. Running Migrations

To generate and run migrations:

```bash
# Generate migrations
bun run generate

# Push migrations to database
bun run migrate
```

### 3. Using Tables in Your Application

```typescript
import { db, usersTable } from '@acme/db';

// Query examples
const allUsers = await db.select().from(usersTable).all();
const specificUser = await db.select().from(users).where(eq(users.id, 1)).get();
```

## Configuration Files

### `drizzle.config.ts`
Configures Drizzle Kit commands and migration settings. [Learn more](https://orm.drizzle.team/docs/kit-overview)

### `wrangler.toml`
Configures Cloudflare Workers settings for database deployment. [Learn more](https://developers.cloudflare.com/workers/wrangler)

## Best Practices

1. **Schema Changes**: Always generate migrations for schema changes never push or delete migrations
2. **Validation**: Use Zod schemas for all data validation
3. **Type Safety**: Leverage TypeScript and Drizzle's type system
4. **Single Source of Truth**: Don't duplicate schema definitions

