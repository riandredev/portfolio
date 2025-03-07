'use client'

import { useEffect, useState } from 'react'
import { getFlagUrl } from '@/lib/flags'
import { Loader2 } from 'lucide-react'
import { useVisitorsStore } from '@/store/visitors'
import Image from 'next/image'
import { useScrollFade } from '@/hooks/useScrollFade'

interface LocationInfo {
  city: string
  region: string
  country: string
  country_code: string
}

export default function VisitorChip() {
  const opacity = useScrollFade()
  const {
    currentLocation,
    lastVisitor,
    isLoading,
    setCurrentLocation,
    updateVisitor,
    fetchLatestVisitor
  } = useVisitorsStore()
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)
  const [isFirstVisit, setIsFirstVisit] = useState(true)

  const formatLocation = (location: LocationInfo) => {
    const parts = []
    if (location.city && location.city !== 'null') {
      parts.push(location.city)
    }
    if (location.country) {
      parts.push(location.country)
    }
    return parts.join(', ')
  }

  // Check if this is a new session or reload
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const visitStatus = sessionStorage.getItem('visit-status')
      if (visitStatus === 'returning') {
        setIsFirstVisit(false)
      } else {
        sessionStorage.setItem('visit-status', 'returning')
      }
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    const fetchLocation = async () => {
      try {
        // Always fetch the last visitor to display
        if (!lastVisitor) {
          await fetchLatestVisitor()
        }

        // Only fetch and store current location silently without updating display
        if (!currentLocation) {
          const res = await fetch('https://ipapi.co/json/')
          if (!res.ok) throw new Error(`Location service error: ${res.status}`)

          const data = await res.json()
          if (data?.city && data?.country_name && data?.country) {
            const locationInfo = {
              city: data.city,
              region: data.region || 'Unknown',
              country: data.country_name,
              country_code: data.country
            }

            if (isMounted) {
              setCurrentLocation(locationInfo)
              
              // Only update visitor data in the database if this is a reload/returning visit
              if (!isFirstVisit) {
                await updateVisitor(locationInfo)
                // After updating, fetch the latest again to show the current user
                await fetchLatestVisitor()
              }
            }
          }
        }

        if (isMounted) {
          setInitialLoadComplete(true)
        }
      } catch (error) {
        console.error('Error in fetchLocation:', error)
        if (isMounted) {
          setInitialLoadComplete(true)
        }
      }
    }

    fetchLocation()

    return () => {
      isMounted = false
    }
  }, [currentLocation, fetchLatestVisitor, lastVisitor, setCurrentLocation, updateVisitor, isFirstVisit])

  // Show loading state only during initial load
  const showLoading = isLoading && !initialLoadComplete

  return (
    <div
      style={{ opacity }}
      className="hidden lg:flex items-center gap-2 px-2 py-1 bg-white/5 dark:bg-black/5 backdrop-blur-md rounded-xl border border-zinc-200 dark:border-zinc-800 transition-opacity duration-200"
    >
      <span className="text-xs text-zinc-500 dark:text-zinc-400">Latest visit</span>
      {showLoading ? (
        <div className="flex items-center px-3 h-[32px] border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white/80 dark:bg-zinc-800/80">
          <Loader2 className="w-4 h-4 animate-spin text-zinc-500 dark:text-zinc-400" />
        </div>
      ) : lastVisitor && (
        <div className="flex items-center gap-2.5 px-3 h-[32px] border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white/80 dark:bg-zinc-800/80">
          {lastVisitor.country_code && (
            <Image
              src={getFlagUrl(lastVisitor.country_code, 32) || ''}
              alt={`Flag of ${lastVisitor.country}`}
              className="w-5 h-auto rounded"
              width={32}
              height={32}
              loading="lazy"
            />
          )}
          <span className="text-xs text-zinc-700 dark:text-zinc-300 tracking-wide whitespace-nowrap">
            <span className="max-w-[200px] inline-block truncate align-bottom">
              {formatLocation(lastVisitor)}
            </span>
          </span>
        </div>
      )}
    </div>
  )
}
