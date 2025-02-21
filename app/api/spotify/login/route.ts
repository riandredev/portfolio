import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;

export async function GET() {
  // Get the host from headers
  const headersList = headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  const REDIRECT_URI = `${protocol}://${host}/api/spotify/callback`;

  console.log('Login route accessed, using redirect URI:', REDIRECT_URI);

  if (!CLIENT_ID) {
    console.error('Missing SPOTIFY_CLIENT_ID');
    return NextResponse.json({ error: 'Missing Spotify client configuration' }, { status: 500 });
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
      show_dialog: 'true'
    });

    const spotifyUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
    console.log('Redirecting to Spotify:', spotifyUrl);
    return NextResponse.redirect(spotifyUrl);
  } catch (error) {
    console.error('Spotify authorization error:', error);
    return NextResponse.json({ error: 'Failed to initialize Spotify authorization' }, { status: 500 });
  }
}
