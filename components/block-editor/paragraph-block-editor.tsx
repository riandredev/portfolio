import { ParagraphBlock } from '@/types/post'
import { X, Maximize2, Minimize2, Link } from 'lucide-react'
import { useState } from 'react'

interface ParagraphBlockEditorProps {
  block: ParagraphBlock
  onChange: (block: ParagraphBlock) => void
  onRemove: () => void
}

export default function ParagraphBlockEditor({ block, onChange, onRemove }: ParagraphBlockEditorProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkText, setLinkText] = useState('')
  const [linkUrl, setLinkUrl] = useState('')

  const insertLink = () => {
    if (!linkText || !linkUrl) return

    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const linkMd = `[${linkText}](${linkUrl})`

    const newContent =
      block.content.substring(0, start) +
      linkMd +
      block.content.substring(end)

    onChange({ ...block, content: newContent })
    setShowLinkInput(false)
    setLinkText('')
    setLinkUrl('')
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-zinc-400 hover:text-zinc-600 flex items-center gap-1 text-sm"
              >
                {isExpanded ? (
                  <>
                    <Minimize2 className="w-4 h-4" />
                    Collapse
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-4 h-4" />
                    Expand
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowLinkInput(!showLinkInput)}
                className="text-zinc-400 hover:text-zinc-600 flex items-center gap-1 text-sm"
              >
                <Link className="w-4 h-4" />
                Add Link
              </button>
            </div>
          </div>

          {showLinkInput && (
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="Link text"
                className="flex-1 px-2 py-1 text-sm rounded border border-zinc-200 dark:border-zinc-700 bg-transparent"
              />
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="URL"
                className="flex-1 px-2 py-1 text-sm rounded border border-zinc-200 dark:border-zinc-700 bg-transparent"
              />
              <button
                onClick={insertLink}
                className="px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Insert
              </button>
            </div>
          )}

          <textarea
            value={block.content}
            onChange={(e) => onChange({ ...block, content: e.target.value })}
            placeholder="Enter paragraph text. Use [text](url) for links and `code` for inline code."
            rows={isExpanded ? 12 : 3}
            className={`w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700
              bg-transparent resize-none transition-all duration-200 ease-in-out
              ${isExpanded ? 'h-[300px]' : 'h-[80px]'}`}
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
    </div>
  )
}
