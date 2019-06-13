const router = require('express').Router()
const Product = require('../db/models/products')
const Review = require('../db/models/review')
const {isAdmin, isSelfOrAdmin, isLoggedIn} = require('./functions')

//Getting list of all products
router.get('/', (req, res, next) => {
  return Product.findAll()
    .then(product => {
      res.json(product)
      return null
    })
    .catch(next)
})

// Get one product, with reviews
router.get('/:id', (req, res, next) => {
  return Product.findByPk(req.params.id, {
    include: [{model: Review, as: 'review'}]
  })
    .then(product => res.json(product))
    .catch(next)
})

//Adding a new product if Admin
router.post('/add-product', isAdmin, (req, res, next) => {
  return Product.create(req.body)
    .then(product => res.status(201).send(product))
    .catch(next)
})

// edit individual product details ifAdmin
router.put('/:id', isAdmin, (req, res, next) => {
  return Product.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true
  })
    .then(result => {
      result[1][0] ? res.json(result[1][0]) : res.sendStatus(404)
    })
    .catch(next)
})

//Delete product if Admin
router.delete('/:id', isAdmin, (req, res, next) => {
  return Product.findById(req.params.id)
    .then(product => {
      if (product) {
        return Product.destroy({where: {id: req.params.id}}).then(() =>
          res.sendStatus(200)
        )
      } else res.sendStatus(404)
    })
    .catch(next)
})

//get reviews of a product
router.get('/products/:id/reviews', (req, res, next) => {
  return Review.findAll({
    where: {
      productId: req.params.id
    }
  })
    .then(reviews => res.json(reviews))
    .catch(next)
})

//post a review to a product
router.post('/:id/reviews', isLoggedIn, (req, res, next) => {
  return Product.findById(req.params.id).then(product => {
    if (!product) {
      res.sendStatus(404)
    } else {
      let review = req.body
      review.userId = req.user.id
      review.productId = req.params.id
      return Review.create(review).then(newreview => res.json(newreview))
    }
  })
})

//edit a review of a product
router.put('/:id/reviews', isSelfOrAdmin, (req, res, next) => {
  return Product.findById(req.params.id).then(product => {
    if (!product) {
      res.sendStatus(404)
    } else {
      let review = req.body
      return Review.update(review).then(updatereview => res.json(updatereview))
    }
  })
})

//delete a specific review
router.delete(
  '/:productId/reviews/:reviewId',
  isSelfOrAdmin,
  (req, res, next) => {
    return Review.findById(req.params.reviewId).then(product => {
      if (!product) {
        res.sendStatus(404)
      } else {
        return product.destroy().then(() => res.sendStatus(204))
      }
    })
  }
)

// Get products by category
router.get('/category/:categoryId', (req, res, next) => {
  return Product.findAll({
    where: {
      categoryId: req.params.categoryId
    }
  })
    .then(product => res.json(product))
    .catch(next)
})

module.exports = router
