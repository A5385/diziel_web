// ESLint Flat Configuration for Next.js 15 + TypeScript + React 18/19 + Prettier
// Using FlatCompat to bring in shareable config presets (from Next, TypeScript, etc.)
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize FlatCompat with base directory for resolving configs
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  // Base ESLint recommended rules (for general JavaScript best practices)
  js.configs.recommended,

  // Extend Next.js recommended configs, TypeScript rules, React JSX runtime, and Prettier.
  // - 'next/core-web-vitals' includes Next.js + React best practices.
  // - 'next/typescript' adds TypeScript-specific rules (based on @typescript-eslint/recommended).
  // - 'plugin:react/jsx-runtime' disables React-in-JSX-scope checks (new JSX transform, no React import needed).
  // - 'prettier' turns off formatting rules that would conflict with Prettier.
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'plugin:react/jsx-runtime', 'prettier'],

    // Custom rule adjustments:
    // Warn (not error) on unused variables/expressions to avoid build break; use TypeScript-aware rules.
    rules: {
      // Disable base rules (TypeScript versions will handle these)
      'no-unused-vars': 'off',
      'no-unused-expressions': 'off',
      // Use TypeScript-specific rules for unused variables/expressions and set them to "warn"
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn'
    }
  }),

  // Ignore type definitions in client folder (usually generated or ambient types)
  {
    ignores: ['src/types/client']
  }
];
