import { cache } from 'react'
import { draftMode } from 'next/headers'
import type { Where } from 'payload'

import { getPayloadClient } from './payload'

// draft: true so editors previewing in the admin see unpublished changes; public visitors never do.
async function isDraft() {
  try {
    return (await draftMode()).isEnabled
  } catch {
    return false
  }
}

export const getSettings = cache(async () => (await getPayloadClient()).findGlobal({ slug: 'site-settings', depth: 1 }))
export const getHome = cache(async () => (await getPayloadClient()).findGlobal({ slug: 'home', depth: 2 }))

export const getCourses = cache(async () => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'courses', sort: 'order', limit: 20, depth: 1, pagination: false })
  return docs
})

export const getCourseBySlug = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const draft = await isDraft()
  const { docs } = await payload.find({
    collection: 'courses',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    draft,
    overrideAccess: draft,
  })
  return docs[0] ?? null
})

export const getPageBySlug = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const draft = await isDraft()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    draft,
    overrideAccess: draft,
  })
  return docs[0] ?? null
})

export const getPosts = cache(async (opts: { limit?: number; page?: number; category?: string } = {}) => {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'posts',
    where: opts.category ? { category: { equals: opts.category } } : undefined,
    sort: '-publishedAt',
    limit: opts.limit ?? 9,
    page: opts.page ?? 1,
    depth: 1,
  })
})

export const getPostBySlug = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const draft = await isDraft()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    draft,
    overrideAccess: draft,
  })
  return docs[0] ?? null
})

export async function getCollection<C extends 'team' | 'highlights' | 'reviews' | 'batches' | 'careers'>(collection: C, where?: Where) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection, where, limit: 50, depth: 1, pagination: false })
  return docs
}
