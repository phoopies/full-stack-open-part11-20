import { useState } from 'react'
import * as React from 'react'

const Blog = ({
  blog, remove, isOwner, like,
}) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div
      style={{ border: '2px solid black', padding: 5 }}
      className="blog"
    >
      <h4>
        {blog.title}
        {' '}
        |
        {' '}
        {blog.author}
      </h4>
      {showDetails && (
      <div style={{ marginBottom: 15 }}>
        <a href={blog.url}>{blog.url}</a>
        <div>
          likes
          {' '}
          {blog.likes}
          <button type="button" onClick={like} className="like-btn">like</button>
        </div>
        {isOwner && <button type="button" onClick={remove}>remove</button>}
      </div>
      )}
      <button
        type="button"
        onClick={() => {
          setShowDetails(!showDetails)
        }}
      >
        {showDetails ? 'close' : 'view'}
      </button>
    </div>
  )
}

export default Blog
