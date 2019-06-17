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
  console.log('rendering')
  const classes = useStyles()
  const clearShoppingStandDummy = () => {
    console.log('clear shopping cart button clicked')
  }

  const checkoutShoppingStandDummy = () => {
    console.log('checkout shopping cart button clicked')
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Paper className={classes.paper} style={{height: '200px'}}>
            <div>name</div>
            <div>Address</div>
            <button onClick={clearShoppingStandDummy}>
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
            {/* add link to checkout to reducer */}
            checkout button
            <button onClick={checkoutShoppingStandDummy}> checkout</button>
            <ShoppingCart className={classes.icon} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Cart
