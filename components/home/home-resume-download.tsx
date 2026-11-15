import { Download } from 'lucide-react'

/** Versioned resume filename to ensure CDN/browser cache busting. */
const RESUME_PATH = `/riandre-resume-frontend-v3.pdf`

export default function HomeResumeDownload() {
  return (
    <section className="home-resume-download mt-14 flex justify-center sm:mt-20" aria-label="Resume">
      <a
        href={RESUME_PATH}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2.5 rounded-full border border-[var(--paper-border)] bg-[var(--paper-surface)] px-5 py-2.5 font-geist text-[14px] font-medium text-[var(--paper-fg)] no-underline shadow-[0_10px_28px_-12px_rgba(30,35,45,0.16)] ring-1 ring-black/[0.04] transition-[border-color,box-shadow,transform,color] duration-200 hover:border-[color-mix(in_srgb,var(--paper-accent)_35%,var(--paper-border))] hover:text-[var(--paper-accent)] hover:shadow-[0_14px_36px_-12px_rgba(30,35,45,0.2)] active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100"
      >
        <Download
          className="h-4 w-4 shrink-0 text-[var(--paper-muted)] transition-colors duration-200 group-hover:text-[var(--paper-accent)]"
          aria-hidden
        />
        Download my resume
      </a>
    </section>
  )
}
