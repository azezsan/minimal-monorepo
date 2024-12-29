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

## Known Issues and Workarounds

### 1. UI Package Compatibility with Paraglide

**Issue**: The `ui` package encounters errors when used in applications that depend on `@inlang/paraglide-sveltekit`.

**Available workarounds:**

1. Add Paraglide as a dependency:
   - Install `@inlang/paraglide-sveltekit` in the `ui` package

2. Exclude Paraglide using Vite configuration:
    ```ts
    import { paraglide } from '@inlang/paraglide-sveltekit/vite';
    import { sveltekit } from '@sveltejs/kit/vite';
    import { defineConfig } from 'vite';

    export default defineConfig({
      plugins: [
        sveltekit(),
        paraglide({
          project: './project.inlang',
          outdir: './src/lib/paraglide'
        })
      ],
      build: {
        rollupOptions: {
          external: ['@inlang/paraglide-sveltekit/internal']
        }
      }
    });
    ```
3. alternative workaround: create .npmrc file with `shamefully-hoist=true`
    ```
    shamefully-hoist=true
    ```
### 2. UI Package Usage Complexity
**Issue**: Current component usage patterns are overly complex.

- This will be resolved with the release of Tailwind v4

### 3. Cloudflare Workers Integration
**Issue**: The api package lacks proper Cloudflare Workers integration.

- Currently using WinterCG as a temporary solution
- Future fix: Elysia v1.20+ will provide an official Cloudflare adapter
