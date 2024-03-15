<script lang="ts">
  import type { Namespace, TOptions } from 'i18next';
  import { getTranslation } from './translation';
  import { setContext } from 'svelte';
  import HTML from 'html-parse-stringify';
  import { DEFAULT_OPTIONS } from './default-options';
  import AstRender, { ASTComponents, ASTTags } from './ast-render.svelte';
  import type { NormalizedTransComponent, TransComponentProp } from './type';
  import { derived, writable } from 'svelte/store';

  export let i18nKey: string;
  export let tOptions: TOptions = {};
  export let ns: Namespace | undefined = undefined;
  export let components: TransComponentProp = {};

  function normalizeComponents(components: TransComponentProp) {
    return Object.entries(components).reduce<NormalizedTransComponent>((acc, [name, comp]) => {
      acc[name] = Array.isArray(comp) ? [comp[0], comp[1]] : [comp, {}];
      return acc;
    }, {});
  }

  const components$ = writable(normalizeComponents(components));
  $: $components$ = normalizeComponents(components);

  const { t, i18n } = getTranslation(ns);

  const translation$ = derived(t, ($t) => $t(i18nKey, tOptions));

  const keepTags$ = derived(i18n, ($i18n) => $i18n.options.svelte?.transKeepTags ?? DEFAULT_OPTIONS.transKeepTags);

  const ast$ = derived(translation$, ($translation) => HTML.parse($translation));

  setContext(ASTComponents, components$);
  setContext(ASTTags, keepTags$);
</script>

{#each $ast$ as node}
  <AstRender {node} />
{/each}
