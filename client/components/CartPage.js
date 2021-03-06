import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import {connect} from 'react-redux'
import ProductInCart from './ProductInCart'

//below are just icons
import ShoppingCart from '@material-ui/icons/ShoppingCartRounded'
import Clear from '@material-ui/icons/Clear'
import RenderToLayer from 'material-ui/internal/RenderToLayer'
import CartAndUser from './CartAndUser'
import {fetchProduct} from '../store/selectedProduct'
import {getOrder} from '../store/cart'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingTop: '10vh'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  icon: {
    margin: theme.spacing(1),
    fontSize: 20
  }
}))

const CartPage = props => {
  return (
    <div>
      <CartAndUser />
      <ProductInCart
      /* updateFunction={this.updateProductQuantity} */
      />
    </div>
  )
}

//export default CartPage

const mapState = state => ({
  userId: state.id,
  products: state.products
})

const mapDispatch = dispatch => ({
  getOrder: id => dispatch(getOrder(id)) //using this to test. once we implement user sign in to retrieve cart, we dont need this here
})

export default connect(mapState, mapDispatch)(CartPage)

//used for testing
// const dummyProducts = [
//   {
//     sku: '1',
//     name: 'dream1',
//     price: 20000,
//     description: 'generic dream 1',
//     imageUrl: 'nada.jpg',
//     quantity: 10
//   },
//   {
//     sku: '2',
//     name: 'dream2',
//     price: 20000,
//     description: 'generic dream 2',
//     imageUrl: 'dk',
//     quantity: 100
//   },
//   {
//     sku: 'dream3',
//     name: 'haha',
//     price: 1123,
//     description: 'okay',
//     imageUrl: 'blah.jpg',
//     quantity: 123
//   },
//   {
//     sku: 'dream 4',
//     name: 'lofihiphop',
//     price: 10,
//     description: 'beats to listen to whil chilling',
//     imageUrl: 'kdjflsk.jpg',
//     quantity: 4321
//   },
//   {
//     sku: 'dream 6',
//     name: 'missing dream 5',
//     price: 5,
//     description: 'loljk',
//     imageUrl: 'jk.jp',
//     quantity: 398
//   }
// ]
// const dummyProducts1 = {1: 1, 2: 2, 3: 3, 4: 5, 10: 4}
// const productArray = Object.keys(props.products)
