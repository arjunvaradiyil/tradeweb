import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Batches } from './collections/Batches'
import { Careers } from './collections/Careers'
import { Courses } from './collections/Courses'
import { Highlights } from './collections/Highlights'
import { Leads } from './collections/Leads'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Reviews } from './collections/Reviews'
import { Team } from './collections/Team'
import { Users } from './collections/Users'
import { Home } from './globals/Home'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: 'light',
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' - Trademax CMS', icons: [{ rel: 'icon', url: '/trademax-logo.png' }] },
    components: {
      graphics: {
        Logo: '/components/admin/AdminLogo#AdminLogo',
        Icon: '/components/admin/AdminIcon#AdminIcon',
      },
    },
  },
  collections: [Pages, Courses, Posts, Batches, Team, Highlights, Reviews, Careers, Leads, Media, Users],
  globals: [Home, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.NEXT_PUBLIC_SITE_URL,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URL || 'file:./tradmax.db' },
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ['pages', 'courses', 'posts'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc?.title} | Trademax Academy`,
      generateDescription: ({ doc }) => doc?.excerpt || doc?.tagline || doc?.intro || '',
      generateURL: ({ doc }) => `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/${doc?.slug ?? ''}`,
    }),
  ],
})
