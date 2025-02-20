import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/mongodb'
import { Post } from '@/types/post'
import { deleteMediaFile } from '@/lib/file-utils'

function isValidObjectId(id: string): boolean {
  try {
    return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
  } catch {
    return false;
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid post ID format' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const objectId = new ObjectId(id);

    // First get the post to access its media files
    const post = await db.collection('posts').findOne({ _id: objectId });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Delete associated media files
    if (post.image) await deleteMediaFile(post.image);
    if (post.video) await deleteMediaFile(post.video);
    if (post.logo) await deleteMediaFile(post.logo);

    // Delete media from content blocks
    if (post.content?.blocks) {
      for (const block of post.content.blocks) {
        if (block.type === 'image' && block.url) {
          await deleteMediaFile(block.url);
        }
        if (block.type === 'video' && block.url) {
          await deleteMediaFile(block.url);
        }
      }
    }

    // Delete the post
    const result = await db.collection('posts').deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Failed to delete post' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Server error while deleting post' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    console.log('Received ID:', id); // Debug log

    if (!isValidObjectId(id)) {
      console.error('Invalid ObjectId:', id);
      return NextResponse.json(
        { error: 'Invalid post ID format', message: `Invalid post ID: ${id}` },
        { status: 400 }
      );
    }

    const postData: Post = await request.json();
    console.log('Received post data:', postData); // Debug log

    const db = await getDb();
    const objectId = new ObjectId(id);

    // First check if post exists
    const existingPost = await db.collection('posts').findOne({ _id: objectId });
    if (!existingPost) {
      console.error('Post not found:', id);
      return NextResponse.json(
        { error: 'Post not found', message: `No post found with ID: ${id}` },
        { status: 404 }
      );
    }

    const { _id, ...updateData } = postData;

    // Using updateOne instead of findOneAndUpdate for better error handling
    const result = await db.collection('posts').updateOne(
      { _id: objectId },
      {
        $set: {
          ...updateData,
          updatedAt: new Date().toISOString()
        }
      }
    );

    if (result.modifiedCount === 0) {
      console.error('Update failed - no documents modified');
      return NextResponse.json(
        { error: 'Update failed', message: 'No changes were made to the post' },
        { status: 500 }
      );
    }

    // Fetch the updated document
    const updatedPost = await db.collection('posts').findOne({ _id: objectId });
    if (!updatedPost) {
      console.error('Failed to fetch updated post');
      return NextResponse.json(
        { error: 'Update verification failed', message: 'Could not verify the update' },
        { status: 500 }
      );
    }

    // Convert _id to string in response
    const responsePost = {
      ...updatedPost,
      _id: updatedPost._id.toString()
    };

    console.log('Successfully updated post:', responsePost); // Debug log
    return NextResponse.json(responsePost);

  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      {
        error: 'Server error',
        message: error instanceof Error ? error.message : 'Failed to update post'
      },
      { status: 500 }
    );
  }
}
