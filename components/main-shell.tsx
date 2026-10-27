'use client'

import { Suspense } from 'react'
import SiteSignature from '@/components/site-signature'

export default function MainShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell relative min-h-screen">
      <SiteSignature />
      <Suspense fallback={null}>
        <main className="relative z-10">{children}</main>
      </Suspense>
    </div>
  )
}
