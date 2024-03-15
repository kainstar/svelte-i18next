<script lang="ts">
  import { getTranslation } from '../../src';

  const { t, i18n } = getTranslation();

  const removeResource = () => {
    $i18n.removeResourceBundle('en-US', 'runtime');
    $i18n.removeResourceBundle('zh-CN', 'runtime');
  };
</script>

{#if $i18n.exists('filled', { ns: 'runtime' })}
  <p>
    {$t('filled', {
      ns: 'runtime',
    })}
  </p>
  <button on:click={removeResource}>
    {$t('index.removeResource')}
  </button>
{/if}
