import { readFile } from 'fs/promises'
import { join } from 'path'

let geistSans: Buffer | null = null
let manrope: Buffer | null = null

export async function getOgFonts() {
  if (!geistSans || !manrope) {
    geistSans = await readFile(join(process.cwd(), 'app/fonts/GeistVF.woff'))
    manrope = await readFile(join(process.cwd(), 'app/fonts/Manrope-VariableFont_wght.ttf'))
  }

  return { geistSans, manrope }
}
