import i18next from '@kainstar/vite-plugin-i18next-loader';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    i18next({
      paths: ['src/locales'],
    }),
  ],
});
