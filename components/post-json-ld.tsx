import { Post } from '@/types/post'
import { absoluteUrl } from '@/lib/seo'

export default function PostJsonLd({ post }: { post: Post }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.image ? [post.image] : undefined,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: 'Riandre van der Voorden',
      url: absoluteUrl('/about'),
    },
    publisher: {
      '@type': 'Person',
      name: 'Riandre van der Voorden',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(`/posts/${post.slug}`),
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
