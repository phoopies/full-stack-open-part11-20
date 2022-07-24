const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog')
const logger = require('./util/logger')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const testingRouter = require('./controllers/testing')
const { DB_URL } = require('./util/common')

const tokenExtractor = require('./middleware/tokenExtractor')
const errorHandler = require('./middleware/errorHandler')

const app = express()
app.use(tokenExtractor)

const disconnect = () => {
  logger.info('Disconnecting...')
  mongoose.connection.disconnect()
}

logger.info('Connecting to database...')

mongoose
  .connect(DB_URL)
  .then((_result) => logger.info('Connected to database'))
  .catch((error) => logger.error('Failed to connect\n', error))

// app.use(express.static('build'))
app.use(express.json())

app.use('/blogs', blogRouter)
app.use('/login', loginRouter)
app.use('/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
  app.use('/testing', testingRouter)
}

app.on('close', () => {
  disconnect()
})

// app.use(middleware.unknownEndpoint);
app.use(errorHandler)

module.exports = app
