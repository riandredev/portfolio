import type { Metadata } from 'next'
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
  },
}

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return children
}
