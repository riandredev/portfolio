'use client'

import type { ReactNode } from 'react'
import { ViewTransitions } from 'next-view-transitions'

export default function ViewTransitionsRoot({ children }: { children: ReactNode }) {
  return <ViewTransitions>{children}</ViewTransitions>
}
