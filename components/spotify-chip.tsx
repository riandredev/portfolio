'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { Loader2, Volume2, VolumeX, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import '../app/globals.css'
import { useSiteSettings } from "@/store/site-settings"

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#1DB954]" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.542-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.281 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
)

function AudioVisualizer() {
    const bars = Array.from({ length: 5 }, (_, i) => {
      const duration = Math.random() * 1 + 1.5;
      const delay = Math.random() * -2;
      const baseHeight = Math.random() * 8 + 8;

      return (
        <div
          key={i}
          className="w-[2px] bg-green-500 rounded-full transform-gpu"
          style={{
            height: `${baseHeight}px`,
            animation: `visualizer${i + 1} ${duration}s ease-in-out infinite`,
            animationDelay: `${delay}s`,
          }}
        />
      );
    });

    return (
      <div className="flex items-center gap-[2px]">
        {bars}
      </div>
    );
  }

const MarqueeText = ({ text }: { text: string }) => (
  <div className="w-[180px] overflow-hidden">
    <div className="marquee-container">
      <div className="marquee">
        <span className="marquee-content">{text}</span>
        <span className="marquee-content">{text}</span>
      </div>
    </div>
  </div>
);

interface SpotifyTrack {
  name: string
  artist: string
  albumArt: string
  previewUrl: string | null
  progress_ms?: number
  duration_ms?: number
  spotifyUrl?: string | null
}

const chipVariants = {
  collapsed: { height: 42 },
  expanded: { height: 'auto' }
}

