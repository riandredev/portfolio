'use client'
import { useScroll, useTransform, motion } from 'framer-motion'
import HeroContent from './hero-content'
import dynamic from 'next/dynamic'
import { useGraphics } from '@/context/graphics-context'

const SceneWrapper = dynamic(() => import('./three/scene-wrapper'), {
  ssr: false,
})

export default function Hero() {
  const { enable3D } = useGraphics()
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])

  return (
    <div className="min-h-[50vh] lg:h-screen flex items-center overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16">
          <div className="w-full lg:w-1/2 py-12 lg:py-0">
            <HeroContent />
          </div>
          {enable3D && (
            <div className="hidden lg:block lg:w-1/2 h-[600px] relative">
              <motion.div
                className="absolute inset-0 w-full h-full"
                style={{ opacity }}
              >
                <SceneWrapper />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
