import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import config from './config/config'
import { sequelize } from './model/models'
import routes from './route/routes'

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

if (config.db) {
  sequelize.sync().then(start)
} else {
  start()
}
