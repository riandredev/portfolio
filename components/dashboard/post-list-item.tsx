'use client'
import { usePostsStore } from '@/store/posts'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, PenSquare, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import type { Post } from '@/types/post'

interface PostListItemProps {
  post: Post
}

export default function PostListItem({ post }: PostListItemProps) {
  const deletePost = usePostsStore((state) => state.deletePost)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      deletePost(id)
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }

  return (
    <div className="flex items-center gap-4 p-4">
      {/* Thumbnail */}
      <div className="relative w-20 h-12 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h2 className="text-base font-medium truncate">{post.title}</h2>
        <div className="flex items-center gap-4 mt-1">
          {post.publishedAt && (
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <Calendar className="w-3.5 h-3.5" />
              {format(new Date(post.publishedAt), 'MMM d, yyyy')}
            </div>
          )}
          <div className="flex items-center gap-1">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Link
          href={`/posts/${post.slug}`}
          className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
        >
          View
        </Link>
        <Link
          href={`/dashboard/posts/${post.slug}/edit`}
          className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
        >
          <PenSquare className="w-4 h-4" />
        </Link>
        <button
          onClick={() => handleDelete(post._id)}
          className="p-2 text-red-500 hover:text-red-600 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
