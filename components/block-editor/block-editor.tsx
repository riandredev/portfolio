import { ContentBlock, ContentBlockTypes, HeadingBlock, ParagraphBlock, CodeBlock, ImageBlock, VideoBlock, NoteBlock, ListBlock } from '@/types/post'
import { Plus, GripVertical } from 'lucide-react'
import HeadingBlockEditor from './heading-block-editor'
import ParagraphBlockEditor from './paragraph-block-editor'
import CodeBlockEditor from './code-block-editor'
import ImageBlockEditor from './image-block-editor'
import VideoBlockEditor from './video-block-editor'
import NoteBlockEditor from './note-block-editor'
import ListBlockEditor from './list-block-editor'

interface BlockEditorProps {
  blocks: ContentBlock[]
  onChange: (blocks: ContentBlock[]) => void
  blockTypes: { type: ContentBlockTypes; label: string }[]
}

const blockTypes: { type: ContentBlockTypes; label: string }[] = [
  { type: 'heading', label: 'Heading' },
  { type: 'paragraph', label: 'Paragraph' },
  { type: 'list', label: 'List' },
  { type: 'code', label: 'Code' },
  { type: 'image', label: 'Image' },
  { type: 'video', label: 'Video' },
  { type: 'note', label: 'Note' },
]

const createNewBlock = (type: ContentBlockTypes): ContentBlock => {
  const baseBlock = {
    id: `block-${Date.now()}`,
    type,
  }

  switch (type) {
    case 'heading':
      return {
        ...baseBlock,
        type: 'heading',
        content: {
          title: '',
          level: 2
        }
      } as HeadingBlock
    case 'paragraph':
      return {
        ...baseBlock,
        type: 'paragraph',
        content: ''
      } as ParagraphBlock
    case 'code':
      return {
        ...baseBlock,
        type: 'code',
        content: '',
        language: 'typescript',
        showLineNumbers: true
      } as CodeBlock
    case 'image':
      return {
        ...baseBlock,
        type: 'image',
        url: ''
      } as ImageBlock
    case 'video':
      return {
        ...baseBlock,
        type: 'video',
        url: ''
      } as VideoBlock
    case 'note':
      return {
        ...baseBlock,
        type: 'note',
        content: '',
        variant: 'info'
      } as NoteBlock
    case 'list':
      return {
        ...baseBlock,
        type: 'list',
        items: []
      } as ListBlock
    default:
      throw new Error(`Unknown block type: ${type}`)
  }
}

export default function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  const addBlock = (type: ContentBlockTypes) => {
    const newBlock = createNewBlock(type)
    onChange([...blocks, newBlock])
  }

  const updateBlock = (index: number, updatedBlock: ContentBlock) => {
    const newBlocks = [...blocks]
    newBlocks[index] = updatedBlock
    onChange(newBlocks)
  }

  const removeBlock = (index: number) => {
    const newBlocks = blocks.filter((_, i) => i !== index)
    onChange(newBlocks)
  }

  const moveBlock = (fromIndex: number, toIndex: number) => {
    const newBlocks = [...blocks]
    const [movedBlock] = newBlocks.splice(fromIndex, 1)
    newBlocks.splice(toIndex, 0, movedBlock)
    onChange(newBlocks)
  }

  const renderBlockEditor = (block: ContentBlock, index: number) => {
    const commonProps = {
      onRemove: () => removeBlock(index)
    }

    switch (block.type) {
      case 'heading':
        return (
          <HeadingBlockEditor
            {...commonProps}
            block={block}
            onChange={(updatedBlock) => updateBlock(index, updatedBlock)}
          />
        )
      case 'paragraph':
        return (
          <ParagraphBlockEditor
            {...commonProps}
            block={block}
            onChange={(updatedBlock) => updateBlock(index, updatedBlock)}
          />
        )
      case 'code':
        return (
          <CodeBlockEditor
            {...commonProps}
            block={block}
            onChange={(updatedBlock) => updateBlock(index, updatedBlock)}
          />
        )
      case 'image':
        return (
          <ImageBlockEditor
            {...commonProps}
            block={block}
            onChange={(updatedBlock) => updateBlock(index, updatedBlock)}
          />
        )
      case 'video':
        return (
          <VideoBlockEditor
            {...commonProps}
            block={block}
            onChange={(updatedBlock) => updateBlock(index, updatedBlock)}
          />
        )
      case 'note':
        return (
          <NoteBlockEditor
            {...commonProps}
            block={block}
            onChange={(updatedBlock) => updateBlock(index, updatedBlock)}
          />
        )
      case 'list':
        return (
          <ListBlockEditor
            {...commonProps}
            block={block}
            onChange={(updatedBlock) => updateBlock(index, updatedBlock)}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Content Blocks</h2>
        <div className="flex gap-2">
          {blockTypes.map(({ type, label }) => (
            <button
              key={type}
              type="button"
              onClick={() => addBlock(type)}
              className="flex items-center gap-1 px-3 py-1 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
            >
              <Plus className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {blocks.map((block, index) => (
          <div
            key={block.id}
            className="flex items-start gap-4 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
          >
            <button
              type="button"
              className="p-2 text-zinc-400 hover:text-zinc-600 cursor-move"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', index.toString())
              }}
              onDragOver={(e) => {
                e.preventDefault()
              }}
              onDrop={(e) => {
                e.preventDefault()
                const fromIndex = parseInt(e.dataTransfer.getData('text/plain'))
                moveBlock(fromIndex, index)
              }}
            >
              <GripVertical className="w-4 h-4" />
            </button>
            {renderBlockEditor(block, index)}
          </div>
        ))}
      </div>
    </div>
  )
}
