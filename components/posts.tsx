'use client'
import { useEffect, useState } from 'react'
import PostCard from './post-card'
import PostCardSkeleton from './post-card-skeleton'
import { usePostsStore } from '@/store/posts'

export default function Posts() {
  const { posts, fetchPosts, isLoading, error } = usePostsStore()
  const [recentPostsLimit, setRecentPostsLimit] = useState(4)

  useEffect(() => {
    console.log('Component mounted, fetching posts...'); // Debug log
    fetchPosts();
  }, [fetchPosts]);

  // Debug logs
  useEffect(() => {
    console.log('Current state:', {
      postsCount: posts.length,
      isLoading,
      error
    });
  }, [posts, isLoading, error]);

  useEffect(() => {
    // Fetch settings when component mounts
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings')
        const settings = await response.json()
        setRecentPostsLimit(settings.recentPostsLimit)
      } catch (error) {
        console.error('Failed to fetch settings:', error)
      }
    }

    fetchSettings()
  }, [])

  if (error) {
    return (
      <section className="relative w-full pt-4 pb-24 bg-zinc-100 dark:bg-black">
        <div className="container px-4 mx-auto">
          <div className="text-red-500 dark:text-red-400">
            <h2 className="text-xl font-medium mb-2">Error loading posts</h2>
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <section className="relative w-full pt-4 pb-24 bg-zinc-100 dark:bg-black">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  const sortedPosts = [...posts].sort((a, b) => {
    // First sort by pinned status
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    // Then prioritize professional projects
    // Improve how we check for professional project type to ensure consistency
    if ((a.projectType === 'professional') && (b.projectType !== 'professional')) return -1
    if ((a.projectType !== 'professional') && (b.projectType === 'professional')) return 1
    // Then sort by publishedAt date (most recent first)
    const dateA = a.publishedAt ? new Date(a.publishedAt) : new Date(0)
    const dateB = b.publishedAt ? new Date(b.publishedAt) : new Date(0)
    return dateB.getTime() - dateA.getTime()
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
          {isLoading ? (
            // Show 4 skeleton cards while loading
            Array.from({ length: 4 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))
          ) : sortedPosts.length > 0 ? (
            sortedPosts.slice(0, recentPostsLimit).map((post) => (
              <PostCard
                key={post._id}
                {...post}
                href={`/posts/${post.slug}`}
                pinned={post.pinned}
              />
            ))
          ) : (
            <p className="col-span-2 text-center text-zinc-500 dark:text-zinc-400">
              No posts available.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
