interface ListBlockProps {
  items: string[];
}

export default function ListBlock({ items }: ListBlockProps) {
  if (!items?.length) return null;

  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300"
        >
          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 mt-2.5" />
          <span className="text-base sm:text-lg leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}
