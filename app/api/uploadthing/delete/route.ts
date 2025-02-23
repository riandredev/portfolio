import { NextResponse } from 'next/server';
import { UTApi } from 'uploadthing/server';

const utapi = new UTApi();

export async function POST(request: Request) {
  try {
    const { fileKey } = await request.json();

    if (!fileKey) {
      return NextResponse.json({ error: 'No file key provided' }, { status: 400 });
    }

    // Don't await the deletion - let it happen in the background
    utapi.deleteFiles(fileKey)
      .then(() => console.log('File deleted:', fileKey))
      .catch(err => console.error('File deletion failed:', fileKey, err));

    // Return success immediately
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
