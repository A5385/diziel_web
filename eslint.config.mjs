import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

const eslintConfig = [
    js.configs.recommended,
    ...compat.config({
        extends: [
            
            'next/core-web-vitals',
            'next/typescript',
            'plugin:react/jsx-runtime',
            'prettier',
        ],
        rules: {
            'no-unused-vars': 'off',
            'no-unused-expressions': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-unused-expressions': 'warn',
        },
    }),
    {
        ignores: ['src/types/prisma'],
    },
];

export default eslintConfig;

// import { FlatCompat } from "@eslint/eslintrc";
// import { dirname } from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
// ];

// export default eslintConfig;
