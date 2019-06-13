const Sequelize = require('sequelize')
const db = require('../db')
const OrderDetail = require('./orderDetail')

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

// Order.beforeCreate((instance, options) => {
//   const num = OrderDetail.sum('itemExtAmt', { where: { orderId: 1 } }).then(sum => {})
//   instance.merchantAmt = num
// })

module.exports = Order
