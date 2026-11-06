import Image from 'next/image'

import type { Course, Team } from '@/payload-types'
import { getCollection, getSettings } from '@/lib/queries'
import { formatDate, mediaAlt, mediaUrl } from '@/lib/utils'

import { Calculators } from './Calculators'
import { CourseCtas } from './CourseCtas'
import { Faq } from './Faq'
import { LeadForm } from './LeadForm'
import { Reveal } from './Reveal'
import { RichText } from './RichText'
import { ScriptInjector } from './ScriptInjector'
import { InteractiveChart, MarketOverview } from './TradingViewWidget'

export async function CourseView({ course }: { course: Course }) {
  const [batches, settings] = await Promise.all([getCollection('batches', { market: { equals: course.market } }), getSettings()])
  const mentors = (course.mentors ?? []).filter((m): m is Team => typeof m === 'object')
  const hero = mediaUrl(course.heroImage, 'hero')
  const buy = course.buyUrl || settings.buyUrl || '#'
  const ld = { '@context': 'https://schema.org', '@type': 'Course', name: course.title, description: course.tagline, provider: { '@type': 'Organization', name: settings.siteName } }

  return (
    <>
      <section className="section pb-0">
        <div className="container-x">
          <div className="ed-head">
            <div>
              <p className="ed-tag mb-5 capitalize">{course.market} course</p>
              <h1 className="ed-title max-w-4xl">{course.title}</h1>
            </div>
          </div>
          {course.tagline && <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted">{course.tagline}</p>}
          <CourseCtas buyUrl={buy} market={course.market} />
          <div className="photo-flat relative mt-12 aspect-[21/9]">
            {hero && <Image src={hero} alt={mediaAlt(course.heroImage, course.title)} fill priority sizes="(max-width:1200px) 100vw, 1200px" className="object-cover" />}
          </div>
        </div>
      </section>

      {course.introduction && <section className="section"><div className="container-x max-w-3xl"><div className="ed-head mb-10"><h2 className="ed-title !text-4xl">Course introduction</h2></div><RichText data={course.introduction} /></div></section>}

      {!!course.benefits?.length && (
        <section className="section bg-soft"><div className="container-x">
          <div className="ed-head mb-10"><h2 className="ed-title !text-4xl">Course benefits</h2></div>
          <div className="grid gap-5 md:grid-cols-3">
            {course.benefits.map((b, i) => <Reveal key={b.id} delay={i * 0.06} className="border-t-2 border-ink pt-5"><span className="index">{String(i + 1).padStart(2, '0')}</span><h3 className="mt-2 font-semibold">{b.title}</h3><p className="mt-1 text-sm text-muted">{b.description}</p></Reveal>)}
          </div>
        </div></section>
      )}

      {!!course.syllabus?.length && (
        <section className="section" id="syllabus"><div className="container-x max-w-3xl">
          <div className="ed-head mb-10"><h2 className="ed-title !text-4xl">Syllabus</h2></div>
          <div className="grid">
            {course.syllabus.map((s, i) => (
              <details key={s.id} className="rule-row group" open={i === 0}>
                <summary className="cursor-pointer font-semibold">{s.title}</summary>
                <ul className="mt-3 list-disc pl-5 text-sm text-muted">{s.topics?.split('\n').filter(Boolean).map((t, j) => <li key={j}>{t}</li>)}</ul>
              </details>
            ))}
          </div>
        </div></section>
      )}

      {!!course.modules?.length && (
        <section className="section bg-soft"><div className="container-x">
          <div className="ed-head mb-10"><h2 className="ed-title !text-4xl">Learning modules</h2></div>
          <ol className="grid gap-x-10 md:grid-cols-2">
            {course.modules.map((m, i) => (
              <Reveal key={m.id} className="rule-row flex gap-4">
                <span className="index text-xl">{String(i + 1).padStart(2, '0')}</span>
                <div><h3 className="font-semibold">{m.title}</h3>{m.duration && <p className="text-xs text-brand">{m.duration}</p>}<p className="mt-1 text-sm text-muted">{m.description}</p></div>
              </Reveal>
            ))}
          </ol>
        </div></section>
      )}

      {!!mentors.length && (
        <section className="section"><div className="container-x">
          <div className="ed-head mb-10"><h2 className="ed-title !text-4xl">Your mentors</h2></div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {mentors.map((m) => (
              <div key={m.id} className="rule-row flex gap-4">
                {mediaUrl(m.photo, 'thumbnail') && <Image src={mediaUrl(m.photo, 'thumbnail')!} alt={mediaAlt(m.photo, m.name)} width={80} height={80} className="size-20 rounded-full object-cover" />}
                <div><h3 className="font-semibold">{m.name}</h3><p className="text-sm text-brand">{m.role}</p><p className="mt-1 text-xs text-muted">{m.bio}</p></div>
              </div>
            ))}
          </div>
        </div></section>
      )}

      <section className="section bg-soft"><div className="container-x">
        <div className="ed-head mb-10"><h2 className="ed-title !text-4xl">Interactive {course.market} chart</h2></div>
        <div className="card overflow-hidden"><InteractiveChart symbol={course.chartSymbol || 'NSE:NIFTY'} /></div>
      </div></section>

      {!!course.outcomes?.length && (
        <section className="section"><div className="container-x max-w-3xl">
          <div className="ed-head mb-10"><h2 className="ed-title !text-4xl">Learning outcomes</h2></div>
          <ul className="grid gap-3">{course.outcomes.map((o) => <li key={o.id} className="flex gap-3"><span className="mt-1 text-brand">✓</span>{o.text}</li>)}</ul>
        </div></section>
      )}

      <Faq items={course.faqs} />

      <section className="section bg-navy" id="enquiry"><div className="container-x grid items-center gap-8 md:grid-cols-2">
        <div className="text-white"><div className="ed-head !border-white"><h2 className="ed-title !text-4xl !text-white">Enquire about this course</h2></div><p className="mt-6 text-white/80">Talk to a counsellor about batches, fees and syllabus.</p></div>
        <div className="rounded-2xl bg-white p-6"><LeadForm source="course-enquiry" interest={course.market} /></div>
      </div></section>

      {!!batches.length && (
        <section className="section bg-soft"><div className="container-x">
          <div className="ed-head mb-10"><h2 className="ed-title !text-4xl">Upcoming batches</h2></div>
          <div className="grid gap-4 md:grid-cols-3">
            {batches.map((b) => (
              <div key={b.id} className="card p-5">
                <h3 className="font-semibold">{b.title}</h3>
                <p className="mt-1 text-sm text-muted">Starts {formatDate(b.startDate)} · {b.mode}{b.timing ? ` · ${b.timing}` : ''}</p>
                {b.seatsLeft != null && <p className="mt-1 text-xs font-medium text-down">{b.seatsLeft} seats left</p>}
              </div>
            ))}
          </div>
        </div></section>
      )}

      <section className="section"><div className="container-x">
        <div className="ed-head mb-10"><h2 className="ed-title !text-4xl">Live {course.market} market overview</h2></div>
        <div className="card overflow-hidden"><MarketOverview market={course.market} /></div>
      </div></section>

      <section className="section bg-soft"><div className="container-x">
        <div className="ed-head mb-10"><h2 className="ed-title !text-4xl">{course.market === 'stock' ? 'Stock' : course.market === 'forex' ? 'Forex' : 'Crypto'} calculators &amp; learning resources</h2></div>
        <Calculators market={course.market} />
      </div></section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ScriptInjector head={course.headScripts} body={course.bodyScripts} />
    </>
  )
}
