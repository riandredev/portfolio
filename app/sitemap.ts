import { MetadataRoute } from 'next'
import { connectToDatabase } from '@/lib/mongodb'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://riandre.com'

  // Get all post slugs from database
  const { db } = await connectToDatabase()
  const posts = await db.collection('posts').find({}, { projection: { slug: 1, updatedAt: 1 } }).toArray()

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/posts',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic post routes
  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.updatedAt || new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...postRoutes]
}
