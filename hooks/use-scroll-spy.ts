import { useState, useEffect } from 'react'

export function useScrollSpy(
  selectors: string[],
  options?: {
    root?: Element | null
    rootMargin?: string
    threshold?: number | number[]
  }
) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || selectors.length === 0) return

    const elements = selectors
      .map(selector => document.querySelector(selector))
      .filter((element): element is Element => element !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.getAttribute('id'))
          }
        })
      },
      {
        root: options?.root ?? null,
        rootMargin: options?.rootMargin ?? '0px',
        threshold: options?.threshold ?? 0.5,
      }
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [selectors, options?.root, options?.rootMargin, options?.threshold])

  return activeId
}
