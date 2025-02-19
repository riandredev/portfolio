import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { addVisitor as addVisitorApi, getLatestVisitor } from '@/lib/visitors'

interface LocationInfo {
  city: string
  region: string
  country: string
  country_code: string
}

interface VisitorsStore {
  currentLocation: LocationInfo | null
  lastVisitor: LocationInfo | null
  isLoading: boolean
  error: string | null

  setCurrentLocation: (location: LocationInfo) => void
  setLastVisitor: (visitor: LocationInfo) => void
  updateVisitor: (locationInfo: LocationInfo) => Promise<void>
  fetchLatestVisitor: () => Promise<void>
}

export const useVisitorsStore = create<VisitorsStore>()(
  persist(
    (set, get) => ({
      currentLocation: null,
      lastVisitor: null,
      isLoading: false,
      error: null,

      setCurrentLocation: (location) => set({ currentLocation: location }),
      setLastVisitor: (visitor) => set({ lastVisitor: visitor }),

      updateVisitor: async (locationInfo) => {
        try {
          await addVisitorApi(
            locationInfo.city,
            locationInfo.country,
            locationInfo.country_code,
            locationInfo.region
          )

          const latest = await getLatestVisitor()
          if (latest) {
            set({ lastVisitor: latest })
          }
        } catch (error) {
          set({ error: 'Failed to update visitor' })
        }
      },

      fetchLatestVisitor: async () => {
        try {
          set({ isLoading: true })
          const visitor = await getLatestVisitor()
          if (visitor) {
            set({ lastVisitor: visitor })
          }
        } catch (error) {
          set({ error: 'Failed to fetch latest visitor' })
        } finally {
          set({ isLoading: false })
        }
      }
    }),
    {
      name: 'visitors-storage',
      // Only persist these fields
      partialize: (state) => ({
        currentLocation: state.currentLocation,
        lastVisitor: state.lastVisitor
      })
    }
  )
)
