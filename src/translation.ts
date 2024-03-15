import { derived, readonly, type Readable } from 'svelte/store';
import { getI18nContext, hasI18nContext } from './context';
import type { Namespace, TFunction } from 'i18next';

export function getTranslation(
  ns?: Namespace,
  options?: {
    lng?: string;
    keyPrefix?: string;
  },
) {
  if (!hasI18nContext()) {
    throw new Error('i18n context is not set, please call setI18nContext before using getTranslation');
  }

  const i18n$ = getI18nContext();

  const namespaces$ = derived(i18n$, ($i18n) => {
    const namespace = ns || $i18n.options.defaultNS;
    return typeof namespace === 'string' ? [namespace] : namespace || ['translation'];
  });

  const ready$ = derived(
    [i18n$, namespaces$],
    ([$i18n, $namespaces]) =>
      ($i18n.isInitialized || $i18n.initializedStoreOnce) &&
      $namespaces.every((n) => $i18n.hasResourceBundle($i18n.language, n)),
  );

  const t$: Readable<TFunction> = derived([i18n$, namespaces$, ready$], ([$i18n, $namespaces, $ready]) => {
    if (!$ready) {
      return ((k) => {
        return Array.isArray(k) ? k[k.length - 1] : k;
      }) as TFunction;
    }

    return $i18n.getFixedT(options?.lng || null, $namespaces, options?.keyPrefix);
  });

  return {
    i18n: readonly(i18n$),
    t: t$,
    ready: ready$,
  };
}
