'use client'

import PostDetail from '@/components/post-detail'
import { usePostBySlug } from '@/hooks/use-posts-query'
import { notFound } from 'next/navigation'

export default function PostPageClient({ slug }: { slug: string }) {
  const { data: post, isLoading, error } = usePostBySlug(slug)

  if (isLoading && !post) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white" />
      </div>
    )
  }

  if (error || !post) {
    return notFound()
  }

  return (
    <div className="w-full">
      <PostDetail post={post} />
    </div>
  )
}
