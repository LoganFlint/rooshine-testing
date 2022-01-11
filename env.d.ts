/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_STRIPE_KEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}