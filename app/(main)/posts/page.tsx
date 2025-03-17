'use client'
import { useEffect } from 'react'
import { usePostsStore } from '@/store/posts'
import PostCard from '@/components/post-card'
import PostCardSkeleton from '@/components/post-card-skeleton'
import { Post, ProjectType } from '@/types/post'

export default function PostsPage() {

  const { posts, fetchPosts, isLoading } = usePostsStore()

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  // Group posts by project type
  const professionalPosts = posts.filter(post => post.projectType === 'professional')
  const personalPosts = posts.filter(post => post.projectType !== 'professional')

  // Group posts by category within each project type
  const professionalDevelopmentPosts = professionalPosts.filter(post => post.category === 'development')
  const professionalDesignPosts = professionalPosts.filter(post => post.category === 'design')
  const professionalUncategorizedPosts = professionalPosts.filter(post => !post.category)

  const personalDevelopmentPosts = personalPosts.filter(post => post.category === 'development')
  const personalDesignPosts = personalPosts.filter(post => post.category === 'design')
  const personalUncategorizedPosts = personalPosts.filter(post => !post.category)

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
    <main className="min-h-screen bg-zinc-100 dark:bg-black pt-24 pb-24 sm:pt-28 md:pt-32 lg:pt-36">
      <section className="w-full">
        <div className="container px-4 mx-auto">
          {isLoading ? (
            <>
              <div className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light">
                  Featured <span className="font-normal">Projects</span>
                </h2>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
                  A collection of projects I&apos;ve worked on, ranging from web applications to design systems.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
                {Array.from({ length: 6 }).map((_, i) => (
                  <PostCardSkeleton key={i} />
                ))}
              </div>
            </>
          ) : (
            <div>
              {/* Professional Projects Section */}
              {professionalPosts.length > 0 && (
                <div className="mb-16">
                  <div className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-light">
                      Professional <span className="font-normal">Work</span>
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
                      Client work and professional projects I've completed for companies.
                    </p>
                  </div>

                  {/* Main Professional Projects Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
                    {sortPosts([...professionalDevelopmentPosts, ...professionalDesignPosts]).map((post) => (
                      <PostCard
                        key={post._id}
                        {...post}
                        href={`/posts/${post.slug}`}
                        pinned={post.pinned}
                      />
                    ))}
                  </div>

                  {/* Uncategorized Professional Projects */}
                  {professionalUncategorizedPosts.length > 0 && (
                    <div className="mt-10">
                      <h3 className="text-xl font-medium mb-8 text-zinc-800 dark:text-zinc-200">
                        Other Professional Projects
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
                        {sortPosts(professionalUncategorizedPosts).map((post) => (
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
                </div>
              )}

              {/* Personal Projects Section */}
              {personalPosts.length > 0 && (
                <div>
                  <div className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-light">
                      Featured <span className="font-normal">Personal Projects</span>
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
                      Personal work, side projects, and experiments I've built.
                    </p>
                  </div>

                  {/* Main Personal Projects Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
                    {sortPosts([...personalDevelopmentPosts, ...personalDesignPosts]).map((post) => (
                      <PostCard
                        key={post._id}
                        {...post}
                        href={`/posts/${post.slug}`}
                        pinned={post.pinned}
                      />
                    ))}
                  </div>

                  {/* Uncategorized Personal Projects */}
                  {personalUncategorizedPosts.length > 0 && (
                    <div className="mt-10">
                      <h3 className="text-xl font-medium mb-8 text-zinc-800 dark:text-zinc-200">
                        Other Personal Projects
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
                        {sortPosts(personalUncategorizedPosts).map((post) => (
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
                </div>
              )}

              {posts.length === 0 && (
                <div className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-12">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-light">
                    Featured <span className="font-normal">Projects</span>
                  </h2>
                  <p className="text-center text-zinc-500 dark:text-zinc-400 mt-8">
                    No posts available.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
