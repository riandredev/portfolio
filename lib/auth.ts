import { createHash } from 'crypto';
import getMongoDb  from './mongodb';

export function hashPassword(password: string, salt: string): string {
  return createHash('sha256')
    .update(password + salt)
    .digest('hex');
}

export async function validateCredentials(email: string, password: string): Promise<boolean> {
  const expectedEmail = process.env.AUTH_EMAIL;
  const expectedPassword = process.env.AUTH_PASSWORD;
  const salt = process.env.AUTH_SALT;

  if (!expectedEmail || !expectedPassword || !salt) {
    throw new Error('Missing authentication configuration');
  }

  // Compare email first
  if (email !== expectedEmail) {
    return false;
  }

  // Hash the provided password
  const hashedPassword = createHash('sha256')
    .update(password + salt)
    .digest('hex');

  // Compare hashed password
  return hashedPassword === expectedPassword;
}

export async function validateToken(token: string): Promise<boolean> {
  const db = await getMongoDb();
  const auth = await db.collection('auth').findOne({ authToken: token });
  return !!auth;
}
