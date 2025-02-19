import Hero from '@/components/hero'
import Posts from '@/components/posts'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-100 dark:bg-black text-zinc-900 dark:text-white">
      {/* Hero section with sticky/fixed positioning that stops at content */}
      <div className="sticky top-0 h-screen -mt-16 z-0">
        <Hero />
      </div>

      {/* Content section that overlays the hero */}
      <div className="relative mt-[-10vh] z-10">
        <div className="relative">
          <div className="absolute inset-x-0 -top-28 h-56 bg-gradient-to-b from-transparent via-zinc-100 to-zinc-100 dark:via-black dark:to-black pointer-events-none" />
          <div className="relative bg-zinc-100 dark:bg-black">
            <Posts />
            <div className="h-16 sm:h-24 bg-zinc-100 dark:bg-black" />
          </div>
        </div>
      </div>
    </main>
  )
}
