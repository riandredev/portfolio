import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

export async function GET(request: Request) {
  try {
    // Determine the correct redirect URI based on environment
    const baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://riandre.com'
      : 'http://localhost:3000';

    const REDIRECT_URI = `${baseUrl}/api/spotify/callback`;

    console.log('Callback received:', {
      environment: process.env.NODE_ENV,
      redirectUri: REDIRECT_URI
    });

    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');
    const state = url.searchParams.get('state');

    console.log('Auth response:', { code, error, state });

    if (error) {
      throw new Error(`Authentication Error: ${error}`);
    }

    if (!code) {
      throw new Error('No code provided');
    }

    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
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

    const data = await tokenResponse.json();

    if (data.error) {
      console.error('Token error:', data);
      throw new Error(`Token Error: ${data.error}`);
    }

    return new Response(`
      <html>
        <body style="font-family: system-ui; max-width: 600px; margin: 40px auto; padding: 20px;">
          <h1>Authentication Successful!</h1>
          <p>Environment: ${state}</p>
          <p>Your refresh token (add this to your .env file):</p>
          <pre style="word-break: break-all; padding: 1rem; background: #f0f0f0; border-radius: 4px;">
SPOTIFY_REFRESH_TOKEN=${data.refresh_token}</pre>
          <p style="color: #666;">You can close this window now.</p>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error) {
    console.error('Callback error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return new Response(`
      <html>
        <body style="font-family: system-ui; max-width: 600px; margin: 40px auto; padding: 20px;">
          <h1 style="color: #dc2626;">Authentication Error</h1>
          <p>${errorMessage}</p>
          <pre style="word-break: break-all; padding: 1rem; background: #fee2e2; border-radius: 4px;">${JSON.stringify({ error: errorMessage }, null, 2)}</pre>
        </body>
      </html>
    `, {
      status: 400,
      headers: { 'Content-Type': 'text/html' },
    });
  }
}
