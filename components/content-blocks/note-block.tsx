import { Info, AlertTriangle, Lightbulb } from 'lucide-react'

const variants = {
  info: {
    icon: Info,
    className: 'bg-blue-50 border-blue-200 dark:bg-blue-950/50 dark:border-blue-900',
    iconClass: 'text-blue-600 dark:text-blue-400'
  },
  warning: {
    icon: AlertTriangle,
    className: 'bg-amber-50 border-amber-200 dark:bg-amber-950/50 dark:border-amber-900',
    iconClass: 'text-amber-600 dark:text-amber-400'
  },
  tip: {
    icon: Lightbulb,
    className: 'bg-purple-50 border-purple-200 dark:bg-purple-950/50 dark:border-purple-900',
    iconClass: 'text-purple-600 dark:text-purple-400'
  }
}

interface NoteBlockProps {
  content: string
  variant?: keyof typeof variants
}

export default function NoteBlock({ content, variant = 'info' }: NoteBlockProps) {
  const { icon: Icon, className, iconClass } = variants[variant]

  return (
    <div className='lg:px-12'>
      <div className={`flex items-start gap-4 rounded-lg border p-5 ${className}`}>
        <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${iconClass}`} />
          <div className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {content}
          </div>
       </div>
    </div>
  )
}
