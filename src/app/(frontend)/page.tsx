import Image from 'next/image'
import Link from 'next/link'

import { CountUp, Reveal } from '@/components/Reveal'
import { HeroScene } from '@/components/HeroScene'
import { HomeCtas } from '@/components/HomeCtas'
import { InteractiveChart } from '@/components/TradingViewWidget'
import { Faq } from '@/components/Faq'
import { WhyBento } from '@/components/WhyBento'
import { FeaturedCards, type FeaturedItem } from '@/components/FeaturedCards'
import { StoryTabs, type StoryPoint } from '@/components/StoryTabs'
import { PostCard } from '@/components/PostCard'
import { RichText } from '@/components/RichText'
import { getCollection, getCourses, getHome, getPosts, getSettings } from '@/lib/queries'
import { mediaAlt, mediaUrl } from '@/lib/utils'

export const revalidate = 300

export default async function HomePage() {
  const [home, settings, allCourses, posts, team, highlights] = await Promise.all([
    getHome(), getSettings(), getCourses(), getPosts({ limit: 3 }), getCollection('team'), getCollection('highlights'),
  ])
  const products = home.purchase?.products ?? []
  const featuredItems: FeaturedItem[] = (home.featuredItems ?? []).map((f) => ({ id: f.id ?? f.label, label: f.label, text: f.text, imageUrl: mediaUrl(f.image, 'card'), imageAlt: mediaAlt(f.image, f.text), url: f.url }))
  const storyPoints: StoryPoint[] = (home.story?.points ?? []).map((p) => ({ id: p.id ?? p.title, title: p.title, description: p.description, imageUrl: mediaUrl(p.image, 'hero'), imageAlt: mediaAlt(p.image, p.title) }))
  const storyIntro = home.story?.body?.root?.children?.map((n) => (n as { type?: string; children?: { text?: string }[] })).find((n) => n.type === 'paragraph')?.children?.map((c) => c.text ?? '').join('') || null
  const partners = highlights.filter((h) => h.kind === 'partner')
  const achievements = highlights.filter((h) => h.kind === 'achievement')

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-y-0 right-0 w-full opacity-25 md:w-1/2 md:opacity-100"><HeroScene /></div>
        <div className="container-x relative grid min-h-[400px] content-center py-12">
          <Reveal className="max-w-xl">
            <p className="meta mb-3">{home.heroSubheading || 'Stock, Forex and Crypto'}</p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-navy md:text-6xl">{home.heroTitle}</h1>
            <p className="mt-4 text-lg text-muted">{home.heroTagline}</p>
            <HomeCtas />
          </Reveal>
        </div>
      </section>

      {/* Stats: a ruled row, numbers left-aligned */}
      {!!home.stats?.length && (
        <section className="container-x">
          <div className="grid grid-cols-2 border-y border-line md:grid-cols-4">
            {home.stats.map((s, i) => (
              <Reveal key={s.id} className={`px-1 py-8 md:px-6 ${i ? 'md:border-l md:border-line' : 'md:pl-0'} ${i % 2 ? 'border-l border-line md:border-l' : ''}`}>
                <p className="text-4xl font-bold tracking-tight text-ink md:text-5xl"><CountUp value={s.value} /></p>
                <p className="meta mt-2">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* About: label left, text on a readable measure */}
      {home.aboutBlurb && (
        <section className="section">
          <div className="container-x grid gap-6 md:grid-cols-12">
            <p className="meta md:col-span-3">About us</p>
            <Reveal className="prose-lead md:col-span-8"><RichText data={home.aboutBlurb} /></Reveal>
          </div>
        </section>
      )}

      {/* Market courses */}
      <section className="section" id="courses">
        <div className="container-x">
          <Reveal><h2 className="h2">We offer offline and online trading courses</h2></Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {allCourses.map((c, i) => {
              const img = mediaUrl(c.heroImage, 'card')
              return (
                <Reveal key={c.id} delay={i * 0.1}>
                  <Link href={`/${c.slug}`} className="group block h-full">
                    <div className="photo-flat relative aspect-[4/3]">
                      {img && <Image src={img} alt={mediaAlt(c.heroImage, c.title)} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />}
                    </div>
                    <div className="p-5">
                      <p className="meta capitalize">{c.market}</p>
                      <h3 className="mt-1 text-lg font-semibold group-hover:underline">{c.title}</h3>
                      <p className="mt-2 line-clamp-4 text-sm text-muted">{c.tagline}</p>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why choose */}
      {!!home.whyChoose?.items?.length && <WhyBento data={home.whyChoose} extraImage={Array.isArray(home.story?.images) ? home.story.images[0] : undefined} />}

      {/* Story */}
      {!!storyPoints.length && <StoryTabs heading={home.story?.heading} intro={storyIntro} points={storyPoints} />}
      {!storyPoints.length && home.story?.body && (
        <section className="section bg-soft">
          <div className="container-x grid items-center gap-10 md:grid-cols-2">
            <Reveal><h2 className="h2 mb-3">{home.story.heading}</h2><RichText data={home.story.body} /></Reveal>
            <div className="grid grid-cols-2 gap-4">
              {(home.story.images ?? []).map((im) => mediaUrl(im, 'card') && <Image key={typeof im === 'object' ? im.id : im} src={mediaUrl(im, 'card')!} alt={mediaAlt(im)} width={500} height={500} className="rounded-2xl object-cover" />)}
            </div>
          </div>
        </section>
      )}

      {/* Tiers */}
      {!!home.tiers?.length && (
        <section className="section">
          <div className="container-x">
            <Reveal><h2 className="h2 mb-8">How you progress</h2></Reveal>
            <div className="grid gap-5 md:grid-cols-3">
              {home.tiers.map((t, i) => (
                <Reveal key={t.id} delay={i * 0.12} className="border-t-2 border-ink pt-5">
                  <span className="index">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-2 text-lg font-bold">{t.name}</h3>
                  <p className="mt-1 text-sm text-muted">{t.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Live chart */}
      <section className="section bg-soft">
        <div className="container-x">
          <Reveal><h2 className="h2 mb-2">Try the markets live</h2><p className="mb-6 text-muted">Interactive chart - change symbol, timeframe and indicators.</p></Reveal>
          <div className="card overflow-hidden"><InteractiveChart symbol="BINANCE:BTCUSDT" /></div>
        </div>
      </section>

      {!!featuredItems.length && <FeaturedCards title="Featured on" items={featuredItems} cta={home.featuredCta} />}
      {!featuredItems.length && mediaUrl(home.featuredOn) && (
        <section className="section"><div className="container-x text-center">
          <h2 className="h2 mb-6">Featured on</h2>
          <Image src={mediaUrl(home.featuredOn)!} alt={mediaAlt(home.featuredOn, 'Featured on')} width={1000} height={200} className="mx-auto h-auto max-w-full" />
        </div></section>
      )}

      <Faq items={home.faqs} />

      {/* Buy Now carousel */}
      {!!products.length && (
        <section className="section bg-soft" id="buy">
          <div className="container-x">
            <Reveal>
              <h2 className="h2">{home.purchase?.heading}</h2>
              {home.purchase?.subheading && <p className="mt-2 text-muted">{home.purchase.subheading}</p>}
            </Reveal>
            <div className="mt-8 flex snap-x gap-5 overflow-x-auto pb-4">
              {products.map((c) => {
                const img = mediaUrl(c.image, 'card')
                return (
                  <article key={c.id} className="card w-72 shrink-0 snap-start overflow-hidden">
                    <div className="photo-flat relative aspect-[4/3] rounded-none">
                      {img && <Image src={img} alt={mediaAlt(c.image, c.title)} fill sizes="288px" className="object-cover" />}
                    </div>
                    <div className="grid gap-2 p-4">
                      <h3 className="font-semibold leading-snug">{c.title}</h3>
                      {c.instructor && <p className="text-xs text-muted">Instructor: {c.instructor}</p>}
                      <p className="font-bold text-navy">{c.price} {c.originalPrice && <span className="ml-1 text-sm font-normal text-muted line-through">{c.originalPrice}</span>}</p>
                      <a href={c.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary !py-2">Buy Now</a>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Blogs */}
      {!!posts.docs.length && (
        <section className="section">
          <div className="container-x">
            <div className="ed-head"><h2 className="ed-title">Latest from the blog</h2><Link href="/blog" className="btn-box">All posts</Link></div>
            <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-3">{posts.docs.map((p) => <PostCard key={p.id} post={p} />)}</div>
          </div>
        </section>
      )}

      {/* Achievements: editorial columns under a heavy rule */}
      {!!achievements.length && (
        <section className="section">
          <div className="container-x">
            <div className="ed-head"><h2 className="ed-title">Achievements</h2></div>
            <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-3">
              {achievements.map((a) => (
                <Reveal key={a.id}>
                  <p className="ed-tag">Achievement</p>
                  <h3 className="mt-5 min-h-[3.5rem] text-xl font-medium uppercase leading-snug tracking-tight">{a.title}</h3>
                  <div className="photo-flat relative mt-5 aspect-[16/9]">
                    {mediaUrl(a.image, 'card') && <Image src={mediaUrl(a.image, 'card')!} alt={mediaAlt(a.image, a.title)} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />}
                  </div>
                  {a.description && <p className="mt-3 line-clamp-2 text-sm text-muted">{a.description}</p>}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partners */}
      {!!partners.length && (
        <section className="section bg-soft">
          <div className="container-x">
            <div className="ed-head"><h2 className="ed-title">Our partners</h2></div>
            <div className="mt-10 flex flex-wrap items-center gap-x-12 gap-y-8">
              {partners.map((p) => mediaUrl(p.image, 'thumbnail')
                ? <Image key={p.id} src={mediaUrl(p.image, 'thumbnail')!} alt={mediaAlt(p.image, p.title)} width={140} height={60} className="h-12 w-auto opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0" />
                : <span key={p.id} className="font-semibold text-navy">{p.title}</span>)}
            </div>
          </div>
        </section>
      )}

      {/* Academic team */}
      {!!team.length && (
        <section className="section">
          <div className="container-x">
            <Reveal><h2 className="h2 mb-8">Meet the academic team</h2></Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((t, i) => (
                <Reveal key={t.id} delay={i * 0.08} className="text-left">
                  <div className="photo-flat relative aspect-square">
                    {mediaUrl(t.photo, 'card') && <Image src={mediaUrl(t.photo, 'card')!} alt={mediaAlt(t.photo, t.name)} fill sizes="300px" className="object-cover" />}
                  </div>
                  <div className="pt-3"><h3 className="font-semibold">{t.name}</h3><p className="meta">{t.role}</p>{t.experience && <p className="meta">{t.experience}</p>}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
