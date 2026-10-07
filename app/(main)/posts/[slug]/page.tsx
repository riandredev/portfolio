import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/get-query-client'
import { getPostBySlug } from '@/lib/posts-server'
import { postsKeys } from '@/lib/posts-keys'
import PostPageClient from './post-page-client'
import { notFound } from 'next/navigation'

export default async function PostPage({ params }: { params: { slug: string } }) {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: postsKeys.detail(params.slug),
    queryFn: async () => {
      const post = await getPostBySlug(params.slug)
      if (!post) throw new Error('Post not found')
      return post
    },
  })

  const prefetched = queryClient.getQueryData(postsKeys.detail(params.slug))
  if (!prefetched) {
    notFound()
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostPageClient slug={params.slug} />
    </HydrationBoundary>
  )
}
