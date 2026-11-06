import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home page',
  access: { read: () => true },
  fields: [
    { name: 'heroTitle', type: 'text', defaultValue: 'Best Trading Academy In Keralam' },
    { name: 'heroTagline', type: 'textarea', defaultValue: 'Learn stock, forex and crypto trading from market practitioners. Live mentoring, real charts, structured syllabus.' },
    {
      name: 'stats',
      type: 'array',
      fields: [
        { name: 'value', type: 'text', required: true, admin: { description: 'e.g. 5000+' } },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'purchase',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Start learning today' },
        { name: 'subheading', type: 'text' },
        {
          name: 'products',
          label: 'Buy Now carousel',
          type: 'array',
          admin: { description: 'Paid courses sold on Graphy. Each card links to its Buy URL.' },
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'instructor', type: 'text' },
            { name: 'price', type: 'text', admin: { description: 'e.g. ₹999' } },
            { name: 'originalPrice', type: 'text' },
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'url', label: 'Buy Now URL', type: 'text', required: true },
          ],
        },
      ],
    },
    { name: 'heroSubheading', type: 'text' },
    { name: 'aboutBlurb', type: 'richText' },
    {
      name: 'whyChoose',
      label: 'Why choose us',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'intro', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
          ],
        },
      ],
    },
    {
      name: 'story',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'body', type: 'richText' },
        { name: 'images', type: 'upload', relationTo: 'media', hasMany: true },
        {
          name: 'points',
          type: 'array',
          labels: { singular: 'Point', plural: 'Points' },
          admin: { description: 'Tabbed highlights beside a large picture. When set, they replace the story text and images on the home page.' },
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
            { name: 'image', type: 'upload', relationTo: 'media', required: true, admin: { description: 'Shown on the right while this point is selected.' } },
          ],
        },
      ],
    },
    {
      name: 'featuredItems',
      type: 'array',
      labels: { singular: 'Featured item', plural: 'Featured items' },
      admin: { description: 'Cards for the "Featured on" section (press, awards, media). When set, they replace the single banner image below.' },
      fields: [
        { name: 'label', type: 'text', required: true, admin: { description: 'Short tag, e.g. Press, Award, Interview.' } },
        { name: 'text', type: 'text', required: true },
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'url', type: 'text', admin: { description: 'Optional link to the article or page.' } },
      ],
    },
    { name: 'featuredCta', type: 'group', fields: [{ name: 'label', type: 'text' }, { name: 'url', type: 'text' }], admin: { description: 'Optional button under the cards.' } },
    { name: 'featuredOn', type: 'upload', relationTo: 'media', admin: { description: 'Press / "Featured on" banner image.' } },
    { name: 'faqs', type: 'array', labels: { singular: 'FAQ', plural: 'FAQs' }, fields: [{ name: 'question', type: 'text', required: true }, { name: 'answer', type: 'textarea', required: true }] },
    {
      name: 'tiers',
      type: 'array',
      admin: { description: 'Learning tiers revealed on scroll.' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}
