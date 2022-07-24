const User = require('../models/user')

const isUniqueName = async (username) => {
  const existingUser = await User.findOne({ username })
  return existingUser === null
}

const isValidPassword = (pw) => {
  const minLength = 3
  return pw.length >= minLength
}

module.exports = {
  isUniqueName,
  isValidPassword,
}
