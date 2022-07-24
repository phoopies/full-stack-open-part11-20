const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { JWT_SECRET } = require('../util/common')

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, JWT_SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  req.user = user
  return next()
}

module.exports = userExtractor
