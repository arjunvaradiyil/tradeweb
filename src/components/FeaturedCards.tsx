import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export type FeaturedItem = { id: string; label: string; text: string; imageUrl: string | null; imageAlt: string; url?: string | null }

// Image on top, a green tag with a leading rule, a short caption. On hover the card turns into a dark panel with an arrow badge.
export function FeaturedCards({ title, items, cta }: { title?: string; items: FeaturedItem[]; cta?: { label?: string | null; url?: string | null } | null }) {
  return (
    <section className="section">
      <div className="container-x">
        {title && <h2 className="h2 mb-10 text-center">{title}</h2>}
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((it) => {
            const body = (
              <>
                <div className="relative aspect-[4/3] overflow-hidden rounded bg-soft">
                  {it.imageUrl && <Image src={it.imageUrl} alt={it.imageAlt} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />}
                </div>
                <p className="mt-4 flex items-center gap-3 text-sm font-bold uppercase tracking-wide text-brand">
                  <span className="h-0.5 w-8 bg-brand" />{it.label}
                </p>
                <p className="mt-2 text-lg font-medium leading-snug text-ink">{it.text}</p>

                <div aria-hidden className="pointer-events-none absolute inset-0 flex flex-col justify-end rounded bg-navy p-6 text-white opacity-0 shadow-[0_28px_50px_-28px_rgba(11,42,74,.7)] transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {it.imageUrl && <Image src={it.imageUrl} alt="" fill sizes="33vw" className="-z-0 rounded object-cover opacity-30" />}
                  <span className="absolute right-0 top-0 grid h-10 w-10 place-items-center rounded-tr bg-brand text-white"><ArrowUpRight size={20} /></span>
                  <p className="relative flex items-center gap-3 text-sm font-bold uppercase tracking-wide text-[#7ee8b8]"><span className="h-0.5 w-8 bg-[#7ee8b8]" />{it.label}</p>
                  <p className="relative mt-2 text-lg font-medium leading-snug">{it.text}</p>
                </div>
              </>
            )
            const cls = 'group relative block rounded outline-offset-4 transition duration-300 hover:-translate-y-1'
            return it.url
              ? <Link key={it.id} href={it.url} className={cls} target={it.url.startsWith('http') ? '_blank' : undefined} rel={it.url.startsWith('http') ? 'noopener noreferrer' : undefined}>{body}</Link>
              : <article key={it.id} tabIndex={0} className={cls}>{body}</article>
          })}
        </div>
        {cta?.label && cta.url && (
          <div className="mt-12 text-center">
            <Link href={cta.url} className="inline-block border-2 border-ink px-8 py-3 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-ink hover:text-white">{cta.label}</Link>
          </div>
        )}
      </div>
    </section>
  )
}
