import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const port = 3010
const base = `http://localhost:${port}`
const outDir = join(process.cwd(), 'og-preview')

const routes = [
  { path: '/opengraph-image', file: 'home.png' },
  { path: '/about/opengraph-image', file: 'about.png' },
  { path: '/posts/opengraph-image', file: 'posts.png' },
  { path: '/posts/cms/opengraph-image', file: 'post-cms.png' },
]

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function waitForServer() {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`${base}/robots.txt`)
      if (res.ok) return
    } catch {
      // server still starting
    }
    await wait(1000)
  }
  throw new Error(`Server did not start on port ${port}`)
}

async function main() {
  await mkdir(outDir, { recursive: true })

  const server = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['next', 'start', '-p', String(port)], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  })

  try {
    await waitForServer()

    for (const route of routes) {
      const res = await fetch(`${base}${route.path}`)
      if (!res.ok) {
        console.warn(`Skipped ${route.path} (${res.status})`)
        continue
      }
      const buffer = Buffer.from(await res.arrayBuffer())
      await writeFile(join(outDir, route.file), buffer)
      console.log(`Wrote og-preview/${route.file}`)
    }

    console.log(`\nPreview files saved to: ${outDir}`)
    console.log('You can also open these URLs in a browser while the server is running:')
    for (const route of routes) {
      console.log(`  ${base}${route.path}`)
    }
  } finally {
    server.kill('SIGTERM')
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
