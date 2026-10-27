import Link from 'next/link'

type ResumeEntryProps = {
  title: string
  subtitle?: string
  period: string
  summary?: string
  href?: string
}

export default function ResumeEntry({ title, subtitle, period, summary, href }: ResumeEntryProps) {
  const isExternal = href?.startsWith('http')
  const titleInner = href ? (
    <Link
      href={href}
      className="intro-link font-heading font-bold no-underline hover:underline"
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {title}
    </Link>
  ) : (
    <span className="font-heading font-bold">{title}</span>
  )

  return (
    <article className="resume-entry space-y-1">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="min-w-0 text-[1.0625rem] leading-snug">{titleInner}</h3>
        <time className="shrink-0 font-geist text-xs tabular-nums text-[var(--paper-muted)]">{period}</time>
      </div>
      {subtitle ? (
        <p className="font-geist text-[13px] font-medium leading-snug text-[var(--paper-fg)]">{subtitle}</p>
      ) : null}
      {summary ? (
        <p className="pt-1.5 font-geist text-[15px] leading-[1.65] text-[var(--paper-muted)]">{summary}</p>
      ) : null}
    </article>
  )
}
