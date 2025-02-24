import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Post } from '@/types/post';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    const posts = await db
      .collection('posts')
      .find({}) // Remove the published filter temporarily to debug
      .sort({ publishedAt: -1 })
      .toArray();

    console.log('Fetched posts count:', posts.length); // Debug log

    // Convert MongoDB _id to string
    const formattedPosts = posts.map(post => ({
      ...post,
      _id: post._id.toString()
    }));

    return NextResponse.json(formattedPosts, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Database error details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const postData: Post = await request.json();

    // Validate category
    if (!postData.category || !['development', 'design'].includes(postData.category)) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    // Check if this is a temporary post
    if (postData.temporary === true) {
      const tempPost = {
        ...postData,
        _id: `temp-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: postData.category
      };
      return NextResponse.json(tempPost);
    }

    const { db } = await connectToDatabase();
    const { _id, ...newPostData } = postData;

    const result = await db.collection('posts').insertOne({
      ...newPostData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: postData.category
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

export async function PUT(request: NextRequest) {
  try {
    const postData: Post = await request.json();

    if (!postData.category || !['development', 'design'].includes(postData.category)) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    const { _id, ...updateData } = postData;
    const { db } = await connectToDatabase();

    const result = await db.collection('posts').updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          ...updateData,
          updatedAt: new Date().toISOString(),
          category: postData.category
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ ...postData });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}
