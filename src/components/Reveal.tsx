'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

// Renders the real value on the server so it never shows 0 before scripting runs.
export function CountUp({ value }: { value: string }) {
  return <span>{value}</span>
}
