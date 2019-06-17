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
    this.clearCart = this.clearCart.bind(this)
    this.checkoutCart = this.checkoutCart.bind(this)
  }

  componentDidMount() {
    //fetch all items in cart
  }

  updateProductQuantity(event) {
    event.preventDefault()
    event.persist()
    //should take product id, qty and user
    //then use thunk to update
    console.log('inside update function')
    console.log('event', event)
  }

  removeProductFromCart(event) {
    //take in product id and remove product from cart
  }

  clearCart() {
    //clear cart
  }

  checkoutCart() {}

  render() {
    const dummyProducts = [
      {
        sku: '1',
        name: 'dream1',
        price: 20000,
        description: 'generic dream 1',
        imageUrl: 'nada.jpg'
      },
      {
        sku: '2',
        name: 'dream2',
        price: 20000,
        description: 'generic dream 2',
        imageUrl: 'dk'
      },
      {
        sku: 'dream3',
        name: 'haha',
        price: 1123,
        description: 'okay',
        imageUrl: 'blah.jpg'
      },
      {
        sku: 'dream 4',
        name: 'lofihiphop',
        price: 10,
        description: 'beats to listen to whil chilling',
        imageUrl: 'kdjflsk.jpg'
      },
      {
        sku: 'dream 6',
        name: 'missing dream 5',
        price: 5,
        description: 'loljk',
        imageUrl: 'jk.jp'
      }
    ]
    const dummyProducts1 = []
    return (
      <div>
        <Cart />
        <ProductInCart
          productsInCart={dummyProducts}
          updateFunction={this.updateProductQuantity}
        />
      </div>
    )
  }
}

// //dummy data
// const Cart1 = props => {
//   const dummyProducts = [
//     {
//       sku: '1',
//       name: 'dream1',
//       price: 20000,
//       description: 'generic dream 1',
//       imageUrl: 'nada.jpg'
//     },
//     {
//       sku: '2',
//       name: 'dream2',
//       price: 20000,
//       description: 'generic dream 2',
//       imageUrl: 'dk'
//     },
//     {
//       sku: 'dream3',
//       name: 'haha',
//       price: 1123,
//       description: 'okay',
//       imageUrl: 'blah.jpg'
//     },
//     {
//       sku: 'dream 4',
//       name: 'lofihiphop',
//       price: 10,
//       description: 'beats to listen to whil chilling',
//       imageUrl: 'kdjflsk.jpg'
//     },
//     {
//       sku: 'dream 6',
//       name: 'missing dream 5',
//       price: 5,
//       description: 'loljk',
//       imageUrl: 'jk.jp'
//     }
//   ]
//   const dummyProducts1 = []
//   console.log('rendering')
//   const classes = useStyles()
//   //To do : get thunks and connect to buttons
//   //clear cart button, deletes all from order where status = pending
//   //update qty button
//   //checkout button, thunk that will change current order where status = pending to status = fulfilled
//   //
//   const clearShoppingStandDummy = () => {
//     console.log('clear shopping cart button clicked')
//   }

//   const checkoutShoppingStandDummy = () => {
//     console.log('checkout shopping cart button clicked')
//   }

//   return (
//     <div className={classes.root}>
//       <Grid container spacing={3}>
//         <Grid item xs={9}>
//           <Paper className={classes.paper} style={{height: '200px'}}>
//             <div>name</div>
//             <div>Address</div>
//             <button onClick={clearShoppingStandDummy}>
//               clear shopping cart
//             </button>
//             <Clear />
//           </Paper>
//         </Grid>

//         <Grid item xs={3}>
//           <Paper className={classes.paper} style={{height: '200px'}}>
//             <div> COSTS</div>
//             <div>Subtotal (items) : (cost)</div>
//             <div> shipping: shipping here</div>
//             <div> tax: taxhere</div>
//             <div> total</div>
//             {/* add link to checkout to reducer */}
//             checkout button
//             <button onClick={checkoutShoppingStandDummy}> checkout</button>
//             <ShoppingCart className={classes.icon} />
//           </Paper>
//         </Grid>
//         <Grid container spacing={1}>
//           <ProductInCart cartProducts={dummyProducts} />
//         </Grid>
//       </Grid>
//     </div>
//   )
// }

export default CartPage
