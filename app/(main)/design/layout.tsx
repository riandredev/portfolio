import type { Metadata } from 'next'
import { absoluteUrl, ogImageMeta, siteName } from '@/lib/seo'

const designDescription =
  'Design gallery: logos, brand work, and UI from client and in-house product projects.'

export const metadata: Metadata = {
  title: 'Design works',
  description: designDescription,
  alternates: {
    canonical: '/design',
  },
  openGraph: {
    title: `Design works | ${siteName}`,
    description: designDescription,
    url: absoluteUrl('/design'),
    images: ogImageMeta('/design/opengraph-image', 'Design works by Riandre van der Voorden'),
  },
  twitter: {
    title: `Design works | ${siteName}`,
    description: designDescription,
    images: ['/design/opengraph-image'],
  },
}

export default function DesignLayout({ children }: { children: React.ReactNode }) {
  return children
}
