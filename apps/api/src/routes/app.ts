import swagger from "@elysiajs/swagger";
import { Elysia, NotFoundError, t } from "elysia";

import { eq, initializeDB, selectUserSchema, usersTable } from "@acme/db";

export const app = new Elysia({ aot: false })
  .use(swagger())
  .decorate("env", null as unknown as CloudflareBindings)
  .decorate("executionCtx", null as unknown as ExecutionContext)
  .get("/", () => "Hello Elysia")
  .get(
    "/users",
    async ({ env }) => {
      const db = initializeDB(env);
      const users = await db.select().from(usersTable).all();
      if (!users.length) {
        throw new NotFoundError();
      }
      return users;
    },
    {
      response: t.Array(selectUserSchema),
    },
  )
  .get(
    "/users/:id",
    async ({ params, env }) => {
      const db = initializeDB(env);
      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, Number(params.id)))
        .get();
      if (!user) {
        throw new NotFoundError();
      }
      return user;
    },
    {
      response: selectUserSchema,
    },
  );
