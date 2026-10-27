'use client'

import { ArrowLeft } from 'lucide-react'
import { TransitionLink } from '@/components/transition-link'

export default function DesignPageHeader() {
  return (
    <header className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-2">
        <TransitionLink
          href="/#work"
          aria-label="Back to work"
          className="group inline-flex items-center gap-1.5 rounded-full border border-[var(--paper-border)] bg-[var(--paper-surface)] px-3.5 py-1.5 font-geist text-[13px] font-medium text-[var(--paper-fg)] no-underline shadow-[0_8px_22px_-12px_rgba(30,35,45,0.14)] ring-1 ring-black/[0.04] transition-[border-color,box-shadow,transform,color] duration-200 hover:border-[color-mix(in_srgb,var(--paper-accent)_35%,var(--paper-border))] hover:text-[var(--paper-accent)] hover:shadow-[0_12px_30px_-12px_rgba(30,35,45,0.18)] active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100"
        >
          <ArrowLeft
            className="h-3.5 w-3.5 shrink-0 text-[var(--paper-muted)] transition-colors duration-200 group-hover:text-[var(--paper-accent)]"
            aria-hidden
          />
          Back
        </TransitionLink>
        <h1 className="design-works-card-vt font-heading text-[1.5rem] !text-[var(--paper-fg)] leading-tight sm:text-[1.75rem]">
          Design works
        </h1>
        <p className="max-w-xl font-geist text-[15px] leading-relaxed text-[var(--paper-muted)]">
          Illustrations, logos, explorations, and graphic work across client and product projects.
        </p>
      </div>
    </header>
  )
}
