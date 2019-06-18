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

// update orderDetail for a given orderDetail id
router.put('/:id', async (req, res, next) => {
  try {
    let updtVal = req.body
    let updtOrderArr = await OrderDetail.update(updtVal, {
      returning: true,
      where: {id: req.params.id}
    })
    res.status(201).json(updtOrderArr[1])
  } catch (err) {
    next(err)
  }
})

// delete orderDetail row for a given orderDetail id
router.delete('/:id', async (req, res, next) => {
  try {
    await OrderDetail.destroy({where: {id: req.params.id}})
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

module.exports = router
