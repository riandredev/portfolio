'use client'

import { Suspense } from 'react'
import Footer from '@/components/footer'
import Navbar from '@/components/ui/navbar'

export default function MainShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-white dark:bg-black">
      <Navbar />
      <Suspense fallback={null}>
        <main className="relative mx-auto">{children}</main>
      </Suspense>
      <Footer />
    </div>
  )
}
