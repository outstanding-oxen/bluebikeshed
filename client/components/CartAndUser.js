import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {PayPalButton} from 'react-paypal-button-v2'

//below are just icons
import ShoppingCart from '@material-ui/icons/ShoppingCartRounded'
import Clear from '@material-ui/icons/Clear'

import {checkout, clearOrder} from '../store/cart'

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

const Cart = props => {
  const id = props.userId
  const cart = props.cart
  const qty = Object.values(cart.products).reduce(
    (total, qty) => total + qty,
    0
  )
  console.log(qty)
  console.log(cart)
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Paper className={classes.paper} style={{height: '200px'}}>
            <div>User details</div>
            <div>Address</div>
            <button onClick={() => props.clearCart(id)}>
              clear shopping cart
            </button>
            <Clear />
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper className={classes.paper} style={{height: '200px'}}>
            <div> COSTS</div>
            <div>
              Subtotal ({qty} items) : ${cart.merchantAmt / 100}
            </div>
            <Link to="/orders/checkout">
              <button type="button" className="btn btn-info">
                Proceed To Checkout
              </button>
              <br />
              <br />
              <PayPalButton
                amount={cart.merchantAmt / 100}
                onSuccess={(details, data) => {
                  alert(
                    'Transaction completed by ' + details.payer.name.given_name
                  )

                  // OPTIONAL: Call your server to save the transaction
                  return fetch('/paypal-transaction-complete', {
                    method: 'post',
                    body: JSON.stringify({
                      orderID: data.orderID
                    })
                  })
                }}
              />
            </Link>
            <ShoppingCart className={classes.icon} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

const mapState = state => ({
  userId: state.id || 1,
  cart: state.cart
})

const mapDispatch = dispatch => ({
  clearCart: id => dispatch(clearOrder(id))
})

export default connect(mapState, mapDispatch)(Cart)

//export default Cart
