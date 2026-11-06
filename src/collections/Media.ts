import type { CollectionConfig } from 'payload'

// Drag-and-drop upload is built into the Payload admin. Every raster upload is converted to .webp.
export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  admin: { useAsTitle: 'filename', description: 'Drag and drop images here. Alt text is required for SEO and accessibility.' },
  fields: [{ name: 'alt', type: 'text', required: true, label: 'Alt text' }],
  upload: {
    mimeTypes: ['image/*', 'application/pdf'],
    formatOptions: { format: 'webp', options: { quality: 82 } },
    imageSizes: [
      { name: 'thumbnail', width: 400, formatOptions: { format: 'webp' } },
      { name: 'card', width: 800, formatOptions: { format: 'webp' } },
      { name: 'hero', width: 1600, formatOptions: { format: 'webp' } },
    ],
    adminThumbnail: 'thumbnail',
  },
}
