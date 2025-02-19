'use client'
import { ExternalLink } from 'lucide-react'

interface CardProps {
  title: string
  subtitle: string
  period: string
  link?: string
  className?: string;
}

export default function Card({ title, subtitle, period, link }: CardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`block p-4 rounded-lg border border-zinc-200 dark:bg-zinc-800/50 bg-zinc-200/75 dark:border-zinc-800 ${
        link ? 'hover:bg-white dark:hover:bg-zinc-800/75' : ''
      } transition-colors`}
      onClick={!link ? (e) => e.preventDefault() : undefined}
      style={{ cursor: link ? 'pointer' : 'default' }}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-1 min-w-0 flex-1">
          <h3 className="font-medium break-words pr-4">{title}</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-sm text-zinc-500 dark:text-zinc-500 whitespace-nowrap">{period}</span>
          {link && <ExternalLink className="w-4 h-4 text-zinc-400 shrink-0" />}
        </div>
      </div>
    </a>
  )
}
