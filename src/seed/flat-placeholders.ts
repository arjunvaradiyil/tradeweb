// Replaces the dummy images with flat, neutral placeholders (no gradients, no text).
// Run: pnpm exec tsx src/seed/flat-placeholders.ts
import 'dotenv/config'
import { getPayload } from 'payload'
import sharp from 'sharp'

import config from '../payload.config'

const TONES = ['#e9eef1', '#e4ebe8', '#eceae4', '#e6e9ee']

async function main() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({ collection: 'media', limit: 500, depth: 0, pagination: false })
  let n = 0
  for (const [i, m] of docs.entries()) {
    if (!String(m.alt ?? '').includes('(dummy image)')) continue
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="1200" height="800" fill="${TONES[i % TONES.length]}"/></svg>`
    const data = await sharp(Buffer.from(svg)).webp().toBuffer()
    await payload.update({ collection: 'media', id: m.id, data: {}, file: { data, mimetype: 'image/webp', name: `placeholder-${m.id}.webp`, size: data.length } })
    n++
  }
  console.log(`Replaced ${n} placeholder images.`)
  process.exit(0)
}

main().catch((e) => { console.error(JSON.stringify(e.data?.errors ?? e.message ?? e)); process.exit(1) })
