import Link from 'next/link'

export default function HomeRails() {
  return (
    <>
      <aside
        className="pointer-events-none fixed bottom-8 left-6 z-20 hidden max-w-[11rem] text-sm leading-relaxed text-[var(--paper-muted)] sm:left-8 md:block"
        aria-label="Contact"
      >
        <p className="pointer-events-auto">
          if you like writing emails:
          <br />
          <Link href="mailto:hello@riandre.com" className="intro-link font-geist">
            hello@riandre.com
          </Link>
        </p>
      </aside>

      <aside
        className="pointer-events-none fixed right-6 top-32 z-20 hidden text-sm text-[var(--paper-muted)] sm:right-8 md:block"
        aria-label="Social"
      >
        <p className="pointer-events-auto font-geist">
          <span className="mr-2">Follow me on</span>
          <Link
            href="https://github.com/riandredev"
            className="intro-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
          <span className="mx-1.5 text-[var(--paper-border)]">·</span>
          <Link
            href="https://linkedin.com/in/riandre"
            className="intro-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Link>
        </p>
      </aside>
    </>
  )
}
