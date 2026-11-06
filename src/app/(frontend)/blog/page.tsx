import type { Metadata } from 'next'
import Link from 'next/link'

import { PostCard } from '@/components/PostCard'
import { getPosts } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Trading & Market Blog | Trademax Academy',
  description: 'Stock market, forex and crypto trading insights, guides and market analysis from Trademax Academy.',
  alternates: { canonical: '/blog' },
}

type Props = { searchParams: Promise<{ page?: string; category?: string }> }

export default async function BlogIndex({ searchParams }: Props) {
  const { page = '1', category } = await searchParams
  const res = await getPosts({ page: Number(page) || 1, category, limit: 9 })
  const cats = ['stock', 'forex', 'crypto', 'general']
  return (
    <section className="section">
      <div className="container-x">
        <div className="ed-head flex-wrap">
          <h1 className="ed-title">Blog</h1>
          <div className="flex flex-wrap gap-2">
            <Link href="/blog" className="btn-box" aria-current={!category}>All</Link>
            {cats.map((c) => <Link key={c} href={`/blog?category=${c}`} className="btn-box" aria-current={category === c}>{c}</Link>)}
          </div>
        </div>
        <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-3">{res.docs.map((p) => <PostCard key={p.id} post={p} />)}</div>
        {!res.docs.length && <p className="mt-8 text-muted">No posts yet.</p>}
        {res.totalPages > 1 && (
          <div className="mt-10 flex justify-center gap-3">
            {res.hasPrevPage && <Link className="btn-box" href={`/blog?page=${res.page! - 1}${category ? `&category=${category}` : ''}`}>← Newer</Link>}
            {res.hasNextPage && <Link className="btn-box" href={`/blog?page=${res.page! + 1}${category ? `&category=${category}` : ''}`}>Older →</Link>}
          </div>
        )}
      </div>
    </section>
  )
}
