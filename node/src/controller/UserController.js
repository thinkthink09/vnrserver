import express from 'express'
import User from '../model/User'

const UserController = express.Router()

UserController.use((req, res, next) => {
  const start = Date.now()
  res.once('finish', () => {
    console.log('UserController', req.method, req.url, `elapsed: ${Date.now() - start}ms`)
  })
  next()
})

UserController.get('/list', (req, res, next) => {
  let users = [
    new User('James Coonce','jcoonce@vnr.com'),
    new User('Bob Coonce','bcoonce@vnr.com'),
    new User('Euri','euri@vnr.com'),
    new User('Norman','normandy@vnr.com')
  ]
  res.json(users)
})

UserController.post('/create', (req, res) => {
  let user = new User(req.body.name, req.body.email)
  res.json(user)
})

export default UserController
