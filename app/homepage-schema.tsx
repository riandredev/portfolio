import { absoluteUrl } from '@/lib/seo'

export default function HomepageSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Riandre van der Voorden',
    jobTitle: 'Front-end engineer',
    url: absoluteUrl('/'),
    sameAs: [
      'https://github.com/riandredev',
      'https://linkedin.com/in/riandre',
      'https://mastodon.social/@riandre',
    ],
    description:
      'Front-end engineer in Gauteng, South Africa, building React and Next.js products with attention to typography, layout, and performance.',
    image: absoluteUrl('/me.jpg'),
    alumniOf: {
      '@type': 'Organization',
      name: 'CTU Training Solutions',
    },
    knowsAbout: [
      'Software Development',
      'React',
      'Next.js',
      'TypeScript',
      'Full Stack Development',
      'Web Development',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
