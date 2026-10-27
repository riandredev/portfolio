import { generateSignatureFavicon } from '@/lib/signature-favicon'

export const runtime = 'nodejs'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default async function Icon() {
  const body = await generateSignatureFavicon(32)
  return new Response(new Uint8Array(body), {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400' },
  })
}
