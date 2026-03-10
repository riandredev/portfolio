import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // 1. Try Vercel's built-in geo headers (free, no rate limits, production only)
    const vercelCountry = request.headers.get('x-vercel-ip-country')
    const vercelCity = request.headers.get('x-vercel-ip-city')
    const vercelRegion = request.headers.get('x-vercel-ip-country-region')

    if (vercelCountry && vercelCity) {
      // Vercel provides the 2-letter country code directly
      const countryName = await getCountryName(vercelCountry)
      return NextResponse.json({
        city: decodeURIComponent(vercelCity),
        region: vercelRegion ? decodeURIComponent(vercelRegion) : 'Unknown',
        country_name: countryName,
        country: vercelCountry,
      })
    }

    // 2. Fallback: use ip-api.com (free, 45 req/min, no key needed, HTTP only but fine server-side)
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

// Map common country codes to names (Vercel only gives the code)
const COUNTRY_NAMES: Record<string, string> = {
  ZA: 'South Africa', US: 'United States', GB: 'United Kingdom',
  DE: 'Germany', FR: 'France', IN: 'India', AU: 'Australia',
  CA: 'Canada', BR: 'Brazil', JP: 'Japan', CN: 'China',
  KR: 'South Korea', NL: 'Netherlands', SE: 'Sweden', NO: 'Norway',
  DK: 'Denmark', FI: 'Finland', IT: 'Italy', ES: 'Spain',
  PT: 'Portugal', IE: 'Ireland', NZ: 'New Zealand', SG: 'Singapore',
  MY: 'Malaysia', PH: 'Philippines', TH: 'Thailand', ID: 'Indonesia',
  PL: 'Poland', CZ: 'Czech Republic', AT: 'Austria', CH: 'Switzerland',
  BE: 'Belgium', RO: 'Romania', UA: 'Ukraine', RU: 'Russia',
  TR: 'Turkey', MX: 'Mexico', AR: 'Argentina', CO: 'Colombia',
  CL: 'Chile', PE: 'Peru', EG: 'Egypt', NG: 'Nigeria',
  KE: 'Kenya', GH: 'Ghana', TZ: 'Tanzania', PK: 'Pakistan',
  BD: 'Bangladesh', LK: 'Sri Lanka', VN: 'Vietnam', TW: 'Taiwan',
  HK: 'Hong Kong', IL: 'Israel', SA: 'Saudi Arabia', AE: 'United Arab Emirates',
  QA: 'Qatar', KW: 'Kuwait', BH: 'Bahrain', OM: 'Oman',
  GR: 'Greece', HU: 'Hungary', BG: 'Bulgaria', HR: 'Croatia',
  RS: 'Serbia', SI: 'Slovenia', SK: 'Slovakia', LT: 'Lithuania',
  LV: 'Latvia', EE: 'Estonia',
}

async function getCountryName(code: string): Promise<string> {
  return COUNTRY_NAMES[code.toUpperCase()] || code
}
