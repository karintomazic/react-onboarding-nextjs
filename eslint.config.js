// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...tseslint.configs.strictTypeChecked,
  {
    files: [
      "**/*.ts",
      "**/*.tsx",
      "**/*.mts",
      "**/*.cts",
      "**/*.js",
      "**/*.mjs",
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    plugins: { import: importPlugin },
    settings: {
      "import/resolver": {
        typescript: true, // to understand @/.. path - tells the plugin to hand off import resolution to eslint-import-resolver-typescript
      },
    },
    rules: {
      "import/no-extraneous-dependencies": [
        "error", // severity
        { // options object
          devDependencies: [ // which files are allowed to import devDependency-only packages
            "**/*.config.*",
            ".storybook/**",
            "**/*.stories.tsx",
            "**/*.test.ts",
            "**/*.test.tsx",
          ],
        },
      ],
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "public/mockServiceWorker.js", // dont lint generated file
    "eslint.config.js",
    "postcss.config.mjs",
  ]),
  ...storybook.configs["flat/recommended"],
]);

export default eslintConfig;
