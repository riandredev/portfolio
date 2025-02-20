import SeparatorBlock from "@/components/content-blocks/separator-block";

export type Post = {
  _id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  tags: string[];
  pinned?: boolean;
  video?: string;
  demoUrl?: string;
  sourceUrl?: string;
  publishedAt?: string;
  createdAt?: string;  // Add this
  updatedAt?: string;  // Add this
  content?: {
    blocks: ContentBlock[];
  };
  logo?: string; // Added to match PostCard props
  temporary?: boolean;  // New field
  technologies?: TechnologyEntry[];
}

export type ContentBlockTypes =
  | 'heading'
  | 'paragraph'
  | 'code'
  | 'image'
  | 'video'
  | 'note'
  | 'list'  // Add list type
  | 'separator';  // Add separator type

export type ContentBlockBase = {
  id: string;
  type: ContentBlockTypes;
}

export type HeadingBlock = ContentBlockBase & {
  type: 'heading';
  content: {
    title: string;
    level: 2 | 3;
    underline?: boolean;
  };
}

export type ParagraphBlock = ContentBlockBase & {
  type: 'paragraph';
  content: string;
}

export type CodeBlock = ContentBlockBase & {
  type: 'code';
  content: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export type ImageBlock = ContentBlockBase & {
  type: 'image';
  url: string;
  caption?: string;
}

export type VideoBlock = ContentBlockBase & {
  type: 'video';
  url: string;
  caption?: string;
}

export type NoteBlock = ContentBlockBase & {
  type: 'note';
  content: string;
  variant?: 'info' | 'warning' | 'tip';
}

export type ListBlock = ContentBlockBase & {
  type: 'list';
  items: string[];
}

export type SeparatorBlock = ContentBlockBase & {
  type: 'separator';
}

export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | CodeBlock
  | ImageBlock
  | VideoBlock
  | NoteBlock
  | ListBlock  // Add ListBlock to union type
  | SeparatorBlock;

export type TechnologyEntry = {
  name: string;
  logo: string;
  darkModeLogo?: string;
  useDefaultIcon?: boolean; // Add this field
  url?: string; // Add this line
}
