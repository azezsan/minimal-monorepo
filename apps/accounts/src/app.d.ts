// See https://svelte.dev/docs/kit/types#app
// for information about these interfaces
import type { Session } from "@acme/auth";
import type { DrizzleD1Database, schema } from "@acme/db";
import type { EdenTreaty } from "@acme/rpc";

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      db: DrizzleD1Database<typeof schema>;
      session: Session | null;
      api: EdenTreaty;
    }
    // interface PageData {}
    // interface PageState {}
    interface Platform {
      env: Env;
      cf: CfProperties;
      ctx: ExecutionContext;
    }
  }
}

export {};
