'use client'

import { ChevronDown, Facebook, Instagram, Linkedin, Menu, X, Youtube } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { useModals } from './ModalProvider'
import { TapeWidget } from './TradingViewWidget'

type Props = { logoUrl: string | null; siteName: string; courses: { title: string; slug: string }[]; social?: { platform?: string | null; url: string }[] | null }

const SOCIAL_ICON = { facebook: Facebook, instagram: Instagram, youtube: Youtube, linkedin: Linkedin } as const

export function Header({ logoUrl, siteName, courses, social }: Props) {
  const [open, setOpen] = useState(false)
  const { openQuick, openSyllabus } = useModals()
  const link = 'whitespace-nowrap text-sm font-medium text-ink hover:text-brand'

  return (
    <header className="border-b border-line bg-white/95 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 whitespace-nowrap text-lg font-bold text-navy">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {logoUrl && <span className="grid h-10 w-10 place-items-center rounded-lg bg-navy"><img src={logoUrl} alt="" className="h-7 w-7" /></span>}
          <span>{siteName}</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          <Link href="/about-us" className={link}>About Us</Link>
          <div className="group relative">
            <button className={`${link} inline-flex items-center gap-1`}>Courses <ChevronDown size={14} /></button>
            <div className="invisible absolute left-0 top-full z-50 w-60 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="card card-static p-2 shadow-xl">
                {courses.map((c) => (
                  <Link key={c.slug} href={`/${c.slug}`} className="block rounded-lg px-3 py-2 text-sm hover:bg-soft hover:text-brand">{c.title}</Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/financial-calculators" className={link}>Calculators</Link>
          <Link href="/blog" className={link}>Blog</Link>
          <Link href="/career" className={link}>Career</Link>
          <Link href="/contact-us" className={link}>Contact Us</Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {social?.map((x) => {
            const Icon = SOCIAL_ICON[(x.platform ?? '') as keyof typeof SOCIAL_ICON]
            return Icon ? <a key={x.url} href={x.url} target="_blank" rel="noopener noreferrer" aria-label={x.platform ?? 'Social'} className="hidden text-ink transition hover:text-brand xl:block"><Icon size={18} /></a> : null
          })}
          <button onClick={openSyllabus} className="whitespace-nowrap text-sm font-semibold text-navy hover:text-brand">Syllabus</button>
          <button onClick={openQuick} className="btn btn-primary whitespace-nowrap !py-2">Quick Contact</button>
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
      </div>

      <div className="hidden border-t border-line lg:block" aria-label="Live indices"><TapeWidget /></div>

      {open && (
        <nav className="container-x grid gap-1 border-t border-line py-3 lg:hidden" aria-label="Mobile">
          {[['/about-us', 'About Us'], ...courses.map((c) => [`/${c.slug}`, c.title]), ['/financial-calculators', 'Calculators'], ['/blog', 'Blog'], ['/career', 'Career'], ['/contact-us', 'Contact Us']].map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm hover:bg-soft">{label}</Link>
          ))}
          <button onClick={() => { setOpen(false); openQuick() }} className="btn btn-primary mt-2">Quick Contact</button>
        </nav>
      )}
    </header>
  )
}
