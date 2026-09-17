/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_PATH?: string
  readonly VITE_SITE_URL?: string
  readonly VITE_CONTACT_FORM_ENDPOINT?: string
  readonly VITE_CONTACT_FORM_ACCESS_KEY?: string
  readonly VITE_WHATSAPP_NUMBER?: string
  readonly VITE_PHONE?: string
  readonly VITE_MORIHOME_URL?: string
  readonly VITE_MORICAR_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
