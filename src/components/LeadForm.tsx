'use client'

import { useState, type FormEvent } from 'react'

type Props = {
  source: 'quick-contact' | 'contact' | 'course-enquiry' | 'syllabus-download' | 'career'
  interest?: 'stock' | 'forex' | 'crypto'
  fileUrl?: string | null
  compact?: boolean
  withMessage?: boolean
  onDone?: () => void
}

export function LeadForm({ source, interest, fileUrl, compact, withMessage, onDone }: Props) {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    if (f.get('website')) return // honeypot
    setState('sending')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.get('name'),
          phone: f.get('phone'),
          email: f.get('email') || undefined,
          interest: f.get('interest') || interest,
          message: f.get('message') || undefined,
          source,
          pageUrl: window.location.href,
        }),
      })
      if (!res.ok) throw new Error()
      setState('done')
      if (fileUrl) window.open(fileUrl, '_blank')
      onDone && setTimeout(onDone, 1800)
    } catch {
      setState('error')
    }
  }

  if (state === 'done')
    return <p className="rounded-xl bg-soft p-4 text-sm font-medium text-brand-dark">Thank you! {fileUrl ? 'Your download has started.' : 'We will contact you shortly.'}</p>

  const input = 'w-full rounded border border-line px-4 py-3 text-sm outline-none focus:border-ink'
  return (
    <form onSubmit={submit} className="grid gap-3">
      <input name="name" required placeholder="Full name" className={input} />
      <input name="phone" required type="tel" placeholder="Phone number" className={input} />
      {!compact && <input name="email" type="email" placeholder="Email (optional)" className={input} />}
      {!interest && (
        <select name="interest" className={input} defaultValue="">
          <option value="">I am interested in...</option>
          <option value="stock">Stock market</option>
          <option value="forex">Forex</option>
          <option value="crypto">Crypto</option>
        </select>
      )}
      {withMessage && <textarea name="message" rows={4} placeholder="Message" className={input} />}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <button disabled={state === 'sending'} className="btn btn-primary">{state === 'sending' ? 'Sending...' : 'Submit'}</button>
      {state === 'error' && <p className="text-sm text-down">Something went wrong. Please try again.</p>}
    </form>
  )
}
