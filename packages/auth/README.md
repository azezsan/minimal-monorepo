
# Lucia Auth Package

Contains helpful lucia functions

## Component Details

###  `session.ts`

Contains session store class which is respossible for managing the user's sessions while storing them in Cloudflare Workers KV, it expects the KVNamespace to be initilized 

### `oauth.ts`

Contains a simple wrapper around [Arctic](https://arcticjs.dev/) OAuth API that simply adds the url origin paramater so it can be configured at runtime

### `cookie.ts 🍪`

it gives cookies yummy!

...and contains helpful SvelteKit only functions for deleting and setting cookies

## Documentation

For more information visit https://lucia-auth.com to view the documentation.

if you're looking for an example it's best to checkout the `apps/accounts` app and see this package in action