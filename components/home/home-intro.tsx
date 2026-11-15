import Link from 'next/link'
import SiteIdentity from '@/components/site-identity'

export default function HomeIntro() {
  return (
    <section className="intro space-y-8 pb-2">
      <SiteIdentity priority />

      <div className="space-y-4 font-geist text-[16px] leading-[1.72] text-[var(--paper-fg)] sm:text-[17px]">
        <p>
          I&apos;m a front-end engineer with 2+ years shipping production web apps in Next.js, React and TypeScript.
          Founding engineer at{' '}
          <Link href="https://getkliio.com/" className="intro-link" target="_blank" rel="noopener noreferrer">
            Kliio
          </Link>
          , a project-delivery CRM for agencies, where I own the product UI and core app flows end to end.
        </p>
        <p>
          At{' '}
          <Link href="https://pixelperfect.co.za" className="intro-link" target="_blank" rel="noopener noreferrer">
            PixelMeta
          </Link>{' '}
          I&apos;ve built 30+ client sites and lifted average Lighthouse performance scores by 40% across 20+ WordPress
          migrations. Strong in UI/UX (Figma) and accessible, fast front ends.
        </p>
        <p>
          See{' '}
          <Link href="/#work" className="intro-link">
            work
          </Link>{' '}
          for shipped products, or find me on{' '}
          <Link href="https://github.com/riandredev" className="intro-link" target="_blank" rel="noopener noreferrer">
            GitHub
          </Link>{' '}
          and{' '}
          <Link href="https://linkedin.com/in/riandre" className="intro-link" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </Link>
          . Remote, based in South Africa (UTC+2). Open to interesting front-end roles and collaborations.
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
