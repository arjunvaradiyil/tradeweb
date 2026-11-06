import type { CollectionConfig } from 'payload'

export const Careers: CollectionConfig = {
  slug: 'careers',
  labels: { singular: 'Job opening', plural: 'Job openings' },
  access: { read: () => true },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'location', 'active'] },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'location', type: 'text' },
    { name: 'type', type: 'select', defaultValue: 'full-time', options: ['full-time', 'part-time', 'internship'] },
    { name: 'description', type: 'richText' },
    { name: 'active', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
  ],
}
