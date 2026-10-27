import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const src = readFileSync(path.join(__dirname, '..', 'public', 'favi.svg'), 'utf8')
const match = src.match(/\sd="(M[^"]+)"/)
if (!match) throw new Error('signature path not found')
const d = match[1]

const svg = (fill) =>
  `<svg width="160" height="114" viewBox="0 0 160 114" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${d}" fill="${fill}"/></svg>`

const out = path.join(__dirname, '..', 'public')
writeFileSync(path.join(out, 'favi-light.svg'), svg('#000000'))
writeFileSync(path.join(out, 'favi-dark.svg'), svg('#ffffff'))
writeFileSync(path.join(out, 'favi.svg'), svg('#000000'))
