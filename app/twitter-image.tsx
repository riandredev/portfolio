import { renderOgImage, ogContentType, ogSize } from '@/lib/og/render-og'

export const runtime = 'edge'

export const alt = 'Riandre van der Voorden — front-end engineer portfolio'
export const size = ogSize
export const contentType = ogContentType

export default async function Image() {
  return renderOgImage({
    eyebrow: 'Portfolio',
    title: 'Riandre van der Voorden',
    description:
      'Front-end engineer in Gauteng building React and Next.js products with care for typography, layout, and speed.',
  })
}
