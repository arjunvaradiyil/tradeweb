import type { Media } from '@/payload-types'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export function mediaUrl(m: unknown, size?: 'thumbnail' | 'card' | 'hero'): string | null {
  if (!m || typeof m !== 'object') return null
  const media = m as Media
  const url = (size && media.sizes?.[size]?.url) || media.url
  if (!url) return null
  // Payload returns absolute URLs when serverURL is set; next/image needs a local path.
  return url.startsWith('http') ? new URL(url).pathname + new URL(url).search : url
}

export function mediaAlt(m: unknown, fallback = ''): string {
  return m && typeof m === 'object' ? ((m as Media).alt ?? fallback) : fallback
}

export const formatDate = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''

export const MARKET_LABEL = { stock: 'Stock Market', forex: 'Forex', crypto: 'Crypto' } as const
