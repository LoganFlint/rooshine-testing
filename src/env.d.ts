/// <reference types="vite/client" />

interface ImportMetaEnv{
    readonly VITE_APP_GOOGLE_CLIENT_ID: string
    readonly VITE_APP_PLAID_PUBLIC_KEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
