<script lang="ts">
  import { getTranslation, setI18nContext, Trans } from '../../src';
  import i18nInstance from './i18n';
  import Img from './components/Img.svelte';
  import Custom from './components/Custom.svelte';
  import Child from './Child.svelte';

  setI18nContext(i18nInstance);

  const { t, i18n } = getTranslation();

  let showOriginImg = true;

  const changeLanguage = () => {
    $i18n.changeLanguage($i18n.language === 'en-US' ? 'zh-CN' : 'en-US');
  };

  const addResource = () => {
    $i18n.addResources('en-US', 'runtime', { filled: 'Filled' });
    $i18n.addResources('zh-CN', 'runtime', { filled: '已填充' });
  };
</script>

<main class="main">
  <h1 class="title">Svelte I18next</h1>

  <div class="actions">
    <button on:click={changeLanguage}>
      {$t('index.changeLanguage')}
    </button>
    <button on:click={addResource}>
      {$t('index.addResource')}
    </button>
    <button on:click={() => (showOriginImg = !showOriginImg)}>
      {$t('index.toggleImg')}
    </button>
  </div>

  <Child />

  <div>
    <Trans
      i18nKey="index.transContent"
      tOptions={{
        href: 'https://unsplash.com/photos/mountain-range-rnKqWvO80Y4',
      }}
      components={{
        custom: Custom,
        'custom-blue': [Custom, { color: 'blue' }],
        img: showOriginImg ? 'img' : Img,
      }}
    />
  </div>
</main>

<style lang="scss">
  .main {
    width: 70%;
    min-width: 400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }

  .actions {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    gap: 24px;
  }
</style>
