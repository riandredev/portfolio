'use client'

import { useEffect, useState } from 'react'

export default function SpotifyAuthPage() {
  const [status, setStatus] = useState<string>('Checking auth status...')

  const handleLogin = async () => {
    try {
      setStatus('Redirecting to Spotify...')
      window.location.href = '/api/spotify/login'
    } catch (error) {
      setStatus('Error initiating auth: ' + error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Spotify Authorization</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{status}</p>
        </div>
        <button
          onClick={handleLogin}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Login with Spotify
        </button>
      </div>
    </div>
  )
}
