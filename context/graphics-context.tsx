'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type GraphicsContextType = {
  enable3D: boolean
  toggle3D: () => void
}

const GraphicsContext = createContext<GraphicsContextType | null>(null)

export function GraphicsProvider({ children }: { children: React.ReactNode }) {
  const [enable3D, setEnable3D] = useState(true)

  useEffect(() => {
    // Load user preference
    const stored = localStorage.getItem('enable3D')
    setEnable3D(stored ? JSON.parse(stored) : true)
  }, [])

  const toggle3D = () => {
    const newValue = !enable3D
    setEnable3D(newValue)
    localStorage.setItem('enable3D', JSON.stringify(newValue))
  }

  return (
    <GraphicsContext.Provider value={{ enable3D, toggle3D }}>
      {children}
    </GraphicsContext.Provider>
  )
}

export function useGraphics() {
  const context = useContext(GraphicsContext)
  if (!context) throw new Error('useGraphics must be used within a GraphicsProvider')
  return context
}
