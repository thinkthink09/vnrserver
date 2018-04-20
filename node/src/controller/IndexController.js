import express from 'express'
let IndexController = express.Router()

IndexController.all('/', (req, res, next) => {
  res.send('VNR Server')
})

export default IndexController
