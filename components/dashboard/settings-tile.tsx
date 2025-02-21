import Link from 'next/link'
import { Settings } from 'lucide-react'

export default function SettingsTile() {
  return (
    <Link
      href="/dashboard/settings"
      className="flex flex-col items-center justify-center p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-lg group"
    >
      <Settings className="w-8 h-8 mb-4 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors" />
      <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Settings</h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 text-center">
        Manage site preferences and configurations
      </p>
    </Link>
  )
}
