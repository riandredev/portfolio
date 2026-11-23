'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export const MEMORY_PREVIEW_VOLUME = 0.2

export type TrackMeta = {
  previewUrl: string | null
  name: string
  artists: string
  spotifyUrl: string
  albumImageUrl: string | null
}

export function useMemoryTrack(trackId: string, active: boolean) {
  const [track, setTrack] = useState<TrackMeta | null>(null)
  const [fetchDone, setFetchDone] = useState(false)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const loadedPreviewRef = useRef<string | null>(null)
  const playbackGenRef = useRef(0)

  useEffect(() => {
    let cancelled = false
    setFetchDone(false)
    void (async () => {
      try {
        const res = await fetch(`/api/spotify/track?id=${encodeURIComponent(trackId)}`, { cache: 'no-store' })
        if (!res.ok || cancelled) {
          if (!cancelled) setTrack(null)
          return
        }
        const data = (await res.json()) as TrackMeta
        if (!cancelled) setTrack(data)
      } catch {
        if (!cancelled) setTrack(null)
      } finally {
        if (!cancelled) setFetchDone(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [trackId])

  useEffect(() => {
    if (!active) {
      playbackGenRef.current += 1
      setPlaying(false)
      const audio = audioRef.current
      if (audio) {
        audio.pause()
        audio.removeAttribute('src')
        loadedPreviewRef.current = null
      }
    }
  }, [active])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = MEMORY_PREVIEW_VOLUME
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !active || !playing || !track?.previewUrl) {
      if (audio && (!active || !playing)) {
        audio.pause()
      }
      return
    }

    const url = track.previewUrl
    const startPlayback = () => {
      audio.volume = MEMORY_PREVIEW_VOLUME
      void audio.play().catch(() => setPlaying(false))
    }

    const generation = playbackGenRef.current

    if (loadedPreviewRef.current !== url) {
      loadedPreviewRef.current = url
      audio.src = url
      audio.load()
      const onCanPlay = () => {
        if (generation !== playbackGenRef.current) return
        startPlayback()
      }
      audio.addEventListener('canplay', onCanPlay, { once: true })
      return () => audio.removeEventListener('canplay', onCanPlay)
    }

    startPlayback()
  }, [track?.previewUrl, playing, active])

  const toggle = useCallback(() => {
    if (!track?.previewUrl) return
    setPlaying((p) => !p)
  }, [track?.previewUrl])

  const play = useCallback(() => {
    if (!track?.previewUrl) return
    setPlaying(true)
  }, [track?.previewUrl])

  const stop = useCallback(() => setPlaying(false), [])

  return { track, fetchDone, playing, toggle, play, stop, audioRef }
}
