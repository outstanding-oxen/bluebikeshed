const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  reviewText: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      len: {
        args: 100,
        msg: 'Please Enter your review'
      }
    }
  }
})

module.exports = Review
