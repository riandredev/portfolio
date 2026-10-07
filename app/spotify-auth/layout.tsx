import type { Metadata } from 'next'
import { privateRouteRobots } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Spotify Auth',
  robots: privateRouteRobots,
}

export default function SpotifyAuthLayout({ children }: { children: React.ReactNode }) {
  return children
}
