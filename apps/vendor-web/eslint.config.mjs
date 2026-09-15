import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Playwright tests and their generated output are not linted, by decision: lint guards the
    // portal's own source. React's hooks rule also misreads Playwright's fixture `use` as a hook.
    "tests/**",
    "playwright.config.ts",
    "playwright-report/**",
    "test-results/**",
    "guides/**",
    ".auth/**",
  ]),
]);

export default eslintConfig;
