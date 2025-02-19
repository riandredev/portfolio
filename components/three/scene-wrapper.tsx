'use client'
import dynamic from 'next/dynamic'
import { Suspense, useEffect, useState } from 'react'
import { useGraphicsStore } from '@/store/graphics'
import { motion, AnimatePresence } from 'framer-motion'

const GlassScene = dynamic(() => import('./glass-scene'), {
  ssr: false,
})

function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5"
    >
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-blue-500/20 dark:border-blue-400/20" />
        <div className="absolute inset-0 rounded-full border-t-2 border-blue-500 dark:border-blue-400 animate-spin" />
      </div>
    </motion.div>
  )
}

export default function SceneWrapper() {
  const [isLoading, setIsLoading] = useState(true)
  const { sceneLoaded, setSceneLoaded } = useGraphicsStore()

  useEffect(() => {
    setIsLoading(true)

    // If scene is already loaded, hide loading quickly
    if (sceneLoaded) {
      setTimeout(() => setIsLoading(false), 100)
    }

    // Show loading for minimum time to avoid flash
    const minLoadingTime = setTimeout(() => setIsLoading(false), 800)

    return () => clearTimeout(minLoadingTime)
  }, [sceneLoaded])

  return (
    <div className="w-full h-full relative">
      <AnimatePresence>
        {isLoading && <LoadingSpinner />}
      </AnimatePresence>
      <Suspense fallback={<LoadingSpinner />}>
        <GlassScene />
      </Suspense>
    </div>
  )
}
