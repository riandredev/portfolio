import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SiteCanvasProps = {
  children?: ReactNode
  className?: string
}

/** Centered column with full-height side rules. */
export default function SiteCanvas({ children, className }: SiteCanvasProps) {
  return (
    <div
      className={cn(
        'site-canvas-outer relative mx-auto w-full max-w-[42rem] min-h-screen border-x border-[var(--paper-border)]',
        className
      )}
    >
      <div className="site-canvas-inner relative px-5 pb-24 pt-[5.5rem] text-left sm:px-7 sm:pb-28 sm:pt-24 md:px-10 md:pt-28">
        {children}
      </div>
    </div>
  )
}
