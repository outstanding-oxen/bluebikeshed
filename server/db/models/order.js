const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('orders', {
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
    validate: {
      notEmpty: true,
      isDate: true
    }
  },
  merchantAmt: {
    type: Sequelize.FLOAT,
    validate: {
      notEmpty: true,
      isFloat: true
    }
  },
  tax: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
      isDecimal: true
    }
  },
  shippingAmt: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
      isFloat: true
    }
  },
  totalAmt: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
      isFloat: true
    }
  }
})

module.exports = Order
