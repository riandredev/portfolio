import type { Metadata } from 'next'
import { postsListOgAlt } from '@/lib/og/posts-list'
import { ogSize } from '@/lib/og/render-og'
import { absoluteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Featured professional and personal software projects by Riandre van der Voorden, including web applications, design systems, and full-stack work.',
  alternates: {
    canonical: '/posts',
  },
  openGraph: {
    title: 'Projects | Riandre van der Voorden',
    description:
      'Explore professional client work and personal software projects built with React, Next.js, and modern web tooling.',
    url: absoluteUrl('/posts'),
    images: [
      {
        url: absoluteUrl('/posts/opengraph-image'),
        width: ogSize.width,
        height: ogSize.height,
        alt: postsListOgAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [absoluteUrl('/posts/opengraph-image')],
  },
}

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return children
}
