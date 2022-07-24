const lodash = require('lodash')

const dummy = (_blogs) => 1

const totalLikes = (blogs) => blogs.reduce((prev, blog) => prev + blog.likes, 0)

const favoriteBlog = (blogs) => blogs.reduce((prev, blog) => (blog.likes > (prev ? prev.likes : 0) ? blog : prev), undefined)

const mostBlogs = (blogs) => lodash.chain(blogs).groupBy('author').map((val, key) => ({ author: key, blogs: val.length })).maxBy('blogs')
  .value()

const mostLikes = (blogs) => lodash.chain(blogs).groupBy('author').map((val, key) => ({ author: key, likes: lodash.reduce(val, (prev, blog) => prev + blog.likes, 0) })).maxBy('likes')
  .value()

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
