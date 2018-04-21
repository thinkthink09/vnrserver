import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import r from 'rethinkdb'
import config from './config/config'
import { sequelize } from './model/.models'
import routes from './controller/.routes'

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

routes(app)

const start = () => {
  app.listen(config.port, () => {
    /* eslint-disable no-console */
    console.log(`Server started on port ${config.port}`)
    /* eslint-enable no-console */
  })
}

if (config.sequelize) {
  sequelize.sync().then(start)
} else if (config.rethinkdb) {
  r.connect(config.rethinkdb, (err, conn) => {
    if (err) throw err
    app.rtdbConn = conn
    start()
  })
} else {
  start()
}
