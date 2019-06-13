const router = require('express').Router()
const Order = require('../db/models/order')
const OrderDetail = require('../db/models/orderDetail')
const Address = require('../db/models/address')

//Get all orders
router.get('/', async (req, res, next) => {
  try {
    const allOrders = await Order.findAll()
    res.status(200).json(allOrders)
  } catch (error) {
    next(error)
  }
})

//Get all Orders with order details
router.get('/all', async (req, res, next) => {
  try {
    const allOrders = await OrderDetail.findAll({
      include: [{model: Order, as: 'order'}]
    })
    res.status(200).json(allOrders)
  } catch (error) {
    next(error)
  }
})

//Get all order details based on order id
router.get('/all/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const customer = await OrderDetail.findAll({
      where: {orderId: id}
    })
    res.status(200).json(customer)
  } catch (error) {
    next(error)
  }
})

module.exports = router
