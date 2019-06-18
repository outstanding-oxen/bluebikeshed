const router = require('express').Router()
const OrderDetail = require('../db/models/orderDetail')

// post order given a specific user
router.post('/:id', (req, res, next) => {
  let neworder = req.body
  neworder.orderId = req.params.id
  return OrderDetail.create(neworder)
    .then(order => res.json(order))
    .catch(next)
})

module.exports = router
