# RPC Package

Type-safe Elysia RPC client.

## Usage
```ts
import { api } from '@acme/rpc';

const { data, error } = await api.users.get();
```