import { useState } from 'react'
import { ListBlock } from '@/types/post'
import { X, Plus } from 'lucide-react'

interface ListBlockEditorProps {
  block: ListBlock
  onChange: (block: ListBlock) => void
  onRemove: () => void
}

export default function ListBlockEditor({ block, onChange, onRemove }: ListBlockEditorProps) {
  const [newItem, setNewItem] = useState('')

  const addItem = () => {
    if (newItem.trim()) {
      onChange({
        ...block,
        items: [...block.items, newItem.trim()]
      })
      setNewItem('')
    }
  }

  const removeItem = (index: number) => {
    onChange({
      ...block,
      items: block.items.filter((_, i) => i !== index)
    })
  }

  const updateItem = (index: number, value: string) => {
    const newItems = [...block.items]
    newItems[index] = value
    onChange({ ...block, items: newItems })
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">List Items</h3>
        <button
          type="button"
          onClick={onRemove}
          className="p-1 text-zinc-400 hover:text-zinc-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        {block.items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              className="flex-1 px-3 py-1 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent"
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="p-1 text-zinc-400 hover:text-zinc-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addItem()}
            placeholder="Add new item and press Enter"
            className="flex-1 px-3 py-1 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent"
          />
          <button
            type="button"
            onClick={addItem}
            className="p-1 text-zinc-400 hover:text-zinc-600"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
