'use client'
import { useEffect } from 'react'
import { usePostsStore } from '@/store/posts'
import PostCard from '@/components/post-card'
import PostCardSkeleton from '@/components/post-card-skeleton'
import { Post } from '@/types/post'

export default function PostsPage() {

  const { posts, fetchPosts, isLoading } = usePostsStore()

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  // Group posts by category
  const developmentPosts = posts.filter(post => post.category === 'development')
  const designPosts = posts.filter(post => post.category === 'design')
  const uncategorizedPosts = posts.filter(post => !post.category)

  // Sort posts: pinned posts first, then by date within each group
  const sortPosts = (posts: Post[]) => {
    return [...posts].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      const dateA = new Date(a.publishedAt || a.createdAt || 0).getTime()
      const dateB = new Date(b.publishedAt || b.createdAt || 0).getTime()
      return dateB - dateA
    })
  }

  return (
    <main className="min-h-screen bg-zinc-100 dark:bg-black pt-24 sm:pt-28 md:pt-32 lg:pt-36">
      <section className="w-full pb-8 sm:pb-12 md:pb-16 lg:pb-24">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light">
              Featured <span className="font-normal">Projects</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
              A collection of projects I&apos;ve worked on, ranging from web applications to design systems.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
              {Array.from({ length: 6 }).map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="space-y-16">
              {/* Development Projects */}
              {developmentPosts.length > 0 && (
                <div>
                  <h3 className="text-xl font-medium mb-8 text-zinc-800 dark:text-zinc-200">
                    Development Projects
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
                    {sortPosts(developmentPosts).map((post) => (
                      <PostCard
                        key={post._id}
                        {...post}
                        href={`/posts/${post.slug}`}
                        pinned={post.pinned}
                      />
                    ))}
                  </div>
                </div>
              )}

          {/* Design Projects */}
          {designPosts.length > 0 && (
            <div>
              <h3 className="text-xl font-medium mb-8 text-zinc-800 dark:text-zinc-200">
                Design Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
                {sortPosts(designPosts).map((post) => (
                  <PostCard
                    key={post._id}
                    {...post}
                    href={`/posts/${post.slug}`}
                    pinned={post.pinned}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Uncategorized Projects */}
          {uncategorizedPosts.length > 0 && (
            <div>
              <h3 className="text-xl font-medium mb-8 text-zinc-800 dark:text-zinc-200">
                Other Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
                {sortPosts(uncategorizedPosts).map((post) => (
                  <PostCard
                    key={post._id}
                    {...post}
                    href={`/posts/${post.slug}`}
                    pinned={post.pinned}
                  />
                ))}
              </div>
            </div>
          )}

          {posts.length === 0 && (
            <p className="text-center text-zinc-500 dark:text-zinc-400">
              No posts available.
            </p>
          )}
        </div>
      )}
    </div>
  </section>
</main>
  )
}
