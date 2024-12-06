this is a minimal monorepo focused on simplicity and the absolute minimum that you would need to get a project going without worrying about setup, hono + cloudflare allow you to add multiple features you might need without changing the structure of the monorepo

# Monorepo App Architecture

We use a combination of Svelte (SvelteKit), TypeScript, Drizzle (ORM), Cloudflare, SQLite, Lucia and TailwindCSS throughout this [Turborepo](https://turbo.build/) powered monorepo.

### Apps:

- `accounts`: A [Sveltekit](https://svelte.dev/) web app with a minimal Google OAuth exmaple.
- `api`: A [Hono](https://hono.dev/) api app, with a minimal user managment endpoints .

### Packages:

- `ui`: Shared [Shadcn-Svelte](https://shadcn-svelte.com/) component library.
- `db`: A [Drizzle ORM](https://orm.drizzle.team) Shared database library.
- `rpc`: Shared [Hono RPC](https://hono.dev/docs/guides/rpc), routes and endpoints are pulled from `api`.
- `auth`: Shared [Lucia](https://lucia-auth.com/) funtions.