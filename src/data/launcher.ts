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
    url: appUrl(import.meta.env.VITE_MORIHOME_URL?.trim() || 'https://morihom.duckdns.org'),
    description:
      'Your home. Your next chapter. Buy, sell, find a rental or rent out your property. Connect with professionals to keep your home at its best.',
  },
  {
    id: 'moricar',
    name: 'MoriCar',
    tagline: 'Buy. Sell. Maintain. Drive.',
    category: 'On the road',
    image: 'car',
    color: '#ff6c85',
    url: appUrl(import.meta.env.VITE_MORICAR_URL?.trim() || 'https://moricar.duckdns.org'),
    description:
      'Your next car. Your next journey. Buy, sell, rent a car or earn by renting out yours. Find maintenance services to keep you moving.',
  },
] as const
