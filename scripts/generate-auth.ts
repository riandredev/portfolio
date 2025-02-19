import { config } from 'dotenv';
import { createHash, randomBytes } from 'crypto';
import { MongoClient } from 'mongodb';

// Load environment variables
config({ path: '.env.local' });

async function generateAuth() {
  const password = process.argv[2];

  if (!password) {
    console.error('Please provide a password as an argument');
    process.exit(1);
  }

  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI environment variable is not set');
    process.exit(1);
  }

  const salt = randomBytes(16).toString('hex');
  const authToken = randomBytes(32).toString('hex');

  const hashedPassword = createHash('sha256')
    .update(password + salt)
    .digest('hex');

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db('portfolio');

    await db.collection('auth').deleteMany({});
    await db.collection('auth').insertOne({
      email: process.env.AUTH_EMAIL || 'ri4ndre@gmail.com',
      password: hashedPassword,
      salt,
      authToken
    });

    console.log('\nAuth credentials generated successfully!');
    console.log('\nAdd these values to your .env.local:');
    console.log('----------------------------------------');
    console.log(`AUTH_SALT=${salt}`);
    console.log(`AUTH_TOKEN=${authToken}`);
    console.log(`AUTH_PASSWORD=${hashedPassword}`);
    console.log('----------------------------------------');

    await client.close();
  } catch (error) {
    console.error('Failed to store credentials:', error);
    process.exit(1);
  }
}

generateAuth().catch(console.error);
