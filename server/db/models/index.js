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
// Adding following association create (an unused) FK on Product Model
// OrderDetail.hasOne(Product)
Order.hasMany(OrderDetail)
OrderDetail.belongsTo(Order)
User.hasMany(Order)
Order.belongsTo(User)
User.hasMany(Address /* {as: 'Address'} */) //Going to add UserID to Address Model
//commented out {as: 'Address'} as there is a error :
//SequelizeAssociationError: You have used the alias Address in two separate associations.
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
