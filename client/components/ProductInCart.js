import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import DeleteIcon from '@material-ui/icons/DeleteForeverRounded'

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

const ProductInCart = props => {
  console.log('cart products rendering')

  const deleteShoppingStandDummy = () => {
    console.log('delete shopping cart button clicked')
  }

  const updateQuantity = props.updateFunction
  const updateShoppingStandDummy = event => {
    event.preventDefault()
    console.log('update shopping cart button clicked')
    event.persist()
    console.log(event.target)
  }

  const classes = useStyles()
  let cartProducts = props.productsInCart
  if (cartProducts.length === 0) {
    return (
      <Grid item xs={9}>
        <Paper className={classes.paper}>No items in cart</Paper>
      </Grid>
    )
  } else {
    return cartProducts.map(product => (
      <Grid key={product.sku} item xs={9}>
        <Paper className={classes.paper} style={{height: '150px'}}>
          <div>
            <img
              style={{height: '150px'}}
              src={product.imageUrl}
              alt="product Img"
            />
            <div>{product.name}</div>
            <div>quantity</div>
            <div>${product.price} times quantity</div>
            <div>
              remove item button<DeleteIcon className={classes.icon} />
              <button onClick={deleteShoppingStandDummy}>delete</button>
            </div>
            <div>
              <form onSubmit={updateQuantity}>
                <label htmlFor="quantity">quantity:</label>
                <input type="text" name="quantity" />
                <button type="submit">Submit</button>
                {/* your form fields here */}
              </form>
            </div>
          </div>
        </Paper>
      </Grid>
    ))
  }
}

// {dummyProducts.map(product => {
//   return (

//   )
// })}

export default ProductInCart
