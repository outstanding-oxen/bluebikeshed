import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'

// /**
//  * COMPONENT
//  *
//  */

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
  }

  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    return <ProductInAllProducts products={this.props.products} />
  }
}
// /**
//  * CONTAINER
//  */
const mapState = state => ({
  products: state.product || []
})

const mapDispatch = dispatch => ({
  getAllProducts: () => dispatch(fetchProducts())
})
export default connect(mapState, mapDispatch)(AllProducts)

// /**
//  * PROP TYPES
//  */
// // AllProducts.propTypes = {
// //   email: PropTypes.string
// // }
