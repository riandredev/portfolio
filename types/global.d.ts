import { Post } from './post'

declare global {
  interface Window {
    __PRELOADED_POSTS__?: Post[]
  }
}

export {}
