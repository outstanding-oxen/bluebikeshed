const router = require('express').Router()
const User = require('../db/models/user')
const Address = require('../db/models/address')
const Order = require('../db/models/order')
const {isAdmin, isSelfOrAdmin} = require('./functions')

//getting all users
router.get('/', async (req, res, next) => {
  try {
    const allCustomers = await User.findAll()
    res.status(200).json(allCustomers)
  } catch (error) {
    next(error)
  }
})

//getting user by id
router.get('/:id', async (req, res, next) => {
  const id = req.params.id

  try {
    const customer = await User.findByPk(id, {
      include: [{model: Address, as: 'Address'}]
    })
    res.status(200).json(customer)
  } catch (error) {
    next(error)
  }
})

// get orders by user
router.get('/:id/orders', (req, res, next) => {
  const userId = req.params.id
  return Order.findAll({where: {userId}})
    .then(orders => res.json(orders))
    .catch(next)
})

router.post('/', async (req, res, next) => {
  const {email, password, firstName, lastName} = req.body
  try {
    const newCustomer = await User.create({
      email,
      password,
      firstName,
      lastName
    })
    res.status(201).json(newCustomer)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  const {email, firstName, lastName, password} = req.body
  const id = req.params.id

  try {
    let customer = await User.update(
      {email, firstName, lastName, password},
      {returning: true, where: {id}}
    )
    res.json(customer[1])
  } catch (error) {
    next(error)
  }
})
router.post('/:id/address', async (req, res, next) => {
  const id = req.params.id
  const {city, state, zipcode, address} = req.body
  try {
    const newAddress = await Address.create({
      city,
      state,
      zipcode,
      address,
      customerId: id
    })
    res.status(201).json(newAddress)
  } catch (error) {
    next(error)
  }
})

router.put('/:id/address', async (req, res, next) => {
  const id = req.params.id
  const {city, state, zipcode, address} = req.body
  try {
    const updatedAddress = await Address.update(
      {city, state, zipcode, address, customerId: id},
      {returning: true, where: {customerId: id}}
    )
    res.status(201).json(updatedAddress[1])
  } catch (error) {
    next(error)
  }
})

//deletes a specific user
router.delete('/:id', (req, res, next) => {
  return User.findById(req.params.id)
    .then(user => {
      if (user) {
        return User.destroy({where: {id: req.params.id}}).then(() =>
          res.sendStatus(200)
        )
      } else res.sendStatus(404)
    })
    .catch(next)
})

module.exports = router
