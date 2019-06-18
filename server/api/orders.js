const router = require('express').Router()
const Order = require('../db/models/order')
const OrderDetail = require('../db/models/orderDetail')
const Address = require('../db/models/address')
const Product = require('../db/models/products')

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
    const allOrders = await Order.findAll({
      include: [OrderDetail]
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
    const customer = await Order.findByPk(id, {
      include: [{model: OrderDetail}]
    })
    res.status(200).json(customer)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {
      merchantAmt,
      tax,
      shippingAmt,
      totalAmt,
      userId,
      isFulfilled
    } = req.body
    const orderInst = await Order.create({
      merchantAmt,
      tax,
      shippingAmt,
      totalAmt,
      userId,
      isFulfilled
    })
    res.status(201).json(orderInst)
  } catch (error) {
    next(error)
  }
})

// Update order based on User Id
router.put('/:id', async (req, res, next) => {
  try {
    const {merchantAmt, tax, shippingAmt, totalAmt, isFulfilled} = req.body
    const orderInstArr = await Order.update(
      {
        merchantAmt,
        tax,
        shippingAmt,
        totalAmt,
        isFulfilled
      },
      {
        returning: true,
        where: {id: req.params.id}
      }
    )
    res.status(201).json(orderInstArr[1])
  } catch (error) {
    next(error)
  }
})

module.exports = router
