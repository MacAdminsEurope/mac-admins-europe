/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly BASIC_AUTH_USERNAME: string;
  readonly BASIC_AUTH_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}