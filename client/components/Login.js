import * as React from 'react'
import { useState } from 'react'
import loginService from '../util/services/login'
import TextInput from './TextInput'

const Login = ({ setUser, addNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login(username, password)
      setUser(user)
      addNotification(`${user.name} logged in`, 'green')
      setUsername('')
      setPassword('')
    } catch (exception) {
      addNotification('Wrong credentials!', 'red')
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>Login to start creating blogs</h2>
      <TextInput
        text="username"
        value={username}
        id="username"
        onChange={(value) => setUsername(value)}
      />
      <TextInput
        text="password"
        value={password}
        id="password"
        onChange={(value) => setPassword(value)}
      />
      <button id="login-btn" type="submit">Login</button>
    </form>
  )
}

export default Login
