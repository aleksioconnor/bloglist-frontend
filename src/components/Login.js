import React from 'react'
import loginService from '../services/login'
import { useField } from '../hooks'


const Login = ({
  setUser,
  errorMessage,
  setErrorMessage }) => {

  const username = useField('text')
  const password = useField('text')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({'username': username.props.value, 'password': password.props.value })

      window.localStorage.setItem('loggedUser', JSON.stringify(user) )
      setUser(user)

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
          {...username.props}
        />
        password:
        <input
          {...password.props}
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login