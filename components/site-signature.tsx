import SignatureWide from '@/components/signature-wide'
import { TransitionLink } from '@/components/transition-link'

export default function SiteSignature() {
  return (
    <TransitionLink
      href="/"
      aria-label="Riandre van der Voorden, home"
      className="site-signature site-signature-vt fixed left-8 top-8 z-[45] text-[var(--paper-accent)] sm:left-12 sm:top-10"
    >
      <SignatureWide
        variant="fill"
        className="block h-[3.25rem] w-[11rem] sm:h-[3.75rem] sm:w-[12.5rem]"
      />
    </TransitionLink>
  )
}
