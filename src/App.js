import React, {useState, useEffect} from 'react';
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import blogsService from './services/blogs'



function App() {
  // State declarations
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect( () => {
    const fetchBlogs = async () => {
      const result = await blogsService.getAll()
      setBlogs(result)
    }
    fetchBlogs()
  }, [])

  const loginForm = () => (
    <Login 
      username={username} 
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
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
    />
  )

  return (
    <div className="App">
      <h1>Log in in to the application</h1>
      {user === null && loginForm()}
      {user !== null && dashboard()}

    </div>
  );
}

export default App;
