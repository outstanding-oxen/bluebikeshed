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

  const updateShoppingStandDummy = () => {
    console.log('update shopping cart button clicked')
  }
  const classes = useStyles()
  let cartProducts = props.cartProducts
  return cartProducts.map(product => (
    <Grid key={product.sku} item xs={9}>
      <Paper className={classes.paper} style={{height: '200px'}}>
        <div>
          <img
            style={{height: '300px'}}
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
            {/* add link here to delete */}
            update quanity
            <button onClick={updateShoppingStandDummy}>update</button>
          </div>
        </div>
      </Paper>
    </Grid>
  ))
}
// {dummyProducts.map(product => {
//   return (

//   )
// })}

export default ProductInCart
