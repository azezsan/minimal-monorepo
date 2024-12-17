import { Elysia } from 'elysia'
import { app } from './routes/app'

export default {
  async fetch(request: Request, env: CloudflareBindings, ctx: ExecutionContext) {
    return await new Elysia()
      .decorate("executionCtx", ctx)
      .decorate("env", env)
      .use(app)
      .handle(request)
  },
}

export type App = typeof app