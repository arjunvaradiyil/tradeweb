import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import type { ReactNode } from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ModalProvider, type SyllabusOption } from '@/components/ModalProvider'
import { ScriptInjector } from '@/components/ScriptInjector'
import { TickerBar } from '@/components/TickerBar'
import { getCourses, getSettings } from '@/lib/queries'
import { mediaUrl, SITE_URL } from '@/lib/utils'

import './styles.css'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-poppins', display: 'swap' })

// Content comes from the CMS database, so render per request: the build must not need database access.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Trademax Academy | Best Trading Academy In Keralam', template: '%s' },
  description: 'Learn stock market, forex and crypto trading with structured courses and live mentoring.',
  openGraph: { siteName: 'Trademax Academy', type: 'website' },
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const [settings, courses] = await Promise.all([getSettings(), getCourses()])
  const nav = courses.map((c) => ({ title: c.title, slug: c.slug as string }))
  const syllabi: SyllabusOption[] = (['stock', 'forex', 'crypto'] as const).map((m) => {
    const c = courses.find((x) => x.market === m)
    return { market: m, label: m === 'stock' ? 'Stock Market' : m === 'forex' ? 'Forex' : 'Crypto', fileUrl: mediaUrl(c?.syllabusFile) }
  })

  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <ModalProvider syllabi={syllabi}>
          <div className="sticky top-0 z-50">
            <TickerBar />
            <Header logoUrl={mediaUrl(settings.logo)} siteName={settings.siteName ?? 'Trademax Academy'} courses={nav} social={settings.social} />
          </div>
          <main>{children}</main>
          <Footer settings={settings} courses={nav} />
        </ModalProvider>
        <ScriptInjector head={settings.headScripts} body={settings.bodyScripts} persist />
      </body>
    </html>
  )
}
