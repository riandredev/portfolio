'use client'

import { useEffect } from 'react'

export default function SpotifyAuthPage() {
  useEffect(() => {
    // Redirect to the login endpoint which will start the OAuth flow
    window.location.href = '/api/spotify/login'
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-medium mb-4">Connecting to Spotify...</h1>
        <p className="text-zinc-600 dark:text-zinc-400">You will be redirected to Spotify to authorize the application.</p>
      </div>
    </div>
  )
}
