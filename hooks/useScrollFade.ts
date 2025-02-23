import { useState, useEffect } from 'react'

export function useScrollFade() {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const startFade = 850  // start
      const endFade = 950 // end
      const newOpacity = Math.max(0, 1 - (scrollPosition - startFade) / (endFade - startFade))
      setOpacity(newOpacity)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return opacity
}
