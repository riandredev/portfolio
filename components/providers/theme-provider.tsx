'use client'

import { Suspense } from 'react'
import ErrorBoundary from '@/components/error-boundary'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <ErrorBoundary fallback={<div>Error loading theme</div>}>
      <Suspense fallback={null}>
        <NextThemeProvider {...props}>
          {children}
        </NextThemeProvider>
      </Suspense>
    </ErrorBoundary>
  )
}
