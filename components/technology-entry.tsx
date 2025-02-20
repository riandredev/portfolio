'use client'
import { TechnologyEntry as techStackEntry } from '@/types/post'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { ExternalLink } from 'lucide-react'
import { memo } from 'react'

interface TechnologyEntryProps {
  entry: techStackEntry
  onDelete?: () => void
  className?: string
  invertInDark?: boolean
}

// Memoize the content component to prevent unnecessary re-renders
const Content = memo(({
  entry,
  onDelete,
  imageClasses
}: {
  entry: techStackEntry,
  onDelete?: () => void,
  imageClasses: string
}) => (
  <>
    {entry.logo && (
      <div className="relative w-5 h-5 flex-shrink-0">
        <Image
          src={entry.logo}
          alt={entry.name}
          fill
          className={`object-contain ${imageClasses}`}
          unoptimized // Add this to prevent unnecessary image optimization
        />
      </div>
    )}
    <span className="text-sm font-medium">{entry.name}</span>
    {entry.url && (
      <ExternalLink className="w-3 h-3 text-zinc-400" />
    )}
    {onDelete && (
      <button
        type="button"
        onClick={onDelete}
        className="ml-auto text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
      >
        ×
      </button>
    )}
  </>
))

Content.displayName = 'TechnologyEntryContent'

const TechnologyEntry = memo(function TechnologyEntry({
  entry,
  onDelete,
  className = '',
  invertInDark = false
}: TechnologyEntryProps) {
  const { theme } = useTheme()
  const imageClasses = invertInDark ? 'dark:invert' : '';
  const wrapperClasses = `flex items-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg ${className}`;

  // If there's no URL, return a simple div
  if (!entry.url) {
    return (
      <div className={wrapperClasses}>
        <Content entry={entry} onDelete={onDelete} imageClasses={imageClasses} />
      </div>
    );
  }

  // Only render as a link if there's a URL
  return (
    <a
      href={entry.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${wrapperClasses} hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors`}
    >
      <Content entry={entry} onDelete={onDelete} imageClasses={imageClasses} />
    </a>
  );
})

export default TechnologyEntry
