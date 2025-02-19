import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface GraphicsStore {
  sceneLoaded: boolean
  scene: any | null
  setSceneLoaded: (loaded: boolean) => void
  setScene: (scene: any) => void
}

export const useGraphicsStore = create<GraphicsStore>()(
  persist(
    (set) => ({
      sceneLoaded: false,
      scene: null,
      setSceneLoaded: (loaded) => set({ sceneLoaded: loaded }),
      setScene: (scene) => set({ scene }),
    }),
    {
      name: 'graphics-store',
      version: 1,
    }
  )
)
