/* eslint-disable guard-for-in */
import React from 'react'

import {connect} from 'react-redux'
import {addToOrder, decrement, getOrder} from '../store/cart'
import {fetchProduct} from '../store/selectedProduct'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

class ProductInCart extends React.Component {
  constructor() {
    super()
    this.state = {
      productArray: []
    }
  }

  async componentDidMount() {
    await this.props.getOrder(this.props.userId)
    const productObj = this.props.cart.products
    let dummyArray = []

    for (let key in productObj) {
      //grabs product based on product id using fetchProduct thunk
      await this.props.fetchProduct(key)
      let selectedProduct = this.props.selectedProduct
      //adds product instance into array
      dummyArray.push(selectedProduct)
    }
    //Need this to render last item in array
    this.setState({productArray: dummyArray})
  }

  decrease(product, id) {
    this.props.decrease(product, id)
  }

  render() {
    // const cartProducts = this.state.productArray
    const prodObj = this.state.productArray.reduce((obj, product) => {
      obj[product.id] = product
      return obj
    }, {}) // intial rendering, prodObj = {}

    const cartObj = this.props.cart.products

    if (
      Object.keys(cartObj).length === 0 ||
      Object.keys(prodObj).length === 0
    ) {
      return <div>No products in cart</div>
    } else if (Object.keys(prodObj).length) {
      const id = this.props.userId
      let imagetemp = []
      for (let i = 0; i < this.state.productArray.length; i++) {
        imagetemp.push(this.state.productArray[i].imageUrl)
      }

      return (
        <div style={{flexGrow: 1, paddingTop: '1vh'}}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper>
                {Object.keys(cartObj).map((productId, index) => {
                  let quantity = cartObj[productId]
                  return (
                    <div key={productId} style={{padding: '10px'}}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {prodObj[productId].name}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        ${prodObj[productId].price / 100}
                      </Typography>
                      <img src={imagetemp[index]} width="30%" height="30%" />
                      <div>
                        Quantity: <b>{quantity}</b>
                      </div>

                      <Button
                        onClick={() =>
                          this.props.increase(prodObj[productId], id)
                        }
                      >
                        Increase
                      </Button>
                      <Button
                        onClick={() => this.decrease(prodObj[productId], id)}
                      >
                        {quantity === 1 ? 'Delete' : 'Decrease'}
                      </Button>
                      <Divider />
                    </div>
                  )
                })}
              </Paper>
            </Grid>
          </Grid>
        </div>
      )
    }
  }
}

const mapState = state => ({
  userId: state.user.id,
  selectedProduct: state.selectedProduct || {},
  cart: state.cart
})

const mapDispatch = dispatch => ({
  increase: (product, userId) => dispatch(addToOrder(product, userId)),
  decrease: (product, userId) => dispatch(decrement(product, userId)),
  fetchProduct: productId => dispatch(fetchProduct(productId)),
  getOrder: id => dispatch(getOrder(id))
})

export default connect(mapState, mapDispatch)(ProductInCart)
