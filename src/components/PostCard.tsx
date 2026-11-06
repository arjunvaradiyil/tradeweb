import Image from 'next/image'
import Link from 'next/link'

import type { Post } from '@/payload-types'
import { formatDate, mediaAlt, mediaUrl } from '@/lib/utils'

// Ring-dot category tag, uppercase title, wide image below, date underneath.
export function PostCard({ post }: { post: Post }) {
  const img = mediaUrl(post.coverImage, 'card')
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <p className="ed-tag capitalize">{post.category}</p>
      <h3 className="mt-5 line-clamp-2 min-h-[3.5rem] text-xl font-medium uppercase leading-snug tracking-tight group-hover:underline">{post.title}</h3>
      <div className="photo-flat relative mt-5 aspect-[16/9]">
        {img && <Image src={img} alt={mediaAlt(post.coverImage, post.title)} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />}
      </div>
      <p className="meta mt-3">{formatDate(post.publishedAt)}</p>
    </Link>
  )
}
