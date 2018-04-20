// import fs from 'fs'
// import path from 'path'
import IndexController from './IndexController'
import UserController from './UserController'

// const routes = []
//
// fs.readdirSync(__dirname)
//   .filter((file) =>
//     file !== 'routes.js'
//   )
//   .forEach((file) => {
//     routes.push(`./${file.replace('.js','')}`)
//   })

module.exports = (app) => {
  // console.log('loading routes:')
  // console.log(routes)
  // routes.forEach((route) => {
  //   const router = require(route)
  //   app.use('/', router)
  // })
  app.use('/', IndexController)
  app.use('/user', UserController)
}
