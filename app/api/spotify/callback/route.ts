import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

export async function GET(request: Request) {
  try {
    // Get the host from headers
    const headersList = headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const REDIRECT_URI = `${protocol}://${host}/api/spotify/callback`;

    // Code from the URL
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    console.log('Callback received:', { code, error });

    if (error) {
      return new Response(`Authentication Error: ${error}`, {
        status: 400,
        headers: { 'Content-Type': 'text/html' },
      });
    }

    if (!code) {
      return new Response('No code provided', {
        status: 400,
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

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 400 });
    }

    return new Response(`
      <html>
        <body>
          <h1>Authentication Successful!</h1>
          <p>Your refresh token (add this to your .env file):</p>
          <code style="word-break: break-all; display: block; padding: 1rem; background: #f0f0f0; margin: 1rem 0;">
            ${data.refresh_token}
          </code>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.json({
      error: 'Server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
