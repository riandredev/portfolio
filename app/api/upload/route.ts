import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

async function ensureUploadDirs() {
  const baseDir = path.join(process.cwd(), 'public', 'uploads');
  const dirs = ['image', 'video'];

  if (!existsSync(baseDir)) {
    await mkdir(baseDir, { recursive: true });
  }

  for (const dir of dirs) {
    const fullPath = path.join(baseDir, dir);
    if (!existsSync(fullPath)) {
      await mkdir(fullPath, { recursive: true });
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureUploadDirs();

    const authHeader = request.headers.get('Authorization');
    const expectedToken = `Bearer ${process.env.AUTH_TOKEN}`;

    if (authHeader !== expectedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const type = request.nextUrl.searchParams.get('type') || 'image';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure directory exists
    const dir = path.join(process.cwd(), 'public', 'uploads', type);
    await createDirIfNotExists(dir);

    // Generate unique filename
    const uniqueFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
    const filePath = path.join(dir, uniqueFileName);

    // Write file
    await writeFile(filePath, buffer);

    // Return public URL
    const publicUrl = `/uploads/${type}/${uniqueFileName}`;

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function createDirIfNotExists(dir: string) {
  const fs = require('fs').promises;
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
