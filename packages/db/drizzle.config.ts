import type { Config } from "drizzle-kit";

const url = process.env.TURSO_URL;
if (!url) {
  throw new Error("TURSO_URL is missing");
}
const authToken = process.env.TURSO_AUTH_TOKEN;
if (!authToken) {
  throw new Error("TURSO_AUTH_TOKEN is missing");
}

export default {
  dialect: "turso",
  out: "./drizzle",
  schema: "./src/schema/index.ts",
  dbCredentials: {
    url,
    authToken,
  },
  strict: true,
} satisfies Config;
