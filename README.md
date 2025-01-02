# Minimal Monorepo Template

A lightweight monorepo template using SvelteKit, Elysia, and Cloudflare Workers.

## Stack
- **Apps**
  - `accounts`: SvelteKit OAuth example
  - `api`: Elysia server with user management endpoints

- **Packages**
  - `ui`: Shadcn-Svelte components
  - `db`: Drizzle ORM
  - `rpc`: Elysia RPC client
  - `auth`: Lucia auth utilities

- **tooling**
  - `prettier`: Shared Prettier configuration
  - `eslint`: Shared ESLint configuration
  - `tsconfig`: Shared TypeScript configuration
