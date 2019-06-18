const router = require('express').Router()

router.use('/orderdetails', require('./orderdetails'))
router.use('/orders', require('./orders'))
router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/address', require('./address'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
