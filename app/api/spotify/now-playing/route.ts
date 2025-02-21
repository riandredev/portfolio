import { NextResponse } from 'next/server'

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
const PLAYBACK_STATE_ENDPOINT = `https://api.spotify.com/v1/me/player`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN!
    })
  })

  return response.json()
}

export async function GET() {
  try {
    const { access_token } = await getAccessToken()

    const response = await fetch(PLAYBACK_STATE_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      cache: 'no-store'
    })

    if (response.status === 204 || response.status > 400) {
      return NextResponse.json({ isPlaying: false })
    }

    const data = await response.json()
    console.log('Spotify playback data:', data)

    if (!data.is_playing) {
      return NextResponse.json({ isPlaying: false })
    }

    const song = {
      isPlaying: data.is_playing,
      title: data.item?.name,
      artist: data.item?.artists?.map((artist: any) => artist.name).join(', '),
      albumImageUrl: data.item?.album?.images[0]?.url,
      previewUrl: data.item?.preview_url,
      progress_ms: data.progress_ms,
      duration_ms: data.item?.duration_ms,
      spotifyUrl: data.item?.external_urls?.spotify || null
    }

    return NextResponse.json(song, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error('Error in now-playing:', error)
    return NextResponse.json({ isPlaying: false })
  }
}
