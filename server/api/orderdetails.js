const router = require('express').Router()
const OrderDetail = require('../db/models/orderDetail')

// post orderDetail for a given order id
router.post('/:id', (req, res, next) => {
  let neworder = req.body
  neworder.orderId = req.params.id
  return OrderDetail.create(neworder)
    .then(order => res.json(order))
    .catch(next)
})

// update orderDetail for a give orderDetail id
router.put('/:id', async (req, res, next) => {
  let updtVal = req.body
  let updtOrderArr = await OrderDetail.update(updtVal, {
    returning: true,
    where: {id: req.params.id}
  })
  res.status(201).json(updtOrderArr[1])
})

module.exports = router
