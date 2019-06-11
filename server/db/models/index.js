const User = require('./user')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
const Customer = require('./customer')
const Address = require('./address')
const Cart = require('./cart')
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Customer.hasMany(Address, {as: 'Address'}) //Going to add CustomerID to Address Model
Address.hasMany(Customer)

module.exports = {
  User,
  Customer,
  Address
}
