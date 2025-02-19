import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/mongodb'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDb()
    const result = await db
      .collection('posts')
      .deleteOne({
        _id: new ObjectId(params.id)
      })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postData = await request.json()
    const db = await getDb()

    const { ...updateData } = postData

    const result = await db
      .collection('posts')
      .findOneAndUpdate(
        { _id: new ObjectId(params.id) },
        {
          $set: {
            ...updateData,
            updatedAt: new Date().toISOString()
          }
        },
        {
          returnDocument: 'after',
          includeResultMetadata: true
        }
      )

    if (!result?.ok || !result.value) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const updatedPost = {
      ...result.value,
      _id: result.value._id.toString()
    }

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}
