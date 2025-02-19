import { Info, AlertTriangle, Lightbulb } from 'lucide-react'

const variants = {
  info: {
    icon: Info,
    className: 'bg-blue-500/10 border-blue-500/20 dark:bg-blue-500/5 dark:border-blue-500/10',
    iconClass: 'text-blue-500 dark:text-blue-400'
  },
  warning: {
    icon: AlertTriangle,
    className: 'bg-yellow-500/10 border-yellow-500/20 dark:bg-yellow-500/5 dark:border-yellow-500/10',
    iconClass: 'text-yellow-500 dark:text-yellow-400'
  },
  tip: {
    icon: Lightbulb,
    className: 'bg-purple-500/10 border-purple-500/20 dark:bg-purple-500/5 dark:border-purple-500/10',
    iconClass: 'text-purple-500 dark:text-purple-400'
  }
}

interface NoteProps {
  variant?: keyof typeof variants
  children: React.ReactNode
}

export default function Note({ variant = 'info', children }: NoteProps) {
  const { icon: Icon, className, iconClass } = variants[variant]

  return (
    <div className={`my-6 flex gap-4 rounded-lg border p-4 ${className}`}>
      <Icon className={`h-5 w-5 shrink-0 ${iconClass}`} />
      <div className="text-sm text-zinc-600 dark:text-zinc-400 [&>p]:mt-0">
        {children}
      </div>
    </div>
  )
}
