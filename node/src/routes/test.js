import express from 'express'
let router = express.Router()

router.get('/', (req, res, next ) => {
  res.send("Hello World!")
})

export default router
