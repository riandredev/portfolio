import { getImageProps } from 'next/image'

/** Keep in sync with `MemoryPhotoCard` in life-journal.tsx */
export const MEMORY_PHOTO_WIDTH = 768
export const MEMORY_PHOTO_HEIGHT = 1024
export const MEMORY_PHOTO_SIZES = '(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 384px'
export const MEMORY_PHOTO_QUALITY = 80

export function getMemoryPhotoImageProps(src: string, alt: string) {
  return getImageProps({
    alt,
    src,
    width: MEMORY_PHOTO_WIDTH,
    height: MEMORY_PHOTO_HEIGHT,
    sizes: MEMORY_PHOTO_SIZES,
    quality: MEMORY_PHOTO_QUALITY,
  })
}

/** Warm HTTP cache for the same assets `/about` will request (`unoptimized` on journal photos). */
export async function warmMemoryPhotoCache(src: string): Promise<void> {
  await fetch(src, { credentials: 'same-origin' }).catch(() => {
    /* ignore */
  })
}

export async function warmAllMemoryPhotos(
  sources: readonly string[],
  concurrency = 3,
): Promise<void> {
  let i = 0
  async function worker() {
    while (i < sources.length) {
      const idx = i++
      await warmMemoryPhotoCache(sources[idx])
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, sources.length) }, () => worker()))
}
