import { OpenAPIHono, z } from '@hono/zod-openapi'
import { selectUserSchema, initializeD1, usersTable } from '@acme/db'

export default new OpenAPIHono<{ Bindings: CloudflareBindings }>()
    .openapi({
        method: 'get',
        path: '/users',
        summary: 'List all users',
        description: 'Retrieves a list of all users in the system',
        tags: ['users'],
        responses: {
            200: {
                content: {
                    'application/json': {
                        schema: z.array(selectUserSchema)
                    }
                },
                description: 'Successfully retrieved users'
            }
        }
    }, async (c) => {
        const db = initializeD1(c.env.DB) // Cloudflare D1 database
        const results = await db.select().from(usersTable).all()
        return c.json(results)
    })