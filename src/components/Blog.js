import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'


const Blog = ({ blog, setBlogs }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const hideWhenVisible = { display : blogVisible ? 'none' : ''}
  const showWhenVisible = { display : blogVisible ? '' : 'none'}
  const blogStyle = {
    padding: 10,
    paddingLeft: 0,
    border: '1px solid black',
    margin: 10,
    marginLeft: 0,
    display: 'flex',
  }
  const titleStyle = {
    cursor: 'pointer',
  }

  const updateBlogs = async () => {
    const result = await blogService.getAll()
    setBlogs(result)
  }

  const likeBlog = async () => {
    const title = blog.title
    const author = blog.author
    const url = blog.url
    const user = blog.user.id
    const likes = blog.likes + 1
    const id = blog._id
    await blogService.like({
      title, author, url, user, likes
    }, id)

    await updateBlogs()
  }

  const removeBlog = async (title, author, id) => {
    const conf = window.confirm(`Are you sure you want to remove ${title} by ${author}?`) 
    conf && await blogService.remove(id)
  }

  return (
    <div style={blogStyle}>
      <div style={{ ...hideWhenVisible  }} >
        <div style={titleStyle} onClick={() => setBlogVisible(!blogVisible)}>{blog.title}</div> <div>{blog.author} </div>
      </div>
      <div style={{ ...showWhenVisible }}>
        <div style={titleStyle} onClick={() => setBlogVisible(!blogVisible)}>{blog.title}</div>
        <div> {blog.author} </div>
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} likes<button onClick={ ()=> likeBlog()}>like</button> </div>
        <div>added by {blog.user.username}</div>
        <button onClick={() => removeBlog(blog.title, blog.author, blog._id)}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired
}



export default Blog