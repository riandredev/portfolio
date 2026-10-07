'use client'

import { useQuery } from '@tanstack/react-query'
import {
  fetchPostBySlug,
  fetchPostsFull,
  fetchPostsList,
  fetchSiteSettings,
} from '@/lib/posts-client'
import { postsKeys, settingsKeys } from '@/lib/posts-keys'

export { postsKeys, settingsKeys }

export function usePostsList() {
  return useQuery({
    queryKey: postsKeys.list(),
    queryFn: fetchPostsList,
  })
}

export function usePostsFull() {
  return useQuery({
    queryKey: postsKeys.full(),
    queryFn: fetchPostsFull,
  })
}

export function usePostBySlug(slug: string) {
  return useQuery({
    queryKey: postsKeys.detail(slug),
    queryFn: () => fetchPostBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
  })
}

export function useSiteSettings() {
  return useQuery({
    queryKey: settingsKeys.all,
    queryFn: fetchSiteSettings,
    staleTime: 10 * 60 * 1000,
  })
}
