import { WEB3FORMS_ENDPOINT } from '@/lib/formProvider'

export type SocialLink = {
  readonly label: string
  readonly url: string | null
  readonly icon: 'facebook' | 'instagram' | 'linkedin' | 'github' | 'whatsapp'
}

export type NavChild = {
  readonly label: string
  readonly to: string
  readonly description: string
}

export type NavLink = {
  readonly label: string
  readonly to: string
  readonly children?: readonly NavChild[]
}

export type SiteConfig = {
  readonly businessName: string
  readonly tagline: string
  readonly mission: string
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
  tagline: 'Building a more connected Mauritius',
  mission:
    'MoriStack builds digital platforms that connect people, businesses and services across Mauritius — alongside custom technology for companies ready to grow.',
  email: 'moristack@gmail.com',
  // TODO: set VITE_PHONE (international format, e.g. +230 5xxx xxxx) once a public number exists.
  phone: rawPhone || null,
  whatsappNumber: rawWhatsapp || '+230 5707 9335',
  location: 'Mauritius',
  // TODO: replace with the live domain once one is registered.
  domain: import.meta.env.VITE_SITE_URL?.trim() || 'https://app-moristack.github.io',
  basePath: import.meta.env.BASE_URL,
  responseTime: 'We reply to every enquiry within 1 business day.',
  socials: [
    // TODO: fill in the real profile URLs. Entries with a null url are hidden.
    { label: 'Instagram', url: null, icon: 'instagram' },
    { label: 'Facebook', url: null, icon: 'facebook' },
    { label: 'LinkedIn', url: null, icon: 'linkedin' },
    { label: 'GitHub', url: null, icon: 'github' },
  ],
  nav: [
    { label: 'MoriStack', to: '/moristack' },
    { label: 'Home', to: '/home' },
    {
      label: 'Our Services',
      to: '/services',
      children: [
        {
          label: 'Websites',
          to: '/services#business-websites',
          description: 'Company and service websites',
        },
        {
          label: 'Web applications',
          to: '/services#web-applications',
          description: 'Portals, dashboards and tools',
        },
        {
          label: 'Business systems',
          to: '/services#management-systems',
          description: 'Operations in one place',
        },
        {
          label: 'Custom development',
          to: '/services#custom-platforms',
          description: 'Platforms built from scratch',
        },
      ],
    },
    { label: 'Projects', to: '/work' },
    { label: 'About Us', to: '/about' },
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
