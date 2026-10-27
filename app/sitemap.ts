import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/seo'

const PUBLIC_ROUTES: {
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
}[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/design', priority: 0.85, changeFrequency: 'monthly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl()

  return PUBLIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
