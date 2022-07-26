/* eslint-disable jest/expect-expect */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./helper')

const { DB_URL, inTestEnv } = require('../util/common')

// Better way?
let token

beforeEach(async () => {
  console.log(DB_URL, inTestEnv)
  await Blog.deleteMany({})
  await Blog.insertMany(helper.blogs)

  await User.deleteMany({})
  await api.post('/users')
    .send(helper.testUser)

  const res = await api.post('/login')
    .send(helper.testUser)

  token = res.body.token
})

describe('Before each', () => {
  test('has correct amount of blogs', async () => {
    const res = await api.get('/blogs')
    expect(res.body).toHaveLength(helper.blogs.length)
  })

  test('user exists and token is created', async () => {
    const res = await api.get('/users')
    expect(res.body.map((user) => user.name)).toContain('tester')

    expect(token).toBeDefined()
  })
})

describe('Misc', () => {
  test('Blog identifier is "id"', async () => {
    const res = await api.get('/blogs')
    const blog = res.body[0]
    expect(blog.id).toBeDefined()
  })

  test('Default likes is set to 0', async () => {
    const blog = {
      title: 'No likes',
      author: 'The hated one',
      url: 'www.com',
    }

    await api
      .post('/blogs')
      .send(blog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    const addedBlog = blogs.find((b) => b.title === 'No likes')
    expect(addedBlog.likes).toEqual(0)
  })
})

describe('Adding', () => {
  test('A valid blog can be added', async () => {
    const title = 'Testing patterns'
    const blog = {
      title,
      author: 'Mooc',
      url: 'https://youwish.u/',
      likes: 100,
    }

    await api
      .post('/blogs')
      .send(blog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1)

    expect(blogsAtEnd.map((b) => b.title)).toContain(title)
  })

  test('Missing title', async () => {
    const blog = {
      author: 'Missing info',
      url: 'some url',
    }

    await api
      .post('/blogs')
      .send(blog)
      .set('Authorization', `bearer ${token}`)
      .expect(400)
  })

  test('Missing url', async () => {
    const blog = {
      author: 'Missing info',
      title: 'some title',
    }

    await api
      .post('/blogs')
      .send(blog)
      .set('Authorization', `bearer ${token}`)
      .expect(400)
  })

  test('Missing title and url', async () => {
    const blog = {
      author: 'Missing info',
    }

    await api
      .post('/blogs')
      .send(blog)
      .set('Authorization', `bearer ${token}`)
      .expect(400)
  })
})

describe('Deletion', () => {
  test('a note can be deleted with valid token', async () => {
    const blog = {
      title: 'to be deleted',
      author: 'ddd',
      url: 'https://ddd.d/',
      likes: 0,
    }

    const res = await api
      .post('/blogs')
      .send(blog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogId = res.body.id

    const oldBlogs = await helper.blogsInDb()
    expect(oldBlogs.map((b) => b.id)).toContain(blogId)

    await api
      .delete(`/blogs/${blogId}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogs = await helper.blogsInDb()

    expect(blogs).toHaveLength(
      oldBlogs.length - 1,
    )

    expect(blogs.map((b) => b.id)).not.toContain(blogId)
  })

  test('a note can NOT be deleted without a token', async () => {
    const oldBlogs = await helper.blogsInDb()
    const blog = oldBlogs[0]

    await api
      .delete(`/blogs/${blog.id}`)
      .expect(401)

    const blogs = await helper.blogsInDb()

    expect(blogs).toHaveLength(
      oldBlogs.length,
    )
  })
})

describe('Updating', () => {
  test('Incrementing likes', async () => {
    const oldBlogs = await helper.blogsInDb()
    const blog = oldBlogs[0]

    await api
      .put(`/blogs/${blog.id}`)
      .send({ ...blog, likes: blog.likes + 1 })
      .set('Authorization', `bearer ${token}`)
      .expect(200)

    const blogs = await helper.blogsInDb()
    const updatedBlog = blogs.find((b) => b.id === blog.id)

    expect(updatedBlog.likes).toEqual(blog.likes + 1)
  })

  test('setting likes', async () => {
    const oldBlogs = await helper.blogsInDb()
    const blog = oldBlogs[0]

    const newLikes = 10000

    await api
      .put(`/blogs/${blog.id}`)
      .send({ ...blog, likes: newLikes })
      .set('Authorization', `bearer ${token}`)
      .expect(200)

    const blogs = await helper.blogsInDb()
    const updatedBlog = blogs.find((b) => b.id === blog.id)

    expect(updatedBlog.likes).toEqual(newLikes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
