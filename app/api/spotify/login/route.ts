import { NextResponse } from 'next/server';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_SITE_URL}/api/spotify/callback`;

export async function GET() {
  // Error handling
  if (!CLIENT_ID) {
    console.error('Missing SPOTIFY_CLIENT_ID');
    return new Response('Missing Spotify client configuration', { status: 500 });
  }

  if (!REDIRECT_URI) {
    console.error('Missing NEXT_PUBLIC_SITE_URL');
    return new Response('Missing site URL configuration', { status: 500 });
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
    return NextResponse.redirect(spotifyUrl);
  } catch (error) {
    console.error('Spotify authorization error:', error);
    return new Response('Failed to initialize Spotify authorization', { status: 500 });
  }
}
