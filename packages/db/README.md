# DB Package

Shared Drizzle ORM package for database management.

## Usage

```ts
import { initializeDB, usersTable } from "@acme/db";

const db = initializeDB(env);
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
│  └─ db.ts          # Database initialization
├─ drizzle.config.ts # Drizzle configuration
└─ wrangler.toml     # Cloudflare configuration
```

## Scripts

- `generate`: Create migrations
- `migrate`: Apply migrations
