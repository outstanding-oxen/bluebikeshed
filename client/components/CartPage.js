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
import Cart from './Cart'
import {checkout, clearCart, updateQuantity} from '../store/cart'
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

class CartPage extends React.Component {
  constructor() {
    super()
    this.updateProductQuantity = this.updateProductQuantity.bind(this)
    this.removeProductFromCart = this.removeProductFromCart.bind(this)
    this.clearCartFunction = this.clearCartFunction.bind(this)
    this.checkoutCartFunction = this.checkoutCartFunction.bind(this)
  }

  componentDidMount() {
    //fetch all items in cart
    //output an array of products id with qty
    //for loop through output to grab product from axios
    let productIdArray = []
    let productArray = []
    for (let i = 0; i < productArray.length; i++) {
      let product = fetchProduct(productIdArray[i].id)
      product.quantity = productIdArray[i].qty
      productArray.push(product)
    }
  }

  updateProductQuantity(event) {
    event.preventDefault()
    event.persist()
    //should take product id, qty and user
    //then use thunk to update
    console.log('inside update function')
    console.log('event', event)
    console.log('other', event.target)
    //this.props.updateQuantity()needs id, item, qty
  }

  removeProductFromCart(event) {
    //take in product id and remove product from cart
  }

  clearCartFunction() {
    //clear cart
    this.props.clearCart(this.props.userId)
  }

  checkoutCartFunction() {
    console.log(this.props.userId)
    this.props.checkout(this.props.userId)
  }

  render() {
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
    const dummyProducts1 = []
    return (
      <div>
        <Cart
          clearCart={this.clearCartFunction}
          checkoutCart={this.checkoutCartFunction}
        />
        <ProductInCart
          productsInCart={dummyProducts}
          updateFunction={this.updateProductQuantity}
        />
      </div>
    )
  }
}

const mapState = state => ({
  cartProducts: state.cart || [], //UPDATE AS NEEDED
  userId: state.id || 12345
})

const mapDispatch = dispatch => ({
  clearCart: id => dispatch(clearCart(id)),
  checkout: id => dispatch(checkout(id)),
  updateQuantity: (id, item, qty) => dispatch(updateQuantity(item, qty))
})

export default connect(mapState, mapDispatch)(CartPage)

//export default CartPage
