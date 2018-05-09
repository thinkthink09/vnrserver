import express from 'express'
import bodyParser from 'body-parser'
// import morgan from 'morgan'
import cors from 'cors'
import r from 'rethinkdb'
import passport from 'passport'
import config from './config/config'
import { sequelize } from './model/.models'
import routes from './controller/.routes'

const app = express()

// app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(passport.initialize())

routes(app)

// 404 handler override
app.use((req, res) => {
  res.status(404)
  res.json(`Cannot ${req.method} ${req.path}`)
})

// 500
/* eslint-disable handle-callback-err */
app.use((error, req, res, next) => {
  res.status(500)
  res.json('Sorry, the server hit an error 😢')
})
/* eslint-enable handle-callback-err */

/* eslint-disable no-console */
function createRethinkConn (req, res, next) {
  console.log('create rethink connection')
  r.connect(config.rethinkdb).then((conn) => {
    req.rethinkConn = conn
    next()
  }).error((error) => {
    res.send(500, { error: error.message })
  })
}

function closeRethinkConn (req, res, next) {
  console.log('close rethink connection')
  req.rethinkConn.close()
}
/* eslint-enable no-console */

function start () {
  app.listen(config.port, () => {
    /* eslint-disable no-console */
    console.log(`Server started on port ${config.port}`)
    /* eslint-enable no-console */
  })
}

if (config.sequelize) {
  // starting server with sequelize
  sequelize.sync().then(start)
} else if (config.rethinkdb) {
  // starting server with rethink
  app.use(createRethinkConn)
  app.use(closeRethinkConn)

  r.connect(config.rethinkdb).then((conn) => {
    app.rethinkConn = conn
  }).then(start)
} else {
  start()
}
