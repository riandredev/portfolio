import { HeadingBlock } from '@/types/post'
import { X } from 'lucide-react'

interface HeadingBlockEditorProps {
  block: HeadingBlock
  onChange: (block: HeadingBlock) => void
  onRemove: () => void
}

export default function HeadingBlockEditor({ block, onChange, onRemove }: HeadingBlockEditorProps) {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center gap-4">
        <select
          value={block.content.level}
          onChange={(e) => onChange({
            ...block,
            content: { ...block.content, level: Number(e.target.value) as 2 | 3 }
          })}
          className="px-3 py-1 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent"
        >
          <option value={2}>Heading 2</option>
          <option value={3}>Heading 3</option>
        </select>

        <input
          type="text"
          value={block.content.title}
          onChange={(e) => onChange({
            ...block,
            content: { ...block.content, title: e.target.value }
          })}
          placeholder="Heading text"
          className="flex-1 px-3 py-1 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent"
        />

        {block.content.level === 2 && (
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={block.content.underline}
              onChange={(e) => onChange({
                ...block,
                content: { ...block.content, underline: e.target.checked }
              })}
              className="rounded border-zinc-200 dark:border-zinc-700"
            />
            <span className="text-sm">Underline</span>
          </label>
        )}

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
