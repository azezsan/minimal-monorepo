import { Elysia } from 'elysia'
import { app } from './routes/app'

export default {
  async fetch(request: Request, env: CloudflareBindings) {
    return await new Elysia({ aot: false })
      .decorate("env", env)
      .use(app)
      .handle(request)
  },
}

export type App = typeof app