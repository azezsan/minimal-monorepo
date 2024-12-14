# UI Package

Shadcn-Svelte component library.

## Setup

1. Configure Tailwind:
```ts
// tailwind.config.ts
export * from "@acme/ui/tailwind.config";
```

2. Configure PostCSS:
```js
// postcss.config.mjs
export { default } from "@acme/ui/postcss.config"
```

3. Import styles:
```html
<!-- +layout.svelte -->
<script lang="ts">
    import '@acme/ui/app.css';
</script>
```

Add components using `pnpm dlx shadcn-svelte` in package root.