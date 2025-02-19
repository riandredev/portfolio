import { useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface VideoBlockProps {
  url: string
  caption?: string
}

export default function VideoBlock({ url, caption }: VideoBlockProps) {
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

  return (
    <figure className="w-full -my-4">
      <div ref={ref} className="w-full aspect-video rounded-lg bg-zinc-100 dark:bg-zinc-800">
        <video
          ref={videoRef}
          src={url}
          controls
          loop
          muted
          playsInline
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-4 mb-2 text-sm text-center text-zinc-500 dark:text-zinc-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
