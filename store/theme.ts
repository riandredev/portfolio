import { create } from 'zustand'

interface ThemeStore {
  theme: 'light' | 'dark' | 'system'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  showSpotifyChip: boolean
  setShowSpotifyChip: (show: boolean) => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'system',
  setTheme: (theme) => set({ theme }),
  showSpotifyChip: true, // Set to true by default
  setShowSpotifyChip: (show) => set({ showSpotifyChip: show }),
}))
