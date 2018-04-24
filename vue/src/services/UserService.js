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
  }
}
