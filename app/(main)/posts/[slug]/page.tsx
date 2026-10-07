import type { Metadata } from 'next'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/get-query-client'
import { getPostBySlug } from '@/lib/posts-server'
import { postsKeys } from '@/lib/posts-keys'
import PostPageClient from './post-page-client'
import PostJsonLd from '@/components/post-json-ld'
import { isReservedPostSlug } from '@/lib/og/posts-list'
import { absoluteUrl, privateRouteRobots } from '@/lib/seo'
import { notFound } from 'next/navigation'

type PageProps = { params: { slug: string } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (isReservedPostSlug(params.slug)) {
    notFound()
  }

  const post = await getPostBySlug(params.slug)

  if (!post || post.published === false) {
    return {
      title: 'Project not found',
      robots: privateRouteRobots,
    }
  }

  const canonicalPath = `/posts/${post.slug}`

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: absoluteUrl(canonicalPath),
      type: 'article',
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  if (isReservedPostSlug(params.slug)) {
    notFound()
  }

  const post = await getPostBySlug(params.slug)

  if (!post || post.published === false) {
    notFound()
  }

  const queryClient = getQueryClient()

  queryClient.setQueryData(postsKeys.detail(params.slug), post)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostJsonLd post={post} />
      <PostPageClient slug={params.slug} />
    </HydrationBoundary>
  )
}
