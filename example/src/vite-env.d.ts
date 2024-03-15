/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module 'virtual:i18next-loader' {
  declare const resources: import('i18next').Resource;

  export default resources;
}
