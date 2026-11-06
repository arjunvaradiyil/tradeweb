import type { Field } from 'payload'

// Per-page tracking codes (GA4, GTM, Search Console, pixels). Raw HTML, injected client-side.
export const scriptFields: Field[] = [
  {
    type: 'collapsible',
    label: 'Tracking codes (this page only)',
    admin: { initCollapsed: true },
    fields: [
      {
        name: 'headScripts',
        type: 'textarea',
        label: 'Code for <head>',
        admin: { description: 'Paste full snippets incl. <script> tags. Added on top of the sitewide codes.' },
      },
      {
        name: 'bodyScripts',
        type: 'textarea',
        label: 'Code for <body>',
        admin: { description: 'e.g. GTM noscript fallback or chat widgets.' },
      },
    ],
  },
]
