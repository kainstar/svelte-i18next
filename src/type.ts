import type { ComponentType } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';

export type RenderComponent = ComponentType | keyof SvelteHTMLElements;

export type NormalizedTransComponent = Record<string, [RenderComponent, Record<string, any>]>;

export type TransComponentProp = Record<string, RenderComponent | [RenderComponent, Record<string, any>]>;

export interface SvelteI18nextOptions {
  /**
   * Set which events trigger a re-render, can be set to false or string of events
   * @default 'languageChanged'
   */
  bindI18n?: string | false;
  /**
   * Set which events on store trigger a re-render, can be set to false or string of events
   * @default false
   */
  bindI18nStore?: string | false;
  /**
   * Which tag will be treated as native HTML tag Trans component.
   * If a tag is not custom component and native HTML tag, it will be render as string.
   * `true` will keep all tags
   * @default true
   */
  transKeepTags?: readonly string[] | true;
}

declare module 'i18next' {
  interface CustomPluginOptions {
    svelte?: SvelteI18nextOptions;
  }
}
