import { connectToDatabase } from '@/lib/mongodb'
import { Post } from '@/types/post'

const LIST_PROJECTION = {
  title: 1,
  description: 1,
  image: 1,
  slug: 1,
  tags: 1,
  category: 1,
  published: 1,
  pinned: 1,
  video: 1,
  logo: 1,
  publishedAt: 1,
  createdAt: 1,
  updatedAt: 1,
  projectType: 1,
} as const

function formatPost<T extends { _id: { toString(): string } }>(post: T) {
  return {
    ...post,
    _id: post._id.toString(),
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { db } = await connectToDatabase()
  const post = await db.collection('posts').findOne({ slug })
  if (!post) return null
  return formatPost(post) as unknown as Post
}

export async function getPostsList() {
  const { db } = await connectToDatabase()
  const posts = await db
    .collection('posts')
    .find({}, { projection: LIST_PROJECTION })
    .sort({ publishedAt: -1 })
    .toArray()

  return posts.map((post) => formatPost(post))
}
