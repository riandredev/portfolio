'use client'
import PostCard from './post-card'
import PostCardSkeleton from './post-card-skeleton'
import { usePostsList, useSiteSettings } from '@/hooks/use-posts-query'

export default function Posts() {
  const { data: posts = [], isLoading, isFetching, error } = usePostsList()
  const { data: settings } = useSiteSettings()
  const recentPostsLimit = settings?.recentPostsLimit ?? 4
  const showSkeleton = isLoading && posts.length === 0

  if (error) {
    return (
      <section className="relative w-full pt-4 pb-24 bg-zinc-100 dark:bg-black">
        <div className="container px-4 mx-auto">
          <div className="text-red-500 dark:text-red-400">
            <h2 className="text-xl font-medium mb-2">Error loading posts</h2>
            <p>{error instanceof Error ? error.message : 'Failed to load posts'}</p>
          </div>
        </div>
      </section>
    )
  }

  const sortedPosts = [...posts].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    const dateA = new Date(a.publishedAt || a.createdAt || 0).getTime()
    const dateB = new Date(b.publishedAt || b.createdAt || 0).getTime()
    return dateB - dateA
  })

  return (
    <section className="relative w-full pt-4 pb-24 bg-zinc-100 dark:bg-black">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light">
            Recent <span className="font-normal">Projects</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
            A collection of projects I&apos;ve worked on, ranging from web applications to design systems.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          {showSkeleton ? (
            Array.from({ length: 4 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))
          ) : sortedPosts.length > 0 ? (
            sortedPosts.slice(0, recentPostsLimit).map((post, index) => (
              <PostCard
                key={post._id}
                {...post}
                href={`/posts/${post.slug}`}
                pinned={post.pinned}
                priority={index < 2}
              />
            ))
          ) : (
            <p className="col-span-2 text-center text-zinc-500 dark:text-zinc-400">
              No posts available.
            </p>
          )}
        </div>
        {isFetching && posts.length > 0 ? (
          <p className="sr-only" aria-live="polite">Refreshing projects</p>
        ) : null}
      </div>
    </section>
  )
}
