'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Toast } from '@/components/ui/toast'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useSiteSettings } from "@/store/site-settings"
import { Skeleton } from "@/components/ui/skeleton"

interface Settings {
  recentPostsLimit: number;
}

function SettingsSkeleton() {
  return (
    <div className="container px-4 mx-auto py-24 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-40" />
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 p-6 space-y-6">
            <Skeleton className="h-6 w-48" />
            <div className="space-y-4">
              <div>
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="h-5 w-40 mb-2" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 p-6">
            <div className="space-y-6">
              <Skeleton className="h-6 w-32" />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-60" />
                </div>
                <Skeleton className="h-6 w-12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  const router = useRouter()
  const [settings, setSettings] = useState<Settings>({ recentPostsLimit: 4 })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    show: false,
    message: '',
    type: 'success'
  })

  const { showSpotifyChip, setShowSpotifyChip } = useSiteSettings()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings')
      const data = await response.json()
      setSettings(data)
    } catch {
      setError('Failed to load settings')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError('')

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`
        },
        body: JSON.stringify(settings)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to save settings')
      }

      setToast({
        show: true,
        message: 'Settings saved successfully',
        type: 'success'
      })

      router.refresh()
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save settings'
      setError(errorMessage)
      setToast({
        show: true,
        message: errorMessage,
        type: 'error'
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) return <SettingsSkeleton />

  return (
    <div className="container px-4 mx-auto py-24 min-h-screen">
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-medium">Page Settings</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 p-6 space-y-6">
                    <h2 className="text-lg font-medium">Homepage Settings</h2>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Recent Posts Limit
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="12"
                            value={settings.recentPostsLimit}
                            onChange={(e) => setSettings({
                                ...settings,
                                recentPostsLimit: parseInt(e.target.value)
                            })}
                            className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                        />
                        <p className="mt-1 text-sm text-zinc-500">
                            Number of posts to show in the Recent Posts section
                        </p>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 p-6">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-lg font-medium mb-4">Features</h2>

                            <div className="flex items-center justify-between">
                                <Label htmlFor="spotify-toggle" className="text-sm">
                                    <div>Show Spotify Now Playing</div>
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                        Display currently playing track for visitors
                                    </span>
                                </Label>
                                <Switch
                                    id="spotify-toggle"
                                    checked={showSpotifyChip}
                                    onCheckedChange={setShowSpotifyChip}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
                    >
                        {isSaving ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </form>
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}
        </div>
    </div>
  )
}
