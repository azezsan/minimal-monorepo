# Hono RPC Package

this is a shared Remote procedure call for type safety and performace boost.

this package imports the `@acme/api` build output, this is a hack to avoid many of the RPC [scaling and known issues](https://hono.dev/docs/guides/rpc#known-issues)

we also want to avoid having apps adding each other to dependencies directly at all cost, since everything that gets imported gets bundled along side the app and we don't want that

## Usage

this package simply exports the RPC after being compiled from `@acme/api` 

to use it just add this package and import the RPC inside your app and access any endpoint created inside the hono server like so

```ts
import { api } from '@acme/rpc';

async function getUsers() {
    const res = await api.users.$get()
    return await res.json()
}

const users = await getUsers()
```

## Documentation

For more information visit https://hono.dev/docs/guides/rpc to view the documentation.