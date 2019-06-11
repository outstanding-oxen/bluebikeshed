const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('products', {
  sku: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isAlphanumeric: true
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isAlphanumeric: true
    }
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
      isFloat: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      isAlphanumeric: true
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true,
      isUrl: true
    }
  }
})

module.exports = Product
