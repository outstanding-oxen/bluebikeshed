const router = require('express').Router()
const User = require('../db/models/user')
const Address = require('../db/models/address')

router.get('/', async (req, res, next) => {
  try {
    const allCustomers = await User.findAll()
    res.status(200).json(allCustomers)
  } catch (error) {
    next(error)
  }
})

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

module.exports = router
