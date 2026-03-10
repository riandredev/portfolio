import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Use ip-api.com (free, 45 req/min, no key needed, HTTP only but fine server-side)
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || ''
    const url = ip && !isPrivateIp(ip)
      ? `http://ip-api.com/json/${ip}?fields=city,regionName,country,countryCode`
      : `http://ip-api.com/json/?fields=city,regionName,country,countryCode`

    const res = await fetch(url, { next: { revalidate: 300 } }) // cache for 5 min
    if (!res.ok) throw new Error(`ip-api error: ${res.status}`)

    const data = await res.json()

    if (data.status === 'fail') {
      throw new Error(data.message || 'ip-api lookup failed')
    }

    return NextResponse.json({
      city: data.city || 'Unknown',
      region: data.regionName || 'Unknown',
      country_name: data.country || 'Unknown',
      country: data.countryCode || 'Unknown',
    })
  } catch (error) {
    console.error('Location API error:', error)
    return NextResponse.json(
      { error: 'Failed to determine location' },
      { status: 500 }
    )
  }
}

function isPrivateIp(ip: string): boolean {
  return (
    ip === '127.0.0.1' ||
    ip === '::1' ||
    ip.startsWith('10.') ||
    ip.startsWith('192.168.') ||
    ip.startsWith('172.16.') ||
    ip.startsWith('172.17.') ||
    ip.startsWith('172.18.') ||
    ip.startsWith('172.19.') ||
    ip.startsWith('172.2') ||
    ip.startsWith('172.3')
  )
}


