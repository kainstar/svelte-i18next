import type { i18n } from 'i18next';
import { getContext, hasContext, onDestroy, onMount, setContext } from 'svelte';
import { type Writable, writable } from 'svelte/store';

import { DEFAULT_OPTIONS } from './default-options';

const I18nContext = Symbol('i18n');

export function setI18nContext(i18n: i18n) {
  const i18n$ = writable(i18n);

  const resetI18n = () => {
    i18n$.set(i18n);
  };

  let unbindI18nEvents: (() => void) | null = null;

  const bindI18nEvents = () => {
    const bindI18n = i18n.options.svelte?.bindI18n || DEFAULT_OPTIONS.bindI18n;
    const bindI18nStore = i18n.options.svelte?.bindI18nStore || DEFAULT_OPTIONS.bindI18nStore;

    if (bindI18n) {
      i18n.on(bindI18n, resetI18n);
    }

    if (bindI18nStore) {
      // @ts-ignore -- i18next typings are wrong
      i18n.store.on(bindI18nStore, resetI18n);
    }

    unbindI18nEvents = () => {
      if (bindI18n) {
        i18n.off(bindI18n, resetI18n);
      }

      if (bindI18nStore) {
        // @ts-ignore -- i18next typings are wrong
        i18n.store.off(bindI18nStore, resetI18n);
      }
    };
  };

  onMount(() => {
    if (i18n.isInitialized) {
      bindI18nEvents();
      return;
    }

    const onInitialized = () => {
      bindI18nEvents();
      resetI18n();
    };

    i18n.on('initialized', onInitialized);
    return () => i18n.off('initialized', onInitialized);
  });

  onDestroy(() => {
    unbindI18nEvents?.();
  });

  setContext(I18nContext, i18n$);
}

export function getI18nContext() {
  return getContext<Writable<i18n>>(I18nContext);
}

export function hasI18nContext() {
  return hasContext(I18nContext);
}
