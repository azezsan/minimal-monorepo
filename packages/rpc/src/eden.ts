import type { App } from "@acme/api"
import { edenTreaty } from "@elysiajs/eden"

export const api = edenTreaty<App>('http://localhost:8787')
