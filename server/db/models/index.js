const category = require('./category')
const order = require('./order')
const orderDetail = require('./orderDetail')
const product = require('./product')
const Customer = require('./customer')
const Address = require('./address')
const Cart = require('./cart')

// ASSOCIATIONS
product.belongsTo(category)
category.hasMany(product)
product.belongsToMany(orderDetail, {through: 'OrderDetail'})
orderDetail.hasOne(product)
order.hasMany(orderDetail)
orderDetail.belongsTo(order)
Customer.hasMany(Address, {as: 'Address'}) //Going to add CustomerID to Address Model

module.exports = {
  category,
  order,
  orderDetail,
  product,
  User,
  Customer,
  Address
}
