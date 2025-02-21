'use client'

import { useEffect, useRef } from 'react'
import { usePostsStore } from '@/store/posts'
import { useVisitorsStore } from '@/store/visitors'

export default function PreloadPosts() {
  const initialized = useRef(false)
  const { posts, setPosts } = usePostsStore()
  const { lastVisitor } = useVisitorsStore()

  useEffect(() => {
    if (!initialized.current) {
      // Initialize posts from window
      if (window.__PRELOADED_POSTS__ && posts.length === 0) {
        setPosts(window.__PRELOADED_POSTS__)
      }
      // Only fetch latest visitor if don't have one stored
      if (!lastVisitor) {
        useVisitorsStore.getState().fetchLatestVisitor()
      }
      initialized.current = true
    }
  }, [posts.length, setPosts, lastVisitor])

  return null
}
