'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import { Post } from '@/types/post'
import { useInView } from 'react-intersection-observer'

interface PostCardProps extends Post {
  href: string
  pinned?: boolean
}

export default function PostCard({ title, description, image, href, pinned, logo, video, tags, category, projectType }: PostCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Increased rootMargin to load earlier, lower threshold to trigger sooner
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: '200px 0px',
  })

  useEffect(() => {
    if (videoRef.current && video) {
      if (inView) {
        // Play video when in view
        videoRef.current.play().catch((err) => {
          console.log('Video autoplay prevented:', err)
          setHasError(true)
        })
      } else {
        // Pause when out of view
        videoRef.current.pause()
      }
    }
  }, [inView, video])

  // Format category for display
  const getCategoryLabel = () => {
    if (!category) return '';

    const categories = category.split(',');
    if (categories.includes('development') && categories.includes('design')) {
      return 'Development & Design';
    } else if (categories.includes('development')) {
      return 'Development';
    } else if (categories.includes('design')) {
      return 'Design';
    }
    return '';
  };

  return (
    <div className="group flex flex-col space-y-4">
      {/* Media Card - Only Contains Media */}
      <div
        className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-sm transition-all duration-300 group-hover:shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={href} className="absolute inset-0 z-10">
          <span className="sr-only">View {title}</span>
        </Link>

        {/* Featured Badge */}
        {pinned && (
          <div className="absolute top-3 right-3 z-20 p-1.5 bg-amber-500 text-white rounded-full shadow-md transform transition-transform duration-300 group-hover:scale-110" title="Featured Project">
            <Trophy className="w-4 h-4" />
          </div>
        )}

        {/* Media Background */}
        <div ref={ref} className="relative w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105">
          {video ? (
            <>
              {/* Show image as fallback until video loads */}
              {!hasLoaded && !hasError && image && (
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}

              {/* Loading spinner */}
              {!hasLoaded && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/30 backdrop-blur-[1px] z-[1]">
                  <div className="w-8 h-8 border-4 border-zinc-300 dark:border-zinc-600 border-t-zinc-500 dark:border-t-zinc-300 rounded-full animate-spin"></div>
                </div>
              )}

              {/* Video */}
              <video
                ref={videoRef}
                src={video}
                loop
                muted
                playsInline
                preload="metadata" // Only load metadata initially
                className="object-cover w-full h-full will-change-transform"
                style={{
                  imageRendering: 'auto',
                  transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
                  opacity: hasLoaded ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out',
                }}
                onLoadedData={() => setHasLoaded(true)}
                onError={() => setHasError(true)}
              />
            </>
          ) : (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={pinned} // Only prioritize pinned posts
              loading={pinned ? "eager" : "lazy"}
            />
          )}
        </div>

        {/* Hover state overlay with logo - using conditional rendering based on state */}
        <motion.div
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px] z-[2] pointer-events-none"
        >
          {logo && logo.length > 0 ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: isHovered ? 1 : 0.8,
                opacity: isHovered ? 1 : 0
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="w-48 h-48 relative" // Increased size from w-32 h-32
            >
              <Image
                src={logo}
                alt={title}
                fill
                className="object-contain brightness-[10] invert" // Added filters to make logo white
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: isHovered ? 0 : 20,
                opacity: isHovered ? 1 : 0
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center justify-center text-center p-6"
            >
              <p className="font-serif italic text-2xl text-white mb-3">View project</p>
              {projectType && (
                <div className="text-xs text-zinc-300 mt-1">
                  {projectType === 'professional' ? 'Professional Work' : 'Personal Project'}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Content Below the Card */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-medium line-clamp-1 text-zinc-900 dark:text-zinc-100">{title}</h3>
          {getCategoryLabel() && (
            <span className="ml-2 text-xs bg-zinc-100 dark:bg-zinc-700 px-2 py-0.5 rounded-full text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
              {getCategoryLabel()}
            </span>
          )}
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-3">{description}</p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-1.5 py-0.5 text-xs bg-zinc-100 dark:bg-zinc-700/60 text-zinc-700 dark:text-zinc-300 rounded-full">
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-1.5 py-0.5 text-xs bg-zinc-100 dark:bg-zinc-700/60 text-zinc-700 dark:text-zinc-300 rounded-full">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
