// Adds three dummy "Featured on" cards to the Home global.
// Run: pnpm exec tsx src/seed/featured-items.ts
import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'

async function main() {
  const payload = await getPayload({ config })
  const media = await payload.find({ collection: 'media', limit: 3, depth: 0, sort: 'createdAt' })
  if (media.docs.length < 1) throw new Error('No media to reuse')
  const items = [['Press', 'Featured in a leading business daily'], ['Interview', 'Our founder on learning to trade with discipline'], ['Award', 'Recognised among the top trading academies']]
  await payload.updateGlobal({
    slug: 'home',
    data: {
      featuredItems: items.map(([label, text], i) => ({ label, text, image: media.docs[i % media.docs.length].id })),
      featuredCta: { label: 'Read more', url: '/about-us' },
    },
  })
  console.log('Featured items added.')
  process.exit(0)
}

main().catch((e) => { console.error(JSON.stringify(e.data?.errors ?? e.message ?? e)); process.exit(1) })
