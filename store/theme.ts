import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  theme: string;
  enable3D: boolean
  showSpotifyChip: boolean
  setEnable3D: (enable: boolean) => void
  setShowSpotifyChip: (show: boolean) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      enable3D: true,
      showSpotifyChip: true,
      setEnable3D: (enable) => set({ enable3D: enable }),
      setShowSpotifyChip: (show) => set({ showSpotifyChip: show }),
    }),
    {
      name: 'theme-storage',
    }
  )
)
