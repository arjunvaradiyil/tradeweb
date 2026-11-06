import type { Metadata } from 'next'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

import { LeadForm } from '@/components/LeadForm'
import { getSettings } from '@/lib/queries'

export const metadata: Metadata = { title: 'Contact Us | Trademax Academy', description: 'Get in touch with Trademax Academy for course enquiries, batches and counselling.', alternates: { canonical: '/contact-us' } }

export default async function ContactPage() {
  const s = await getSettings()
  return (
    <section className="section">
      <div className="container-x">
        <div className="ed-head"><h1 className="ed-title">Contact us</h1></div>
        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted">Questions about courses, batches or fees? Send a message and we will get back to you.</p>
        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <address className="grid not-italic">
              {s.address && <p className="flex gap-4 border-t border-line py-5"><MapPin className="mt-1 shrink-0" />{s.address}</p>}
              {s.phone && <a href={`tel:${s.phone}`} className="flex gap-4 border-t border-line py-5 hover:underline"><Phone className="mt-1 shrink-0" />{s.phone}</a>}
              {s.email && <a href={`mailto:${s.email}`} className="flex gap-4 border-t border-line py-5 hover:underline"><Mail className="mt-1 shrink-0" />{s.email}</a>}
              {s.whatsapp && <a href={`https://wa.me/${s.whatsapp}`} className="flex gap-4 border-y border-line py-5 hover:underline"><MessageCircle className="mt-1 shrink-0" />Chat on WhatsApp</a>}
            </address>
            {s.mapUrl && <iframe src={s.mapUrl} title="Map" loading="lazy" className="mt-8 h-64 w-full rounded border-0" />}
          </div>
          <div className="md:col-span-6"><div className="card p-8"><h2 className="mb-5 text-2xl font-medium uppercase tracking-tight">Send a message</h2><LeadForm source="contact" withMessage /></div></div>
        </div>
      </div>
    </section>
  )
}
