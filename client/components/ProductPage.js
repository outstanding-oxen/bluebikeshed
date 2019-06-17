import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ItemOnProductPage from './ItemOnProductPage'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/selectedProduct'
class ProductPage extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
  }
  render() {
    return <ItemOnProductPage product={this.props.product} />
    // return <h1>{this.props.product.name}</h1>
  }
}

const mapState = state => ({
  product: state.selectedProduct || {}
})

const mapDispatch = dispatch => ({
  getProduct: id => dispatch(fetchProduct(id))
})
export default connect(mapState, mapDispatch)(ProductPage)
