// See https://svelte.dev/docs/kit/types#app
// for information about these interfaces
import type { DrizzleD1Database } from '@acme/db';
import type { schema } from '@acme/db';
import type { Session } from '@acme/auth';
import type { EdenTreaty } from '@acme/rpc';

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
