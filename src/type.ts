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
   * Which nodes not to convert in defaultValue generation in the Trans component.
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
