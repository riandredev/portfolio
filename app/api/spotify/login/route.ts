import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;

export async function GET() {
  // Determine the correct redirect URI based on environment
  const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://riandre.com'
    : 'http://localhost:3000';

  const REDIRECT_URI = `${baseUrl}/api/spotify/callback`;

  console.log('Login initiated:', {
    environment: process.env.NODE_ENV,
    redirectUri: REDIRECT_URI
  });

  if (!CLIENT_ID) {
    console.error('Missing SPOTIFY_CLIENT_ID');
    return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
  }

  const scope = [
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-read-recently-played'
  ].join(' ');

  try {
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      scope: scope,
      show_dialog: 'true',
      state: process.env.NODE_ENV // Include environment as state
    });

    const spotifyUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
    console.log('Redirecting to:', spotifyUrl);

    return NextResponse.redirect(spotifyUrl);
  } catch (error) {
    console.error('Authorization error:', error);
    return NextResponse.json({ error: 'Authorization failed' }, { status: 500 });
  }
}
