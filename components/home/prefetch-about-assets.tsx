'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { memories } from '@/lib/memories'
import { warmAllMemoryPhotos } from '@/lib/memory-image'

export default function PrefetchAboutAssets() {
  const router = useRouter()

  useEffect(() => {
    let cancelled = false

    const warmAbout = () => {
      if (cancelled) return
      router.prefetch('/about')
      const sources = memories.map((m) => m.image)
      void warmAllMemoryPhotos(sources, 4)
    }

    const startDelay = window.setTimeout(warmAbout, 400)

    return () => {
      cancelled = true
      window.clearTimeout(startDelay)
    }
  }, [router])

  return null
}
