import { eq, initializeD1, selectUserSchema, usersTable } from "@acme/db";
import { Elysia, NotFoundError, t } from "elysia";
import swagger from "@elysiajs/swagger";

export const app = new Elysia({ aot: false })
    .use(swagger())
    .decorate("env", null as unknown as CloudflareBindings)
    .decorate("executionCtx", null as unknown as ExecutionContext)
    .get("/", () => 'Hello Elysia')
    .get("/users", async ({ env }) => {
        const db = initializeD1(env.DB)
        const users = await db.select().from(usersTable).all()
        if (!users.length) {
            throw new NotFoundError()
        }
        return users
    }, {
        response: t.Array(selectUserSchema)
    })
    .get("/users/:id", async ({ params, env }) => {
        const db = initializeD1(env.DB)
        const user = await db.select().from(usersTable).where(eq(usersTable.id, Number(params.id))).get()
        if (!user) {
            throw new NotFoundError()
        }
        return user
    }, {
        response: selectUserSchema
    })