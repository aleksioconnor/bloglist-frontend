import React, {useState, useEffect} from 'react';
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import blogsService from './services/blogs'



function App() {
  // State declarations
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [blogVisible, setBlogVisible] = useState(false)


  useEffect( () => {
    const fetchBlogs = async () => {
      const result = await blogsService.getAll()
      setBlogs(result)
    }
    fetchBlogs()
  }, [])

  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <Login 
      user={user}
      setUser={setUser}
      setErrorMessage={setErrorMessage}
      errorMessage={errorMessage}
    />
  )

  const dashboard = () => (
    <Dashboard 
      user={user}
      blogs={blogs}
      title={title}
      setTitle={setTitle}
      author={author}
      setAuthor={setAuthor}
      url={url}
      setUrl={setUrl}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
      blogVisible={blogVisible}
      setBlogVisible={setBlogVisible}
      setBlogs={setBlogs}
    />
  )

  return (
    <div className="App">
      {user === null && loginForm()}
      {user !== null && dashboard()}

    </div>
  );
}

export default App;
