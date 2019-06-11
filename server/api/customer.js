const router = require('express').Router()
const Customer = require('../db/models/customer')
const Address = require('../db/models/address')

router.get('/', async (req, res, next) => {
  try {
    const allCustomers = await Customer.findAll()
    res.status(200).json(allCustomers)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  const id = req.params.id

  try {
    const customer = await Customer.findById(id, {include: [{model: Address}]})
    res.status(200).json(customer)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  const {email, password, firstName, lastName} = req.body
  try {
    const newCustomer = await Customer.create({
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
    let customer = await Customer.update(
      {email, firstName, lastName, password},
      {returning: true, where: {id}}
    )
    res.json(customer)
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
    res.status(201).json(updatedAddress)
  } catch (error) {
    next(error)
  }
})

module.exports = router
