import { useState } from 'react'
import { ImageBlock } from '@/types/post'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'
import { useUploadThing } from "@/lib/uploadthing";

interface ImageBlockEditorProps {
  block: ImageBlock
  onChange: (block: ImageBlock) => void
  onRemove: () => void
}

export default function ImageBlockEditor({ block, onChange, onRemove }: ImageBlockEditorProps) {
  const [uploading, setUploading] = useState(false)

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      if (res?.[0]) {
        onChange({ ...block, url: res[0].url })
      }
      setUploading(false)
    },
    onUploadError: (err) => {
      console.error('Upload failed:', err)
      setUploading(false)
    },
  })

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      await startUpload([file])
    } catch (error) {
      console.error('Upload failed:', error)
      setUploading(false)
    }
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <label className="relative cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <span className="flex items-center gap-2 px-3 py-1 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600">
              <Upload className="w-4 h-4" />
              {uploading ? 'Uploading...' : 'Upload Image'}
            </span>
          </label>
          <input
            type="text"
            value={block.url || ''}
            onChange={(e) => onChange({ ...block, url: e.target.value })}
            placeholder="Or enter image URL"
            className="flex-1 px-3 py-1 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent"
          />
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="p-1 text-zinc-400 hover:text-zinc-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {block.url && (
        <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={block.url}
            alt="Preview"
            fill
            className="object-contain"
          />
        </div>
      )}

      <input
        type="text"
        value={block.caption || ''}
        onChange={(e) => onChange({ ...block, caption: e.target.value })}
        placeholder="Image caption (optional)"
        className="w-full px-3 py-1 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent"
      />
    </div>
  )
}
