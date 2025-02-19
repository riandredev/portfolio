import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'
import { Post } from '@/types/post'

export async function GET() {
  try {
    const db = await getDb()
    const posts = await db
      .collection('posts')
      .find({ }) // Empty query to get all documents
      .sort({ publishedAt: -1 })
      .toArray()

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const postData = await request.json()
    console.log('Received post data:', postData)

    // Ensure required fields are present
    if (!postData.title || !postData.description || !postData.slug || !postData.image) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const db = await getDb()

    // Check if slug is unique
    const existingPost = await db
      .collection('posts')
      .findOne({ slug: postData.slug })

    if (existingPost) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 400 }
      )
    }

    // Remove the temporary ID and let MongoDB generate one
    const { _id, ...postDataWithoutId } = postData

    const result = await db
      .collection('posts')
      .insertOne({
        ...postDataWithoutId,
        createdAt: new Date(),
        updatedAt: new Date()
      })

    const newPost = {
      ...postDataWithoutId,
      _id: result.insertedId.toString()
    }

    return NextResponse.json(newPost)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to create post: ' + (error as Error).message },
      { status: 500 }
    )
  }
}
