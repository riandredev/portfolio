import type { Metadata } from 'next'

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
