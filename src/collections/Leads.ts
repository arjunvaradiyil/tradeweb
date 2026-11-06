import type { CollectionConfig } from 'payload'

import { isLoggedIn } from '../access'

// Quick Contact, course enquiries, syllabus downloads, career applications, contact page.
export const Leads: CollectionConfig = {
  slug: 'leads',
  access: { create: () => true, read: isLoggedIn, update: isLoggedIn, delete: isLoggedIn },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'phone', 'source', 'interest', 'createdAt'] },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'phone', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'interest', type: 'select', options: ['stock', 'forex', 'crypto', 'other'] },
    { name: 'message', type: 'textarea' },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'contact',
      options: ['quick-contact', 'contact', 'course-enquiry', 'syllabus-download', 'career'],
    },
    { name: 'pageUrl', type: 'text' },
  ],
}
