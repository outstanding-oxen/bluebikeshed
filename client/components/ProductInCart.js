import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

import DeleteIcon from '@material-ui/icons/DeleteForeverRounded'
import {connect} from 'react-redux'
import {checkout, addToOrder, decrement} from '../store/cart'
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
class ProductInCart extends React.Component {
  constructor(props) {
    super()
    this.productArray = []
  }

  async componentDidMount() {
    for (let key in this.props.productsInCart) {
      //grabs product based on product id using fetchProduct thunk
      await this.props.fetchProduct(key)
      let selectedProduct = this.props.selectedProduct
      selectedProduct.quantity = this.props.productsInCart[key]
      //adds product instance into array
      this.productArray.push(selectedProduct)
    }
  }

  render() {
    const cartProducts = this.productArray || []
    if (cartProducts.length === 0) {
      return <div>No products in cart</div>
    } else {
      const id = this.props.userId
      return (
        <div>
          {cartProducts.map(product => {
            return (
              <div key={product.id}>
                <div>{product.name}</div>
                <div>{product.price}</div>

                <div>Quantity: {this.props.productsInCart[product.id]}</div>
                <button
                  type="submit"
                  onClick={() => this.props.increase(product, id)}
                >
                  Increase
                </button>
                <button
                  type="submit"
                  onClick={() => this.props.decrease(product, id)}
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

const mapState = state => ({
  userId: state.id || 1, //comment out when have user id
  selectedProduct: state.selectedProduct || {}
})

const mapDispatch = dispatch => ({
  checkout: id => dispatch(checkout(id)),
  increase: (product, userId) => dispatch(addToOrder(product, userId)),
  decrease: (product, userId) => dispatch(decrement(product, userId)),
  fetchProduct: productId => dispatch(fetchProduct(productId))
})

export default connect(mapState, mapDispatch)(ProductInCart)

// class ProductInCart1 extends React.Component {
//   constructor(props) {
//     super()
//     this.updateQuantity = this.updateQuantity.bind(this)
//     this.handleChange = this.handleChange.bind(this)
//     this.state = props.productsInCart
//   }
//   handleChange(event) {
//     console.log(event)

//     this.setState({
//       [event.target.name]: event.target.value
//     })
//   }
//   render() {
//     console.log('state', this.state)
//     const cartProducts = this.props.productsInCart

//     if (cartProducts.length === 0) {
//       return <div>No products in cart</div>
//     } else {
//       const id = this.props.userId
//       return (
//         <div>
//           {cartProducts.map(product => {
//             return (
//               <div key={product.sku}>
//                 <div>{product.name}</div>
//                 <div>{product.price}</div>

//                 <div>Quantity: {product.quantity}</div>
//                 <button
//                   type="submit"
//                   onSubmit={() => this.props.addToOrder(id, product.id)}
//                 >
//                   Increase
//                 </button>
//                 <button
//                   type="submit"
//                   onSubmit={() => this.props.decrease(id, product.id)}
//                 >
//                   Decrease
//                 </button>
//               </div>
//             )
//           })}
//         </div>
//       )
//     }
//   }
// }

//export default ProductInCart
