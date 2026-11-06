import type { MetadataRoute } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { SITE_URL } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient()
  const find = (collection: 'pages' | 'courses' | 'posts') => payload.find({ collection, limit: 500, pagination: false, depth: 0, select: { slug: true, updatedAt: true } })
  const [pages, courses, posts] = await Promise.all([find('pages'), find('courses'), find('posts')])
  const fixed = ['', '/blog', '/contact-us', '/financial-calculators', '/career'].map((p) => ({ url: `${SITE_URL}${p}` }))
  return [
    ...fixed,
    ...pages.docs.map((d) => ({ url: `${SITE_URL}/${d.slug}`, lastModified: d.updatedAt })),
    ...courses.docs.map((d) => ({ url: `${SITE_URL}/${d.slug}`, lastModified: d.updatedAt })),
    ...posts.docs.map((d) => ({ url: `${SITE_URL}/blog/${d.slug}`, lastModified: d.updatedAt })),
  ]
}
