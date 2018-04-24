import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/user/'
})

export default {
  create (user) {
    return api.post('create', user)
  },
  login (credentials) {
    return api.post('login', credentials)
  }
}
