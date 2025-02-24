import { MongoClient, Db } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

const uri = process.env.MONGODB_URI
const options = {
  maxPoolSize: 10,
  minPoolSize: 5,
}

let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    const client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  const client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Function that returns a database instance
export async function connectToDatabase() {
  const client = await clientPromise;
  return { db: client.db('portfolio') };
}

// Update getDb to use the new connection method
export async function getDb(): Promise<Db> {
  const { db } = await connectToDatabase();
  return db;
}

export async function ensureCappedCollection() {
  try {
    const db = await getDb()
    const collections = await db.listCollections({ name: 'visitors' }).toArray()

    if (collections.length === 0) {
      console.log('Creating visitors collection...')
      await db.createCollection('visitors', {
        capped: true,
        size: 512000, // Increased size to 500KB
        max: 1000     // Increased max documents
      })
      console.log('Visitors collection created successfully')
    } else {
      console.log('Visitors collection already exists')
    }
  } catch (error) {
    console.error('Failed to setup collection:', error)
    throw error
  }
}

export default clientPromise;

interface VisitorData {
  country: string;
  countryCode: string;
  userAgent: string;
  timestamp: Date;
}

// Add this helper function
export async function logVisitor(visitorData: VisitorData) {
  try {
    const db = await getDb()
    const result = await db.collection('visitors').insertOne(visitorData)
    console.log('Visitor logged successfully:', result.insertedId)
    return result
  } catch (error) {
    console.error('Failed to log visitor:', error)
    throw error
  }
}

// Add this helper function
export async function getUniqueVisitors() {
  try {
    const db = await getDb()
    const pipeline = [
      {
        $sort: { timestamp: -1 }
      },
      {
        $group: {
          _id: {
            city: "$city",
            country: "$country",
            countryCode: "$countryCode",
            userAgent: "$userAgent"
          },
          count: { $sum: 1 },
          timestamp: { $first: "$timestamp" }
        }
      },
      {
        $project: {
          _id: 0,
          city: "$_id.city",
          country: "$_id.country",
          countryCode: "$_id.countryCode",
          userAgent: "$_id.userAgent",
          count: 1,
          timestamp: 1
        }
      },
      {
        $sort: { timestamp: -1 }
      },
      {
        $limit: 50
      }
    ]

    return await db.collection('visitors').aggregate(pipeline).toArray()
  } catch (error) {
    console.error('Failed to get unique visitors:', error)
    throw error
  }
}

interface Settings {
  _id: string;
  recentPostsLimit: number;
}

export async function getSettings() {
  try {
    const db = await getDb()
    const settings = await db.collection<{ _id: string } & Settings>('settings').findOne({ _id: 'global' })
    return settings || { _id: 'global', recentPostsLimit: 4 } // Default settings
  } catch (error) {
    console.error('Failed to get settings:', error)
    throw error
  }
}

export async function updateSettings(settings: Partial<Settings>) {
  try {
    const db = await getDb()
    await db.collection<Settings>('settings').updateOne(
      { _id: 'global' } as Pick<Settings, '_id'>,
      { $set: settings },
      { upsert: true }
    )
    return settings
  } catch (error) {
    console.error('Failed to update settings:', error)
    throw error
  }
}
