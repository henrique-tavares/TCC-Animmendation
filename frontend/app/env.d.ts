/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAL_CLIENT_ID: string;
  readonly VITE_API_URL: string;
  readonly VITE_TRANSLATOR_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
