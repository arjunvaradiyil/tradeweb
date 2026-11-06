import { Lightbulb, ShieldCheck, Sparkles, Target, Users } from 'lucide-react'
import Image from 'next/image'

import type { Home } from '@/payload-types'
import { mediaAlt, mediaUrl } from '@/lib/utils'

const ICONS = [Sparkles, Lightbulb, ShieldCheck, Target, Users]

// Bento feature grid: heading and intro on top, one large image card, one light card, one tinted image card, then the rest.
export function WhyBento({ data, extraImage }: { data: NonNullable<Home['whyChoose']>; extraImage?: unknown }) {
  const items = data.items ?? []
  if (!items.length) return null
  const big = mediaUrl(data.image, 'hero')
  const small = mediaUrl(extraImage, 'card') ?? big
  const [a, b, c, ...rest] = items
  const Icon = (i: number) => { const I = ICONS[i % ICONS.length]; return <I size={22} strokeWidth={1.7} /> }

  return (
    <section className="section">
      <div className="container-x">
        <div className="grid items-end gap-6 md:grid-cols-2 md:gap-12">
          <div>
            <p className="pill-label"><i>01</i> Why choose us</p>
            <h2 className="h2 mt-4 max-w-xl">{data.heading}</h2>
          </div>
          {data.intro && <p className="text-lg leading-relaxed text-muted">{data.intro}</p>}
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-[1.3fr_1fr] md:grid-rows-[auto_auto]">
          {a && (
            <article className="bento-dark relative flex min-h-[26rem] flex-col justify-end overflow-hidden p-8 text-white md:row-span-2">
              {big && <Image src={big} alt={mediaAlt(data.image)} fill sizes="(max-width:768px) 100vw, 60vw" className="-z-10 object-cover" />}
              <span className="bento-icon absolute left-8 top-8">{Icon(0)}</span>
              <h3 className="text-2xl font-bold leading-tight">{a.title}</h3>
              <p className="mt-2 max-w-md text-white/85">{a.description}</p>
            </article>
          )}
          {b && (
            <article className="card relative flex min-h-[13rem] flex-col justify-end p-8">
              <span className="bento-icon bento-icon-light absolute left-8 top-8">{Icon(1)}</span>
              <h3 className="mt-14 text-xl font-bold">{b.title}</h3>
              <p className="mt-2 text-sm text-muted">{b.description}</p>
            </article>
          )}
          {c && (
            <article className="bento-dark relative flex min-h-[13rem] flex-col justify-end overflow-hidden p-8 text-white">
              {small && <Image src={small} alt="" fill sizes="(max-width:768px) 100vw, 40vw" className="-z-10 object-cover" />}
              <span className="bento-icon absolute left-8 top-8">{Icon(2)}</span>
              <h3 className="mt-14 text-xl font-bold">{c.title}</h3>
              <p className="mt-2 text-sm text-white/85">{c.description}</p>
            </article>
          )}
        </div>

        {!!rest.length && (
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {rest.map((r, i) => (
              <article key={r.id} className={`card relative p-8 pt-24 ${rest.length % 2 === 1 && i === rest.length - 1 ? 'md:col-span-2' : ''}`}>
                <span className="bento-icon bento-icon-light absolute left-8 top-8">{Icon(i + 3)}</span>
                <h3 className="text-xl font-bold">{r.title}</h3>
                <p className="mt-2 text-sm text-muted">{r.description}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
