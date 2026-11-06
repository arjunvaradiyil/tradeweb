import { slugField, type CollectionConfig } from 'payload'

import { publishedOrEditor, isLoggedIn } from '../access'
import { scriptFields } from '../fields/scripts'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: { read: publishedOrEditor, create: isLoggedIn, update: isLoggedIn, delete: isLoggedIn },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'category', '_status', 'publishedAt'] },
  versions: { drafts: true },
  defaultSort: '-publishedAt',
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField({ useAsSlug: 'title' }),
    { name: 'excerpt', type: 'textarea', maxLength: 300 },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText', required: true },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Stock', value: 'stock' },
        { label: 'Forex', value: 'forex' },
        { label: 'Crypto', value: 'crypto' },
        { label: 'General', value: 'general' },
      ],
      defaultValue: 'general',
      admin: { position: 'sidebar' },
    },
    { name: 'author', type: 'relationship', relationTo: 'users', admin: { position: 'sidebar' } },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
      hooks: {
        beforeChange: [({ value, siblingData }) => (siblingData._status === 'published' && !value ? new Date() : value)],
      },
    },
    ...scriptFields,
  ],
}
