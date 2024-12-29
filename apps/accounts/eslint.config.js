import svelteKitConfig from "@acme/eslint-config/sveltekit";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [],
  },
  ...svelteKitConfig,
];
