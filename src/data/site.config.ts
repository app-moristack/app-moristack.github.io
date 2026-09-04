import { WEB3FORMS_ENDPOINT } from '@/lib/formProvider'

export type SocialLink = {
  readonly label: string
  readonly url: string | null
  readonly icon: 'facebook' | 'instagram' | 'linkedin' | 'github' | 'whatsapp'
}

export type NavLink = { readonly label: string; readonly to: string }

export type SiteConfig = {
  readonly businessName: string
  readonly tagline: string
  readonly email: string
  readonly phone: string | null
  readonly whatsappNumber: string | null
  readonly location: string
  readonly domain: string
  readonly basePath: string
  readonly responseTime: string
  readonly socials: readonly SocialLink[]
  readonly nav: readonly NavLink[]
  readonly contactFormEndpoint: string | null
  readonly contactFormAccessKey: string | null
}

const rawEndpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT?.trim()
const rawAccessKey = import.meta.env.VITE_CONTACT_FORM_ACCESS_KEY?.trim()
const rawWhatsapp = import.meta.env.VITE_WHATSAPP_NUMBER?.trim()
const rawPhone = import.meta.env.VITE_PHONE?.trim()

/**
 * Web3Forms access key. Public by design — Web3Forms states it is safe in
 * client-side code, and every VITE_* value is compiled into the bundle anyway.
 * Override or rotate it with the VITE_CONTACT_FORM_ACCESS_KEY repository
 * variable; a new key is issued instantly at https://web3forms.com.
 */
const WEB3FORMS_ACCESS_KEY = 'af1e4023-5ce9-4dba-ac2b-d58dc5b3f547'

const resolvedAccessKey = rawAccessKey || WEB3FORMS_ACCESS_KEY

/**
 * The endpoint defaults to Web3Forms, so the key alone is enough. Another
 * provider is selected by setting VITE_CONTACT_FORM_ENDPOINT explicitly.
 */
const resolvedEndpoint = rawEndpoint || (resolvedAccessKey ? WEB3FORMS_ENDPOINT : '')

export const siteConfig: SiteConfig = {
  businessName: 'MoriStack',
  tagline: 'Websites & web apps built for growth',
  email: 'moristack@gmail.com',
  // TODO: set VITE_PHONE (international format, e.g. +230 5xxx xxxx) once a public number exists.
  phone: rawPhone || null,
  // TODO: set VITE_WHATSAPP_NUMBER (digits only, e.g. 2305xxxxxxx) to enable WhatsApp links.
  whatsappNumber: rawWhatsapp || null,
  location: 'Mauritius',
  // TODO: replace with the live domain once one is registered.
  domain: import.meta.env.VITE_SITE_URL?.trim() || 'https://app-moristack.github.io',
  basePath: import.meta.env.BASE_URL,
  responseTime: 'We reply to every enquiry within 1 business day.',
  socials: [
    // TODO: fill in the real profile URLs. Entries with a null url are hidden.
    { label: 'Facebook', url: null, icon: 'facebook' },
    { label: 'Instagram', url: null, icon: 'instagram' },
    { label: 'LinkedIn', url: null, icon: 'linkedin' },
    { label: 'GitHub', url: null, icon: 'github' },
  ],
  nav: [
    { label: 'Home', to: '/' },
    { label: 'Services', to: '/services' },
    { label: 'Our Work', to: '/work' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],
  contactFormEndpoint: resolvedEndpoint || null,
  contactFormAccessKey: resolvedAccessKey || null,
}

export const activeSocials = siteConfig.socials.filter(
  (social): social is SocialLink & { url: string } => Boolean(social.url),
)

export const whatsappLink = siteConfig.whatsappNumber
  ? `https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, '')}`
  : null

export const mailtoLink = (subject: string) =>
  `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`

export const assetUrl = (path: string) =>
  `${siteConfig.basePath.replace(/\/$/, '')}/${path.replace(/^\//, '')}`

/**
 * Absolute URL for a canonical or social tag. The base path always keeps its
 * trailing slash so a hash route reads ".../moristack/#/services", not
 * ".../moristack#/services" — the latter resolves to a different document.
 */
export const absoluteUrl = (path: string) => {
  const origin = siteConfig.domain.replace(/\/$/, '')
  const base = siteConfig.basePath.endsWith('/') ? siteConfig.basePath : `${siteConfig.basePath}/`
  return `${origin}${base}${path === '/' ? '' : path.replace(/^\//, '')}`
}
