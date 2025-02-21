import { NextResponse } from 'next/server';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.NODE_ENV === 'production'
  ? 'https://riandre.com/api/spotify/callback'
  : 'http://localhost:3000/api/spotify/callback';

export async function GET() {
  if (!CLIENT_ID) {
    console.error('Missing CLIENT_ID');
    return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
  }

  const scope = [
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-read-recently-played'
  ].join(' ');

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: scope,
    show_dialog: 'true'
  });

  const spotifyUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
  return NextResponse.redirect(spotifyUrl);
}
