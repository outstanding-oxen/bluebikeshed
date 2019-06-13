const Address = require('../db/models/address')

router.put('/:id', async (req, res, next) => {
  const id = req.params.id
  const {city, state, zipcode, address} = req.body
  try {
    const updatedAddress = await Address.update(
      {city, state, zipcode, address, customerId: id},
      {returning: true, where: {addressId: id}}
    )
    res.status(201).json(updatedAddress[1])
  } catch (error) {
    next(error)
  }
})

module.exports = router
