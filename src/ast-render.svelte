<script context="module" lang="ts">
  export const ASTComponents = Symbol('ASTComponents');
  export const ASTTags = Symbol('ASTTags');
</script>

<script lang="ts">
  import HTML, { type HTMLAstNode } from 'html-parse-stringify';
  import { getContext } from 'svelte';
  import type { Readable } from 'svelte/store';
  import type { NormalizedTransComponent, SvelteI18nextOptions } from './type';

  export let node: HTMLAstNode;

  const components = getContext<Readable<NormalizedTransComponent>>(ASTComponents);
  const availableTags = getContext<Readable<NonNullable<SvelteI18nextOptions['transKeepTags']>>>(ASTTags);
</script>

{#if node.type === 'text'}
  <!-- text -->
  {node.content}
{:else if node.type === 'tag'}
  <!-- custom components -->
  {@const [comp, props] = $components[node.name] ?? []}
  {#if comp}
    {#if typeof comp === 'function'}
      <svelte:component this={comp} {...node.attrs} {...props}>
        {#each node.children as child}
          <svelte:self node={child} />
        {/each}
      </svelte:component>
    {:else if typeof comp === 'string'}
      <svelte:element this={comp} {...node.attrs} {...props}>
        {#each node.children as child}
          <svelte:self node={child} />
        {/each}
      </svelte:element>
    {/if}
  {:else if $availableTags === true || $availableTags.includes(node.name)}
    <!-- primitive tags -->
    {#if node.voidElement}
      <svelte:element this={node.name} {...node.attrs} />
    {:else}
      <svelte:element this={node.name} {...node.attrs}>
        {#each node.children as child}
          <svelte:self node={child} />
        {/each}
      </svelte:element>
    {/if}
  {:else}
    {HTML.stringify([node])}
  {/if}
{/if}
