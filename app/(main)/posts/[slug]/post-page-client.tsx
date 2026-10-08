'use client'

import PostDetail from '@/components/post-detail'
import { usePostBySlug } from '@/hooks/use-posts-query'
import type { Post } from '@/types/post'

export default function PostPageClient({
  slug,
  initialPost,
}: {
  slug: string
  initialPost: Post
}) {
  const { data: post } = usePostBySlug(slug, initialPost)

  return (
    <div className="w-full">
      <PostDetail post={post ?? initialPost} />
    </div>
  )
}
