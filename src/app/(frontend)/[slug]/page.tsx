import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { CourseView } from '@/components/CourseView'
import { Faq } from '@/components/Faq'
import { RichText } from '@/components/RichText'
import { ScriptInjector } from '@/components/ScriptInjector'
import { getCourseBySlug, getPageBySlug } from '@/lib/queries'
import { mediaAlt, mediaUrl } from '@/lib/utils'

export const revalidate = 300
type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = (await getCourseBySlug(slug)) ?? (await getPageBySlug(slug))
  if (!doc) return {}
  const m = doc.meta
  const img = mediaUrl(m?.image)
  return {
    title: m?.title || `${doc.title} | Trademax Academy`,
    description: m?.description || undefined,
    alternates: { canonical: `/${slug}` },
    openGraph: img ? { images: [img] } : undefined,
  }
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params
  const course = await getCourseBySlug(slug)
  if (course) return <CourseView course={course} />

  const page = await getPageBySlug(slug)
  if (!page) notFound()
  const hero = mediaUrl(page.heroImage, 'hero')
  return (
    <>
      <section className="section">
        <div className="container-x">
          <div className="ed-head">
            <h1 className="ed-title max-w-4xl">{page.heading || page.title}</h1>
          </div>
          {page.intro && <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted">{page.intro}</p>}
          {hero && (
            <div className="photo-flat relative mt-12 aspect-[21/9]">
              <Image src={hero} alt={mediaAlt(page.heroImage, page.title)} fill sizes="(max-width:1200px) 100vw, 1200px" className="object-cover" priority />
            </div>
          )}
          <div className="split-prose mt-20"><RichText data={page.content} /></div>
        </div>
      </section>
      <Faq items={page.faqs} />
      <ScriptInjector head={page.headScripts} body={page.bodyScripts} />
    </>
  )
}
