const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 2,
      max: 2
    }
  },
  zipcode: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 5,
      max: 5
    }
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Address
