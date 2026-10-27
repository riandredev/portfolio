/**
 * Build Odysseo 2×2 collage + recompress /about journal JPEGs.
 * Run: node scripts/optimize-life-images.mjs
 */
import { mkdir, rename } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const lifeDir = path.join(__dirname, '..', 'public', 'life')
const sourcesDir = path.join(__dirname, '..', 'content', 'life-sources', 'odysseo')

const JOURNAL_IMAGES = [
  'memory-cape-town.jpg',
  'memory-odysseo.jpg',
  'memory-ssr-botanical.jpg',
  'memory-chamarel.jpg',
  'memory-mauritius.jpg',
  'memory-mon-choisy-framed.jpg',
  'memory-pretoria-zoo.jpg',
  'memory-walter-sisulu-botanical.jpg',
  'memory-nosy-iranja.jpg',
  'memory-nosy-komba.jpg',
  'memory-nosy-be.jpg',
]

const TARGET_WIDTH = 768
const TARGET_HEIGHT = 1024
const JPEG_QUALITY = 82

/** Landscape source → 4:5 portrait. Lower = more left side of photo (you shift into frame). */
const MON_CHOISY_SOURCE = path.join(
  __dirname,
  '..',
  'content',
  'life-sources',
  'memory-mon-choisy-source.jpg',
)
const MON_CHOISY_CROP_FRAC = 0.58

async function buildMonChoisyPortrait() {
  const meta = await sharp(MON_CHOISY_SOURCE).metadata()
  const h = meta.height!
  const w = Math.round((h * 3) / 4)
  const maxLeft = meta.width! - w
  const left = Math.round(maxLeft * MON_CHOISY_CROP_FRAC)
  const outPath = path.join(lifeDir, 'memory-mon-choisy-framed.jpg')
  await sharp(MON_CHOISY_SOURCE)
    .extract({ left, top: 0, width: w, height: h })
    .resize(TARGET_WIDTH, TARGET_HEIGHT)
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(outPath)
  console.log('memory-mon-choisy.jpg', `crop left=${left}/${maxLeft}`)
}

async function resolveOdysseoTilePath(i) {
  const fs = await import('node:fs/promises')
  const inLife = path.join(lifeDir, `memory-odysseo-${i}.jpg`)
  const inSources = path.join(sourcesDir, `memory-odysseo-${i}.jpg`)
  try {
    await fs.access(inLife)
    return inLife
  } catch {
    return inSources
  }
}

async function buildOdysseoCollage() {
  await mkdir(sourcesDir, { recursive: true })
  const gap = 6
  const cellW = Math.floor((TARGET_WIDTH - gap) / 2)
  const cellH = Math.floor((TARGET_HEIGHT - gap) / 2)

  const tileBuffers = []
  for (let i = 1; i <= 4; i++) {
    const src = await resolveOdysseoTilePath(i)
    tileBuffers.push(
      await sharp(src).resize(cellW, cellH, { fit: 'cover', position: 'centre' }).toBuffer(),
    )
  }

  const composites = [
    { input: tileBuffers[0], left: 0, top: 0 },
    { input: tileBuffers[1], left: cellW + gap, top: 0 },
    { input: tileBuffers[2], left: 0, top: cellH + gap },
    { input: tileBuffers[3], left: cellW + gap, top: cellH + gap },
  ]

  const outPath = path.join(lifeDir, 'memory-odysseo.jpg')
  await sharp({
    create: {
      width: TARGET_WIDTH,
      height: TARGET_HEIGHT,
      channels: 3,
      background: { r: 245, g: 244, b: 240 },
    },
  })
    .composite(composites)
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toFile(outPath)

  const fs = await import('node:fs/promises')
  for (let i = 1; i <= 4; i++) {
    const from = path.join(lifeDir, `memory-odysseo-${i}.jpg`)
    const to = path.join(sourcesDir, `memory-odysseo-${i}.jpg`)
    try {
      await fs.access(from)
      await rename(from, to)
    } catch {
      /* already archived */
    }
  }
  console.log('Wrote', outPath)
}

async function optimizeJournalJpegs() {
  for (const name of JOURNAL_IMAGES) {
    const filePath = path.join(lifeDir, name)
    const tmp = filePath + '.tmp.jpg'
    let pipeline = sharp(filePath).rotate()
    if (name !== 'memory-odysseo.jpg') {
      pipeline = pipeline.resize(TARGET_WIDTH, TARGET_HEIGHT, {
        fit: 'inside',
        withoutEnlargement: true,
      })
    }
    await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(tmp)
    await rename(tmp, filePath)
    const { size } = await import('node:fs/promises').then((fs) => fs.stat(filePath))
    console.log(name, Math.round(size / 1024), 'KB')
  }
}

await buildOdysseoCollage()
await buildMonChoisyPortrait()
await optimizeJournalJpegs()
