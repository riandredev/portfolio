export const postsKeys = {
  all: ['posts'] as const,
  list: () => [...postsKeys.all, 'list'] as const,
  full: () => [...postsKeys.all, 'full'] as const,
  detail: (slug: string) => [...postsKeys.all, 'detail', slug] as const,
}

export const settingsKeys = {
  all: ['settings'] as const,
}
