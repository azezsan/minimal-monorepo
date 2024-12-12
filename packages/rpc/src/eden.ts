import type { App } from "@acme/api"
import { edenTreaty } from "@elysiajs/eden"

export const createEden = (apiWorker: Fetcher) => {
    return edenTreaty<App>("http://localhost:8787", {
        fetcher: apiWorker.fetch.bind(apiWorker)
    })
}

export type EdenTreaty = ReturnType<typeof createEden>