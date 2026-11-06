'use client'

import { useModals } from './ModalProvider'

export function HomeCtas() {
  const { openSyllabus } = useModals()
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <a href="#courses" className="btn btn-primary">Start Trading Journey</a>
      <button onClick={openSyllabus} className="btn btn-outline">Download Syllabus</button>
    </div>
  )
}
