import SeparatorBlock from "@/components/content-blocks/separator-block";

export type PostCategory = 'development' | 'design';

export interface Post {
  _id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  tags: string[];
  category: PostCategory;
  published: boolean;
  pinned?: boolean;
  video?: string | null;
  demoUrl?: string | null;
  sourceUrl?: string | null;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  content?: {
    blocks: ContentBlock[];
  } | null;
  logo?: string | null;
  temporary?: boolean;
  technologies?: TechnologyEntry[] | null;
}

export type ContentBlockTypes =
  | 'heading'
  | 'paragraph'
  | 'code'
  | 'image'
  | 'video'
  | 'note'
  | 'list'
  | 'separator';

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
  | ListBlock
  | SeparatorBlock;

export type TechnologyEntry = {
  name: string;
  logo: string;
  darkModeLogo?: string;
  useDefaultIcon?: boolean;
  url?: string;
}
