type Item = { question: string; answer: string }

export function Faq({ items, title = 'Frequently asked questions' }: { items?: Item[] | null; title?: string }) {
  if (!items?.length) return null
  const ld = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }
  return (
    <section className="section" id="faq">
      <div className="container-x max-w-3xl">
        <h2 className="h2 mb-6">{title}</h2>
        <div>
          {items.map((f, i) => (
            <details key={i} className="rule-row group">
              <summary className="cursor-pointer list-none font-semibold after:float-right after:content-['+'] group-open:after:content-['–']">{f.question}</summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </section>
  )
}
