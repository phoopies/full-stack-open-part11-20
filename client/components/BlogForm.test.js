/**
 * @jest-environment jsdom
 */

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'

test('Has correct input fields', () => {
  render(<BlogForm />)

  const title = screen.getByText('title')
  expect(title).toBeDefined()

  const author = screen.getByText('author')
  expect(author).toBeDefined()

  const url = screen.getByText('url')
  expect(url).toBeDefined()

  const likes = screen.queryByText('likes')
  expect(likes).toBeNull()
})

test('Creating a new blog calls the callback function with correct parameters', async () => {
  const addBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm addBlog={addBlog} />)

  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')

  await user.type(title, 'Something')
  await user.type(author, 'Someone')
  await user.type(url, 'www.asd.com')

  const createButton = screen.getByText('create', { exact: true })
  await user.click(createButton)

  expect(addBlog.mock.calls).toHaveLength(1)

  expect(addBlog.mock.calls[0][0]).toBe('Something')
  expect(addBlog.mock.calls[0][1]).toBe('Someone')
  expect(addBlog.mock.calls[0][2]).toBe('www.asd.com')
})
