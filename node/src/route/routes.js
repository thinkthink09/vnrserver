import IndexRouter from './IndexRouter'
import UserRouter from './UserRouter'

module.exports = (app) => {
  app.use('/', IndexRouter)
  app.use('/user', UserRouter)
}
