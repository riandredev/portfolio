import { useState, useEffect } from 'react'

interface ScrollSpyOptions {
  rootMargin?: string
  threshold?: number | number[]
  offset?: number
}

export function useScrollSpy(
  selectors: string[],
  options: ScrollSpyOptions = {}
) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const elements = selectors
      .map((selector) => document.querySelector(selector))
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
        rootMargin: options.rootMargin || '-20% 0% -35% 0%',
        threshold: options.threshold || 0.5,
      }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [selectors, options.rootMargin, options.threshold])

  return activeId ? `#${activeId}` : null
}
