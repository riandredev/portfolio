import { useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export function useVideoVisibility() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false
  })

  useEffect(() => {
    if (videoRef.current) {
      if (inView) {
        videoRef.current.play().catch(() => {
          console.log('Autoplay prevented')
        })
      } else {
        videoRef.current.pause()
      }
    }
  }, [inView])

  return { videoRef, containerRef: ref }
}
