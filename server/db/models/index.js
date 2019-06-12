const Sequelize = require('sequelize')
const db = require('../db')
const Category = require('./category')
const Order = require('./order')
const OrderDetail = require('./orderDetail')
const Product = require('./products')
const User = require('./user')
const Address = require('./address')
const Cart = require('./cart')

// ASSOCIATIONS
Product.belongsTo(Category)
Category.hasMany(Product)
Product.belongsToMany(Order, {through: 'orderDetails'})
// Product.belongsToMany(OrderDetail, {through: 'OrderInfo'})
// OrderDetail.hasOne(Product)
// Order.hasMany(OrderDetail)
// OrderDetail.belongsTo(Order)
User.hasMany(Order)
Order.belongsTo(User)
User.hasMany(Address, {as: 'Address'}) //Going to add CustomerID to Address Model

module.exports = {
  Category,
  Order,
  OrderDetail,
  Product,
  User,
  Address,
  Cart
}
