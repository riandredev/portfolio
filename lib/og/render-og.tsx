import { ImageResponse } from 'next/og'
import { getOgFonts } from './fonts'
import { OgLayout, type OgLayoutProps } from './og-layout'

export const ogSize = {
  width: 1200,
  height: 630,
}

export const ogContentType = 'image/png'

export async function renderOgImage(props: OgLayoutProps) {
  const { geistSans, manrope } = await getOgFonts()

  return new ImageResponse(await OgLayout(props), {
    ...ogSize,
    fonts: [
      {
        name: 'Geist',
        data: geistSans,
        style: 'normal',
        weight: 400,
      },
      {
        name: 'Geist',
        data: geistSans,
        style: 'normal',
        weight: 300,
      },
      {
        name: 'Manrope',
        data: manrope,
        style: 'normal',
        weight: 400,
      },
      {
        name: 'Manrope',
        data: manrope,
        style: 'normal',
        weight: 500,
      },
    ],
  })
}
