import type { CollectionConfig } from 'payload'

// Manually added reviews. Shown alongside / instead of Google reviews if the Places API is not configured.
export const Reviews: CollectionConfig = {
  slug: 'reviews',
  access: { read: () => true },
  admin: { useAsTitle: 'author', defaultColumns: ['author', 'rating', 'source'] },
  fields: [
    { name: 'author', type: 'text', required: true },
    { name: 'rating', type: 'number', min: 1, max: 5, defaultValue: 5, required: true },
    { name: 'text', type: 'textarea', required: true },
    { name: 'source', type: 'select', defaultValue: 'manual', options: ['manual', 'google'] },
  ],
}
