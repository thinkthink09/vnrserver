import express from 'express'
import r from 'rethinkdb'
import Joi from 'joi'
import User from '../model/User'

let rconn = null
const UserController = express.Router()

UserController.use((req, res, next) => {
  const start = Date.now()
  rconn = req.app.rethinkConn
  res.once('finish', () => {
    console.log('UserController', req.method, req.url, `elapsed: ${Date.now() - start}ms`)
  })
  next()
})

/**
 * TODO should remove this when doing real world things
 */
UserController.get('/list', async (req, res) => {
  res.json(await r.table(User.table).run(rconn).then((users) => users.toArray()))
})

UserController.get('/count', async (req, res) => {
  res.json(await r.table(User.table).count().run(rconn))
})

UserController.post('/register', async (req, res) => {
  if (!validateUserData(req.body)) {
    return res.status(400).json('invalid user data')
  }

  let newUser = new User(req.body)

  if (await existUserWithEmail(newUser.email)) {
    return res.status(400).json('user email already exists')
  }

  if(await createUser(newUser)) {
    res.json('user successfully created')
  } else {
    return res.status(400).json('user creation failed')
  }
})

UserController.post('/login', async (req, res) => {
  let {email, password} = req.body

  if (Joi.validate(email, User.schema.email).error === null &&
      Joi.validate(password, User.schema.password).error === null
    ) {
    let user = await getUserWithEmail(email)
    if (user.password == password) {
      return res.json('login successful')
    }
  }
  res.status(400).json('invalid login credentials')
})


function validateUserData(user) {
  return Joi.validate(user, User.schema).error === null
}

function existUserWithEmail(email) {
  return r.table(User.table)
  .getAll(email, {index: 'email'}).count().run(rconn)
}

function createUser(user) {
  return r.table(User.table)
  .insert(user).run(rconn).then((result) => result.inserted)
}

function getUserWithEmail(email) {
  return r.table(User.table)
  .getAll(email, {index: 'email'}).run(rconn).then((users) => users.next())
}

export default UserController
