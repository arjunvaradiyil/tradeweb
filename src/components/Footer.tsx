import { QRCodeSVG } from 'qrcode.react'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

import type { SiteSetting } from '@/payload-types'
import { mediaAlt, mediaUrl } from '@/lib/utils'

import { GoogleReviews } from './GoogleReviews'

const big = 'inline-block text-3xl font-bold tracking-tight text-white/95 transition hover:translate-x-1 hover:text-white md:text-4xl'
const small = 'inline-block text-base font-medium text-white/80 transition hover:text-white'

export async function Footer({ settings, courses }: { settings: SiteSetting; courses: { title: string; slug: string }[] }) {
  const logo = mediaUrl(settings.logo)
  const mockup = mediaUrl(settings.appMockup, 'card')
  const word = (settings.siteName ?? 'Trademax').replace(/\(.*\)/, '').trim().split(' ')[0]
  return (
    <>
      <GoogleReviews settings={settings} />
      <footer className="footer-grad mt-16 overflow-hidden rounded-t-[3rem] text-white">
        <div className="container-x relative z-10 pt-16">
          <div className="grid gap-12 md:grid-cols-2">
            <nav aria-label="Footer" className="grid content-start gap-3">
              <Link href="/about-us" className={big}>About Us</Link>
              <Link href="/financial-calculators" className={big}>Calculators</Link>
              <Link href="/blog" className={big}>Blog</Link>
              <Link href="/career" className={big}>Career</Link>
              <Link href="/contact-us" className={big}>Contact Us</Link>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {courses.map((c) => <Link key={c.slug} href={`/${c.slug}`} className={small}>{c.title}</Link>)}
              </div>
            </nav>

            <div className="grid content-start gap-6">
              <div>
                {logo && <span className="mb-4 grid h-14 w-14 place-items-center rounded-xl border border-white/30 bg-navy"><Image src={logo} alt={mediaAlt(settings.logo, settings.siteName ?? '')} width={40} height={40} className="h-10 w-10" /></span>}
                <p className="max-w-md text-lg leading-relaxed text-white/85">{settings.description}</p>
              </div>
              <address className="grid gap-2 text-white/90 not-italic">
                {settings.address && <p className="flex gap-2.5"><MapPin size={18} className="mt-1 shrink-0" />{settings.address}</p>}
                {settings.email && <a href={`mailto:${settings.email}`} className="flex gap-2.5 hover:text-white"><Mail size={18} className="mt-1" />{settings.email}</a>}
                {settings.phone && <a href={`tel:${settings.phone}`} className="flex gap-2.5 hover:text-white"><Phone size={18} className="mt-1" />{settings.phone}</a>}
                {settings.whatsapp && <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex gap-2.5 hover:text-white"><MessageCircle size={18} className="mt-1" />WhatsApp</a>}
              </address>
              <div className="flex flex-wrap gap-x-5 gap-y-2 font-semibold">
                {settings.social?.map((s) => (
                  <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="border-b border-white/60 capitalize hover:border-white">{s.platform}</a>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-4">
                {mockup && <Image src={mockup} alt="Trademax mobile app" width={120} height={240} className="h-44 w-auto -rotate-6 rounded-2xl border-4 border-white/90 drop-shadow-2xl" />}
                <div className="grid gap-2">
                  {settings.playStoreUrl && <a href={settings.playStoreUrl} target="_blank" rel="noopener noreferrer" className="btn border border-white/60 text-white hover:bg-white/15">Play Store</a>}
                  {settings.appStoreUrl && <a href={settings.appStoreUrl} target="_blank" rel="noopener noreferrer" className="btn border border-white/60 text-white hover:bg-white/15">App Store</a>}
                </div>
                {settings.appUrl && (
                  <div className="rounded-2xl bg-white p-2 text-ink">
                    <QRCodeSVG value={settings.appUrl} size={92} />
                    <p className="mt-1 text-center text-[11px]">Scan to download</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <svg aria-hidden viewBox="0 0 1000 175" className="footer-word mt-12 block h-auto w-full select-none">
            <text x="0" y="140" textLength="1000" lengthAdjust="spacingAndGlyphs" fontSize="190" fontWeight="900" fill="currentColor" style={{ fontFamily: 'var(--font-poppins), sans-serif', letterSpacing: '-0.03em' }}>{word}</text>
          </svg>

          <div className="border-t border-white/30 py-6 text-xs leading-relaxed text-white/80">
            <p><b className="text-white">Risk warning:</b> {settings.riskWarning}</p>
            {settings.disclosure && <p className="mt-2">{settings.disclosure}</p>}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
              <span>© {new Date().getFullYear()} {settings.siteName}. All rights reserved.</span>
              <span className="flex gap-5">
                <Link href="/terms-and-condition" className="hover:text-white">Terms &amp; Conditions</Link>
                <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
