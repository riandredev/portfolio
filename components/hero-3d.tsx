'use client'

import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { motion } from 'framer-motion'

const Lanyard = dynamic(() => import('@/components/ui/lanyard'), { ssr: false })

export default function Hero3D() {
  return (
    <div className="fixed -top-16 right-36 w-1/2 h-[calc(100vh-80px)] pointer-events-none z-[2] hidden md:block">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-full"
      >
        <Canvas
          className="pointer-events-auto"
          camera={{ position: [0, 0, 20], fov: 20 }}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
          }}
        >
          <Suspense fallback={null}>
            <Lanyard position={[0, 4, 0]} gravity={[0, -40, 0]} />
          </Suspense>
        </Canvas>
      </motion.div>
    </div>
  )
}
