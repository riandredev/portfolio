import type { Post } from '@/types/post'
import { getRequestBaseUrl } from './request-base-url'

export async function fetchPostForOg(slug: string): Promise<Post | null> {
  const base = await getRequestBaseUrl()
  const response = await fetch(`${base}/api/posts/by-slug/${encodeURIComponent(slug)}`, {
    next: { revalidate: 60 },
  })

  if (!response.ok) return null
  return (await response.json()) as Post
}
