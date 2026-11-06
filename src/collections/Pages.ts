import { slugField, type CollectionConfig } from 'payload'

import { publishedOrEditor, isLoggedIn } from '../access'
import { faqField } from '../fields/faq'
import { scriptFields } from '../fields/scripts'

// Generic editable pages: about-us, career, terms-and-condition, privacy-policy, and any new page.
export const Pages: CollectionConfig = {
  slug: 'pages',
  access: { read: publishedOrEditor, create: isLoggedIn, update: isLoggedIn, delete: isLoggedIn },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', '_status', 'updatedAt'] },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField({ useAsSlug: 'title' }),
    { name: 'heading', type: 'text', admin: { description: 'On-page H1. Falls back to title.' } },
    { name: 'intro', type: 'textarea' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText' },
    { ...faqField },
    ...scriptFields,
  ],
}
