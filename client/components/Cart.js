import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import DeleteIcon from '@material-ui/icons/DeleteForeverRounded'
import ShoppingCart from '@material-ui/icons/ShoppingCartRounded'

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
  console.log('rendering')
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Paper className={classes.paper} style={{height: '200px'}}>
            <div>name</div>
            <div>Address</div>
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
            <ShoppingCart className={classes.icon} />
          </Paper>
        </Grid>
        <Grid container spacing={1}>
          {dummyProducts.map(product => {
            return (
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
                    <div>remove item button</div>
                    <div>
                      {/* add link here to delete */}
                      update quanity<DeleteIcon classname={classes.icon} />
                    </div>
                  </div>
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    </div>
  )
}

export default Cart