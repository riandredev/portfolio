'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react' // Add this import

interface PostCardProps {
  title: string
  description: string
  image: string
  video?: string
  logo?: string
  href: string
  tags?: string[]
  pinned?: boolean
  category?: string
}

const formatCategories = (category: string) => {
  if (category === 'development,design') {
    return 'Development & Design';
  }
  return category.charAt(0).toUpperCase() + category.slice(1);
};

const PostCard = ({ title, description, image, video, logo, href, tags, pinned, category }: PostCardProps) => {
  return (
    <article className="group flex flex-col gap-6 font-manrope">
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden border dark:border-zinc-700 rounded-2xl bg-zinc-100 dark:bg-zinc-800">
        <div className="relative w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105">
          {video ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full will-change-transform"
              style={{
                objectFit: 'cover',
                imageRendering: 'auto',
                transform: 'translate3d(0, 0, 0)' // Force GPU acceleration
              }}
            />
          ) : (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          )}
        </div>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px]"
          >
            {logo && logo.length > 0 ? (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="relative w-64 h-64"
              >
                <Image
                  src={logo}
                  alt={`${title} logo`}
                  fill
                  className="object-contain filter brightness-0 invert"
                  unoptimized
                />
              </motion.div>
            ) : (
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-white/90 text-2xl lg:text-4xl font-serif italic tracking-wide px-6 py-3"
              >
                View Project
              </motion.span>
            )}
          </motion.div>
        </AnimatePresence>
      </Link>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h3 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            {title}
            {category && (
              <>
                <span className="text-2xl text-zinc-400 dark:text-zinc-500 font-normal">
                  |
                </span>
                <span className="text-zinc-400 dark:text-zinc-500 text-base font-normal capitalize">
                  {formatCategories(category)}
                </span>
              </>
            )}
          </h3>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 shrink-0">
              {tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-300 font-medium backdrop-blur-sm whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 4 && (
                <span className="text-xs text-zinc-500 dark:text-zinc-400 self-center">
                  +{tags.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
        <div className="flex items-start justify-between gap-4">
          <p className="text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed flex-1">
            {description}
          </p>
          <Link
            href={href}
            className="shrink-0 p-1 -mr-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group/link"
          >
            <ExternalLink className="w-4 h-4 text-zinc-400 group-hover/link:text-zinc-900 dark:group-hover/link:text-zinc-100 transition-colors" />
          </Link>
        </div>
        {pinned && (
          <span className="text-xs shrink-0 font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
            </svg>
            Featured
          </span>
        )}
      </div>
    </article>
  )
}



export default PostCard
