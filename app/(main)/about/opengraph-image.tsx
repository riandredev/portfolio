import { renderOgImage, ogContentType, ogSize } from '@/lib/og/render-og'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const alt = 'About Riandre van der Voorden'
export const size = ogSize
export const contentType = ogContentType

export default async function Image() {
  return renderOgImage({
    eyebrow: 'About',
    title: 'Experience & craft',
    description:
      'UI-focused software engineer — experience, education, and certifications across modern web development.',
    footer: 'riandre.com/about',
  })
}
