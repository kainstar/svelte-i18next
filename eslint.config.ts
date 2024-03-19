import kainstar from '@kainstar/eslint-config';
import type { Linter } from 'eslint';
import svelte from 'eslint-plugin-svelte';
import * as parserSvelte from 'svelte-eslint-parser';

export default kainstar({}, [
  {
    name: 'svelte',
    files: ['**/*.svelte'],
    languageOptions: {
      parser: parserSvelte,
      parserOptions: {
        extraFileExtensions: ['.svelte'],
        parser: {
          ts: '@typescript-eslint/parser',
          js: 'espree',
          typescript: '@typescript-eslint/parser',
        },
      },
    },
    plugins: {
      svelte,
    },
    processor: svelte.processors.svelte,
    rules: {
      'import/no-mutable-exports': 'off',
      'prettier/prettier': 'error',
      'no-inner-declarations': 'off',
      'no-self-assign': 'off',
      ...(svelte.configs.recommended.rules as Linter.RulesRecord),
    },
  },
]);
