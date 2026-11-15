import type { Metadata } from 'next'

export const siteName = 'Riandre van der Voorden'

export const defaultTitle = 'Riandre van der Voorden | Front-end Engineer · UI Engineer'

export const siteDescription =
  'Front-end engineer with 2+ years shipping production Next.js, React and TypeScript apps. Founding engineer at Kliio. 30+ client sites at PixelMeta with 40% average Lighthouse improvement. Strong UI/UX in Figma, accessible fast front ends. Remote, based in South Africa (UTC+2).'

export const ogImageSize = { width: 1200, height: 630 }

export function ogImageMeta(path: string, alt: string) {
  return [
    {
      url: path,
      width: ogImageSize.width,
      height: ogImageSize.height,
      alt,
    },
  ]
}

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_BASE_URL || 'https://riandre.com'
  return raw.replace(/\/$/, '')
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${getSiteUrl()}${normalized}`
}

export const privateRouteRobots: Metadata['robots'] = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
}

export const defaultTwitter: NonNullable<Metadata['twitter']> = {
  card: 'summary_large_image',
  creator: '@riandre',
  site: '@riandre',
}
