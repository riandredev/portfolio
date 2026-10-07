'use client'

import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { fetchPostBySlug } from '@/lib/posts-client'
import { postsKeys } from '@/lib/posts-keys'

export function usePrefetchPost() {
  const queryClient = useQueryClient()

  return useCallback(
    (slug: string) => {
      if (!slug) return
      void queryClient.prefetchQuery({
        queryKey: postsKeys.detail(slug),
        queryFn: () => fetchPostBySlug(slug),
        staleTime: 5 * 60 * 1000,
      })
    },
    [queryClient]
  )
}
