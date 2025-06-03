import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { VideoBlockProps } from '@/types/props'
import Image from 'next/image'

export default function VideoBlock({ url, caption, thumbnail }: VideoBlockProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  // Increase rootMargin to start loading earlier
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: '200px 0px',
  })

  useEffect(() => {
    if (videoRef.current) {
      if (inView) {
        // Start playback when in view
        videoRef.current.play().catch((err) => {
          console.log('Autoplay prevented:', err)
          setError(true)
        })
      } else {
        // Pause when out of view
        videoRef.current.pause()
      }
    }
  }, [inView])

  const handleLoaded = () => {
    setIsLoaded(true)
  }

  return (
    <figure className="w-full -my-4">
      <div
        ref={ref}
        className={`w-full aspect-video rounded-lg bg-zinc-100 dark:bg-zinc-800 overflow-hidden ${!isLoaded ? 'animate-pulse' : ''}`}
      >
        {!isLoaded && !error && (
          <div className="flex items-center justify-center h-full w-full">
            <div className="w-6 h-6 border-2 border-zinc-300 dark:border-zinc-600 border-t-zinc-500 dark:border-t-zinc-300 rounded-full animate-spin"></div>
          </div>
        )}
        <video
          ref={videoRef}
          src={url}
          controls
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full rounded-lg will-change-transform"
          style={{
            objectFit: 'fill', // Changed from 'contain' to 'fill'
            imageRendering: 'auto',
            transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
            backfaceVisibility: 'hidden',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
          poster={thumbnail || undefined}
          onLoadedData={handleLoaded}
          onError={() => setError(true)}
        />
      </div>
      {caption && (
        <figcaption className="mt-4 mb-2 text-sm text-center text-zinc-500 dark:text-zinc-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
