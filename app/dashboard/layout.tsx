import type { Metadata } from 'next'
import DashboardShell from '@/components/dashboard-shell'
import { privateRouteRobots } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Dashboard',
  robots: privateRouteRobots,
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>
}
