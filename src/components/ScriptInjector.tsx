'use client'

import { useEffect } from 'react'

// Injects admin-supplied tracking snippets (GA4, GTM, GSC meta, pixels). <script> tags are re-created so they execute.
function inject(html: string | null | undefined, target: HTMLElement): HTMLElement[] {
  if (!html?.trim()) return []
  const tpl = document.createElement('template')
  tpl.innerHTML = html
  const added: HTMLElement[] = []
  tpl.content.childNodes.forEach((node) => {
    if (node.nodeType !== 1) return
    const el = node as HTMLElement
    let out: HTMLElement = el
    if (el.tagName === 'SCRIPT') {
      out = document.createElement('script')
      for (const a of Array.from(el.attributes)) out.setAttribute(a.name, a.value)
      out.textContent = el.textContent
    } else {
      out = el.cloneNode(true) as HTMLElement
    }
    target.appendChild(out)
    added.push(out)
  })
  return added
}

export function ScriptInjector({ head, body, persist }: { head?: string | null; body?: string | null; persist?: boolean }) {
  useEffect(() => {
    const added = [...inject(head, document.head), ...inject(body, document.body)]
    return () => { if (!persist) added.forEach((el) => el.remove()) }
  }, [head, body, persist])
  return null
}
