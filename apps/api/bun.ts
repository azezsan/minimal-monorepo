import { $ } from 'bun'

await Promise.all([
    $`bun run dev:tsc`,
    $`bun run dev:wrangler`
])
