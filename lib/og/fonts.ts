type OgFont = {
  name: string
  data: ArrayBuffer
  style: 'normal'
  weight: 300 | 400 | 500 | 600
}

const fontCache = new Map<string, ArrayBuffer>()

async function fetchGoogleFont(family: string, weight: number): Promise<ArrayBuffer> {
  const cacheKey = `${family}-${weight}`
  const cached = fontCache.get(cacheKey)
  if (cached) return cached

  const familyParam = family.replace(/ /g, '+')
  const cssUrl = `https://fonts.googleapis.com/css2?family=${familyParam}:wght@${weight}&display=swap`
  const css = await fetch(cssUrl, {
    headers: {
      // Request legacy `woff` binaries — @vercel/og does not support woff2.
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; rv:2.0.1) Gecko/20100101 Firefox/4.0.1',
    },
  }).then((response) => response.text())

  const fontUrls = [...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map((match) => match[1])
  const fontUrl =
    fontUrls.find((url) => url.endsWith('.woff')) ??
    fontUrls.find((url) => !url.endsWith('.woff2')) ??
    fontUrls[0]
  if (!fontUrl) {
    throw new Error(`Failed to resolve Google Font file for ${family} (${weight})`)
  }

  const data = await fetch(fontUrl).then((response) => response.arrayBuffer())
  fontCache.set(cacheKey, data)
  return data
}

export async function getOgImageFonts(): Promise<OgFont[]> {
  const [light, regular, medium, semibold] = await Promise.all([
    fetchGoogleFont('Manrope', 300),
    fetchGoogleFont('Manrope', 400),
    fetchGoogleFont('Manrope', 500),
    fetchGoogleFont('Manrope', 600),
  ])

  return [
    { name: 'Manrope', data: light, style: 'normal', weight: 300 },
    { name: 'Manrope', data: regular, style: 'normal', weight: 400 },
    { name: 'Manrope', data: medium, style: 'normal', weight: 500 },
    { name: 'Manrope', data: semibold, style: 'normal', weight: 600 },
  ]
}
