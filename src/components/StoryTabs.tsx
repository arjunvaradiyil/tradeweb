'use client'

import Image from 'next/image'
import { useState } from 'react'

export type StoryPoint = { id: string; title: string; description: string; imageUrl: string | null; imageAlt: string }

// Heading and intro on the left, a selectable list of points, and the matching picture on the right.
export function StoryTabs({ heading, intro, points }: { heading?: string | null; intro?: string | null; points: StoryPoint[] }) {
  const [active, setActive] = useState(0)
  const current = points[active]

  return (
    <section className="section">
      <div className="container-x grid items-center gap-10 md:grid-cols-[1fr_1.25fr] lg:gap-16">
        <div>
          {heading && <h2 className="text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-navy md:text-5xl">{heading}</h2>}
          {intro && <p className="mt-4 max-w-lg text-lg text-muted">{intro}</p>}

          <div className="mt-8 grid gap-2" role="tablist" aria-label={heading ?? 'Highlights'}>
            {points.map((p, i) => {
              const on = i === active
              return (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`border-l-4 px-6 py-5 text-left transition ${on ? 'border-brand bg-brand/[.07] shadow-[0_18px_40px_-28px_rgba(11,42,74,.5)]' : 'border-transparent hover:bg-soft'}`}
                >
                  <span className="block text-xl font-semibold text-navy">{p.title}</span>
                  <span className={`mt-1 block leading-relaxed text-muted ${on ? '' : 'line-clamp-2'}`}>{p.description}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-soft" role="tabpanel">
          {points.map((p, i) =>
            p.imageUrl ? (
              <Image
                key={p.id}
                src={p.imageUrl}
                alt={p.imageAlt}
                fill
                sizes="(max-width:768px) 100vw, 55vw"
                className={`object-contain transition-opacity duration-300 ${i === active ? 'opacity-100' : 'opacity-0'}`}
                aria-hidden={i !== active}
                priority={i === 0}
              />
            ) : null,
          )}
          <span className="sr-only">{current?.title}</span>
        </div>
      </div>
    </section>
  )
}
