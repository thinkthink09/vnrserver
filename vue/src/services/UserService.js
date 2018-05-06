import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/user/'
})

export default {
  register (user) {
    return api.post('register', user)
  },
  login (credentials) {
    return api.post('login', credentials)
  },
  getUser (userId) {
    return api.get(`get/${userId}`)
  },
  deleteUser (userId) {
    return api.delete(`delete/${userId}`)
  },
  updateUser (user) {
    return api.post('update', user)
  },
  getUsers () {
    return api.get('list')
  },
  getUserCount () {
    return api.get('count')
  }
}
