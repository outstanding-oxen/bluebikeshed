/* eslint-disable guard-for-in */
import React from 'react'

import {connect} from 'react-redux'
import {addToOrder, decrement, getOrder} from '../store/cart'
import {fetchProduct} from '../store/selectedProduct'

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
  // async componentDidUpdate() {
  //   await this.props.getOrder(this.props.userId)
  //   const productObj = this.props.cart.products
  //   let dummyArray = []

  //   for (let key in productObj) {
  //     //grabs product based on product id using fetchProduct thunk
  //     await this.props.fetchProduct(key)
  //     let selectedProduct = this.props.selectedProduct
  //     //adds product instance into array
  //     dummyArray.push(selectedProduct)
  //   }
  //   //Need this to render last item in array
  //   this.setState({productArray: dummyArray})
  // }
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

      return (
        <div>
          {Object.keys(cartObj).map(productId => {
            let quantity = cartObj[productId]
            return (
              <div key={productId}>
                <div>{prodObj[productId].name}</div>
                <div>{prodObj[productId].price}</div>

                <div>Quantity: {quantity}</div>
                <button
                  type="submit"
                  onClick={() => this.props.increase(prodObj[productId], id)}
                >
                  Increase
                </button>
                <button
                  type="submit"
                  onClick={() => this.decrease(prodObj[productId], id)}
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
  userId: state.user.id,
  // userId: state.id || 1, //comment out when have user id
  selectedProduct: state.selectedProduct || {},
  cart: state.cart
})

const mapDispatch = dispatch => ({
  increase: (product, userId) => dispatch(addToOrder(product, userId)),
  decrease: (product, userId) => dispatch(decrement(product, userId)),
  fetchProduct: productId => dispatch(fetchProduct(productId)),
  getOrder: id => dispatch(getOrder(id)) //using this to test. once we implement user sign in to retrieve cart, we dont need this here
})

export default connect(mapState, mapDispatch)(ProductInCart)

// class ProductInCart1 extends React.Component {
//   constructor() {
//     super()
//     this.productArray = []
//     this.productQuantityObj = {}
//   }

//   async componentDidMount() {
//     await this.props.getOrder(this.props.userId)
//     const productObj = this.props.cart.products
//     this.productQuantityObj = productObj

//     for (let key in productObj) {
//       //grabs product based on product id using fetchProduct thunk
//       await this.props.fetchProduct(key)
//       let selectedProduct = this.props.selectedProduct
//       selectedProduct.quantity = productObj[key]
//       //adds product instance into array
//       this.productArray.push(selectedProduct)
//       //console.log('within for looop', this.productArray)
//     }
//     //console.log('adivce', this.productArray)
//   }

//   render() {
//     const cartProducts = this.productArray || []
//     if (cartProducts.length === 0) {
//       return <div>No products in cart</div>
//     } else {
//       const id = this.props.userId
//       //console.log('isnide', cartProducts, cartProducts.length)
//       return (
//         <div>
//           {cartProducts.map(product => {
//             return (
//               <div key={product.id}>
//                 <div>{product.name}</div>
//                 <div>{product.price}</div>

//                 <div>Quantity: {this.productQuantityObj[product.id]}</div>
//                 <button
//                   type="submit"
//                   onClick={() => this.props.increase(product, id)}
//                 >
//                   Increase
//                 </button>
//                 <button
//                   type="submit"
//                   onClick={() => this.props.decrease(product, id)}
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
