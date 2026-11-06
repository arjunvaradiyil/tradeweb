// Uploads an app screenshot and sets it as the Site settings app mockup (used in the footer).
// Run: pnpm exec tsx src/seed/app-mockup.ts <path-to-image>
import 'dotenv/config'
import path from 'path'
import { getPayload } from 'payload'

import config from '../payload.config'

async function main() {
  const file = process.argv[2]
  if (!file) throw new Error('Pass the image path')
  const payload = await getPayload({ config })
  const m = await payload.create({ collection: 'media', data: { alt: 'Trademax Academy mobile app' }, filePath: path.resolve(file) })
  await payload.updateGlobal({ slug: 'site-settings', data: { appMockup: m.id } })
  console.log('App mockup set.')
  process.exit(0)
}

main().catch((e) => { console.error(JSON.stringify(e.data?.errors ?? e.message ?? e)); process.exit(1) })
