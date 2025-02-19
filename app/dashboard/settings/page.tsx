'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Toast } from '@/components/ui/toast'

interface Settings {
  recentPostsLimit: number;
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

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings')
      const data = await response.json()
      setSettings(data)
    } catch (error) {
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
    } catch (err: any) {
      setError(err.message || 'Failed to save settings')
      setToast({
        show: true,
        message: err.message || 'Failed to save settings',
        type: 'error'
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) return <div>Loading...</div>

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
