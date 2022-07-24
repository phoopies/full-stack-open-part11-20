const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const helper = require('../util/login')

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if (!(await helper.isUniqueName(username))) {
    return res.status(400).json({
      error: 'username must be unique',
    })
  }

  if (!helper.isValidPassword(password)) {
    return res.status(400).json({
      error: 'password is invalid',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  return res.status(201).json(savedUser)
})

usersRouter.get('/', async (_req, res) => {
  const user = await (User.find({})).populate('blogs', { title: 1, author: 1, url: 1 })

  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = usersRouter
