'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ContentBlockTypes, ContentBlock } from '@/types/post' // Add Post type
import { usePostsStore } from '@/store/posts'
import BlockEditor from '@/components/block-editor/block-editor'
import FileUpload from '@/components/file-upload'
import { generateSlug } from '@/lib/utils'

export default function NewPostPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [slug, setSlug] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [image, setImage] = useState('')
  const [video, setVideo] = useState('')
  const [blocks, setBlocks] = useState<ContentBlock[]>([])
  const [demoUrl, setDemoUrl] = useState('')
  const [sourceUrl, setSourceUrl] = useState('')
  const [logo, setLogo] = useState('')

  const addPost = usePostsStore((state) => state.addPost)

  const blockTypes: { type: ContentBlockTypes; label: string }[] = [
    { type: 'heading', label: 'Heading' },
    { type: 'paragraph', label: 'Paragraph' },
    { type: 'code', label: 'Code' },
    { type: 'image', label: 'Image' },
    { type: 'video', label: 'Video' },
    { type: 'note', label: 'Note' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Add logging to help debug
      console.log('Submitting post:', {
        title,
        description,
        slug,
        tags,
        image,
        video,
        demoUrl,
        sourceUrl,
        logo,
        blocks
      })

      // Validate required fields
      if (!title || !description || !slug || !image) {
        throw new Error('Required fields are missing')
      }

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''
      const formattedImage = image.startsWith('http') ? image : `${baseUrl}${image}`

      // Create new post using the store
      const newPost = {
        _id: `temp-${Date.now()}`,
        title,
        description,
        slug,
        tags,
        image: formattedImage,
        video: video ? (video.startsWith('http') ? video : `${baseUrl}${video}`) : undefined,
        demoUrl: demoUrl || undefined,
        sourceUrl: sourceUrl || undefined,
        logo: logo || undefined,
        content: {
          blocks
        },
        publishedAt: new Date().toISOString(), // Add publish date
        createdAt: new Date().toISOString()    // Add creation date
      }

      console.log('Attempting to add post:', newPost)
      await addPost(newPost)

      router.push('/dashboard/posts')
    } catch (err: Error | unknown) {
      console.error('Error creating post:', err)
      setError(err instanceof Error ? err.message : 'Failed to create post')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput('')
    }
  }

  // Auto-generate slug when title changes
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    setSlug(generateSlug(newTitle))
  }

  return (
    <div className="container px-4 mx-auto py-24 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium">Create New Post</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 p-6 space-y-6">
            <h2 className="text-lg font-medium">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Slug (URL-friendly version of title)
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  placeholder="your-post-title"
                  pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
                  title="Only lowercase letters, numbers, and hyphens are allowed. Cannot start or end with a hyphen."
                  required
                />
                <p className="mt-1 text-xs text-zinc-500">
                  This will be the URL of your post: /posts/<span className="font-mono">{slug || 'your-post-title'}</span>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => setTags(tags.filter((t) => t !== tag))}
                        className="ml-2 text-zinc-500 hover:text-zinc-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Press Enter to add tags"
                  className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Featured Image</label>
                <FileUpload
                  type="image"
                  value={image}
                  onChange={setImage}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Logo (displays on hover)</label>
                <FileUpload
                  type="image"
                  value={logo}
                  onChange={setLogo}
                  accept="image/png"
                  hint="Preferably a transparent PNG"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Video (optional)</label>
                <FileUpload
                  type="video"
                  value={video}
                  onChange={setVideo}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Demo URL (optional)</label>
                <input
                  type="url"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="https://demo.example.com"
                  className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Source Code URL (optional)</label>
                <input
                  type="url"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder="https://github.com/username/project"
                  className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>
            </div>
          </div>

          {/* Content Blocks */}
          <div className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 p-6">
            <BlockEditor
              blocks={blocks}
              onChange={setBlocks}
              blockTypes={blockTypes}
            />
          </div>

          <div className="flex justify-end gap-4">
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
