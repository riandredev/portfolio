'use client'

import { useCallback, useRef } from 'react'

type HoverSoundVariant = 'fan' | 'design'

function canPlayHoverSound() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  return true
}

function playTone(ctx: AudioContext, variant: HoverSoundVariant) {
  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(variant === 'fan' ? 392 : 523.25, now)
  osc.frequency.exponentialRampToValueAtTime(variant === 'fan' ? 523.25 : 659.25, now + 0.06)

  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(0.045, now + 0.015)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14)

  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(now)
  osc.stop(now + 0.15)
}

export function useHoverSound(variant: HoverSoundVariant) {
  const ctxRef = useRef<AudioContext | null>(null)

  const onPointerEnter = useCallback(() => {
    if (!canPlayHoverSound()) return
    try {
      const ctx = ctxRef.current ?? new AudioContext()
      ctxRef.current = ctx
      if (ctx.state === 'suspended') {
        void ctx.resume()
      }
      playTone(ctx, variant)
    } catch {
      // ignore autoplay / unsupported
    }
  }, [variant])

  return { onPointerEnter }
}
