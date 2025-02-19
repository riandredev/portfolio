import { ContentBlock } from '@/types/post'
import CodeBlock from './code-block'
import ImageBlock from './image-block'
import VideoBlock from './video-block'
import ParagraphBlock from './paragraph-block'
import ListBlock from './list-block'
import HeadingBlock from './heading-block'
import NoteBlock from './note-block'
import SeparatorBlock from './separator-block'

interface ContentBlocksProps {
  blocks: ContentBlock[]
}

export default function ContentBlocks({ blocks }: ContentBlocksProps) {
    const renderBlock = (block: ContentBlock) => {
      switch (block.type) {
        case 'code':
          // Enhanced cleaning process
          const cleanedContent = typeof block.content === 'string'
            ? block.content
                .replace(/^```\w*\s*\n?|```$/g, '') // Better regex for code fence removal
                .trim()
            : '';

          return (
            <CodeBlock
              key={block.id}
              content={cleanedContent}
              language={block.language}
              title={block.title}
              showLineNumbers={block.showLineNumbers}
            />
          );
      case 'image':
        return <ImageBlock key={block.id} url={block.url} caption={block.caption} />;
      case 'video':
        return <VideoBlock key={block.id} url={block.url} caption={block.caption} />;
      case 'paragraph':
        return <ParagraphBlock key={block.id} content={block.content} />;
      case 'list':
        return Array.isArray(block.content)
          ? <ListBlock key={block.id} items={block.content} />
          : <ListBlock key={block.id} items={block.items} />;
      case 'heading':
        return <HeadingBlock key={block.id} content={block.content} />;
      case 'note':
        return <NoteBlock key={block.id} content={block.content} variant={block.variant} />;
      case 'separator':
        return <SeparatorBlock key={block.id} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {blocks.map(renderBlock)}
    </div>
  );
}
