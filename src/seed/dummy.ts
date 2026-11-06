// Dummy content for development. Everything here is placeholder text, not real client content.
// Run on an empty DB: pnpm seed (then create the first admin at /admin)
import 'dotenv/config'
import { getPayload } from 'payload'
import sharp from 'sharp'

import config from '../payload.config'

type N = { type: string; version: number; [k: string]: unknown }
const text = (t: string): N => ({ type: 'text', text: t, version: 1, format: 0, mode: 'normal', style: '', detail: 0 })
const node = (type: string, extra: object, children: N[]): N => ({ type, version: 1, format: '', indent: 0, direction: 'ltr' as const, children, ...extra })
const para = (t: string) => node('paragraph', {}, [text(t)])
const heading = (t: string) => node('heading', { tag: 'h2' }, [text(t)])
const lexical = (children: N[]) => ({ root: { type: 'root', version: 1, format: '' as const, indent: 0, direction: 'ltr' as const, children } })

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
const body = (title: string) => lexical([para(LOREM), heading(`Key ideas: ${title}`), para(LOREM), para(LOREM)])

// Placeholder webp in brand colours so cards and heroes have something to show.
const placeholder = async (label: string, from: string, to: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="1200" height="800" fill="url(#g)"/><text x="600" y="420" font-family="Arial" font-size="56" font-weight="700" fill="#fff" text-anchor="middle">${label}</text></svg>`
  const data = await sharp(Buffer.from(svg)).webp().toBuffer()
  return { data, mimetype: 'image/webp', name: `${label.toLowerCase().replace(/\W+/g, '-')}.webp`, size: data.length }
}

async function main() {
  const payload = await getPayload({ config })
  const img = async (label: string, from = '#0b2a4a', to = '#0a8f5b') =>
    (await payload.create({ collection: 'media', data: { alt: `${label} (dummy image)` }, file: await placeholder(label, from, to) })).id

  const team = await Promise.all([
    ['Dummy Mentor One', 'Founder & Lead Mentor', '10+ years in equity markets'],
    ['Dummy Mentor Two', 'Forex Mentor', '7+ years in currency markets'],
    ['Dummy Mentor Three', 'Crypto Mentor', '5+ years in digital assets'],
    ['Dummy Mentor Four', 'Technical Analyst', '6+ years in chart analysis'],
  ].map(async ([name, role, experience], order) =>
    payload.create({ collection: 'team', data: { name, role, experience, order, bio: LOREM, photo: await img(name, '#0a8f5b', '#0b2a4a') } })))

  const faqs = [1, 2, 3, 4].map((i) => ({ question: `Sample question ${i}?`, answer: LOREM }))
  const benefits = [1, 2, 3].map((i) => ({ title: `Sample benefit ${i}`, description: LOREM }))
  const markets = [
    ['Stock Market Trading Institute', 'stock-market-trading-institute', 'stock', 'BSE:SENSEX'],
    ['Forex Trading Course', 'forex-trading-course', 'forex', 'FX:EURUSD'],
    ['Crypto Trading Course', 'crypto-trading-course', 'crypto', 'BINANCE:BTCUSDT'],
  ] as const
  for (const [i, [title, slug, market, chartSymbol]] of markets.entries()) {
    await payload.create({
      collection: 'courses',
      data: {
        title, slug, market, chartSymbol, order: i, _status: 'published', price: '₹9,999',
        buyUrl: 'https://example.com/buy',
        tagline: LOREM, heroImage: await img(title), introduction: body(title),
        benefits, faqs, mentors: team.map((t) => t.id),
        syllabus: [1, 2, 3].map((n) => ({ title: `Module group ${n}`, topics: 'Topic A\nTopic B\nTopic C' })),
        modules: [1, 2, 3, 4].map((n) => ({ title: `Module ${n}`, duration: `${n} week${n > 1 ? 's' : ''}`, description: LOREM })),
        outcomes: ['Read charts with confidence', 'Manage risk', 'Build a trading plan'].map((text) => ({ text })),
      } as never,
    })
  }

  const cats = ['stock', 'forex', 'crypto', 'general'] as const
  for (let i = 1; i <= 9; i++) {
    const title = `Dummy blog post ${i}`
    await payload.create({
      collection: 'posts',
      data: {
        title, slug: `dummy-blog-post-${i}`, _status: 'published', category: cats[i % 4],
        publishedAt: new Date(Date.now() - i * 86400000 * 3).toISOString(),
        excerpt: LOREM.slice(0, 200), coverImage: await img(title, '#07653f', '#0b2a4a'), content: body(title) as never,
      } as never,
    })
  }

  const page = (title: string, slug: string, extra: object = {}) =>
    payload.create({ collection: 'pages', data: { title, slug, heading: title, content: body(title) as never, _status: 'published', ...extra } as never })
  await page('About Us', 'about-us', { heroImage: await img('About Us') })
  await page('Career', 'career')
  await page('Terms and Conditions', 'terms-and-condition')
  await page('Privacy Policy', 'privacy-policy')

  await payload.create({ collection: 'highlights', data: { title: 'Dummy Award', kind: 'achievement', order: 0, description: LOREM.slice(0, 120), image: await img('Dummy Award') } })
  for (const [i, n] of ['Partner A', 'Partner B', 'Partner C', 'Partner D'].entries())
    await payload.create({ collection: 'highlights', data: { title: n, kind: 'partner', order: i, image: await img(n, '#5b6b7b', '#0b2a4a') } })

  for (const [i, n] of ['Asha', 'Rahul', 'Meera', 'Vishnu'].entries())
    await payload.create({ collection: 'reviews', data: { author: `${n} (dummy)`, rating: i === 3 ? 4 : 5, text: LOREM.slice(0, 160), source: 'manual' } })

  for (const [i, [title, market]] of ([['Stock Weekend Batch', 'stock'], ['Forex Evening Batch', 'forex'], ['Crypto Online Batch', 'crypto']] as const).entries())
    await payload.create({ collection: 'batches', data: { title, market, startDate: new Date(Date.now() + (i + 1) * 7 * 86400000).toISOString(), mode: ['offline', 'online', 'hybrid'][i], timing: '7:00 PM - 9:00 PM', seatsLeft: 10 + i } as never })

  for (const [t, type] of [['Sales Executive', 'full-time'], ['Trading Mentor', 'full-time'], ['Content Intern', 'internship']] as const)
    await payload.create({ collection: 'careers', data: { title: t, type, location: 'Kochi, Kerala', description: body(t) as never, active: true } as never })

  await payload.updateGlobal({
    slug: 'home',
    data: {
      heroTitle: 'Learn Trading The Right Way', heroSubheading: 'Stock · Forex · Crypto', heroTagline: LOREM,
      stats: [['10K+', 'Students'], ['50+', 'Workshops'], ['5+', 'Years'], ['4.9', 'Rating']].map(([value, label]) => ({ value, label })),
      purchase: {
        heading: 'Our Top-Selling Online Courses', subheading: LOREM.slice(0, 100),
        products: await Promise.all([1, 2, 3].map(async (n) => ({ title: `Dummy online course ${n}`, instructor: 'Dummy Mentor One', price: `₹${n}99`, originalPrice: `₹${n}999`, url: 'https://example.com/buy', image: await img(`Course ${n}`) }))),
      },
      aboutBlurb: body('About'),
      whyChoose: { heading: 'Why choose us', intro: LOREM, image: await img('Why Choose Us'), items: [1, 2, 3, 4].map((n) => ({ title: `Reason ${n}`, description: LOREM })) },
      story: { heading: 'Our story', body: body('Story'), images: [await img('Story One'), await img('Story Two')] },
      featuredOn: await img('Featured On'),
      faqs,
    } as never,
  })
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Trademax Academy (dummy)', description: LOREM.slice(0, 150),
      address: '123 Dummy Street, Kochi, Kerala, 682025', phone: '+91 00000 00000', whatsapp: '910000000000', email: 'hello@example.com',
      social: ['facebook', 'instagram', 'youtube', 'linkedin'].map((platform) => ({ platform, url: `https://example.com/${platform}` })),
      buyUrl: 'https://example.com/buy', appUrl: 'https://example.com/app', playStoreUrl: 'https://example.com/play', appStoreUrl: 'https://example.com/appstore',
      appMockup: await img('App Mockup'), googleRating: 4.9,
    } as never,
  })

  console.log('Dummy seed complete.')
  process.exit(0)
}

main().catch((e) => { console.error(JSON.stringify(e.data?.errors ?? e.message ?? e)); process.exit(1) })
