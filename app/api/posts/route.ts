import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { Post, PostCategory } from '@/types/post';
import { ObjectId } from 'mongodb';

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

    // Validate category
    if (!postData.category || !['development', 'design'].includes(postData.category)) {
      return NextResponse.json(
        { error: 'Invalid category. Must be either "development" or "design"' },
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

    // If not temporary, save to database
    const db = await getDb();
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

    // Validate category
    if (!postData.category || !['development', 'design'].includes(postData.category)) {
      return NextResponse.json(
        { error: 'Invalid category. Must be either "development" or "design"' },
        { status: 400 }
      );
    }

    const { _id, ...updateData } = postData;

    const db = await getDb();
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

    return NextResponse.json(result);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}
