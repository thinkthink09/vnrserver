import express from 'express'
import User from '../model/User'

const UserRouter = express.Router()

UserRouter.get('/list', (req, res, next) => {
  let users = [
    new User('James Coonce','jcoonce@vnr.com'),
    new User('Bob Coonce','bcoonce@vnr.com'),
    new User('Euri','euri@vnr.com'),
    new User('Norman','normandy@vnr.com')
  ]
  res.json(users)
})

UserRouter.post('/create', (req, res) => {
  let user = new User(req.body.name, req.body.email)
  res.json(user)
})

export default UserRouter
