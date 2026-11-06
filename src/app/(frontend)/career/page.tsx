import type { Metadata } from 'next'

import { Faq } from '@/components/Faq'
import { LeadForm } from '@/components/LeadForm'
import { RichText } from '@/components/RichText'
import { ScriptInjector } from '@/components/ScriptInjector'
import { getCollection, getPageBySlug } from '@/lib/queries'

export const revalidate = 300
export const metadata: Metadata = { title: 'Careers | Trademax Academy', description: 'Join the Trademax Academy team.', alternates: { canonical: '/career' } }

export default async function CareerPage() {
  const [page, jobs] = await Promise.all([getPageBySlug('career'), getCollection('careers', { active: { equals: true } })])
  return (
    <>
      <section className="section">
        <div className="container-x">
          <div className="ed-head"><h1 className="ed-title">{page?.heading || 'Careers'}</h1></div>
          {page?.intro && <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted">{page.intro}</p>}

          <div className="mt-12 grid gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <RichText data={page?.content} />
              <div className="ed-head mb-2 mt-14"><h2 className="ed-title !text-3xl">Open positions</h2></div>
              <div>
                {jobs.map((j) => (
                  <details key={j.id} className="group border-b border-line py-5">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                      <span>
                        <span className="ed-tag capitalize">{j.type}</span>
                        <span className="mt-3 block text-xl font-medium uppercase tracking-tight">{j.title}</span>
                        {j.location && <span className="meta mt-1 block">{j.location}</span>}
                      </span>
                      <span className="mt-1 text-2xl leading-none text-ink transition group-open:rotate-45" aria-hidden>+</span>
                    </summary>
                    <div className="mt-4"><RichText data={j.description} /></div>
                  </details>
                ))}
                {!jobs.length && <p className="py-5 text-muted">No open positions right now. Send us your details and we will keep you in mind.</p>}
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="card p-8">
                <h2 className="text-2xl font-medium uppercase tracking-tight">Apply or register interest</h2>
                <div className="mt-5"><LeadForm source="career" withMessage /></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Faq items={page?.faqs} />
      <ScriptInjector head={page?.headScripts} body={page?.bodyScripts} />
    </>
  )
}
