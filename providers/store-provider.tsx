'use client'
import { useRef } from 'react'
import { usePostsStore } from '@/store/posts'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const initialized = useRef(false)

  if (!initialized.current) {
    initialized.current = true
    usePostsStore.getState().fetchPosts()
  }

  return <>{children}</>
}
