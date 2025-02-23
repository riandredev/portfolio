import { useState, useEffect, useCallback } from 'react'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'
import { useUploadThing } from "@/lib/uploadthing"
import { toast } from "sonner"

interface FileUploadProps {
  type: 'image' | 'video'
  value: string
  onChange: (value: string) => void
  accept?: string
  hint?: string
  className?: string
  onFileUpload?: (fileKey: string) => void; // Add this prop
}

export default function FileUpload({ type, value, onChange, accept, hint, className, onFileUpload }: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [fileKey, setFileKey] = useState<string>('')

  const { startUpload } = useUploadThing(
    type === 'image' ? "imageUploader" : "videoUploader",
    {
      onClientUploadComplete: (res) => {
        if (res?.[0]) {
          // Use ufsUrl instead of url
          onChange(res[0].ufsUrl)
          // Store the fileKey for potential cleanup
          const key = res[0].key
          setFileKey(key)
          onFileUpload?.(key)
          toast.success("File uploaded successfully")
        }
        setUploading(false)
      },
      onUploadError: (err) => {
        toast.error("Upload failed: " + err.message)
        setUploading(false)
      },
    }
  )

  // Cleanup function
  const deleteFile = useCallback(async () => {
    if (fileKey) {
      try {
        await fetch('/api/upload/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileKey })
        })
      } catch (error) {
        console.error('Failed to delete file:', error)
      }
    }
  }, [fileKey])

  // Call deleteFile when component unmounts if value is empty
  useEffect(() => {
    return () => {
      if (!value && fileKey) {
        deleteFile()
      }
    }
  }, [value, fileKey, deleteFile])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      await startUpload([file])
    } catch (error) {
      console.error('Upload failed:', error)
      toast.error("Upload failed - please try again")
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
