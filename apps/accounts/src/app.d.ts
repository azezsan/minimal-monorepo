// See https://svelte.dev/docs/kit/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: import("@acme/db").DrizzleD1Database<typeof import("@acme/db").schema>
			session: import("@acme/auth").Session | null
		}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: Env
			cf: CfProperties
			ctx: ExecutionContext
		}
	}
}

export { };
