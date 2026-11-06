import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand & NAP',
          fields: [
            { name: 'siteName', type: 'text', defaultValue: 'Trademax Academy' },
            { name: 'logo', type: 'upload', relationTo: 'media' },
            { name: 'description', type: 'textarea', admin: { description: 'Short description shown in the footer.' } },
            { name: 'address', type: 'textarea' },
            { name: 'phone', type: 'text' },
            { name: 'whatsapp', type: 'text', admin: { description: 'Digits with country code, e.g. 919876543210' } },
            { name: 'email', type: 'email' },
            { name: 'mapUrl', type: 'text' },
          ],
        },
        {
          label: 'Social & links',
          fields: [
            {
              name: 'social',
              type: 'array',
              fields: [
                { name: 'platform', type: 'select', required: true, options: ['facebook', 'instagram', 'youtube', 'x', 'linkedin', 'telegram', 'whatsapp'] },
                { name: 'url', type: 'text', required: true },
              ],
            },
            {
              name: 'buyUrl',
              label: 'Default Buy Now URL (Graphy)',
              type: 'text',
              defaultValue: 'https://www.trademaxacademy.com/s/store/courses/Crash%20course',
            },
            { name: 'appUrl', label: 'Mobile app download URL (encoded in the QR)', type: 'text' },
            { name: 'playStoreUrl', type: 'text' },
            { name: 'appStoreUrl', type: 'text' },
            { name: 'appMockup', label: 'App mockup image', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Legal & risk',
          fields: [
            {
              name: 'riskWarning',
              type: 'textarea',
              defaultValue:
                'Trading in stocks, forex and crypto involves substantial risk of loss and is not suitable for every investor. Past performance is not indicative of future results. Trademax Academy provides education only and does not offer investment advice.',
            },
            { name: 'disclosure', type: 'textarea' },
          ],
        },
        {
          label: 'Tracking codes',
          fields: [
            {
              name: 'headScripts',
              type: 'textarea',
              label: 'Sitewide code for <head>',
              admin: { description: 'GA4, GTM, Search Console verification meta tag, Meta pixel. Paste full snippets.' },
            },
            { name: 'bodyScripts', type: 'textarea', label: 'Sitewide code for <body>', admin: { description: 'e.g. GTM <noscript> block.' } },
          ],
        },
        {
          label: 'Google reviews',
          fields: [
            { name: 'googleRating', type: 'number', min: 0, max: 5, admin: { description: 'Fallback rating when the Places API is not configured.' } },
            { name: 'googleReviewCount', type: 'number' },
            { name: 'googleReviewsUrl', type: 'text', admin: { description: 'Link to your Google reviews page.' } },
          ],
        },
      ],
    },
  ],
}
