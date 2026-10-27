import type { Metadata } from 'next'
import { postsListOgAlt } from '@/lib/og/posts-list'
import { absoluteUrl, ogImageMeta, siteName } from '@/lib/seo'

const postsDescription =
  'Selected client and personal work: marketing sites, web apps, design systems, and Next.js builds.'

export const metadata: Metadata = {
  title: 'Work',
  description: postsDescription,
  alternates: {
    canonical: '/posts',
  },
  openGraph: {
    title: `Work | ${siteName}`,
    description: postsDescription,
    url: absoluteUrl('/posts'),
    images: ogImageMeta('/posts/opengraph-image', postsListOgAlt),
  },
  twitter: {
    card: 'summary_large_image',
    title: `Work | ${siteName}`,
    description: postsDescription,
    images: ['/posts/opengraph-image'],
  },
}

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return children
}
