import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Riandre van der Voorden — frontend engineer focused on performant web apps, design systems, and modern React/Next.js development.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About | Riandre van der Voorden',
    description:
      'Experience, education, and certifications for Riandre van der Voorden, software engineer and UI-focused developer.',
    url: absoluteUrl('/about'),
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
