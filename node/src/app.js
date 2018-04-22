import express from 'express'
import bodyParser from 'body-parser'
// import morgan from 'morgan'
import cors from 'cors'
import r from 'rethinkdb'
import config from './config/config'
import { sequelize } from './model/.models'
import routes from './controller/.routes'

const app = express()

// app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

routes(app)

// function createRethinkConn (req, res, next) {
//   console.log('create rethink connection')
//   r.connect(config.rethinkdb).then((conn) => {
//     req.rethinkConn = conn
//     next()
//   }).error((error) => {
//     res.send(500, { error: error.message })
//   })
// }
//
// function closeRethinkConn (req, res, next) {
//   console.log('close rethink connection')
//   req.rethinkConn.close()
// }

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
  // app.use(createRethinkConn)
  // app.use(closeRethinkConn)

  r.connect(config.rethinkdb).then((conn) => {
    app.rethinkConn = conn
  }).then(start)
} else {
  start()
}
