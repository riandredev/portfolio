'use client'

import Image from 'next/image'
import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import SiteIdentity from '@/components/site-identity'
import { memories } from '@/lib/memories'
import { MEMORY_PHOTO_QUALITY, MEMORY_PHOTO_SIZES } from '@/lib/memory-image'
import WarmAboutImages from '@/components/about/warm-about-images'
import { cn } from '@/lib/utils'
import { useMemoryTrack, type TrackMeta } from '@/components/about/use-memory-track'
import MemoryMarquee from '@/components/about/memory-marquee'
import { SpotifyMemoryButton } from '@/components/about/spotify-memory-button'

function MemoryPhotoCard({
  image,
  alt,
  trackId,
  isActive,
  onActivate,
  onClose,
  priority,
  imageObjectPosition,
}: {
  image: string
  alt: string
  trackId: string
  isActive: boolean
  onActivate: () => void
  onClose: () => void
  priority?: boolean
  imageObjectPosition?: string
}) {
  const { track, fetchDone, playing, play, stop, audioRef } = useMemoryTrack(trackId, isActive)
  const pendingPlay = useRef(false)
  const suppressEndedRef = useRef(false)
  const isActiveRef = useRef(isActive)

  useEffect(() => {
    isActiveRef.current = isActive
    if (!isActive) {
      pendingPlay.current = false
    }
  }, [isActive])

  useEffect(() => {
    if (isActive && pendingPlay.current && track?.previewUrl) {
      pendingPlay.current = false
      play()
    }
  }, [isActive, track?.previewUrl, play])

  const hearLabel = 'Hear what this memory sounds like'

  const endPlayback = () => {
    pendingPlay.current = false
    stop()
    onClose()
  }

  const startMemory = () => {
    if (!track?.previewUrl || isActive) return
    suppressEndedRef.current = false
    pendingPlay.current = true
    onActivate()
  }

  const closePlayer = () => {
    if (!isActive) return
    suppressEndedRef.current = true
    endPlayback()
  }

  const canPlay = Boolean(track?.previewUrl)
  const playerWanted = isActive && Boolean(track)
  const [chipShown, setChipShown] = useState(false)
  const [chipExiting, setChipExiting] = useState(false)
  const chipTrackRef = useRef<TrackMeta | null>(null)

  useEffect(() => {
    if (playerWanted && track) {
      chipTrackRef.current = track
      setChipExiting(false)
      setChipShown(true)
      return
    }
    if (!chipShown || chipExiting) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setChipShown(false)
      return
    }
    setChipExiting(true)
  }, [playerWanted, track, chipShown, chipExiting])

  const onChipAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return
    if (!chipExiting) return
    if (e.animationName !== 'memory-player-out') return
    setChipShown(false)
    setChipExiting(false)
  }

  const chipTrack = chipTrackRef.current

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-2xl bg-[var(--paper-surface)] ring-1 ring-[var(--paper-border)] md:rounded-xl">
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={image}
            alt={alt}
            fill
            sizes={MEMORY_PHOTO_SIZES}
            quality={MEMORY_PHOTO_QUALITY}
            className="object-cover"
            style={imageObjectPosition ? { objectPosition: imageObjectPosition } : undefined}
            priority={priority}
            loading="eager"
            unoptimized
          />
          {chipShown && chipTrack ? (
            <div
              className={cn(
                'memory-player-chip absolute inset-x-2 bottom-2 flex items-center gap-2.5 rounded-xl px-2.5 py-2',
                chipExiting ? 'memory-player-chip--exit' : 'memory-player-chip--enter',
              )}
              role="status"
              aria-live="polite"
              onAnimationEnd={onChipAnimationEnd}
            >
              {chipTrack.albumImageUrl ? (
                <Image
                  src={chipTrack.albumImageUrl}
                  alt=""
                  width={44}
                  height={44}
                  className="h-11 w-11 shrink-0 rounded-md object-cover shadow-sm ring-1 ring-black/10"
                  unoptimized
                />
              ) : (
                <span className="memory-player-chip__art-fallback h-11 w-11 shrink-0 rounded-md" aria-hidden />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-geist text-[13px] font-semibold leading-tight text-[#1a1c20]">
                  {chipTrack.name}
                </p>
                <MemoryMarquee
                  className="font-geist text-[11px] leading-tight text-[#4a4f57]"
                  text={
                    playing && !chipExiting
                      ? `Playing preview · ${chipTrack.artists}`
                      : chipTrack.artists
                  }
                />
              </div>
              <button
                type="button"
                onClick={closePlayer}
                disabled={chipExiting}
                className="memory-player-chip__close shrink-0 rounded-md p-1.5 text-[#4a4f57] transition-colors hover:bg-black/[0.06] hover:text-[#1a1c20] disabled:pointer-events-none"
                aria-label="Stop and close player"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {fetchDone && !canPlay ? (
        <p className="font-geist text-sm text-[var(--paper-muted)]">Preview unavailable for this track.</p>
      ) : (
        <div className="flex min-h-[2.125rem] w-full md:w-auto">
          <SpotifyMemoryButton
            type="button"
            onClick={isActive ? closePlayer : startMemory}
            aria-label={isActive ? 'Stop playing this memory' : hearLabel}
            className="group w-full justify-center md:w-auto"
          >
            {isActive ? (
              <>
                <span className="col-start-1 row-start-1 max-md:hidden transition-opacity group-hover:opacity-0">
                  Playing this memory
                </span>
                <span className="col-start-1 row-start-1 hidden max-md:inline">Stop playing</span>
                <span className="col-start-1 row-start-1 opacity-0 transition-opacity group-hover:opacity-100 max-md:hidden">
                  Stop playing
                </span>
              </>
            ) : (
              'Hear this memory'
            )}
          </SpotifyMemoryButton>
        </div>
      )}

      <audio
        ref={audioRef}
        className="hidden"
        onEnded={() => {
          if (suppressEndedRef.current) {
            suppressEndedRef.current = false
            return
          }
          if (!isActiveRef.current) return
          endPlayback()
        }}
        preload="auto"
        playsInline
      />
    </div>
  )
}

function JournalEntry({
  index,
  activeSoundId,
  setActiveSoundId,
}: {
  index: number
  activeSoundId: string | null
  setActiveSoundId: (id: string | null) => void
}) {
  const memory = memories[index]
  const imageOnLeft = index % 2 === 0

  const body = (
    <div className="space-y-4 font-geist text-[15px] leading-[1.8] text-[var(--paper-fg)]">
      {memory.body.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </div>
  )

  return (
    <article className="journal-entry flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-6 md:items-start md:gap-8">
      <div className={cn('space-y-2 md:hidden')}>
        <p className="font-geist text-sm text-[var(--paper-muted)]">{memory.when}</p>
        <h2 className="font-heading text-[1.125rem] leading-snug text-[var(--paper-fg)]">{memory.title}</h2>
      </div>

      <div className={cn('min-w-0', !imageOnLeft && 'md:order-2')}>
        <MemoryPhotoCard
          image={memory.image}
          alt={memory.alt}
          trackId={memory.spotifyTrackId}
          isActive={activeSoundId === memory.id}
          onActivate={() => setActiveSoundId(memory.id)}
          onClose={() => setActiveSoundId(null)}
          priority={index < 3}
          imageObjectPosition={memory.imageObjectPosition}
        />
      </div>

      <div className={cn('space-y-4 md:space-y-3 md:pt-2', !imageOnLeft && 'md:order-1')}>
        <div className="hidden space-y-2 md:block">
          <p className="font-geist text-sm text-[var(--paper-muted)]">{memory.when}</p>
          <h2 className="font-heading text-[1.0625rem] leading-snug text-[var(--paper-fg)]">{memory.title}</h2>
        </div>
        {body}
      </div>
    </article>
  )
}

export default function LifeJournal() {
  const [activeSoundId, setActiveSoundId] = useState<string | null>(null)

  return (
    <div className="life-journal space-y-10 pb-6 md:space-y-20">
      <WarmAboutImages />
      <header className="space-y-4 pr-2 md:space-y-5 md:pr-0">
        <SiteIdentity homeTooltip="back to home" />
        <h1 className="font-heading text-[1.25rem] leading-snug text-[var(--paper-fg)]">Bits of my life</h1>
        <p className="font-geist text-[15px] leading-[1.7] text-[var(--paper-muted)]">
          A few stories in photos. Scroll through, and use the button under an image when you want the mood that goes with
          it.
        </p>
      </header>

      <div className="space-y-12 md:space-y-24">
        {memories.map((memory, index) => (
          <JournalEntry
            key={memory.id}
            index={index}
            activeSoundId={activeSoundId}
            setActiveSoundId={setActiveSoundId}
          />
        ))}
      </div>
    </div>
  )
}
