import type { MetadataRoute } from 'next'
import { connectToDatabase } from '@/lib/mongodb'
import { isReservedPostSlug } from '@/lib/og/posts-list'
import { getSiteUrl } from '@/lib/seo'

const STATIC_ROUTES: {
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
}[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/design', priority: 0.85, changeFrequency: 'monthly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path, priority, changeFrequency }) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    }),
  )

  const { db } = await connectToDatabase()
  const posts = await db
    .collection('posts')
    .find(
      { published: true },
      { projection: { slug: 1, updatedAt: 1, publishedAt: 1 } },
    )
    .toArray()

  const projectEntries: MetadataRoute.Sitemap = posts
    .filter((post) => post.slug && !isReservedPostSlug(String(post.slug)))
    .map((post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: post.updatedAt || post.publishedAt || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  return [...staticEntries, ...projectEntries]
}
