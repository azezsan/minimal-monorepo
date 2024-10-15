import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

import { usersTable } from "./users";

export const insertUserSchema = createInsertSchema(usersTable, {
    id: (schema) => schema.id.openapi({ description: "The user's id", example: 123 }),
    publicId: (schema) => schema.publicId.openapi({ description: "The user's public id", example: "3ikfht0uyqt5" }),
    name: (schema) => schema.name
        .openapi({ description: "The user's name", example: "John Doe" })
        .min(4)
        .max(20),
    email: (schema) => schema.email
        .openapi({ description: "The user's email", example: "john.doe@example.com" })
        .email(),
    createdAt: (schema) => schema.createdAt.openapi({ description: "The user's created at", example: "1689876545" }),
    updatedAt: (schema) => schema.updatedAt.openapi({ description: "The user's updated at", example: "1689876545" }),
});

export const selectUserSchema = createSelectSchema(usersTable, {
    id: (schema) => schema.id.openapi({ description: "The user's id", example: 123 }),
    publicId: (schema) => schema.publicId.openapi({ description: "The user's public id", example: "3ikfht0uyqt5" }),
    name: (schema) => schema.name
        .openapi({ description: "The user's name", example: "John Doe" })
        .min(3),
    email: (schema) => schema.email.openapi({ description: "The user's email", example: "john.doe@example.com" }),
    createdAt: (schema) => schema.createdAt.openapi({ description: "The user's created at", example: "1689876545" }),
    updatedAt: (schema) => schema.updatedAt.openapi({ description: "The user's updated at", example: "1689876545" }),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = z.infer<typeof selectUserSchema>;