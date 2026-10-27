import type { OgLayoutProps } from './og-layout'

export const postsListOgAlt = 'Work by Riandre van der Voorden'

export const postsListOgProps: OgLayoutProps = {
  eyebrow: 'Work',
  title: 'Selected work',
  description:
    'Client sites and personal builds, from agency marketing sites to product UI and full-stack Next.js applications.',
  footer: 'riandre.com/posts',
}

const RESERVED_POST_SLUGS = new Set(['opengraph-image', 'twitter-image'])

/** Next.js can treat `/posts/opengraph-image` as `[slug]` with slug `opengraph-image`. */
export function isPostsListOgSlug(slug: string) {
  return slug === 'opengraph-image'
}

export function isReservedPostSlug(slug: string) {
  return RESERVED_POST_SLUGS.has(slug)
}
