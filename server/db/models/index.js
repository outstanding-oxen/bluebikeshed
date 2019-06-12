const Sequelize = require('sequelize')
const db = require('../db')
const Category = require('./Category')
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
// Adding following association create (an unused) FK on Product Model
// OrderDetail.hasOne(Product)
Order.hasMany(OrderDetail)
OrderDetail.belongsTo(Order)
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
