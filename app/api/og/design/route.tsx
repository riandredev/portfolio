import { designOgProps } from '@/lib/og/design'
import { renderOgImage } from '@/lib/og/render-og'

export const runtime = 'edge'

export async function GET() {
  return renderOgImage(designOgProps)
}
