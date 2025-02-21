import { NextResponse } from 'next/server';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000/api/spotify/callback'
  : 'https://www.riandre.com/api/spotify/callback';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const data = await response.json();

    // Display the refresh token to the user
    return new Response(`
      <html>
        <body>
          <h1>Your Refresh Token:</h1>
          <p style="word-break: break-all;">${data.refresh_token}</p>
          <p>Copy this token and add it to your .env file as SPOTIFY_REFRESH_TOKEN</p>
        </body>
      </html>
    `, {
      headers: {
        'Content-Type': 'text/html',
      },
    });

  } catch (error) {
    console.error('Token exchange error:', error);
    return NextResponse.json({ error: 'Failed to exchange code for tokens' }, { status: 500 });
  }
}
