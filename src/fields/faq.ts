import type { Field } from 'payload'

export const faqField: Field = {
  name: 'faqs',
  type: 'array',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea', required: true },
  ],
}
