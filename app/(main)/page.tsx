'use client'

import Hero from '@/components/hero'
import Posts from '@/components/posts'

export default function HomePage() {
    return (
        <main className="min-h-screen bg-transparent dark:text-white relative">
            {/* Hero section */}
            <div className="sticky container mx-auto top-0 min-h-[40vh] md:min-h-[50vh] lg:h-screen -mt-16">
                <Hero />
            </div>

            {/* Content section */}
            <div className="relative mt-0 md:mt-0 lg:mt-[-20vh] z-[1]">
                <div className="relative">
                    <div className="relative bg-zinc-100 dark:bg-black">
                        <div className="absolute inset-x-0 -top-28 h-56 bg-gradient-to-b from-transparent via-zinc-100 to-zinc-100 dark:via-black dark:to-black pointer-events-none" />
                        <div className="h-16 sm:h-24 bg-zinc-100 dark:bg-black" />
                        <Posts />
                    </div>
                </div>
            </div>
        </main>
    )
}
