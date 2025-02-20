import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { Post } from '@/types/post';

export async function GET() {
  try {
    const db = await getDb();
    const posts = await db.collection('posts').find().toArray();
    return NextResponse.json(posts.map(post => ({
      ...post,
      _id: post._id.toString()
    })));
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const postData: Post = await request.json();

    // Check if this is a temporary post
    if (postData.temporary === true) {
      // Generate a temporary ID and return without saving to DB
      const tempPost = {
        ...postData,
        _id: `temp-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      return NextResponse.json(tempPost);
    }

    // If not temporary, save to database
    const db = await getDb();
    const { _id, ...newPostData } = postData;

    const result = await db.collection('posts').insertOne({
      ...newPostData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    const savedPost = {
      ...newPostData,
      _id: result.insertedId.toString(),
    };

    return NextResponse.json(savedPost);
  } catch (error) {
    console.error('Create error:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
