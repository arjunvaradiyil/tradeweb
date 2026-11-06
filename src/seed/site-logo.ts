// Uploads the Trademax mark (public/trademax-logo.png) and sets it as the Site settings logo.
// Run: pnpm exec tsx src/seed/site-logo.ts
import 'dotenv/config'
import path from 'path'
import { getPayload } from 'payload'

import config from '../payload.config'

async function main() {
  const payload = await getPayload({ config })
  const m = await payload.create({ collection: 'media', data: { alt: 'Trademax Academy logo' }, filePath: path.resolve('public/trademax-logo.png') })
  await payload.updateGlobal({ slug: 'site-settings', data: { logo: m.id } })
  console.log('Logo set.')
  process.exit(0)
}

main().catch((e) => { console.error(JSON.stringify(e.data?.errors ?? e.message ?? e)); process.exit(1) })
