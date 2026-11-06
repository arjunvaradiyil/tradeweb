import type { CollectionConfig } from 'payload'

// Partners and achievements shown on the home page.
export const Highlights: CollectionConfig = {
  slug: 'highlights',
  labels: { singular: 'Partner / achievement', plural: 'Partners & achievements' },
  access: { read: () => true },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'kind', 'order'] },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'kind',
      type: 'select',
      required: true,
      options: [
        { label: 'Partner', value: 'partner' },
        { label: 'Achievement', value: 'achievement' },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Logo or award photo.' } },
    { name: 'description', type: 'text' },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
