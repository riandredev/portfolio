'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { TransitionLink } from '@/components/transition-link'
import { useHoverSound } from '@/hooks/use-hover-sound'
import {
  designGalleryTiles,
  isRemoteDesignSrc,
  type DesignGalleryTile,
} from '@/lib/design-work'

const marqueeTopTiles = designGalleryTiles.filter((_, i) => i % 2 === 0)
const marqueeBottomTiles = designGalleryTiles.filter((_, i) => i % 2 === 1)

function MarqueeRow({
  tiles,
  reverse,
}: {
  tiles: DesignGalleryTile[]
  reverse?: boolean
}) {
  const loop = [...tiles, ...tiles]
  return (
    <div
      className={`design-marquee-row h-[3.35rem] overflow-hidden sm:h-[3.65rem] ${reverse ? 'design-marquee-row--reverse' : ''}`}
      aria-hidden
    >
      <div className="design-marquee-track flex h-full items-center">
        {loop.map((tile, i) => {
          const isLogo = tile.id.includes('logo')
          return (
            <div
              key={`${tile.id}-${i}`}
              className="design-marquee-thumb relative size-[3.5rem] shrink-0 overflow-hidden rounded-[0.65rem] sm:size-[3.85rem] sm:rounded-[0.7rem]"
            >
              <Image
                src={tile.src}
                alt=""
                fill
                sizes="64px"
                className={isLogo ? 'object-cover object-center scale-110' : 'object-cover object-center'}
                unoptimized={isRemoteDesignSrc(tile.src)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function HomeDesignWorksCard() {
  const hoverSound = useHoverSound('design')

  return (
    <article className="home-design-works-card flex justify-center">
      <TransitionLink
        href="/design"
        className="design-works-card-vt group relative block w-full max-w-[17.5rem] overflow-hidden rounded-[1.1rem] bg-slate-800 py-2.5 text-slate-50 shadow-[0_10px_32px_-16px_rgba(15,23,42,0.4)] transition-transform duration-300 active:scale-[0.995] sm:max-w-[18.5rem] sm:py-3"
        aria-label="Open design works gallery"
        onPointerEnter={hoverSound.onPointerEnter}
      >
        <div className="design-marquee-stack pointer-events-none absolute inset-0 flex flex-col justify-center gap-2 overflow-hidden sm:gap-2.5">
          <MarqueeRow tiles={marqueeTopTiles} />
          <MarqueeRow tiles={marqueeBottomTiles} reverse />
        </div>
        <div className="design-works-card-vignette pointer-events-none absolute inset-0" aria-hidden />

        <div className="relative z-[1] flex min-h-[4.75rem] items-center justify-center px-3 sm:min-h-[5.25rem]">
          <div className="flex items-center gap-2.5 drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)] sm:gap-3">
            <h3 className="font-heading text-[1.125rem] font-bold !text-white leading-tight sm:text-[1.25rem]">
              Design works
            </h3>
            <ArrowUpRight
              className="h-[1.35rem] w-[1.35rem] shrink-0 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-6 sm:w-6"
              strokeWidth={2}
              aria-hidden
            />
          </div>
        </div>
      </TransitionLink>
    </article>
  )
}
