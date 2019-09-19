import React from 'react'
import loginService from '../services/login'

const Login = ({
  username, 
  setUsername, 
  password, 
  setPassword, 
  setUser, 
  errorMessage, 
  setErrorMessage }) => {

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user)) // left here, local storage meininki
      setUser(user)
      setPassword('')
      setUsername('')
    } catch(e) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Log in in to the application</h1>
      <p>
      {errorMessage}
      </p>
      <form onSubmit={handleLogin}>
        username: 
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({target}) => setUsername(target.value)} // event.target = {target} // destructures the object key
        />
        password: 
        <input 
          type="text"
          value={password}
          name="Password"
          onChange={({target}) => setPassword(target.value)}
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login