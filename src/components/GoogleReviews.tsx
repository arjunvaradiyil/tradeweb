import { Star } from 'lucide-react'

import type { SiteSetting } from '@/payload-types'
import { getCollection } from '@/lib/queries'

type Review = { author: string; rating: number; text: string }

// Google Places API (New). Cached 24h => automatic daily refresh. Falls back to CMS reviews + manual rating.
async function fetchGoogle(): Promise<{ rating: number; total: number; reviews: Review[] } | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY
  const id = process.env.GOOGLE_PLACE_ID
  if (!key || !id) return null
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${id}`, {
      headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'rating,userRatingCount,reviews' },
      next: { revalidate: 86400 },
    })
    if (!res.ok) return null
    const j = await res.json()
    return {
      rating: j.rating,
      total: j.userRatingCount,
      reviews: (j.reviews ?? []).map((r: { authorAttribution?: { displayName?: string }; rating: number; text?: { text?: string } }) => ({
        author: r.authorAttribution?.displayName ?? 'Google user',
        rating: r.rating,
        text: r.text?.text ?? '',
      })),
    }
  } catch {
    return null
  }
}

export const Stars = ({ n }: { n: number }) => (
  <span className="inline-flex" aria-label={`${n} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={16} className={i <= Math.round(n) ? 'fill-amber-400 text-amber-400' : 'text-line'} />)}
  </span>
)

export async function GoogleReviews({ settings }: { settings: SiteSetting }) {
  const g = await fetchGoogle()
  const manual = await getCollection('reviews')
  const reviews: Review[] = g?.reviews.length ? g.reviews : manual.map((r) => ({ author: r.author, rating: r.rating, text: r.text }))
  const rating = g?.rating ?? settings.googleRating
  const total = g?.total ?? settings.googleReviewCount
  if (!reviews.length && !rating) return null

  return (
    <section className="section" aria-labelledby="reviews-h">
      <div className="container-x">
        <div className="ed-head flex-wrap">
          <h3 id="reviews-h" className="ed-title">What our students say</h3>
          {rating ? (
            <a href={settings.googleReviewsUrl ?? '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
              <b className="text-4xl font-medium">{rating.toFixed(1)}</b><Stars n={rating} />
              {total ? <span className="text-sm text-muted">{total} Google reviews</span> : null}
            </a>
          ) : null}
        </div>
        <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-3">
          {reviews.slice(0, 3).map((r, i) => (
            <figure key={i}>
              <figcaption className="ed-tag font-medium">{r.author}</figcaption>
              <div className="mt-4"><Stars n={r.rating} /></div>
              <blockquote className="mt-4 line-clamp-6 text-[1.0625rem] leading-relaxed">{r.text}</blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
