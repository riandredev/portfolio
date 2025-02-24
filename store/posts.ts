import { create } from 'zustand'
import { Post, PostCategory } from '@/types/post'

async function deleteMedia(url: string) {
  try {
    await fetch('/api/uploadthing/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
  } catch (error) {
    console.error('Failed to delete media:', error);
  }
}

interface PostsState {
  posts: Post[]
  isLoading: boolean
  error: string | null
  hasInitialized: boolean // Add this to track initial load
  fetchPosts: () => Promise<void>
  addPost: (post: Omit<Post, '_id'> & { category: PostCategory }) => Promise<Post>
  updatePost: (post: Post & { category: PostCategory }) => Promise<Post>
  deletePost: (id: string) => Promise<void>
  setPosts: (posts: Post[]) => void
}

export const usePostsStore = create<PostsState>((set, get) => ({
  posts: [],
  isLoading: false, // Start with false
  error: null,
  hasInitialized: false,

  setPosts: (newPosts: Post[]) => set({ posts: newPosts }),

  fetchPosts: async () => {
    // If already fetching or initialized, don't fetch again
    if (get().isLoading || (get().hasInitialized && get().posts.length > 0)) {
      return;
    }

    set({ isLoading: true, error: null });
    console.log('Fetching posts...'); // Debug log

    try {
      const response = await fetch('/api/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch posts');
      }

      const data = await response.json();
      console.log('Received posts:', data); // Debug log

      if (!Array.isArray(data)) {
        throw new Error('Invalid response format - expected an array');
      }

      set({
        posts: data,
        isLoading: false,
        error: null,
        hasInitialized: true
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch posts',
        isLoading: false,
        posts: [],
        hasInitialized: true
      });
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

      const post = get().posts.find(p => p._id === id)
      if (!post) throw new Error('Post not found')

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

      // Delete associated media
      if (post.image) await deleteMedia(post.image)
      if (post.video) await deleteMedia(post.video)
      if (post.logo) await deleteMedia(post.logo)

      // Delete media from content blocks
      post.content?.blocks?.forEach(async (block) => {
        if ('url' in block && block.url) {
          await deleteMedia(block.url)
        }
      })

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
