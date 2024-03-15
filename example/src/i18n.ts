import i18next from 'i18next';
import resources from 'virtual:i18next-loader';

import '../../src';

i18next.init({
  debug: true,
  lng: 'zh-CN',
  resources,
  svelte: {
    bindI18nStore: 'added removed',
  },
});

export default i18next;
