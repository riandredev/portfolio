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

    // Clean up empty strings
    const cleanedData = {
      ...postData,
      demoUrl: postData.demoUrl?.trim() || null,
      sourceUrl: postData.sourceUrl?.trim() || null,
    };

    // Validate categories
    const categories = cleanedData.category.split(',');
    const validCategories = ['development', 'design'];
    const areValidCategories = categories.every(cat => validCategories.includes(cat));

    if (!cleanedData.category || !areValidCategories) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    // Check if this is a temporary post
    if (cleanedData.temporary === true) {
      const tempPost = {
        ...cleanedData,
        _id: `temp-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: cleanedData.category
      };
      return NextResponse.json(tempPost);
    }

    const { db } = await connectToDatabase();
    const { _id, ...newPostData } = cleanedData;

    const result = await db.collection('posts').insertOne({
      ...newPostData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: cleanedData.category
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

    // Clean up empty strings
    const cleanedData = {
      ...postData,
      demoUrl: postData.demoUrl?.trim() || null,
      sourceUrl: postData.sourceUrl?.trim() || null,
    };

    if (!cleanedData.category || !['development', 'design'].includes(cleanedData.category)) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    const { _id, ...updateData } = cleanedData;
    const { db } = await connectToDatabase();

    const result = await db.collection('posts').updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          ...updateData,
          updatedAt: new Date().toISOString(),
          category: cleanedData.category
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ ...cleanedData });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}
