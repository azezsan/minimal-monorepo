import { OpenAPIHono, z } from '@hono/zod-openapi'
import { selectUserSchema, initializeD1, usersTable, eq } from '@acme/db'

export default new OpenAPIHono<{ Bindings: CloudflareBindings }>()
    .openapi({
        method: 'get',
        path: '/users/:id',
        summary: 'Retrieve a user',
        description: 'Retrieves a user by ID',
        tags: ['users'],
        request: {
            params: z.object({
                id: z
                    .string()
                    .min(1)
                    .openapi({
                        param: {
                            name: "id",
                            in: "path",
                        },
                        description: "The id of the user",
                        example: "1",
                    }),
            })
        },
        responses: {
            200: {
                content: {
                    'application/json': {
                        schema: selectUserSchema
                    }
                },
                description: 'Successfully retrieved users'
            }
        }
    }, async (c) => {
        const { id } = c.req.valid('param')

        const db = initializeD1(c.env.DB) // Cloudflare D1 database

        const results = await db.select().from(usersTable).where(eq(usersTable.id, Number(id))).get()

        return c.json(results)
    }
    )