import { generateSignatureFavicon } from '@/lib/signature-favicon'

export const runtime = 'nodejs'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default async function AppleIcon() {
  const body = await generateSignatureFavicon(180)
  return new Response(new Uint8Array(body), {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400' },
  })
}
