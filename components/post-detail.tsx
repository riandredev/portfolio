'use client'
import Image from 'next/image'
import { ExternalLink, Github, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import type { Post } from '@/types/post'
import ContentBlocks from './content-blocks'
import PostNavigation from './post-navigation'
import { useScrollSpy } from '@/hooks/use-scroll-spy'
import { usePostsStore } from '@/store/posts'
import TechnologyEntry from './technology-entry'

// Move interfaces outside component
interface Section {
  id: string
  title: string
  level: number
}

const DemoSourceButtons = ({ demoUrl, sourceUrl }: { demoUrl?: string; sourceUrl?: string }) => (
  <div className="flex lg:flex-col w-full gap-2">
    {demoUrl && (
      <a
        href={demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium
          rounded-lg border border-zinc-200 dark:border-zinc-800
          bg-white hover:bg-zinc-100/50 dark:bg-zinc-800/75 dark:hover:bg-zinc-800
          w-full whitespace-nowrap transition-colors"
      >
        <ExternalLink className="w-4 h-4 flex-shrink-0" />
        Live Demo
      </a>
    )}
    {sourceUrl && (
      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium
          rounded-lg border border-zinc-200 dark:border-zinc-800
          bg-white hover:bg-zinc-100/50 dark:bg-zinc-800/75 dark:hover:bg-zinc-800
          w-full whitespace-nowrap transition-colors"
      >
        <Github className="w-4 h-4 flex-shrink-0" />
        Source Code
      </a>
    )}
  </div>
)

const ContentMediaSection = ({ post }: { post: Post }) => (
  <>
    {/* Featured Media */}
    {(post.video || post.image) && (
      <div className="w-full rounded-lg sm:rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800/50 mb-6 sm:mb-8">
        {post.video ? (
          <video
            src={post.video}
            controls
            autoPlay
            loop
            muted
            playsInline
            className="w-full aspect-video will-change-transform"
            style={{
              objectFit: 'contain',
              imageRendering: 'auto',
              transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
              backfaceVisibility: 'hidden'
            }}
          />
        ) : post.image ? (
          <div className="aspect-video relative">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : null}
      </div>
    )}

    {/* Technologies Section - Moved here and updated styling */}
    {post.technologies && post.technologies.length > 0 && (
      <div className="md:mb-4 sm:mb-2">
        <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-4">Built with</h2>
        <div className="flex flex-wrap gap-3">
          {post.technologies.map((tech, index) => (
            <TechnologyEntry
              key={index}
              entry={tech}
              className="flex-grow-0 min-w-fit !bg-white/50 dark:!bg-zinc-800/30 border border-zinc-200 dark:border-zinc-700/50"
              invertInDark={!tech.darkModeLogo}
            />
          ))}
        </div>
      </div>
    )}
  </>
)

export default function PostDetail({ post }: { post: Post }) {
  const { posts } = usePostsStore()
  const [sections, setSections] = useState<Section[]>([])
  const articleRef = useRef<HTMLElement>(null)

  // Memoize section IDs
  const sectionIds = useMemo(() => sections.map(section => `#${section.id}`), [sections])

  // Use optimized scroll spy
  const activeSection = useScrollSpy(sectionIds, {
    rootMargin: '-20% 0% -35% 0%'
  })

  const { prevPost, nextPost } = useMemo(() => {
    const currentIndex = posts.findIndex(p => p._id === post._id)
    return {
      prevPost: currentIndex > 0 ? posts[currentIndex - 1] : null,
      nextPost: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
    }
  }, [posts, post._id])

  // Optimize section updates
  useEffect(() => {
    const updateSections = () => {
      if (!articleRef.current) return

      // Only query headings within the article element
      const headings = articleRef.current.querySelectorAll('h2, h3')
      const sectionsData = Array.from(headings).map((heading) => {
        if (!heading.id) {
          heading.id = heading.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || ''
        }
        return {
          id: heading.id,
          title: heading.textContent || '',
          level: parseInt(heading.tagName[1])
        }
      })
      setSections(sectionsData)
    }

    updateSections()

    // Debounced observer to prevent excessive updates
    let timeout: NodeJS.Timeout
    const observer = new MutationObserver(() => {
      clearTimeout(timeout)
      timeout = setTimeout(updateSections, 100)
    })

    // Only observe the article element
    if (articleRef.current) {
      observer.observe(articleRef.current, {
        childList: true,
        subtree: true,
        characterData: true
      })
    }

    return () => {
      observer.disconnect()
      clearTimeout(timeout)
    }
  }, [])

  // Memoize scroll handler
  const handleSectionClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId.replace('#', ''))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <div className="min-h-screen pt-20 sm:pt-24 lg:pt-32 pb-16 bg-zinc-50 dark:bg-black">
      <div className="container px-4 mx-auto flex flex-col lg:flex-row gap-6 lg:gap-12 items-start">
        {/* Table of Contents Sidebar - Now flexible */}
        <aside className="hidden lg:flex flex-col sticky top-32 w-72 flex-shrink-0">
          <div className="flex flex-col flex-grow w-full gap-6">
            {/* Demo & Source Links */}
            <DemoSourceButtons demoUrl={post.demoUrl} sourceUrl={post.sourceUrl} />

            <div className="h-px bg-gradient-to-r from-zinc-200 dark:from-zinc-700 to-transparent" />
            <nav className="space-y-1 flex-grow">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => handleSectionClick(e, section.id)}
                  className={`block py-1 text-sm transition-colors duration-200
                    ${section.level === 3 ? 'pl-4' : 'pl-0'}
                    ${activeSection === `#${section.id}`
                      ? 'text-blue-500 dark:text-blue-400'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-300'
                    }`}
                >
                  {section.title.replace(/#/g, '').trim()}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content - Updated responsive spacing */}
        <article ref={articleRef} className="flex-1 w-full max-w-none lg:max-w-4xl">
          {/* Header */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm mb-4">
            {post.publishedAt && (
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                <Calendar className="w-4 h-4" />
                {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
              </div>
            )}
            {post.category && (
              <span className="px-2 py-0.5 rounded-md text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 capitalize text-xs">
                {post.category}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-800/50"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Rest of the content */}
          <ContentMediaSection post={post} />

          {/* Mobile Demo & Source Buttons - Shown only on mobile */}
          <div className="lg:hidden mb-8">
            <DemoSourceButtons demoUrl={post.demoUrl} sourceUrl={post.sourceUrl} />
          </div>

          {/* Content - Updated responsive prose styles */}
          <div className="prose dark:prose-invert w-full max-w-none
            prose-p:text-base sm:prose-p:text-lg
            prose-p:text-zinc-700 dark:prose-p:text-zinc-300
            prose-h2:text-xl sm:prose-h2:text-2xl lg:prose-h2:text-3xl prose-h2:mt-8 prose-h2:-mb-2
            prose-h3:text-lg sm:prose-h3:text-xl lg:prose-h3:text-2xl prose-h3:mt-6 prose-h3:-mb-2
            prose-pre:my-4
            prose-img:rounded-lg
            prose-pre:max-w-none
            [&>pre]:w-full
            [&>*:not(:last-child)]:mb-4"
          >
            {post.content?.blocks && <ContentBlocks blocks={post.content.blocks} />}
          </div>

          {/* Navigation - Remove border-t since PostNavigation has its own */}
          <div className="mt-8 sm:mt-12">
            <PostNavigation prevPost={prevPost} nextPost={nextPost} />
          </div>
        </article>
      </div>
    </div>
  )
}
