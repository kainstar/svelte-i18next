# @kainstar/svelte-i18next

[![npm package][npm-img]][npm-url] [![Build Status][build-img]][build-url] [![Downloads][downloads-img]][downloads-url] [![Issues][issues-img]][issues-url] [![Commitizen Friendly][commitizen-img]][commitizen-url] [![Semantic Release][semantic-release-img]][semantic-release-url]

`@kainstar/svelte-i18next` is a Svelte library for internationalization using [i18next](https://github.com/i18next/i18next). It referenced partial features provided by [react-i18next](https://github.com/i18next/react-i18next) and do some simplification.

## Why not `svelte-i18next` or `svelte-i18n`?

`svelte-i18n` is based on `intl-messageformat` rather than `i18next` which I am more familiar with, and it's a singleton architecture that is not easy to expand.

`svelte-i18next` is a very simple wrapper for `i18next` and no any options to customize behaviors.

And most important, both `svelte-i18next` and `svelte-i18n` are not provide powerful features like `Trans` in `react-i18next`, that's why I making this library.

## Features

- Context-based multi-instance by `setI18nContext`
- Basic `t` function
- Advanced `Trans` Component

## Install

```bash
npm install @kainstar/svelte-i18next
```

## Usage

i18n.ts:

```ts i18n.ts
import i18next from 'i18next';

i18next.init({
  debug: true,
  lng: 'zh-CN',
  resources: {
    // ...
  },
});

export default i18next;
```

App.svelte:

```svelte
<script lang="ts">
import { setI18nContext } from '@kainstar/svelte-i18next';
import i18nInstance from './i18n';

setI18nContext(i18nInstance);
</script>
```

Child.svelte:

```svelte
<script lang="ts">
import { getTranslation, Trans } from '@kainstar/svelte-i18next';

const { t } = getTranslation();
</script>

<!-- use $t function or Trans component to translate -->
<p>{$t('i18nKey')}</p>
<Trans i18nKey="i18nKey">
```

### Advanced `Trans` Component

`Trans` component can enables you nest any svelte components and native html tag to be translated as one cohesive string.

Let's say you have a translation like this:

> `@kainstar/svelte-i18next` is a **powerful** internationalization library. [Here to see](https://github.com/kainstar/svelte-i18next)

Before:

```svelte
<p>
  <code>@kainstar/svelte-i18next</code> is a <strong>powerful</strong> internationalization library. <Link href="https://github.com/kainstar/svelte-i18next">Here to see</Link>
</p>
```

After:

```yaml
message: <code>@kainstar/svelte-i18next</code>is a <strong>powerful</strong> internationalization library. <Link href="https://github.com/kainstar/svelte-i18next">Here to see</Link>
```

```svelte
<p>
  <Trans
    i18nKey="message"
    components={{
      Link
    }}
  />
</p>
```

#### What different with {@html} ?

`{@html}` is a svelte directive that can render raw html string, but it can't render you custom components.

#### Can I attach props to components?

Yes, you can pass a [comp, props] tuple as component value like:

```svelte
<Trans i18nKey="message" components={{
  Link: [Link, { target: '_blank' }]
}}>
```

### Is `Trans` treat component children as defaultValue?

No, svelte can't check or modify slot content, so `Trans` will ignore children and only use `i18nKey`.

## I18next extends options

`@kainstar/svelte-i18next` extends some options for `i18next.init`:

```ts
interface SvelteI18nextOptions {
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

i18next.init({
  svelte: {
    // ...custom options here
  },
});
```

[build-img]: https://github.com/kainstar/svelte-i18next/actions/workflows/release.yml/badge.svg
[build-url]: https://github.com/kainstar/svelte-i18next/actions/workflows/release.yml
[downloads-img]: https://img.shields.io/npm/dt/@kainstar/svelte-i18next
[downloads-url]: https://www.npmtrends.com/@kainstar/svelte-i18next
[npm-img]: https://img.shields.io/npm/v/@kainstar/svelte-i18next
[npm-url]: https://www.npmjs.com/package/@kainstar/svelte-i18next
[issues-img]: https://img.shields.io/github/issues/kainstar/svelte-i18next
[issues-url]: https://github.com/kainstar/svelte-i18next/issues
[semantic-release-img]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[commitizen-img]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/
