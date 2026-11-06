import { slugField, type CollectionConfig } from 'payload'

import { publishedOrEditor, isLoggedIn } from '../access'
import { faqField } from '../fields/faq'
import { scriptFields } from '../fields/scripts'

// One structured template for all course landing pages (stock, forex, crypto). Add a course = add a doc.
export const Courses: CollectionConfig = {
  slug: 'courses',
  access: { read: publishedOrEditor, create: isLoggedIn, update: isLoggedIn, delete: isLoggedIn },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'market', 'slug', '_status'] },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'market',
      type: 'select',
      required: true,
      options: [
        { label: 'Stock', value: 'stock' },
        { label: 'Forex', value: 'forex' },
        { label: 'Crypto', value: 'crypto' },
      ],
      admin: { position: 'sidebar', description: 'Drives the live chart, market overview and calculators shown on the page.' },
    },
    slugField({ useAsSlug: 'title' }),
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    { name: 'tagline', type: 'text' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'introduction', type: 'richText' },
    {
      name: 'benefits',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'syllabus',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'topics', type: 'textarea', admin: { description: 'One topic per line.' } },
      ],
    },
    { name: 'syllabusFile', type: 'upload', relationTo: 'media', admin: { description: 'PDF offered in the "Download syllabus" popup.' } },
    {
      name: 'modules',
      label: 'Learning modules',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'duration', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    { name: 'mentors', type: 'relationship', relationTo: 'team', hasMany: true },
    {
      name: 'outcomes',
      label: 'Learning outcomes',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    { ...faqField },
    {
      name: 'chartSymbol',
      type: 'text',
      defaultValue: 'NSE:NIFTY',
      admin: { description: 'TradingView symbol for the interactive chart, e.g. NSE:NIFTY, FX:EURUSD, BINANCE:BTCUSDT' },
    },
    { name: 'price', type: 'text', admin: { position: 'sidebar' } },
    {
      name: 'buyUrl',
      label: 'Buy Now URL (Graphy)',
      type: 'text',
      admin: { position: 'sidebar' },
    },
    ...scriptFields,
  ],
}
