import { NoteBlock } from '@/types/post'
import { X, Maximize2, Minimize2 } from 'lucide-react'
import { useState } from 'react'

interface NoteBlockEditorProps {
  block: NoteBlock
  onChange: (block: NoteBlock) => void
  onRemove: () => void
}

const NOTE_VARIANTS = ['info', 'warning', 'tip'] as const

export default function NoteBlockEditor({ block, onChange, onRemove }: NoteBlockEditorProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-start gap-4">
        <div className="flex-1 space-y-2">
          <div>
            <div className="flex items-center justify-between mb-2">
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
            </div>
            <textarea
              value={block.content}
              onChange={(e) => onChange({ ...block, content: e.target.value })}
              placeholder="Enter note text"
              className={`w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700
                bg-transparent resize-none transition-all duration-200 ease-in-out
                ${isExpanded ? 'h-[300px]' : 'h-[80px]'}`}
            />
          </div>
          <select
            value={block.variant || 'info'}
            onChange={(e) => onChange({ ...block, variant: e.target.value as typeof NOTE_VARIANTS[number] })}
            className="px-3 py-1 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent"
          >
            {NOTE_VARIANTS.map((variant) => (
              <option key={variant} value={variant}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </option>
            ))}
          </select>
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
