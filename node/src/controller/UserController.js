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
UserController.get('/list', (req, res, next) => {
  r.table(User.table).run(rconn).then((users) =>
    users.toArray()
  ).then((result) => {
    res.json(result)
  }).error((error) => {
    res.json(error)
  }).finally(next)
})

UserController.get('/count', (req, res, next) => {
 r.table(User.table).count().run(rconn).then((count) => {
   res.json(count)
 }).error((error) => {
   res.json(error)
 }).finally(next)
})

UserController.post('/create', async (req, res, next) => {
  if (!validateUserData(req.body)) {
    res.send('invalid user data')
    next()
    return
  }

  let newUser = new User(req.body)
  console.log(await existUserWithEmail(newUser.email))

  if (await existUserWithEmail(newUser.email)) {
    res.send('user email already exists')
    next()
    return
  }

  if(await createUser(newUser)) {
    res.send('user successfully created')
  } else {
    res.send('user creation failed')
  }
  next()
})

function validateUserData(user) {
  return Joi.validate(user, User.schema).error === null
}

async function existUserWithEmail(email) {
  let check = false
  await r.table(User.table)
  .filter((user) => user.email == email).count().run(rconn)
  .then((count) => {
    check = count > 0
  })
  return check
}

async function createUser(user) {
  return false
}

export default UserController
