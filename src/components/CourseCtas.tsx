'use client'

import { useModals } from './ModalProvider'

export function CourseCtas({ buyUrl }: { buyUrl: string; market?: string }) {
  const { openSyllabus } = useModals()
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <a href={buyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Buy Now</a>
      <a href="#enquiry" className="btn btn-outline">Enquire</a>
      <button onClick={openSyllabus} className="btn btn-outline">Download Syllabus</button>
    </div>
  )
}
