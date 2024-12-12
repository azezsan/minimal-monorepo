# RPC Package

Type-safe Elysia RPC client.

## Usage

initialize the API client with Cloudflare service binding:

```ts
import { createApi } from '@acme/rpc';

// Inside your worker
const api = createApi(env.API_WORKER);

// Then you can make type-safe RPC calls
const { data, error } = await api.users.get();
```