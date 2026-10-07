import { headers } from 'next/headers'

export async function getRequestBaseUrl(): Promise<string> {
  const fromEnv = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '')
  if (fromEnv) return fromEnv

  const h = await headers()
  const host = h.get('x-forwarded-host') ?? h.get('host')
  if (!host) return 'http://localhost:3000'

  const proto =
    h.get('x-forwarded-proto') ?? (host.startsWith('localhost') || host.startsWith('127.0.0.1') ? 'http' : 'https')

  return `${proto}://${host}`
}
