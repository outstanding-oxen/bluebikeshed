import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ItemOnProductPage from './ItemOnProductPage'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/selectedProduct'
import {addToOrder} from '../store/cart'
class ProductPage extends React.Component {
  constructor() {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
  }

  addToCard(product, UserId) {
    console.log('llllllll')

    if (!UserId) UserId = 2
    this.props.addToCart(product, UserId)
  }
  onSubmit(event) {
    try {
      console.log('ergjnegjnerogerogk')
      this.addToCard(this.props.product)
      // this.props.addToCard(this.props.product, null)
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <ItemOnProductPage
        product={this.props.product}
        onSubmit={this.onSubmit}
      />
    )
    // return <h1>{this.props.product.name}</h1>
  }
}

const mapState = state => ({
  product: state.selectedProduct || {}
})

const mapDispatch = dispatch => ({
  getProduct: id => dispatch(fetchProduct(id)),
  addToCart: (product, UserId) => dispatch(addToOrder(product, UserId))
})
export default connect(mapState, mapDispatch)(ProductPage)
