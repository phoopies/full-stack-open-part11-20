const router = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../middleware/userExtractor')

require('express-async-errors')

router.post('/', userExtractor, async (req, res, _next) => {
  const { body } = req

  // Would use mongoose internal validation but it returns a status code 500.
  if (!(body.title && body.url)) {
    res.status(400).json({ error: 'Missing fields' })
  }

  const { user } = req
  const blog = new Blog({ ...req.body, user: user.id })
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  res.status(201).json(savedBlog)
})

router.post('/:id/comments', async (req, res, _next) => {
  const { body } = req
  const blog = await Blog.findById(req.params.id)

  blog.comments = blog.comments.concat(body.comment)
  await blog.save()

  res.status(201).json(blog)
})

router.get('/', async (_req, res) => {
  const blog = await Blog.find({}).populate('user', { username: 1, name: 1 })

  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', userExtractor, async (req, res, _next) => {
  const blog = await Blog.findById(req.params.id)

  const { user } = req

  if (blog.user.toString() !== user.id.toString()) {
    return res.status(403).json({ error: 'Not the owner of the blog' })
  }

  await Blog.findByIdAndDelete(blog.id)
  return res.status(204).end()
})

router.put('/:id', async (req, res, _next) => {
  const { body } = req

  // Can only edit likes.
  const blog = {
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
    runValidators: false,
    context: 'query',
  })

  res.json(updatedBlog)
})

module.exports = router
