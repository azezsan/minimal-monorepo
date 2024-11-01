import { OpenAPIHono } from '@hono/zod-openapi'
import getUser from './routes/users/[id]/get.js'
import getAllUsers from './routes/users/get.js'

const app = new OpenAPIHono<{ Bindings: CloudflareBindings }>()
  .route('/', getUser)
  .route('/', getAllUsers)

export default app