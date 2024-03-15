import type { SvelteI18nextOptions } from './type';

export const DEFAULT_OPTIONS: Required<SvelteI18nextOptions> = {
  bindI18n: 'languageChanged',
  bindI18nStore: false,
  transKeepTags: true,
};
