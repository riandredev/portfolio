import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Post } from '@/types/post'

interface PostsStore {
  posts: Post[]
  isLoading: boolean
  error: string | null
  fetchPosts: () => Promise<void>
  addPost: (post: Post) => Promise<void>
  updatePost: (post: Post) => Promise<void>
  deletePost: (id: string) => Promise<void>
  setPosts: (posts: Post[]) => void
}

export const usePostsStore = create<PostsStore>()(
  persist(
    (set, get) => ({
      posts: [],
      isLoading: false,
      error: null,

      setPosts: (newPosts: Post[]) => set({ posts: newPosts }),

      fetchPosts: async () => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch('/api/posts')
          if (!response.ok) throw new Error('Failed to fetch posts')
          const posts = await response.json()
          set({ posts, isLoading: false })
        } catch (error) {
          set({ error: 'Failed to fetch posts', isLoading: false, posts: [] })
          console.error('Error fetching posts:', error)
        }
      },

      addPost: async (post) => {
        try {
          const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
          })

          if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to create post')
          }

          const newPost = await response.json()
          set({ posts: [newPost, ...get().posts] })
          return newPost
        } catch (error) {
          console.error('Error in addPost:', error)
          throw error
        }
      },

      updatePost: async (post) => {
        try {
          const response = await fetch(`/api/posts/${post._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`
            },
            body: JSON.stringify(post)
          })

          const data = await response.json()
          if (!response.ok) throw new Error(data.error || 'Failed to update post')

          set({
            posts: get().posts.map(p => p._id === data._id ? data : p)
          })
          return data
        } catch (error) {
          throw error
        }
      },

      deletePost: async (id) => {
        try {
          const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`
            }
          })

          if (!response.ok) throw new Error('Failed to delete post')
          set({ posts: get().posts.filter(p => p._id !== id) })
        } catch (error) {
          throw error
        }
      }
    }),
    {
      name: 'posts-storage', // unique name for localStorage
      partialize: (state) => ({ posts: state.posts }) // only persist posts array
    }
  )
)
