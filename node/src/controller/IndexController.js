import express from 'express'
let IndexController = express.Router()

IndexController.all('/', (req, res, next) => {
  res.send('VNR Server')
})

IndexController.all('/error', (req, res, next) => {
  throw new Error('Test Error')
})

export default IndexController
