'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import { designGalleryTiles, isRemoteDesignSrc } from '@/lib/design-work'
import 'yet-another-react-lightbox/styles.css'

export default function DesignMasonryGallery() {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const slides = useMemo(
    () =>
      designGalleryTiles.map((tile) => ({
        src: tile.src,
        alt: tile.caption,
        width: tile.width,
        height: tile.height,
      })),
    []
  )

  return (
    <>
      <div className="design-masonry columns-2 gap-3 sm:columns-3 sm:gap-3.5 lg:columns-4 lg:gap-4" aria-label="Design gallery">
        {designGalleryTiles.map((tile, i) => (
          <button
            key={tile.id}
            type="button"
            className="design-masonry-item group mb-3 w-full break-inside-avoid overflow-hidden rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--paper-accent)] sm:mb-3.5 lg:mb-4"
            onClick={() => {
              setIndex(i)
              setOpen(true)
            }}
            aria-label={`Open ${tile.caption}`}
          >
            <span className="block w-full overflow-hidden">
              <span
                className="block w-full origin-center transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] will-change-transform group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              >
                <Image
                  src={tile.src}
                  alt=""
                  width={tile.width}
                  height={tile.height}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priority={i < 3}
                  unoptimized={isRemoteDesignSrc(tile.src)}
                  className="block h-auto w-full max-w-none"
                />
              </span>
            </span>
          </button>
        ))}
      </div>

      <Lightbox
        className="design-yarl-lightbox"
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        animation={{ fade: 320, swipe: 300 }}
        carousel={{ padding: 20, spacing: 0, imageFit: 'contain' }}
        controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
        toolbar={{ buttons: [] }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
          buttonClose: () => null,
          slideContainer: ({ slide, children }) => (
            <div className="design-yarl-slide-container">
              {children}
              {slide.alt ? <p className="design-yarl-caption">{slide.alt}</p> : null}
            </div>
          ),
          controls: () => (
            <div className="pointer-events-none absolute right-5 top-5 z-50 sm:right-7 sm:top-7">
              <kbd
                className="inline-flex min-w-[2.5rem] items-center justify-center rounded-md border border-white/20 bg-black/40 px-2.5 py-1.5 font-geist text-xs font-medium lowercase tracking-wide text-white/85"
              >
                esc
              </kbd>
            </div>
          ),
        }}
        on={{
          view: ({ index: nextIndex }) => setIndex(nextIndex),
        }}
      />
    </>
  )
}
