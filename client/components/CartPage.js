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

// class CartPage extends React.Component {
//   constructor() {
//     super()
//     this.updateProductQuantity = this.updateProductQuantity.bind(this)
//     this.removeProductFromCart = this.removeProductFromCart.bind(this)
//     this.clearCartFunction = this.clearCartFunction.bind(this)
//     this.checkoutCartFunction = this.checkoutCartFunction.bind(this)
//   }

//   componentDidMount() {
//     //fetch all items in cart
//     //output an array of products id with qty
//     //for loop through output to grab product from axios
//     let productIdArray = []
//     let productArray = []
//     for (let i = 0; i < productArray.length; i++) {
//       let product = fetchProduct(productIdArray[i].id)
//       product.quantity = productIdArray[i].qty
//       productArray.push(product)
//     }
//   }
const CartPage = props => {
  const dummyProducts = [
    {
      sku: '1',
      name: 'dream1',
      price: 20000,
      description: 'generic dream 1',
      imageUrl: 'nada.jpg',
      quantity: 10
    },
    {
      sku: '2',
      name: 'dream2',
      price: 20000,
      description: 'generic dream 2',
      imageUrl: 'dk',
      quantity: 100
    },
    {
      sku: 'dream3',
      name: 'haha',
      price: 1123,
      description: 'okay',
      imageUrl: 'blah.jpg',
      quantity: 123
    },
    {
      sku: 'dream 4',
      name: 'lofihiphop',
      price: 10,
      description: 'beats to listen to whil chilling',
      imageUrl: 'kdjflsk.jpg',
      quantity: 4321
    },
    {
      sku: 'dream 6',
      name: 'missing dream 5',
      price: 5,
      description: 'loljk',
      imageUrl: 'jk.jp',
      quantity: 398
    }
  ]
  const dummyProducts1 = {1: 1, 2: 2, 3: 3, 4: 5, 10: 4}
  const productArray = Object.keys(props.products)
  //need to feed products into here
  return (
    <div>
      <CartAndUser />
      <ProductInCart
        productsInCart={dummyProducts1}
        /* updateFunction={this.updateProductQuantity} */
      />
    </div>
  )
}

//export default CartPage

const mapState = state => ({
  userId: state.id || NaN,
  products: state.products || {}
})

export default connect(mapState, null)(CartPage)
