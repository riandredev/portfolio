import { create } from 'zustand'

interface SettingsState {
  isNavOpen: boolean
  setNavOpen: (open: boolean) => void
  toggleNav: () => void
}

export const useSettingsStore = create<SettingsState>()((set) => ({
  isNavOpen: false,
  setNavOpen: (open) => set({ isNavOpen: open }),
  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen }))
}))
