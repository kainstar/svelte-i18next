import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import i18next from '@kainstar/vite-plugin-i18next-loader';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    i18next({
      paths: ['src/locales'],
    }),
  ],
});
