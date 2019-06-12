const Sequelize = require('sequelize')
const db = require('../db')
const Category = require('./category')
const Order = require('./Order')
const OrderDetail = require('./OrderDetail')
const Product = require('./Products')
const Customer = require('./customer')
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
Customer.hasMany(Order)
Order.belongsTo(Customer)
Customer.hasMany(Address, {as: 'Address'}) //Going to add CustomerID to Address Model

module.exports = {
  Category,
  Order,
  OrderDetail,
  Product,
  Customer,
  Address,
  Cart
}
