export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { findItunesMatch } from '@/lib/itunes-preview'

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

async function getClientCredentialsToken() {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('Missing Spotify credentials')
  }

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' }),
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Spotify token failed: ${response.status}`)
  }

  const data = (await response.json()) as { access_token: string }
  return data.access_token
}

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get('id')
  if (!id || !/^[a-zA-Z0-9]+$/.test(id)) {
    return NextResponse.json({ error: 'Invalid track id' }, { status: 400 })
  }

  try {
    const accessToken = await getClientCredentialsToken()
    const trackRes = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
    })

    if (!trackRes.ok) {
      return NextResponse.json({ error: 'Track not found' }, { status: trackRes.status })
    }

    const track = (await trackRes.json()) as {
      name: string
      preview_url: string | null
      external_urls: { spotify: string }
      artists: { name: string }[]
      album: { images: { url: string; height: number }[] }
    }

    const artists = track.artists.map((a) => a.name).join(', ')
    let previewUrl = track.preview_url
    let albumImageUrl = track.album.images[0]?.url ?? track.album.images[1]?.url ?? null

    if (!previewUrl) {
      const itunes = await findItunesMatch(artists, track.name)
      if (itunes) {
        previewUrl = itunes.previewUrl
        if (!albumImageUrl) albumImageUrl = itunes.artworkUrl
      }
    }

    return NextResponse.json({
      previewUrl,
      name: track.name,
      artists,
      spotifyUrl: track.external_urls.spotify,
      albumImageUrl,
    })
  } catch (error) {
    console.error('Spotify track fetch error:', error)
    return NextResponse.json({ error: 'Failed to load track' }, { status: 500 })
  }
}
