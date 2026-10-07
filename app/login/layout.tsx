import type { Metadata } from 'next'
import { privateRouteRobots } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Login',
  robots: privateRouteRobots,
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
