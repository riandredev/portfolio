'use client'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { usePostsStore } from '@/store/posts'
import PostListItem from '@/components/dashboard/post-list-item'
import { useEffect, useState } from 'react'

export default function PostsPage() {
  const { posts, fetchPosts, isLoading, error } = usePostsStore()
  const [deleteError, setDeleteError] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="container px-4 mx-auto py-24 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-8">
        {deleteError && (
          <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
            {deleteError}
          </div>
        )}

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium">Posts</h1>
          <Link
            href="/dashboard/posts/new"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Post
          </Link>
        </div>

        <div className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 divide-y divide-zinc-200 dark:divide-zinc-700/50">
          {posts.map((post) => (
            <PostListItem
              key={post._id}
              post={post}
            />
          ))}

          {posts.length === 0 && (
            <div className="p-8 text-center text-zinc-500 dark:text-zinc-400">
              No posts yet. Create your first post!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
