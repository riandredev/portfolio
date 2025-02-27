'use client'
import { useThemeStore } from '@/store/theme'
import Hero3D from './hero-3d'
import HeroContent from './hero-content'

export default function Hero() {
  const { enable3D } = useThemeStore()

  return (
    <div className="relative">
      <div className="flex min-h-[65vh] md:min-h-[80vh] items-center pt-16 md:pt-24">
        <div className="w-full md:w-1/2 relative z-[2] px-4 md:px-0">
          <HeroContent />
        </div>
        <div className="hidden md:block w-1/2 bg-transparent">
          {enable3D && <Hero3D />}
        </div>
      </div>
    </div>
  )
}
