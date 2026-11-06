'use client'

import { X } from 'lucide-react'
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

import { LeadForm } from './LeadForm'

export type SyllabusOption = { market: 'stock' | 'forex' | 'crypto'; label: string; fileUrl: string | null }

type Modal = null | 'quick' | 'syllabus'
const Ctx = createContext<{ openQuick: () => void; openSyllabus: () => void }>({ openQuick() {}, openSyllabus() {} })
export const useModals = () => useContext(Ctx)

export function ModalProvider({ children, syllabi }: { children: ReactNode; syllabi: SyllabusOption[] }) {
  const [modal, setModal] = useState<Modal>(null)
  const [pick, setPick] = useState<SyllabusOption | null>(null)
  const close = useCallback(() => { setModal(null); setPick(null) }, [])

  return (
    <Ctx.Provider value={{ openQuick: () => setModal('quick'), openSyllabus: () => setModal('syllabus') }}>
      {children}
      {modal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={close} role="dialog" aria-modal="true">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={close} aria-label="Close" className="absolute right-4 top-4 text-muted hover:text-ink"><X size={20} /></button>
            {modal === 'quick' && (
              <>
                <h3 className="mb-1 text-xl font-bold">Quick Contact</h3>
                <p className="mb-4 text-sm text-muted">Leave your details and our team will call you back.</p>
                <LeadForm source="quick-contact" compact onDone={close} />
              </>
            )}
            {modal === 'syllabus' && !pick && (
              <>
                <h3 className="mb-1 text-xl font-bold">Download syllabus</h3>
                <p className="mb-4 text-sm text-muted">Choose a course.</p>
                <div className="grid gap-3">
                  {syllabi.map((s) => (
                    <button key={s.market} onClick={() => setPick(s)} className="btn btn-outline !justify-between">{s.label} <span>→</span></button>
                  ))}
                </div>
              </>
            )}
            {modal === 'syllabus' && pick && (
              <>
                <h3 className="mb-1 text-xl font-bold">{pick.label} syllabus</h3>
                <p className="mb-4 text-sm text-muted">Enter your details to get the download.</p>
                <LeadForm source="syllabus-download" interest={pick.market} fileUrl={pick.fileUrl} compact onDone={close} />
              </>
            )}
          </div>
        </div>
      )}
    </Ctx.Provider>
  )
}
