import type { CollectionConfig } from 'payload'

export const Team: CollectionConfig = {
  slug: 'team',
  labels: { singular: 'Team member', plural: 'Academic team' },
  access: { read: () => true },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'role', 'order'] },
  defaultSort: 'order',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text', required: true },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'bio', type: 'textarea' },
    { name: 'experience', type: 'text', admin: { description: 'e.g. 10+ years in equity markets' } },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
