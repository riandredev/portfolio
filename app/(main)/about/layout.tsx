import type { Metadata } from 'next'
import { absoluteUrl, ogImageMeta, siteName } from '@/lib/seo'

const aboutDescription =
  'Bits of my life: a few stories in photos, with songs behind them. Journal from travels and everyday moments.'

export const metadata: Metadata = {
  title: 'About',
  description: aboutDescription,
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: `About | ${siteName}`,
    description: aboutDescription,
    url: absoluteUrl('/about'),
    images: ogImageMeta('/about/opengraph-image', 'Bits of my life — Riandre van der Voorden'),
  },
  twitter: {
    title: `About | ${siteName}`,
    description: aboutDescription,
    images: ['/about/opengraph-image'],
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preload" href="/me.jpg" as="image" type="image/jpeg" fetchPriority="high" />
      {children}
    </>
  )
}
