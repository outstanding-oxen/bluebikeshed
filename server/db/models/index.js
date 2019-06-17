const Sequelize = require('sequelize')
const db = require('../db')
const Category = require('./category')
const Order = require('./order')
const OrderDetail = require('./orderDetail')
const Product = require('./products')
const User = require('./user')
const Address = require('./address')
const Cart = require('./cart')
const Review = require('./review')

// ASSOCIATIONS
Product.belongsTo(Category)
Category.hasMany(Product)
// Product.belongsToMany(Order, {through: 'orderDetails'})
// Adding following association create (an unused) FK on Product Model
// OrderDetail.hasOne(Product)
Product.hasMany(OrderDetail)
OrderDetail.belongsTo(Product)
Order.hasMany(OrderDetail)
OrderDetail.belongsTo(Order)
// Customer.hasMany(Order)
// Order.belongsTo(Customer)
// Customer.hasMany(Address, {as: 'Address'}) //Going to add CustomerID to Address Model
// Order.hasMany(OrderDetail)
// OrderDetail.belongsTo(Order)
User.hasMany(Order)
Order.belongsTo(User)
User.hasMany(Address, {as: 'Address'}) //Going to add CustomerID to Address Model
Product.hasMany(Review, {as: 'review'})
Review.belongsTo(User, {as: 'user'})
Review.belongsTo(Product, {as: 'product'})

module.exports = {
  Category,
  Order,
  OrderDetail,
  Product,
  User,
  Address,
  Cart
}
