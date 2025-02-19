import { useState } from 'react'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'

interface FileUploadProps {
  type: 'image' | 'video'
  value: string
  onChange: (value: string) => void
  accept?: string
  hint?: string
  className?: string
}

export default function FileUpload({ type, value, onChange, accept, hint, className }: FileUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch(`/api/upload?type=${type}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`
        },
        body: formData
      })

      if (!response.ok) throw new Error('Upload failed')

      const data = await response.json()
      onChange(data.url)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className={className}>
      <div className="space-y-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${type} URL or upload file`}
          className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
        />
        {hint && (
          <p className="text-xs text-zinc-500">{hint}</p>
        )}
        <div className="flex items-center gap-4">
          <label className="relative cursor-pointer">
            <input
              type="file"
              accept={accept || (type === 'image' ? 'image/*' : 'video/*')}
              onChange={handleFileUpload}
              className="hidden"
            />
            <span className="flex items-center gap-2 px-3 py-1 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600">
              <Upload className="w-4 h-4" />
              {uploading ? 'Uploading...' : `Upload ${type}`}
            </span>
          </label>
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-1 text-zinc-400 hover:text-zinc-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {value && type === 'image' && (
        <div className="mt-4 relative aspect-video rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-contain"
          />
        </div>
      )}

      {value && type === 'video' && (
        <video
          src={value}
          controls
          className="mt-4 w-full aspect-video rounded-lg bg-zinc-100 dark:bg-zinc-900"
        />
      )}
    </div>
  )
}
