import { renderOgImage, ogContentType, ogSize } from '@/lib/og/render-og'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const alt = 'Projects by Riandre van der Voorden'
export const size = ogSize
export const contentType = ogContentType

export default async function Image() {
  return renderOgImage({
    eyebrow: 'Projects',
    title: 'Featured work',
    description:
      'Professional client projects and personal builds — from product UI to full-stack Next.js applications.',
    footer: 'riandre.com/posts',
  })
}
