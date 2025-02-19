'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { checkGPUSupport } from '@/utils/detect-gpu'

type GraphicsContextType = {
  enable3D: boolean
  toggle3D: () => void
  isCapable: boolean
}

const GraphicsContext = createContext<GraphicsContextType | null>(null)

export function GraphicsProvider({ children }: { children: React.ReactNode }) {
  const [enable3D, setEnable3D] = useState(true)
  const [isCapable, setIsCapable] = useState(true)

  useEffect(() => {
    // Load user preference
    const stored = localStorage.getItem('enable3D')
    setEnable3D(stored ? JSON.parse(stored) : true)

    // Check GPU capability
    const checkCapability = async () => {
      const hasGoodGPU = await checkGPUSupport()
      setIsCapable(hasGoodGPU)

      // If device is not capable, disable 3D and save preference
      if (!hasGoodGPU) {
        setEnable3D(false)
        localStorage.setItem('enable3D', 'false')
      }
    }

    checkCapability()
  }, [])

  const toggle3D = () => {
    // Only allow enabling if device is capable
    if (!isCapable && !enable3D) return

    const newValue = !enable3D
    setEnable3D(newValue)
    localStorage.setItem('enable3D', JSON.stringify(newValue))
  }

  return (
    <GraphicsContext.Provider value={{ enable3D, toggle3D, isCapable }}>
      {children}
    </GraphicsContext.Provider>
  )
}

export function useGraphics() {
  const context = useContext(GraphicsContext)
  if (!context) throw new Error('useGraphics must be used within a GraphicsProvider')
  return context
}
