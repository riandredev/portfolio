import { join } from 'node:path'
import sharp from 'sharp'

const FAVICON_SRC = join(process.cwd(), 'public', 'favicon-source.png')

/** Resize `public/favicon-source.png` for app icon routes. */
export async function generateSignatureFavicon(size: number): Promise<Buffer> {
  return sharp(FAVICON_SRC)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 1 },
      kernel: sharp.kernel.lanczos3,
    })
    .png({ compressionLevel: 9 })
    .toBuffer()
}
