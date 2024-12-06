# shadcn-svelte UI Package

this is a shared component library.

## Usage

after initilizing your SvelteKit App, use the following exports to import inside your project.

### Step 1

in the root of your app create a file named `tailwind.config.ts` and paste the following code

```ts
export * from "@acme/ui/tailwind.config";
```

### step 2

in the root of your app create a file named `postcss.config.mjs` and paste the following code

```mjs
export { default } from "@acme/ui/postcss.config"
```

### step 3

inside your app's +layout.svelte import `@acme/ui/app.css` like so

```html
<script lang="ts">
	import '@acme/ui/app.css';
</script>
```

now the app's ui will be linked to this package, if you wish to add new shadcn-svelte components use `bunx shadcn-svelte` CLI in the root of this library

## Documentation

For more information visit https://shadcn-svelte.com to view the documentation.