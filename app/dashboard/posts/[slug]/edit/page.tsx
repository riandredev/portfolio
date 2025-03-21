'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ContentBlock, Post, ContentBlockTypes, PostCategory, ProjectType } from '@/types/post'
import { usePostsStore } from '@/store/posts'
import BlockEditor from '@/components/block-editor/block-editor'
import FileUpload from '@/components/file-upload'
import { generateSlug } from '@/lib/utils'
import TechnologyEntry from '@/components/technology-entry'
import { TechnologyEntry as TechnologyEntryType } from '@/types/post'
import { getDefaultTechIcon } from '@/lib/tech-icons'

export default function EditPostPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const { posts, updatePost } = usePostsStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [slug, setSlug] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [image, setImage] = useState('')
  const [video, setVideo] = useState('')
  const [blocks, setBlocks] = useState<ContentBlock[]>([])
  const [demoUrl, setDemoUrl] = useState<string | null>('')
  const [sourceUrl, setSourceUrl] = useState<string | null>('')
  const [pinned, setPinned] = useState(false)
  const [logo, setLogo] = useState('')
  const [technologies, setTechnologies] = useState<TechnologyEntryType[]>([])
  const [newTechName, setNewTechName] = useState('')
  const [newTechLogo, setNewTechLogo] = useState('')
  const [newTechDarkLogo, setNewTechDarkLogo] = useState('')
  const [newTechUrl, setNewTechUrl] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [publishDate, setPublishDate] = useState('')
  const [projectType, setProjectType] = useState<ProjectType>('personal')

  const blockTypes: { type: ContentBlockTypes; label: string }[] = [
    { type: 'heading', label: 'Heading' },
    { type: 'paragraph', label: 'Paragraph' },
    { type: 'code', label: 'Code' },
    { type: 'image', label: 'Image' },
    { type: 'video', label: 'Video' },
    { type: 'note', label: 'Note' },
  ]

  useEffect(() => {
    const post = posts.find(p => p.slug === params.slug)
    if (post) {
      console.log("Loading post data:", post)
      console.log("Post project type:", post.projectType)

      setTitle(post.title)
      setDescription(post.description)
      setSlug(post.slug)
      setTags(post.tags)
      setImage(post.image)
      setVideo(post.video || '')
      setBlocks(post.content?.blocks || [])
      setDemoUrl(post.demoUrl || '')
      setSourceUrl(post.sourceUrl || '')
      setPinned(post.pinned || false)
      setLogo(post.logo || '')
      setTechnologies(post.technologies || [])
      setProjectType((post.projectType || 'personal') as ProjectType)
      setCategories(post.category ? post.category.split(',') : [])
      setPublishDate(post.publishedAt || '')

      console.log("Project type set to:", post.projectType || 'personal')
    }
  }, [params.slug, posts])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const existingPost = posts.find(p => p.slug === params.slug)
      if (!existingPost || !existingPost._id) {
        throw new Error('Post not found')
      }

      // Add logging to debug category handling
      console.log('Categories before forming category string:', categories);
      const categoryString = categories.length > 0 ? categories.join(',') : 'development';
      console.log('Final category string:', categoryString);

      const updatedPost: Post = {
        _id: existingPost._id,
        title,
        description,
        slug,
        tags,
        image,
        video: video || undefined,
        demoUrl: demoUrl === '' ? null : demoUrl,
        sourceUrl: sourceUrl === '' ? null : sourceUrl,
        pinned,
        logo: logo || undefined,
        content: {
          blocks
        },
        technologies,
        category: categoryString as PostCategory,
        publishedAt: publishDate ? new Date(publishDate).toISOString() : existingPost.publishedAt,
        projectType,
        published: existingPost.published,
        createdAt: existingPost.createdAt,
        updatedAt: new Date().toISOString()
      }

      await updatePost(updatedPost)
      router.push('/dashboard/posts')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
      setError(`Failed to update post: ${errorMessage}`)
      console.error('Update error:', err)
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

  const handleAddTechnology = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTechName) return

    let techLogo = newTechLogo

    // If no logo provided, try to get a default one
    if (!techLogo) {
      const defaultIcon = await getDefaultTechIcon(newTechName)
      if (defaultIcon) {
        techLogo = defaultIcon
      } else {
        // Alert user if no logo was provided and no default found
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

  return (
    <div className="container px-4 mx-auto py-24 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium">Edit Post</h1>
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
                  onChange={(e) => {
                    setTitle(e.target.value)
                    // Only auto-update slug if it matches the original generated slug
                    if (slug === generateSlug(title)) {
                      setSlug(generateSlug(e.target.value))
                    }
                  }}
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
                  pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
                  required
                />
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
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={pinned}
                    onChange={(e) => setPinned(e.target.checked)}
                    className="rounded border-zinc-200 dark:border-zinc-700"
                  />
                  <span className="text-sm">Pin this post</span>
                </label>
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
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={demoUrl || ''}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  />
                  {demoUrl && (
                    <button
                      type="button"
                      onClick={() => setDemoUrl(null)}
                      className="px-3 py-2 rounded-lg bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400"
                      title="Remove demo URL"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Source Code URL (optional)</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={sourceUrl || ''}
                    onChange={(e) => setSourceUrl(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  />
                  {sourceUrl && (
                    <button
                      type="button"
                      onClick={() => setSourceUrl(null)}
                      className="px-3 py-2 rounded-lg bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400"
                      title="Remove source code URL"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>                      </svg>
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Categories</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={categories.includes('development')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCategories([...categories, 'development']);
                        } else {
                          setCategories(categories.filter(c => c !== 'development'));
                        }
                      }}
                      className="rounded border-zinc-200 dark:border-zinc-700"
                    />
                    <span>Development</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={categories.includes('design')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCategories([...categories, 'design']);
                        } else {
                          setCategories(categories.filter(c => c !== 'design'));
                        }
                      }}
                      className="rounded border-zinc-200 dark:border-zinc-700"
                    />
                    <span>Design</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Publish Date (optional)</label>
                <input
                  type="datetime-local"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Project Type</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={projectType === 'personal'}
                      onChange={() => {
                        setProjectType('personal');
                        console.log("Changed project type to: personal");
                      }}
                      className="rounded-full border-zinc-200 dark:border-zinc-700 text-blue-500"
                    />
                    <span>Personal Project</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={projectType === 'professional'}
                      onChange={() => {
                        setProjectType('professional');
                        console.log("Changed project type to: professional");
                      }}
                      className="rounded-full border-zinc-200 dark:border-zinc-700 text-blue-500"
                    />
                    <span>Professional Work</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 p-6 space-y-6">
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
                  className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
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
                  className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
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
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
