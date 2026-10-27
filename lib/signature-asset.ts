import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export async function getSignatureMarkDataUrl() {
  const file = await readFile(join(process.cwd(), 'public', 'signature-mark.png'))
  return `data:image/png;base64,${file.toString('base64')}`
}
