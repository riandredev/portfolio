import { renderOgImage, ogContentType, ogSize } from '@/lib/og/render-og'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const alt = 'Riandre van der Voorden — Software Engineer Portfolio'
export const size = ogSize
export const contentType = ogContentType

export default async function Image() {
  return renderOgImage({
    eyebrow: 'Portfolio',
    title: 'Riandre van der Voorden',
    description:
      'Front-end engineer building performant web experiences with React, Next.js, and modern design systems.',
  })
}
