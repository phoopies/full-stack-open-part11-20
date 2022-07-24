/**
 * @jest-environment jsdom
 */

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Blog title',
  author: 'Blog author',
  likes: 10,
  url: 'unknown',
}

test('Default render has title and author but not url or likes', () => {
  render(<Blog blog={blog} />)

  const header = screen.getByText(`${blog.title} | ${blog.author}`)
  expect(header).toBeDefined()

  const url = screen.queryByText(blog.url)
  expect(url).toBeNull()

  const likes = screen.queryByText('likes')
  expect(likes).toBeNull()
})

test('Blog content is shown after opening full view', async () => {
  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const url = screen.getByText(blog.url)
  expect(url).toBeDefined()

  const likes = screen.getByText('likes', { exact: false })
  expect(likes).toBeDefined()
})

test('Like button pressed twice', async () => {
  const like = jest.fn()

  render(<Blog blog={blog} like={like} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByRole('button', { name: 'like' })

  await user.click(likeButton)
  await user.click(likeButton)

  expect(like.mock.calls).toHaveLength(2)
})
