import Image from 'next/image'
import { TransitionLink } from '@/components/transition-link'
import { cn } from '@/lib/utils'

type SiteIdentityProps = {
  className?: string
  priority?: boolean
  /** When set, wraps the block in a link to home and shows a hover tooltip. */
  homeTooltip?: string
}

export default function SiteIdentity({ className, priority, homeTooltip }: SiteIdentityProps) {
  const content = (
    <>
      <Image
        src="/me.jpg"
        alt=""
        width={40}
        height={40}
        className="h-11 w-11 shrink-0 rounded-full object-cover object-top ring-1 ring-[var(--paper-border)]"
        priority={priority}
      />
      <div className="min-w-0">
        <p className="font-geist text-[15px] font-semibold leading-tight text-[var(--paper-fg)]">
          Riandre van der Voorden
        </p>
        <p className="font-geist text-sm leading-tight text-[var(--paper-muted)]">
          Front-end engineer · UI &amp; performance
        </p>
      </div>
    </>
  )

  if (homeTooltip) {
    return (
      <TransitionLink
        href="/"
        className={cn(
          'site-identity-vt group relative inline-flex max-w-full items-center gap-3 rounded-lg outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[var(--paper-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper-bg)]',
          className
        )}
        aria-label={homeTooltip}
      >
        <span
          className="about-cta-tooltip absolute bottom-full left-1/2 z-[100] mb-3 whitespace-nowrap rounded-full border border-[var(--paper-border)] bg-[var(--paper-surface)] px-3.5 py-1.5 font-geist text-xs text-[var(--paper-fg)] shadow-[0_8px_24px_-8px_rgba(30,35,45,0.18)]"
        >
          {homeTooltip}
        </span>
        {content}
      </TransitionLink>
    )
  }

  return (
    <div className={cn('site-identity-vt flex items-center gap-3', className)}>{content}</div>
  )
}
