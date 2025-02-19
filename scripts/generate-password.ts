import { hashPassword } from '../lib/auth'
import { randomBytes } from 'crypto'

const password = process.argv[2]
if (!password) {
  console.error('Please provide a password as an argument')
  process.exit(1)
}

const salt = randomBytes(16).toString('hex')
console.log('Generated AUTH_SALT:', salt)
console.log('Generated AUTH_PASSWORD:', hashPassword(password, salt))
