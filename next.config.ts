import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const nextConfig: NextConfig = {
  turbopack: { root: path.dirname(fileURLToPath(import.meta.url)) },
  images: {
    formats: ['image/webp'],
    localPatterns: [{ pathname: '/api/media/file/**' }],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
