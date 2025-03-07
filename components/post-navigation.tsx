import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Post } from '@/types/post'

interface PostNavigationProps {
  prevPost: Post | null
  nextPost: Post | null
}

export default function PostNavigation({ prevPost, nextPost }: PostNavigationProps) {
  return (
    <div className="flex gap-4 mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
      <Link
        href={prevPost ? `/posts/${prevPost.slug}` : '#'}
        className={`flex-1 flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 transition-colors
          ${prevPost
            ? 'bg-white/50 hover:bg-white dark:bg-zinc-800/50 dark:hover:bg-zinc-800'
            : 'opacity-50 cursor-not-allowed bg-zinc-100 dark:bg-zinc-800/50'}`}
        onClick={(e) => !prevPost && e.preventDefault()}
      >
        <ChevronLeft className="w-4 h-4 flex-shrink-0" />
        <span className="flex flex-col items-start min-w-0">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">Previous</span>
          <span className="truncate max-w-[120px] sm:max-w-[200px] md:max-w-[260px] lg:max-w-[300px]">{prevPost?.title || 'No previous post'}</span>
        </span>
      </Link>

      <Link
        href={nextPost ? `/posts/${nextPost.slug}` : '#'}
        className={`flex-1 flex items-center justify-end gap-2 px-4 py-3 text-sm font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 transition-colors
          ${nextPost
            ? 'bg-white/50 hover:bg-white dark:bg-zinc-800/50 dark:hover:bg-zinc-800'
            : 'opacity-50 cursor-not-allowed bg-zinc-100 dark:bg-zinc-800/50'}`}
        onClick={(e) => !nextPost && e.preventDefault()}
      >
        <span className="flex flex-col items-end min-w-0">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">Next</span>
          <span className="truncate max-w-[120px] sm:max-w-[200px] md:max-w-[260px] lg:max-w-[300px]">{nextPost?.title || 'No next post'}</span>
        </span>
        <ChevronRight className="w-4 h-4 flex-shrink-0" />
      </Link>
    </div>
  )
}
