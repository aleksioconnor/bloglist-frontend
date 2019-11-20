import React from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const LogOut = () => {
  const logUserOut = () => {
    window.localStorage.removeItem('loggedUser')
  }
  return (
    <button onClick={() => {logUserOut()}}>Logout</button>
  )
}

const AddBlog = ({
  user,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  setErrorMessage,
  blogVisible,
  setBlogVisible,
  setBlogs,
}) => {

  const updateBlogs = async () => {
    console.log('toimiiks tää ees')
    const result = await blogService.getAll()
    setBlogs(result)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await blogService.create({
        title, author, url, user
      })
      await updateBlogs()
      setErrorMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')



    } catch(e) {
      setErrorMessage('blog was not added')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const hideWhenVisible = { display : blogVisible ? 'none' : '' }
  const showWhenVisible = { display : blogVisible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogVisible(true)}>add blog</button>
      </div>
      <div style={showWhenVisible}>
        <h3>create new</h3>
        <form onSubmit={handleSubmit}>
                title:
          <input
            type='text'
            value={title}
            name='title'
            onChange={({ target }) => setTitle(target.value)}
          />
                author:
          <input
            type='text'
            value={author}
            name='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
                url:
          <input
            type='text'
            value={url}
            name='url'
            onChange={({ target }) => setUrl(target.value)}
          />
          <button type='submit'>create</button>
        </form>
        <button onClick={() => setBlogVisible(false)}>cancel</button>
      </div>
    </div>
  )
}


const Dashboard = ({
  user,
  blogs,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  errorMessage,
  setErrorMessage,
  setBlogVisible,
  blogVisible,
  setBlogs }) => {
  return (
    <div>
      <p>
        {errorMessage}
      </p>
        Hello {user.username}
      <LogOut />
      <div>
        <h2>blogs</h2>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog key={blog._id} blog={blog} setBlogs={setBlogs}/>
          )}
      </div>
      <AddBlog
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
        user={user}
        setErrorMessage={setErrorMessage}
        setBlogVisible={setBlogVisible}
        blogVisible={blogVisible}
      />

    </div>
  )
}

export default Dashboard