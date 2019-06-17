import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import DeleteIcon from '@material-ui/icons/DeleteForeverRounded'
import {connect} from 'react-redux'

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

class ProductInCart extends React.Component {
  constructor(props) {
    super()
    this.updateQuantity = this.updateQuantity.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = props.productsInCart
  }
  handleChange(event) {
    console.log(event)

    this.setState({
      [event.target.name]: event.target.value
    })
  }
  updateQuantity(event) {
    event.preventDefault()
    event.persist()
    console.log(event.target[0].name)

    // console.log('i work')
    // console.log(event)
  }
  render() {
    console.log('state', this.state)
    const cartProducts = this.props.productsInCart

    if (cartProducts.length === 0) {
      return <div>No products in cart</div>
    } else {
      return (
        <div>
          {cartProducts.map(product => {
            return (
              <div key={product.sku}>
                <div>{product.name}</div>
                <div>{product.price}</div>

                <div>Quantity: {product.quantity}</div>
                <button
                  type="submit"
                  onSubmit={() => this.props.increase(product.id)}
                >
                  Increase
                </button>
                <button
                  type="submit"
                  onSubmit={() => this.props.decrease(product.id)}
                >
                  Decrease
                </button>
              </div>
            )
          })}
        </div>
      )
    }
  }
}
const ProductInCart1 = props => {
  console.log('cart products rendering')

  const deleteShoppingStandDummy = () => {
    console.log('delete shopping cart button clicked')
  }

  const updateQuantity = props.updateFunction
  const updateShoppingStandDummy = name => {
    //event.preventDefault()
    console.log('update shopping cart button clicked')
    //event.persist()
    console.log(name)
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

const mapState = state => ({
  cartProducts: state.cart || [], //UPDATE AS NEEDED
  userId: state.id || 12345
})

const mapDispatch = dispatch => ({
  checkout: id => dispatch(checkout(id)),
  increase: id => dispatch(increase(id)),
  decrease: id => dispatch(decrease(id))
})

export default connect(mapState, mapDispatch)(ProductInCart)
//export default ProductInCart
