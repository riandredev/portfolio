import { ImageResponse } from 'next/og'
import { getOgImageFonts } from './fonts'
import { OgLayout, type OgLayoutProps } from './og-layout'

export const ogSize = {
  width: 1200,
  height: 630,
}

export const ogContentType = 'image/png'

export async function renderOgImage(props: OgLayoutProps) {
  const fonts = await getOgImageFonts()

  return new ImageResponse(OgLayout(props), {
    ...ogSize,
    fonts,
  })
}
