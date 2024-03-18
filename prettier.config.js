/** @type {import('prettier').Config} */
export default {
  printWidth: 120,
  singleQuote: true,
  proseWrap: 'never',
  plugins: ['prettier-plugin-svelte'],
  overrides: [
    {
      files: '**/*.json',
      options: {
        parser: 'json-stringify',
      },
    },
    {
      files: ['.vscode/*.json', '**/tsconfig.json'],
      options: {
        parser: 'jsonc',
      },
    },
    { files: '*.svelte', options: { parser: 'svelte' } },
  ],
};
