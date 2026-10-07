import type { Metadata } from 'next'
import HomepageSchema from '@/app/homepage-schema'
import HomePage from './home-page'
import { absoluteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
  openGraph: {
    url: absoluteUrl('/'),
    title: 'Riandre van der Voorden - Software Engineer',
    description:
      'Full Stack Software Engineer specializing in modern web development. View my portfolio, projects, and professional experience.',
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
