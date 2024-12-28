/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-svelte").PluginConfig} SvelteConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */
/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig | SvelteConfig } */
const config = {
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-svelte",
    // "prettier-plugin-tailwindcss",
  ],
  // tailwindFunctions: ["cn", "cva"],
  //   importOrder: [
  //     "<TYPES>",
  //     "^(react/(.*)$)|^(react$)|^(react-native(.*)$)",
  //     "^(next/(.*)$)|^(next$)",
  //     "^(expo(.*)$)|^(expo$)",
  //     "<THIRD_PARTY_MODULES>",
  //     "",
  //     "<TYPES>^@acme",
  //     "^@acme/(.*)$",
  //     "",
  //     "<TYPES>^[.|..|~]",
  //     "^~/",
  //     "^[../]",
  //     "^[./]",
  //   ],
  //   importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.7.0",
  overrides: [
    {
      files: "*.svelte",
      options: {
        parser: "svelte",
      },
    },
  ],
};

export default config;
