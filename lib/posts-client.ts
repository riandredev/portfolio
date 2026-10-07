import { Post } from '@/types/post'

export type PostListItem = Omit<Post, 'content' | 'technologies'> & {
  content?: undefined
  technologies?: undefined
}

async function parsePostsResponse(response: Response): Promise<Post[]> {
  if (!response.ok) {
    throw new Error(`Failed to fetch posts (${response.status})`)
  }
  return response.json()
}

export async function fetchPostsList(): Promise<PostListItem[]> {
  const response = await fetch('/api/posts?view=list')
  const posts = await parsePostsResponse(response)
  return posts as PostListItem[]
}

export async function fetchPostsFull(): Promise<Post[]> {
  const response = await fetch('/api/posts?view=full')
  return parsePostsResponse(response)
}

export async function fetchPostBySlug(slug: string): Promise<Post> {
  const response = await fetch(`/api/posts/by-slug/${encodeURIComponent(slug)}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch post (${response.status})`)
  }
  return response.json()
}

export async function fetchSiteSettings(): Promise<{ recentPostsLimit: number }> {
  const response = await fetch('/api/settings')
  if (!response.ok) {
    throw new Error(`Failed to fetch settings (${response.status})`)
  }
  return response.json()
}