export default function SpotifyChip() {
  const { showSpotifyChip } = useSiteSettings()
  const [track, setTrack] = useState<SpotifyTrack | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const chipRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const [isVisible, setIsVisible] = useState(false)

  const fetchNowPlaying = async () => {
    try {
      const res = await fetch('/api/spotify/now-playing', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      if (!res.ok) throw new Error('Failed to fetch');

      const data = await res.json();

      // Only update when data is valid
      if (data.isPlaying && data.title) {
        setTrack({
          name: data.title,
          artist: data.artist,
          albumArt: data.albumImageUrl,
          previewUrl: data.previewUrl,
          progress_ms: data.progress_ms,
          duration_ms: data.duration_ms,
          spotifyUrl: data.spotifyUrl
        });
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setTrack(null);
      }
    } catch (error) {
      setIsVisible(false);
      setTrack(null);
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchAndUpdate = async () => {
      if (!mounted) return;
      await fetchNowPlaying();
    };

    // Initial fetch
    fetchAndUpdate();

    // Set up polling interval (every 3 seconds)
    const interval = setInterval(fetchAndUpdate, 3000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    let progressInterval: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const startFade = 850
      const endFade = 950
      const newOpacity = Math.max(0, 1 - (scrollPosition - startFade) / (endFade - startFade))
      setOpacity(newOpacity)
    }

    const fetchNowPlaying = async () => {
      try {
        if (!isRefreshing) {
          setIsRefreshing(true);
        }

        const res = await fetch('/api/spotify/now-playing', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });

        if (!mounted) return;

        if (!res.ok) {
          console.error('Spotify API error:', await res.text());
          throw new Error('Failed to fetch');
        }

        const data = await res.json();

        if (data.isPlaying) {
          setTrack({
            name: data.title,
            artist: data.artist,
            albumArt: data.albumImageUrl,
            previewUrl: data.previewUrl,
            progress_ms: data.progress_ms,
            duration_ms: data.duration_ms,
            spotifyUrl: data.spotifyUrl
          });
          setIsVisible(true);

          if (data.progress_ms && data.duration_ms) {
            setProgress(data.progress_ms / 1000);
            setDuration(data.duration_ms / 1000);
          }

          if (data.is_playing) {
            clearInterval(progressInterval);
            progressInterval = setInterval(() => {
              setProgress(prev => {
                const newProgress = prev + 0.1;
                return newProgress >= duration ? 0 : newProgress;
              });
            }, 100);
          }

          if (data.previewUrl && (!audio || audio.src !== data.previewUrl)) {
            if (audio) {
              audio.pause();
              audio.src = '';
            }
            const newAudio = new Audio(data.previewUrl);
            newAudio.volume = 0.5;
            newAudio.muted = true;
            setAudio(newAudio);
          }
        } else {
          setIsVisible(false);
          setTrack(null);
        }
      } catch (error) {
        console.error('Spotify fetch error:', error);
        setIsVisible(false);
        setTrack(null);
      } finally {
        if (mounted) {
          setIsRefreshing(false);
        }
      }
    };

    fetchNowPlaying();
    const fetchInterval = setInterval(fetchNowPlaying, 3000);

    // croll event listener
    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      mounted = false;
      clearInterval(fetchInterval);
      clearInterval(progressInterval);
      window.removeEventListener('scroll', handleScroll)
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, [duration]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chipRef.current && !chipRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!audio) return

    const updateProgress = () => {
      setProgress(audio.currentTime)
      setDuration(audio.duration || 30)
    }

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('loadedmetadata', updateProgress)

    return () => {
      audio?.removeEventListener('timeupdate', updateProgress)
      audio?.removeEventListener('loadedmetadata', updateProgress)
    }
  }, [audio])

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audio || !progressRef.current) return

    const rect = progressRef.current.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    const newTime = pos * duration

    audio.currentTime = newTime
    setProgress(newTime)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const toggleMute = () => {
    if (!audio) return
    audio.muted = !audio.muted
    setIsMuted(!isMuted)
    if (!audio.muted && audio.paused) {
      audio.play()
    }
  }

  const handleSpotifyClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (track?.spotifyUrl) {
      window.open(track.spotifyUrl, '_blank')
    }
  }

  if (!showSpotifyChip) return null;

  return (
    <AnimatePresence>
      {isVisible && track && (
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            ref={chipRef}
            variants={chipVariants}
            animate={isExpanded ? "expanded" : "collapsed"}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30
            }}
            className="flex flex-col items-center gap-2 px-2 py-1 bg-white/5 dark:bg-black/5 backdrop-blur-md rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden w-[320px]"
          >
            {/* opacity transition */}
            <div className="flex items-center gap-2.5 w-full min-h-[32px]">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 shrink-0">I&rsquo;m Listening to</span>
              <div className="flex items-center gap-2.5 px-3 h-[32px] border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white/80 dark:bg-zinc-800/80 min-w-0 flex-1">
                <AudioVisualizer />
                <Image
                  src={track.albumArt}
                  alt={`Album art for ${track.name}`}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded shrink-0"
                />
                <div className="marquee-container flex-1 relative overflow-hidden">
                  <div className="marquee whitespace-nowrap flex items-center h-[32px]">
                    <span className="marquee-content text-xs leading-none flex items-center text-zinc-700 dark:text-zinc-300">
                      {track.name} <span className="mx-1 opacity-50">·</span><span className="opacity-65">{track.artist}</span>
                    </span>
                    <span className="marquee-content text-xs leading-none flex items-center text-zinc-700 dark:text-zinc-300">
                      {track.name} <span className="mx-1 opacity-50">·</span><span className="opacity-65">{track.artist}</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-md transition-colors ml-1 shrink-0 relative z-10"
                >
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-3 h-3 text-zinc-500" />
                  </motion.div>
                </button>
              </div>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full px-4 pb-4 space-y-4"
                >
                  <div className="w-full aspect-square relative rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <Image
                      src={track.albumArt}
                      alt={`Album art for ${track.name}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 300px) 100vw, 300px"
                      priority
                    />
                  </div>
                  <div className="space-y-1 w-full">
                    <div className="flex items-center -mb-1 w-full overflow-hidden">
                      <h3 className="font-medium text-sm text-zinc-900 dark:text-zinc-100 overflow-hidden text-ellipsis whitespace-nowrap min-w-0 flex-1">
                        {track.name}
                      </h3>
                      {track.spotifyUrl && (
                        <a
                          href={track.spotifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-[#1DB954] hover:text-[#1ed760] transition-colors shrink-0"
                        >
                          <SpotifyIcon />
                          <span>Open</span>
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 overflow-hidden text-ellipsis whitespace-nowrap">
                      {track.artist}
                    </p>
                    <div className="space-y-2">
                      <div
                        ref={progressRef}
                        onClick={handleProgressClick}
                        className="relative w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full cursor-pointer group"
                      >
                        <div
                          className="absolute space-y-4 left-0 h-full bg-green-500 rounded-full transition-all duration-150"
                          style={{ width: `${(progress / duration) * 100}%` }}
                        />
                        <div className="absolute -top-2 -bottom-2 left-0 right-0 group-hover:bg-zinc-100/10 rounded-full" />
                      </div>
                      <div className="flex justify-between text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">
                        <span>{formatTime(progress)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>
                    {track.previewUrl && (
                      <button
                        onClick={toggleMute}
                        className="w-full py-2 px-4 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                      >
                        {isMuted ? (
                          <>
                            Play Preview
                            <Volume2 className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            Stop Preview
                            <VolumeX className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
