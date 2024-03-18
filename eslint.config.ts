import kainstar from '@kainstar/eslint-config';
import svelte from 'eslint-plugin-svelte';
import * as parserSvelte from 'svelte-eslint-parser';

import * as eslintTsParser from './node_modules/@typescript-eslint/parser/dist/parser.js';

export default kainstar(
  {},
  {
    name: 'svelte',
    files: ['**/*.svelte'],
    languageOptions: {
      parser: parserSvelte,
      parserOptions: {
        extraFileExtensions: ['.svelte'],
        parser: eslintTsParser,
      },
    },
    plugins: {
      svelte,
    },
    processor: svelte.processors.svelte,
    rules: {
      'prettier/prettier': 'error',
      'import/no-mutable-exports': 'off',
      'no-inner-declarations': 'off',
      ...svelte.configs.prettier.rules,
      ...svelte.configs.recommended.rules,
    },
  },
);
