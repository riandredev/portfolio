import { NextResponse } from 'next/server';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.NEXT_PUBLIC_SITE_URL
  ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/spotify/callback`
  : 'http://localhost:3000/api/spotify/callback';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');

    console.log('Callback received:', { code, error, url: url.toString() });

    if (error) {
      return new Response(`
        <html>
          <body>
            <h1>Authentication Error</h1>
            <p>Error: ${error}</p>
          </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    if (!code) {
      return new Response(`
        <html>
          <body>
            <h1>No Code Provided</h1>
            <p>Please start the authentication process from <a href="/api/spotify/login">here</a></p>
          </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' },
      });
    }

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
    console.log('Token response:', { ...data, access_token: '[REDACTED]' });

    if (data.error) {
      return new Response(`
        <html>
          <body>
            <h1>Token Exchange Error</h1>
            <p>Error: ${data.error}</p>
            <p>Description: ${data.error_description || 'No description provided'}</p>
          </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    return new Response(`
      <html>
        <body>
          <h1>Authentication Successful!</h1>
          <h2>Your Refresh Token:</h2>
          <p>Copy this token and add it to your .env file as SPOTIFY_REFRESH_TOKEN</p>
          <p style="word-break: break-all; background: #f0f0f0; padding: 1rem; border-radius: 4px;">${data.refresh_token}</p>
          <script>
            console.log('Auth successful, refresh token:', '${data.refresh_token}');
          </script>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error('Callback error:', error);
    return new Response(`
      <html>
        <body>
          <h1>Server Error</h1>
          <p>An unexpected error occurred: ${error instanceof Error ? error.message : 'Unknown error'}</p>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' },
    });
  }
}
