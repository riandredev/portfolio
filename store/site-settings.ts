import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SiteSettings {
  showSpotifyChip: boolean
  setShowSpotifyChip: (show: boolean) => void
}

export const useSiteSettings = create<SiteSettings>()(
  persist(
    (set) => ({
      showSpotifyChip: true,
      setShowSpotifyChip: (show) => set({ showSpotifyChip: show }),
    }),
    {
      name: 'site-settings',
    }
  )
)
