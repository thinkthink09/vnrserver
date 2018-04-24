import express from 'express'
let IndexController = express.Router()

IndexController.all('/', (req, res, next) => {
  res.json('VNR Server')
})

/**
 * TODO should remove these when doing real world things
 */
IndexController.all('/echo', (req, res, next) => {
  res.json(req.query)
})

/**
 * TODO should remove these when doing real world things
 */
IndexController.all('/error', (req, res, next) => {
  throw new Error('Test Error')
})

/**
 * TODO should move to utils
 */
IndexController.all('/random', (req, res, next) => {
  req.app.random = Math.floor(Math.random() * 10) + 1
  res.json(req.app.random)
})

IndexController.all('/last-random', (req, res, next) => {
  res.json(req.app.random)
})

export default IndexController
