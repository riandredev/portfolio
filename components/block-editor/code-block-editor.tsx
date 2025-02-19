import { CodeBlock } from '@/types/post'
import { X, Maximize2, Minimize2 } from 'lucide-react'
import { useState } from 'react'

interface CodeBlockEditorProps {
  block: CodeBlock
  onChange: (block: CodeBlock) => void
  onRemove: () => void
}

const LANGUAGES = [
  'typescript',
  'javascript',
  'jsx',
  'tsx',
  'html',
  'css',
  'json',
  'rust',
  'python',
  'bash',
]

export default function CodeBlockEditor({ block, onChange, onRemove }: CodeBlockEditorProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={block.title || ''}
          onChange={(e) => onChange({ ...block, title: e.target.value })}
          placeholder="File name or title (optional)"
          className="flex-1 px-3 py-1 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent"
        />
        <select
          value={block.language || 'typescript'}
          onChange={(e) => onChange({ ...block, language: e.target.value })}
          className="px-3 py-1 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={block.showLineNumbers}
            onChange={(e) => onChange({ ...block, showLineNumbers: e.target.checked })}
            className="rounded border-zinc-200 dark:border-zinc-700"
          />
          <span className="text-sm">Line numbers</span>
        </label>
        <button
          type="button"
          onClick={onRemove}
          className="p-1 text-zinc-400 hover:text-zinc-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
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
          placeholder="Enter code"
          className={`w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700
            bg-transparent font-mono resize-none transition-all duration-200 ease-in-out
            ${isExpanded ? 'h-[400px]' : 'h-[120px]'}`}
        />
      </div>
    </div>
  )
}
