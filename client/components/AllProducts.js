import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {ToastContainer, toast} from 'react-toastify'
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
  notify = name => toast(`${name} added to your cart`)
  onSubmit(product) {
    try {
      this.props.addToCart(product, this.props.user.id)
      this.notify(product.name)
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
  user: state.user
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
