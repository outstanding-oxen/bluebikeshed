const router = require('express').Router()
const OrderDetail = require('../db/models/orderDetail')

// post order given a specific user
router.put('/:id', (req, res, next) => {
  console.log('entered put route in order details')
  let neworder = req.body
  neworder.orderId = req.params.id
  return OrderDetail.create(neworder)
    .then(order => res.json(order))
    .catch(next)
})

module.exports = router
