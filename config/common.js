/**
 * Insert application wide common items here, they're all exported by frontend and backend common.js respectively
 */
require('dotenv').config()

const { PORT } = process.env || 8000
const { DB_PASSWORD } = process.env
const { DB_NAME } = process.env
const DB_URL = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI
const { JWT_SECRET } = process.env

const inProduction = process.env.NODE_ENV === 'production'
const inTestEnv = process.env.NODE_ENV === 'test'

module.exports = {
  inProduction,
  PORT,
  JWT_SECRET,
  DB_PASSWORD,
  DB_NAME,
  DB_URL,
  inTestEnv,
}
