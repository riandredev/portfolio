import type { OgLayoutProps } from './og-layout'

export const postsListOgAlt = 'Projects by Riandre van der Voorden'

export const postsListOgProps: OgLayoutProps = {
  eyebrow: 'Projects',
  title: 'Featured work',
  description:
    'Professional client projects and personal builds — from product UI to full-stack Next.js applications.',
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
