import { create } from 'zustand'
import { Post, PostCategory } from '@/types/post'

interface PostsState {
  posts: Post[]
  isLoading: boolean
  error: string | null
  fetchPosts: () => Promise<void>
  addPost: (post: Omit<Post, '_id'> & { category: PostCategory }) => Promise<Post>
  updatePost: (post: Post & { category: PostCategory }) => Promise<Post>
  deletePost: (id: string) => Promise<void>
  setPosts: (posts: Post[]) => void
}

export const usePostsStore = create<PostsState>((set, get) => ({
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
      if (!post.category) {
        throw new Error('Category is required');
      }

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...post, category: post.category }),
      });

      if (!response.ok) throw new Error('Failed to create post');

      const newPost = await response.json();
      set(state => ({
        posts: [...state.posts, newPost]
      }));
      return newPost;
    } catch (error) {
      console.error('Add post error:', error);
      throw error;
    }
  },

  updatePost: async (post) => {
    try {
      if (!post.category) {
        throw new Error('Category is required');
      }

      const response = await fetch(`/api/posts/${post._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...post, category: post.category }),
      });

      if (!response.ok) throw new Error('Failed to update post');

      const updatedPost = await response.json();
      set(state => ({
        posts: state.posts.map(p => p._id === post._id ? updatedPost : p)
      }));
      return updatedPost;
    } catch (error) {
      console.error('Update post error:', error);
      throw error;
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
