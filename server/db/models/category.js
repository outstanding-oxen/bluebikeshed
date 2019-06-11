const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('categories', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isAlpha: true
    }
  }
})

module.exports = Category
