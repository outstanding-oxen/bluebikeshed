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
  constructor(props) {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
  }


  onSubmit(event) {
    try {
      this.props.addToCart(this.props.product, this.props.user.id)
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
  product: state.selectedProduct || {},
  user: state.id //|| {id: 1} //CHANGE THIS WHEN YOU CAN GET USER
})

const mapDispatch = dispatch => ({
  getProduct: id => dispatch(fetchProduct(id)),
  addToCart: (product, userId) => dispatch(addToOrder(product, userId))
})
export default connect(mapState, mapDispatch)(ProductPage)
