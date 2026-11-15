import { absoluteUrl } from '@/lib/seo'

export default function HomepageSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Riandre van der Voorden',
    jobTitle: 'Front-end Engineer · UI Engineer',
    url: absoluteUrl('/'),
    sameAs: [
      'https://github.com/riandredev',
      'https://linkedin.com/in/riandre',
      'https://mastodon.social/@riandre',
    ],
    description:
      'Front-end engineer with 2+ years shipping production Next.js, React and TypeScript apps. Founding engineer at Kliio. 30+ client sites at PixelMeta with 40% average Lighthouse improvement. Strong UI/UX in Figma, accessible fast front ends. Remote, based in South Africa (UTC+2).',
    image: absoluteUrl('/me.jpg'),
    alumniOf: {
      '@type': 'Organization',
      name: 'CTU Training Solutions',
    },
    knowsAbout: [
      'TypeScript',
      'JavaScript',
      'React',
      'Next.js',
      'Astro',
      'Vue.js',
      'Electron',
      'Tailwind CSS',
      'Figma',
      'WCAG Accessibility',
      'Core Web Vitals',
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
