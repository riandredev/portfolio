import { postsListOgProps } from '@/lib/og/posts-list'
import { renderOgImage } from '@/lib/og/render-og'

export const runtime = 'edge'

export async function GET() {
  return renderOgImage(postsListOgProps)
}
