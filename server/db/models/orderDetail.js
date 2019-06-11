const Sequelize = require('sequelize')
const db = require('../db')

const OrderDetail = db.define('orderDetails', {
  itemUnitAmt: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
      isFloat: true
    }
  },
  itemQty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      isInt: true
    }
  },
  itemExtAmt: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
      isFloat: true
    }
  }
})

module.exports = OrderDetail
