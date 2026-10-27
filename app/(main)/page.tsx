import type { Metadata } from 'next'
import HomepageSchema from '@/app/homepage-schema'
import HomePage from './home-page'
import { absoluteUrl, defaultTitle, ogImageMeta, siteDescription } from '@/lib/seo'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
  title: defaultTitle,
  description: siteDescription,
  openGraph: {
    url: absoluteUrl('/'),
    title: defaultTitle,
    description: siteDescription,
    images: ogImageMeta('/opengraph-image', 'Riandre van der Voorden — front-end engineer portfolio'),
  },
  twitter: {
    title: defaultTitle,
    description: siteDescription,
    images: ['/twitter-image'],
  },
}

export default function Page() {
  return (
    <>
      <HomepageSchema />
      <HomePage />
    </>
  )
}
