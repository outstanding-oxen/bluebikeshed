import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'

// /**
//  * COMPONENT
//  *
//  */

import {addToOrder} from '../store/cart'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import ProductInAllProducts from './ProductInAllProducts'
// import AppBar from '@material-ui/core/AppBar'
// import Toolbar from '@material-ui/core/Toolbar'
// import Typography from '@material-ui/core/Typography'

// import IconButton from '@material-ui/core/IconButton'
// import MenuIcon from '@material-ui/icons/Menu'

import {fetchProducts} from '../store/product'

// eslint-disable-next-line react/require-render-return
class AllProducts extends React.Component {
  constructor() {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getAllProducts()
  }
  onSubmit(product) {
    console.log('FROM ALL PRODUCTS', product)
    try {
      this.props.addToCart(product, this.props.user.id)
      // this.addToCard(this.props.product)
      // this.props.addToCard(this.props.product, null)
    } catch (err) {
      console.error(err)
    }
  }
  render() {
    return (
      <ProductInAllProducts
        products={this.props.products}
        onSubmit={this.onSubmit}
      />
    )
  }
}
// /**
//  * CONTAINER
//  */
const mapState = state => ({
  products: state.product || [],
  user: state.id || {id: 1}
})

const mapDispatch = dispatch => ({
  getAllProducts: () => dispatch(fetchProducts()),
  addToCart: (product, userId) => dispatch(addToOrder(product, userId))
})
export default connect(mapState, mapDispatch)(AllProducts)

// /**
//  * PROP TYPES
//  */
// // AllProducts.propTypes = {
// //   email: PropTypes.string
// // }
