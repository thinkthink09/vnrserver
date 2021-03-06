import express from 'express'
import r from '../rethinkdbPool'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import config from '../config/config'
import User from '../model/User'
import { AuthenticateUser } from './middleware/UserAuthenticator'
import {
  sleep
} from '../utility/common'

const UserController = express.Router()

UserController.use((req, res, next) => {
  const start = Date.now()
  res.once('finish', () => {
    console.log('UserController', req.method, req.url, `elapsed: ${Date.now() - start}ms`)
  })
  next()
})

/**
 * TODO should remove this when doing real world things
 */
UserController.get('/list', AuthenticateUser, async (req, res) => {
  res.json(await r.table(User.table))
})

UserController.get('/count', async (req, res) => {
  res.json(await r.table(User.table).count())
})

UserController.get('/get/:id', AuthenticateUser, async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json('invalid request id')
  }
  res.json(await getUser(req.params.id))
})

UserController.post('/register', async (req, res) => {
  if (!validateUserData(req.body)) {
    return res.status(400).json('invalid user data')
  }

  let newUser = new User(req.body)

  if (await existUserWithEmail(newUser.email)) {
    return res.status(400).json('user email already exists')
  }

  if (await createUser(newUser)) {
    return res.json({
      token: signUser(newUser.data()),
      user: newUser.data()
    })
  } else {
    return res.status(400).json('user creation failed')
  }
})

UserController.post('/login', async (req, res) => {
  let {email, password} = req.body

  if (Joi.validate(email, User.schema.email).error === null &&
      Joi.validate(password, User.schema.password).error === null
    ) {
    let users = await getUsersWithEmail(email)
    if (users.length === 1) {
      let user = new User(users[0])
      if (user.checkPassword(password)) {
        return res.json({
          token: signUser(user.data()),
          user: user.data()
        })
      }
    } else {
      //mock password check to prevent timing attack
      await sleep(Math.random() * 100 + 450)
    }
  }
  res.status(400).json('invalid login credentials')
})

UserController.post('/update', AuthenticateUser, async (req, res) => {
  if (!req.body.id || !validateUserData(req.body)) {
    return res.status(400).json('invalid user data')
  }

  let newUser = new User(req.body)
  let oldUser = await getUser(req.body.id)

  if (newUser.email !== oldUser.email && await existUserWithEmail(newUser.email)) {
    return res.status(400).json('user email already exists')
  }

  if (await updateUser(newUser)) {
    return res.json(newUser.data())
  } else {
    return res.status(400).json('update user failed')
  }
})

function validateUserData(user) {
  return Joi.validate(user, User.schema).error === null
}

function existUserWithEmail(email) {
  return r.table(User.table)
  .getAll(email, {index: 'email'}).count()
}

function getUser(id) {
  return r.table(User.table).get(id)
}

function getUsersWithEmail(email) {
  return r.table(User.table)
  .getAll(email, {index: 'email'})
}

function createUser(user) {
  user.hashPassword()
  return r.table(User.table)
  .insert(user).then((result) => {
    if (result.inserted) {
      user.id = result.generated_keys[0]
    }
    return result.inserted
  })
}

function updateUser(user) {
  user.hashPassword()
  return r.table(User.table).get(user.id)
  .update(user).then((result) => result.replaced)
}

function signUser(user) {
  console.log(`${user.name}<${user.email}> signed in ${Date.now()}`)
  return jwt.sign(user, config.jwt.secret, config.jwt.options)
}

export default UserController
