import type { CollectionConfig } from 'payload'

export const Batches: CollectionConfig = {
  slug: 'batches',
  labels: { singular: 'Batch', plural: 'Upcoming batches' },
  access: { read: () => true },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'market', 'startDate', 'mode'] },
  defaultSort: 'startDate',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'market', type: 'select', required: true, options: ['stock', 'forex', 'crypto'] },
    { name: 'startDate', type: 'date', required: true },
    { name: 'mode', type: 'select', defaultValue: 'online', options: ['online', 'offline', 'hybrid'] },
    { name: 'timing', type: 'text' },
    { name: 'seatsLeft', type: 'number' },
  ],
}
