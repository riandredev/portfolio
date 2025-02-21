'use client'
import { useEffect, useState } from 'react'
import { usePostsStore } from '@/store/posts'
import PostDetail from '@/components/post-detail'
import { notFound } from 'next/navigation'

// In [slug]/page.tsx
export default function PostPage({ params }: { params: { slug: string } }) {
    const [isLoading, setIsLoading] = useState(true)
    const { posts, fetchPosts } = usePostsStore()

    useEffect(() => {
      const loadPost = async () => {
        try {
          await fetchPosts()
        } finally {
          setIsLoading(false)
        }
      }
      loadPost()
    }, [fetchPosts])

    if (isLoading) {
      return (
        <div className="min-h-screen pt-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white" />
        </div>
      )
    }

    const post = posts.find(p => p.slug === params.slug)
    if (!post) return notFound()

    return (
      <div className="w-full">
        <PostDetail post={post} />
      </div>
    )
  }
