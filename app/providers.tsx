'use client'

import { ThemeProvider } from 'next-themes'
import { useThemeStore } from '@/store/theme'

export function Providers({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore()

  return (
    <ThemeProvider attribute="class" defaultTheme={theme} enableSystem>
      {children}
    </ThemeProvider>
  )
}
