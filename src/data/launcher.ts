function appUrl(value: string | undefined) {
  if (!value) return null
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null
  } catch {
    return null
  }
}

export const launcherApps = [
  {
    id: 'morihome',
    name: 'MoriHome',
    tagline: 'Build. Renovate. Live better.',
    category: 'Home & living',
    image: 'home',
    color: '#ffc56b',
    url: appUrl(import.meta.env.VITE_MORIHOME_URL),
    description: 'A place to connect with home-service professionals across Mauritius.',
  },
  {
    id: 'moricar',
    name: 'MoriCar',
    tagline: 'Buy. Sell. Drive forward.',
    category: 'On the road',
    image: 'car',
    color: '#ff6c85',
    url: appUrl(import.meta.env.VITE_MORICAR_URL),
    description: 'Cars, showrooms and automotive services, brought together.',
  },
  {
    id: 'morihealth',
    name: 'MoriHealth',
    tagline: 'Care for a brighter tomorrow.',
    category: 'Care & connection',
    image: 'care',
    color: '#74efb2',
    url: appUrl(import.meta.env.VITE_MORIHEALTH_URL),
    description: 'A future platform for connecting people with care and support.',
  },
] as const
