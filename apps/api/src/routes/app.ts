import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";

export const app = new Elysia({ aot: false })
    .use(swagger())
    .decorate("env", null as unknown as CloudflareBindings)
    .get("/", () => 'Hello Elysia')