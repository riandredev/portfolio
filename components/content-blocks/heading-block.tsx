interface HeadingBlockProps {
  content: {
    title: string;
    level: 2 | 3;
    underline?: boolean;
  };
}

export default function HeadingBlock({ content }: HeadingBlockProps) {
  const Tag = content.level === 2 ? 'h2' : 'h3';
  const id = content.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    // Updated padding classes for responsiveness
    <div className="px-4 sm:px-12">
      <Tag
        id={id}
        className={`
          font-light
          ${content.level === 2 ? 'text-xl sm:text-2xl lg:text-3xl mb-6' : 'text-lg sm:text-xl lg:text-2xl mb-4'}
          ${content.level === 2 && content.underline ? 'pb-4 border-b border-zinc-200 dark:border-zinc-800' : ''}
        `}
      >
        {content.title}
      </Tag>
    </div>
  );
}
