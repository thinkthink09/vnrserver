import express from 'express'
let IndexRouter = express.Router()

IndexRouter.get('/', (req, res, next) => {
  res.send('VNR Server')
})

export default IndexRouter
