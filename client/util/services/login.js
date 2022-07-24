import axios from 'axios'
import blogService from './blogs'

const baseUrl = '/api/login'

const login = async (username, password) => {
  const credentials = {
    username,
    password,
  }
  const res = await axios.post(baseUrl, credentials)
  window.localStorage.setItem('user', JSON.stringify(res.data))
  blogService.setToken(res.data.token)
  return res.data
}

const logout = () => {
  window.localStorage.removeItem('user')
}

const getUser = () => JSON.parse(window.localStorage.getItem('user'))

export default { login, logout, getUser }
