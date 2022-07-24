const Blog = require('../models/blog')
const User = require('../models/user')

const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
]

const testUser = {
  username: 'tester',
  name: 'tester',
  password: 'secret',
}

const blogsInDb = async () => {
  const dbBlogs = await Blog.find({})
  return dbBlogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  blogs,
  blogsInDb,
  usersInDb,
  testUser,
}
