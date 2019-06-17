import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import {connect} from 'react-redux'

//below are just icons
import ShoppingCart from '@material-ui/icons/ShoppingCartRounded'
import Clear from '@material-ui/icons/Clear'
import RenderToLayer from 'material-ui/internal/RenderToLayer'

import {checkout, clearCart} from '../store/cart'

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
  const classes = useStyles()
  console.log('youyou', props.checkout)
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Paper className={classes.paper} style={{height: '200px'}}>
            <div>name</div>
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
            <div>Subtotal (items) : (cost)</div>
            <div> shipping: shipping here</div>
            <div> tax: taxhere</div>
            <div> total</div>
            checkout button
            <button onClick={() => props.checkout(id)}> checkout</button>
            <ShoppingCart className={classes.icon} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

//export default connect(mapState, mapDispatch)(Cart)

const mapState = state => ({
  userId: state.id || NaN
})

const mapDispatch = dispatch => ({
  clearCart: id => dispatch(clearCart(id)),
  checkout: id => dispatch(checkout(id))
})

export default connect(mapState, mapDispatch)(Cart)

//export default Cart
