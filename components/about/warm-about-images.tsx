'use client'

import { useEffect } from 'react'
import { memories } from '@/lib/memories'
import { warmAllMemoryPhotos } from '@/lib/memory-image'

/** Start loading journal photos as soon as /about mounts (incl. when prefetch missed). */
export default function WarmAboutImages() {
  useEffect(() => {
    const sources = memories.map((m) => m.image)
    void warmAllMemoryPhotos(sources, 6)
  }, [])

  return null
}
