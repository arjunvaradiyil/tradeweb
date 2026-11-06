'use client'

import dynamic from 'next/dynamic'

const Hero3D = dynamic(() => import('./Hero3D'), { ssr: false, loading: () => null })
export function HeroScene() {
  return <Hero3D />
}
