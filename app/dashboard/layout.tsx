'use client'

import NavLink from "@/components/nav-link"
import { usePathname } from "next/navigation"
import { ArrowLeft, LayoutDashboard, Settings } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 h-14 z-50">
            <div>
          <NavLink
              href="/dashboard"
              active={pathname === '/dashboard'}
            >
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </NavLink>
          <NavLink
              href="/dashboard/settings"
              active={pathname === '/dashboard/settings'}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </NavLink>
            </div>
            <NavLink href="/" active={pathname === '/dashboard'}>
            <ArrowLeft className="h-4 w-4 mr-2" />
              Back to site
            </NavLink>
          </div>
        </div>
      </nav>
      <main>
        {children}
      </main>
    </div>
  )
}
