import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import DeleteIcon from '@material-ui/icons/DeleteForeverRounded'
import {connect} from 'react-redux'
import {checkout, addToOrder, decrease} from '../store/cart'

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
  const cartProducts = props.productsInCart

  if (cartProducts.length === 0) {
    return <div>No products in cart</div>
  } else {
    const id = props.userId
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
                onSubmit={() => props.addToOrder(id, product.id)}
              >
                Increase
              </button>
              <button
                type="submit"
                onSubmit={() => props.decrease(id, product.id)}
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

const mapState = state => ({
  cartProducts: state.cart || [], //UPDATE AS NEEDED
  userId: state.id || 12345
})

const mapDispatch = dispatch => ({
  checkout: id => dispatch(checkout(id)),
  increase: (userId, productId) => dispatch(addToOrder(userId, productId)),
  decrease: (userId, productId) => dispatch(decrease(userId, productId))
})

export default connect(mapState, mapDispatch)(ProductInCart)
//export default ProductInCart
