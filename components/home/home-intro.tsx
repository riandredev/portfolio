import Link from 'next/link'
import SiteIdentity from '@/components/site-identity'

export default function HomeIntro() {
  return (
    <section className="intro space-y-8 pb-2">
      <SiteIdentity priority />

      <div className="space-y-4 font-geist text-[16px] leading-[1.72] text-[var(--paper-fg)] sm:text-[17px]">
        <p>
          I&apos;m a front-end engineer in Gauteng, South Africa. I build web products with React and Next.js, and I
          care about the small details: typography, layout, motion, and keeping things fast as they scale.
        </p>
        <p>
          Right now I&apos;m at{' '}
          <Link href="https://pixelperfect.co.za" className="intro-link" target="_blank" rel="noopener noreferrer">
            PixelMeta
          </Link>
          , working across UI design and development for client and in-house products.
        </p>
        <p>
          See{' '}
          <Link href="/#work" className="intro-link">
            work
          </Link>{' '}
          for shipped products and the design gallery, or{' '}
          <Link href="https://linkedin.com/in/riandre" className="intro-link" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </Link>{' '}
          for the full timeline. Open to interesting front-end roles and collaborations.
        </p>
      </div>
      <p className="font-geist text-[15px] leading-[1.65] text-[var(--paper-muted)]">
        I like working{' '}
        <em className="font-normal italic text-[var(--paper-fg)]">where design and engineering meet</em>, and I&apos;m
        happiest when the finished product{' '}
        <em className="font-normal italic text-[var(--paper-fg)]">feels considered, not just functional</em>.
      </p>
    </section>
  )
}
