'use client'

import Link from 'next/link'
import { BarChart3, FileText, PenSquare, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' })
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className="flex items-center min-h-screen">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-medium">Dashboard</h1>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Analytics Tile */}
            <Link
              href="/dashboard/analytics"
              className="group flex flex-col gap-4 p-8 bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all hover:shadow-lg"
            >
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl w-fit group-hover:scale-110 transition-transform">
                <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-medium mb-2">Visitors Analytics</h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Track visitor statistics and engagement metrics
                </p>
              </div>
            </Link>

            {/* View Posts Tile */}
            <Link
              href="/dashboard/posts"
              className="group flex flex-col gap-4 p-8 bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all hover:shadow-lg"
            >
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl w-fit group-hover:scale-110 transition-transform">
                <FileText className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-medium mb-2">Manage Posts</h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                  View, edit and organize your existing posts
                </p>
              </div>
            </Link>

            {/* Add Post Tile */}
            <Link
              href="/dashboard/posts/new"
              className="group flex flex-col gap-4 p-8 bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all hover:shadow-lg"
            >
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl w-fit group-hover:scale-110 transition-transform">
                <PenSquare className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-xl font-medium mb-2">Create Post</h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Write and publish a new blog post or project
                </p>
              </div>
            </Link>

            {/* Settings Tile */}
            <Link
              href="/dashboard/settings"
              className="group flex flex-col gap-4 p-8 bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all hover:shadow-lg"
            >
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl w-fit group-hover:scale-110 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 text-amber-600 dark:text-amber-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-medium mb-2">Site Settings</h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Manage your site configuration and preferences
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
