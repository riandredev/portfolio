export type DesignGalleryTile = {
  id: string
  src: string
  caption: string
  width: number
  height: number
}

export const designGalleryTiles: DesignGalleryTile[] = [
  {
    id: 'loombyte-wordmark',
    src: '/design/loombyte-wordmark.png',
    caption: 'Loombyte wordmark',
    width: 1024,
    height: 327,
  },
  {
    id: 'loombyte-product-flow',
    src: '/design/loombyte-product-flow.jpg',
    caption: 'Loombyte upload, optimize, and deliver flow',
    width: 1024,
    height: 1024,
  },
  {
    id: 'luvea-plum',
    src: '/design/luvea-on-plum.png',
    caption: 'Luvea wordmark on plum',
    width: 1024,
    height: 642,
  },
  {
    id: 'luvea-white',
    src: '/design/luvea-on-white.png',
    caption: 'Luvea wordmark on white',
    width: 1024,
    height: 642,
  },
  {
    id: 'luvea-waves',
    src: '/design/luvea-on-waves.png',
    caption: 'Luvea on contour wave pattern',
    width: 1024,
    height: 642,
  },
  {
    id: 'luvea-mark',
    src: '/design/luvea-mark-circle.png',
    caption: 'Luvea flower mark',
    width: 500,
    height: 500,
  },
  {
    id: 'koppie-mark-green',
    src: '/design/koppie-mark-on-green.png',
    caption: 'Koppie landscape mark on green',
    width: 800,
    height: 800,
  },
  {
    id: 'koppie-wordmark-light',
    src: '/design/koppie-wordmark-light.png',
    caption: 'Koppie wordmark on topo mint',
    width: 1024,
    height: 547,
  },
  {
    id: 'koppie-mark-white',
    src: '/design/koppie-mark-on-white.png',
    caption: 'Koppie mark on white',
    width: 800,
    height: 800,
  },
  {
    id: 'koppie-wordmark-green',
    src: '/design/koppie-wordmark-green.png',
    caption: 'Koppie wordmark on forest green topo',
    width: 1024,
    height: 547,
  },
  {
    id: 'genx-digital-og',
    src: '/design/genx-digital-hero.jpg',
    caption: 'GenX Digital Open Graph image',
    width: 1024,
    height: 537,
  },
  {
    id: 'genx-digital-pixel-saturn',
    src: '/design/genx-digital-pixel-saturn.png',
    caption: 'GenX Digital pixel illustration — Saturn',
    width: 1024,
    height: 683,
  },
  {
    id: 'genx-digital-pixel-galaxy',
    src: '/design/genx-digital-pixel-galaxy.png',
    caption: 'GenX Digital pixel illustration — spiral galaxy',
    width: 1024,
    height: 395,
  },
  {
    id: 'genx-digital-pixel-probe',
    src: '/design/genx-digital-pixel-probe.png',
    caption: 'GenX Digital pixel illustration — deep-space probe',
    width: 1024,
    height: 813,
  },
  {
    id: 'genx-digital-pixel-tower',
    src: '/design/genx-digital-pixel-tower.png',
    caption: 'GenX Digital pixel illustration — relay tower',
    width: 960,
    height: 720,
  },
  {
    id: 'genx-digital-green',
    src: '/design/genx-digital-on-green.png',
    caption: 'GenX Digital wordmark on forest green',
    width: 1024,
    height: 529,
  },
  {
    id: 'genx-digital-white',
    src: '/design/genx-digital-on-white.png',
    caption: 'GenX Digital wordmark on white',
    width: 1024,
    height: 529,
  },
  {
    id: 'genx-mark-green',
    src: '/design/genx-mark-on-green.png',
    caption: 'GenX monogram mark',
    width: 400,
    height: 400,
  },
  {
    id: 'genx-secure-navy',
    src: '/design/genx-secure-on-navy.png',
    caption: 'GenX Secure wordmark on navy',
    width: 1024,
    height: 529,
  },
  {
    id: 'genx-secure-white',
    src: '/design/genx-secure-on-white.png',
    caption: 'GenX Secure wordmark on white',
    width: 1024,
    height: 529,
  },
  {
    id: 'genx-secure-mark',
    src: '/design/genx-secure-mark-on-navy.png',
    caption: 'GenX Secure shield mark',
    width: 400,
    height: 400,
  },
  {
    id: 'orion-dashboard',
    src: '/projects/orion-cover.png',
    caption: 'Orion Dashboard',
    width: 1200,
    height: 1600,
  },
]

export function isRemoteDesignSrc(src: string) {
  return src.startsWith('http://') || src.startsWith('https://')
}
