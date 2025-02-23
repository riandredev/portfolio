'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ContentBlockTypes, ContentBlock } from '@/types/post'
type PostCategory = 'development' | 'design'
import { usePostsStore } from '@/store/posts'
import BlockEditor from '@/components/block-editor/block-editor'
import FileUpload from '@/components/file-upload'
import { generateSlug } from '@/lib/utils'
import TechnologyEntry from '@/components/technology-entry'
import { TechnologyEntry as TechnologyEntryType } from '@/types/post'
import { getDefaultTechIcon } from '@/lib/tech-icons'
import { Skeleton } from '@/components/ui/skeleton'

function NewPostSkeleton() {
  return (
    <div className="container px-4 mx-auto py-24 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 p-6">
            <Skeleton className="h-6 w-40 mb-6" />
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
              <div>
                <Skeleton className="h-5 w-32 mb-2" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-8 w-24 rounded-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 p-6">
            <Skeleton className="h-6 w-36 mb-6" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

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
  const [technologies, setTechnologies] = useState<TechnologyEntryType[]>([])
  const [newTechName, setNewTechName] = useState('')
  const [newTechLogo, setNewTechLogo] = useState('')
  const [newTechDarkLogo, setNewTechDarkLogo] = useState('')
  const [newTechUrl, setNewTechUrl] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [category, setCategory] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [isCancelling, setIsCancelling] = useState(false)
  const addPost = usePostsStore((state) => state.addPost)

  const cleanupUploadsInBackground = useCallback(async () => {
    try {
      const cleanupPromises = uploadedFiles.map(fileKey =>
        fetch('/api/files/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileKey })
        }).catch(err => console.error('Failed to delete file:', fileKey, err))
      )

      await Promise.allSettled(cleanupPromises)
    } catch (error) {
      console.error('Cleanup error:', error)
    }
  }, [uploadedFiles])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    return () => {
      if (uploadedFiles.length > 0) {
        cleanupUploadsInBackground()
      }
    }
  }, [uploadedFiles, cleanupUploadsInBackground])

  if (isLoading) return <NewPostSkeleton />

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

      if (!title || !description || !slug || !image || !category) {
        throw new Error('Required fields are missing')
      }

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''
      const formattedImage = image.startsWith('http') ? image : `${baseUrl}${image}`

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
        publishedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        category: category as PostCategory
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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    setSlug(generateSlug(newTitle))
  }

  const handleAddTechnology = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTechName) return

    let techLogo = newTechLogo

    if (!techLogo) {
      const defaultIcon = await getDefaultTechIcon(newTechName)
      if (defaultIcon) {
        techLogo = defaultIcon
      } else {
        alert('Please provide a logo image or use a recognized technology name')
        return
      }
    }

    const newTech: TechnologyEntryType = {
      name: newTechName,
      logo: techLogo,
      darkModeLogo: newTechDarkLogo || undefined,
      useDefaultIcon: !newTechLogo,
      url: newTechUrl || undefined
    }

    setTechnologies([...technologies, newTech])
    setNewTechName('')
    setNewTechLogo('')
    setNewTechDarkLogo('')
    setNewTechUrl('')
  }

  const handleCancel = () => {
    setIsCancelling(true)
    router.back()
    cleanupUploadsInBackground()
  }

  const handleFileUpload = (fileKey: string) => {
    setUploadedFiles(prev => [...prev, fileKey])
  }

  return (
    <div className="container px-4 mx-auto py-24 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium">Create New Post</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
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
                  onFileUpload={handleFileUpload}
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

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as PostCategory)}
                  className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                >
                  <option value="">Select a category</option>
                  <option value="development">Development</option>
                  <option value="design">Design</option>
                </select>
              </div>

            </div>
          </div>

          {/* Technologies */}
          <div className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 p-6 space-y-3">
            <h2 className="text-lg font-medium">Technologies</h2>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <TechnologyEntry
              key={index}
              entry={tech}
              onDelete={() => setTechnologies(technologies.filter((_, i) => i !== index))}
            />
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Technology Name</label>
            <input
              type="text"
              value={newTechName}
              onChange={(e) => setNewTechName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Logo URL (Light Mode)</label>
            <FileUpload
              type="image"
              value={newTechLogo}
              onChange={setNewTechLogo}
              accept="image/png"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Logo URL (Dark Mode - Optional)</label>
            <FileUpload
              type="image"
              value={newTechDarkLogo}
              onChange={setNewTechDarkLogo}
              accept="image/png"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Technology URL (Optional)</label>
            <input
              type="url"
              value={newTechUrl}
              onChange={(e) => setNewTechUrl(e.target.value)}
              placeholder="https://technology-website.com"
              className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent"
            />
          </div>

          <button
            type="button"
            onClick={handleAddTechnology}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
          >
            Add Technology
          </button>
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

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isCancelling}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 disabled:opacity-50"
          >
            {isCancelling ? 'Cancelling...' : 'Cancel'}
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
