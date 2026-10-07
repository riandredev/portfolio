'use client'
import PostCard from '@/components/post-card'
import PostCardSkeleton from '@/components/post-card-skeleton'
import { usePostsList } from '@/hooks/use-posts-query'
import { Post } from '@/types/post'

export default function PostsPage() {
  const { data: posts = [], isLoading, isFetching } = usePostsList()
  const showSkeleton = isLoading && posts.length === 0

  const professionalPosts = posts.filter(post => post.projectType === 'professional')
  const personalPosts = posts.filter(post => post.projectType !== 'professional')

  const professionalCategorizedPosts = new Set<Post>()
  professionalPosts.forEach(post => {
    if (post.category === 'development' ||
        post.category === 'design' ||
        post.category === 'development,design' ||
        post.category === 'design,development') {
      professionalCategorizedPosts.add(post as Post)
    }
  })
  const professionalDisplayPosts = Array.from(professionalCategorizedPosts)
  const professionalUncategorizedPosts = professionalPosts.filter(post => !post.category)

  const personalCategorizedPosts = new Set<Post>()
  personalPosts.forEach(post => {
    if (post.category === 'development' ||
        post.category === 'design' ||
        post.category === 'development,design' ||
        post.category === 'design,development') {
      personalCategorizedPosts.add(post as Post)
    }
  })
  const personalDisplayPosts = Array.from(personalCategorizedPosts)
  const personalUncategorizedPosts = personalPosts.filter(post => !post.category)

  const sortPosts = (items: Post[]) => {
    return [...items].sort((a, b) => {
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
          {showSkeleton ? (
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
              {professionalPosts.length > 0 && (
                <div className="mb-16">
                  <div className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-light">
                      Professional <span className="font-normal">Work</span>
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
                      Client work and professional projects I&apos;ve completed for companies.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
                    {sortPosts(professionalDisplayPosts).map((post, index) => (
                      <PostCard
                        key={post._id}
                        {...post}
                        href={`/posts/${post.slug}`}
                        pinned={post.pinned}
                        priority={index < 2}
                      />
                    ))}
                  </div>
                  {professionalUncategorizedPosts.length > 0 && (
                    <div className="mt-10">
                      <h3 className="text-xl font-medium mb-8 text-zinc-800 dark:text-zinc-200">
                        Other Professional Projects
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
                        {sortPosts(professionalUncategorizedPosts as Post[]).map((post) => (
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

              {personalPosts.length > 0 && (
                <div>
                  <div className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-light">
                      Featured <span className="font-normal">Personal Projects</span>
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
                      Personal work, side projects, and experiments I&apos;ve built.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
                    {sortPosts(personalDisplayPosts).map((post) => (
                      <PostCard
                        key={post._id}
                        {...post}
                        href={`/posts/${post.slug}`}
                        pinned={post.pinned}
                      />
                    ))}
                  </div>
                  {personalUncategorizedPosts.length > 0 && (
                    <div className="mt-10">
                      <h3 className="text-xl font-medium mb-8 text-zinc-800 dark:text-zinc-200">
                        Other Personal Projects
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
                        {sortPosts(personalUncategorizedPosts as Post[]).map((post) => (
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
          {isFetching && posts.length > 0 ? (
            <p className="sr-only" aria-live="polite">Refreshing projects</p>
          ) : null}
        </div>
      </section>
    </main>
  )
}
