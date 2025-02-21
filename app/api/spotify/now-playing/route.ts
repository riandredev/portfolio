import { NextResponse } from 'next/server'

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
const PLAYBACK_STATE_ENDPOINT = `https://api.spotify.com/v1/me/player`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

const getAccessToken = async () => {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    throw new Error(`Missing credentials: ${JSON.stringify({
      hasClientId: !!CLIENT_ID,
      hasClientSecret: !!CLIENT_SECRET,
      hasRefreshToken: !!REFRESH_TOKEN
    })}`);
  }

  console.log('Getting access token...');
  console.log('API Endpoint:', TOKEN_ENDPOINT);

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: REFRESH_TOKEN
      }),
      cache: 'no-store'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Token refresh failed: ${JSON.stringify(data)}`);
    }

    return data;
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error;
  }
}

export async function GET() {
  try {
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Base URL:', process.env.NEXT_PUBLIC_SITE_URL);

    const tokenData = await getAccessToken();
    console.log('Access token obtained:', !!tokenData.access_token);

    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`
      },
      cache: 'no-store'
    });

    console.log('Spotify API response:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    // If no content, check player state
    if (response.status === 204) {
      const playerResponse = await fetch('https://api.spotify.com/v1/me/player', {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`
        }
      });

      console.log('Player state response:', {
        status: playerResponse.status,
        statusText: playerResponse.statusText
      });

      if (playerResponse.ok) {
        const playerData = await playerResponse.json();
        console.log('Player state:', playerData);
      }
    }

    if (response.status === 204) {
      console.log('No track currently playing');
      return NextResponse.json({ isPlaying: false });
    }

    if (response.status !== 200) {
      console.error('Spotify API error:', response.status);
      return NextResponse.json({ isPlaying: false });
    }

    const data = await response.json();
    console.log('Spotify response data:', JSON.stringify(data, null, 2));

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
