'use client'

import Image from 'next/image'
import { TransitionLink } from '@/components/transition-link'
import { useHoverSound } from '@/hooks/use-hover-sound'
import { lifePhotos } from '@/lib/life-photos'

const cardBase =
  'overflow-hidden rounded-[1.15rem] border-[3px] border-white bg-white shadow-[0_10px_32px_-10px_rgba(30,35,45,0.2)] transition-[transform,box-shadow] duration-500 ease-out will-change-transform'

export default function HomeAboutCta() {
  const [left, center, right] = lifePhotos
  const hoverSound = useHoverSound('fan')

  return (
    <section className="home-about-cta mt-10 flex justify-center pt-2 sm:mt-12 sm:pt-3">
      <TransitionLink
        href="/about"
        aria-label="More about me"
        className="group relative inline-block w-[13.5rem] sm:w-[14.5rem]"
        onPointerEnter={hoverSound.onPointerEnter}
      >
        <span className="about-cta-tooltip absolute bottom-full left-1/2 z-[100] mb-5 -translate-x-1/2 whitespace-nowrap rounded-full border border-[var(--paper-border)] bg-[var(--paper-surface)] px-3.5 py-1.5 font-geist text-xs text-[var(--paper-fg)] shadow-[0_8px_24px_-8px_rgba(30,35,45,0.18)] sm:mb-6">
          More about me
        </span>

        <div
          className="relative isolate z-0 h-[11.25rem] w-full origin-[50%_92%] transition-transform duration-500 ease-out group-hover:scale-[1.05] sm:h-[12rem]"
        >
          <div
            className={`absolute left-[4%] top-5 z-[1] w-[6.5rem] -rotate-[12deg] group-hover:-rotate-[14deg] group-hover:-translate-x-1 sm:w-[7rem] ${cardBase}`}
          >
            <Image
              src={left.src}
              alt=""
              width={280}
              height={360}
              sizes="(max-width: 640px) 104px, 112px"
              className="aspect-[4/5] w-full -scale-x-100 object-cover object-center"
            />
          </div>
          <div
            className={`absolute left-1/2 top-0 z-[2] w-[7.25rem] -translate-x-1/2 group-hover:shadow-[0_14px_40px_-12px_rgba(30,35,45,0.24)] sm:w-[7.75rem] ${cardBase}`}
          >
            <Image
              src={center.src}
              alt=""
              width={280}
              height={360}
              sizes="(max-width: 640px) 145px, 155px"
              quality={90}
              className="aspect-[4/5] w-full object-cover object-[center_52%]"
              priority
            />
          </div>
          <div
            className={`absolute right-[4%] top-5 z-[1] w-[6.5rem] rotate-[12deg] group-hover:rotate-[14deg] group-hover:translate-x-1 sm:w-[7rem] ${cardBase}`}
          >
            <Image
              src={right.src}
              alt=""
              width={280}
              height={360}
              sizes="(max-width: 640px) 104px, 112px"
              className="aspect-[4/5] w-full object-cover object-center"
            />
          </div>
        </div>
      </TransitionLink>
    </section>
  )
}
