export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { NextResponse } from 'next/server'

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

const getAccessToken = async () => {
  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: REFRESH_TOKEN!
      }),
      next: { revalidate: 0 }
    })

    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('Token fetch error:', error)
    throw error
  }
}

export async function GET() {
  try {
    const { access_token } = await getAccessToken()

    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    if (response.status === 204) {
      return NextResponse.json({ isPlaying: false });
    }

    if (!response.ok) {
      return NextResponse.json({ isPlaying: false });
    }

    const data = await response.json();

    if (!data.is_playing || !data.item) {
      return NextResponse.json({ isPlaying: false });
    }

    const song = {
      isPlaying: true,
      title: data.item.name,
      artist: data.item.artists.map((artist: any) => artist.name).join(', '),
      albumImageUrl: data.item.album.images[0]?.url,
      previewUrl: data.item.preview_url,
      progress_ms: data.progress_ms || 0,
      duration_ms: data.item.duration_ms,
      spotifyUrl: data.item.external_urls?.spotify || null
    }

    return NextResponse.json(song, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    return NextResponse.json({ isPlaying: false });
  }
}
