import { Hono } from 'hono'
import getUser from './routes/users/[id]/get.js'
import getAllUsers from './routes/users/get.js'

const app = new Hono<{ Bindings: CloudflareBindings }>()
  .route('/', getUser)
  .route('/', getAllUsers)

export default app