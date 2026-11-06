import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { RichText } from '@/components/RichText'
import { ScriptInjector } from '@/components/ScriptInjector'
import { getPostBySlug } from '@/lib/queries'
import { formatDate, mediaAlt, mediaUrl, SITE_URL } from '@/lib/utils'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug((await params).slug)
  if (!post) return {}
  const img = mediaUrl(post.meta?.image) || mediaUrl(post.coverImage, 'hero')
  return {
    title: post.meta?.title || `${post.title} | Trademax Academy`,
    description: post.meta?.description || post.excerpt || undefined,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: 'article', publishedTime: post.publishedAt ?? undefined, images: img ? [img] : undefined },
  }
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug((await params).slug)
  if (!post) notFound()
  const cover = mediaUrl(post.coverImage, 'hero')
  const author = typeof post.author === 'object' ? (post.author?.name ?? post.author?.email) : null
  const ld = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, description: post.excerpt,
    datePublished: post.publishedAt, dateModified: post.updatedAt, image: cover ? [cover] : undefined,
    author: { '@type': 'Person', name: author ?? 'Trademax Academy' }, mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  }
  return (
    <article className="section">
      <div className="container-x">
        <div className="ed-head">
          <h1 className="ed-title max-w-4xl">{post.title}</h1>
        </div>
        <p className="ed-tag mt-6 capitalize">{post.category}<span className="meta ml-2 normal-case tracking-normal">{formatDate(post.publishedAt)}</span></p>
        {cover && <div className="photo-flat relative mt-8 aspect-[21/9]"><Image src={cover} alt={mediaAlt(post.coverImage, post.title)} fill sizes="(max-width:1200px) 100vw, 1200px" className="object-cover" priority /></div>}
        <div className="mx-auto mt-10 max-w-3xl"><RichText data={post.content} /></div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ScriptInjector head={post.headScripts} body={post.bodyScripts} />
    </article>
  )
}
