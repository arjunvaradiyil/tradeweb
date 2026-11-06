// Adds three dummy "story points" to the Home global so the tabbed story section has content.
// Run: pnpm exec tsx src/seed/story-points.ts
import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'

async function main() {
  const payload = await getPayload({ config })
  const home = await payload.findGlobal({ slug: 'home', depth: 0 })
  const ids = [...(home.story?.images ?? []), home.whyChoose?.image].filter(Boolean) as (number | string)[]
  if (!ids.length) throw new Error('No media on the Home global to reuse')
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  await payload.updateGlobal({
    slug: 'home',
    data: {
      story: {
        ...home.story,
        points: ['Live market charts', 'Structured modules', 'Mentor support'].map((title, i) => ({ title, description: lorem, image: ids[i % ids.length] as number })),
      },
    },
  })
  console.log('Story points added.')
  process.exit(0)
}

main().catch((e) => { console.error(JSON.stringify(e.data?.errors ?? e.message ?? e)); process.exit(1) })
