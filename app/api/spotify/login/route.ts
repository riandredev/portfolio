import { NextResponse } from 'next/server';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000/api/spotify/callback'
  : 'https://www.riandre.com/api/spotify/callback';

export async function GET() {
  const scope = 'user-read-currently-playing user-read-playback-state';

  const queryParams = new URLSearchParams({
    client_id: CLIENT_ID!,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: scope,
  });

  return NextResponse.redirect(
    `https://accounts.spotify.com/authorize?${queryParams.toString()}`
  );
}
