import type { Metadata } from 'next'

import { Calculators } from '@/components/Calculators'

export const metadata: Metadata = { title: 'Financial Calculators | Trademax Academy', description: 'Free position size, pip value, margin, SIP and risk-reward calculators for traders.', alternates: { canonical: '/financial-calculators' } }

export default function CalculatorsPage() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="ed-head"><h1 className="ed-title">Financial calculators</h1></div>
        <p className="mb-12 mt-8 max-w-3xl text-xl leading-relaxed text-muted">Plan every trade before you take it. For education only - not investment advice.</p>
        <Calculators />
      </div>
    </section>
  )
}
