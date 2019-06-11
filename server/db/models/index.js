const category = require('./category')
const order = require('./order')
const orderDetail = require('./orderDetail')
const product = require('./product')

// ASSOCIATIONS
product.belongsTo(category)
category.hasMany(product)
product.belongsToMany(orderDetail, {through: 'OrderDetail'})
orderDetail.hasOne(product)
order.hasMany(orderDetail)
orderDetail.belongsTo(order)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  category,
  order,
  orderDetail,
  product
}
