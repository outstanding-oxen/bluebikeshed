const Sequelize = require('sequelize')
const db = require('../db')

const OrderDetail = db.define('orderDetails', {
  itemUnitAmt: {
    type: Sequelize.INTEGER,
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
    type: Sequelize.INTEGER
  }
})

OrderDetail.beforeCreate((instance, options) => {
  instance.itemExtAmt = instance.itemQty * instance.itemUnitAmt
})

module.exports = OrderDetail
