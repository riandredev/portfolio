import { create } from 'zustand'
import { Post } from '@/types/post'

interface PostsStore {
  posts: Post[]
  isLoading: boolean
  error: string | null
  fetchPosts: () => Promise<void>
  addPost: (post: Post) => Promise<void>
  updatePost: (post: Post) => Promise<Post>
  deletePost: (id: string) => Promise<void>
  setPosts: (posts: Post[]) => void
}

export const usePostsStore = create<PostsStore>()((set, get) => ({
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
        body: JSON.stringify({
          ...post,
          temporary: post.temporary || false
        })
      });

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
      if (!post._id) {
        throw new Error('Post ID is required')
      }

      const response = await fetch(`/api/posts/${post._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post)
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Server response:', errorData)
        throw new Error(errorData.message || errorData.error || 'Failed to update post')
      }

      const updatedPost = await response.json()
      console.log('Updated post:', updatedPost) // Debug log

      // Update local state with the new post data
      set((state) => ({
        posts: state.posts.map((p) =>
          p._id === post._id ? { ...updatedPost, _id: post._id } : p
        )
      }))

      return updatedPost
    } catch (error) {
      console.error('Update error:', error)
      throw error instanceof Error ? error : new Error('Failed to update post')
    }
  },

  deletePost: async (id) => {
    try {
      // For posts with temporary IDs (for new unsaved posts), just remove from local state
      if (id.startsWith('temp-')) {
        set((state) => ({
          posts: state.posts.filter(p => p._id !== id)
        }))
        return
      }

      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete post')
      }

      // Update local state
      set((state) => ({
        posts: state.posts.filter(p => p._id !== id)
      }))
    } catch (error) {
      console.error('Delete error:', error)
      throw error
    }
  }
}))
