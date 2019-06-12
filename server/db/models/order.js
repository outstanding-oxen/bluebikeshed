const Sequelize = require('sequelize')
const db = require('../db')
//everything should be integers
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
    type: Sequelize.INTEGER,
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
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      isFloat: true
    }
  },
  totalAmt: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      isFloat: true
    }
  },
  isFulfilled: {
    type: Sequelize.ENUM('pending', 'completed', 'cancelled'),
    defaultValue: 'pending'
  }
})

module.exports = Order
