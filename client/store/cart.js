import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
const CLEAR_CART = 'CLEAR_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'

/**
 * INITIAL STATE
 */

const defaultCart = {
  mechantAmt: 0,
  tax: 0,
  shippingAmt: 0,
  totalAmt: 0,
  products: {} // Follows this format => {id: qty}
}

/**
 * ACTION CREATORS
 */
const addToCart = item => ({
  type: ADD_TO_CART,
  item // Should be instance of Product model
})

const clearCart = () => ({
  type: CLEAR_CART
})

const removeItem = item => ({
  type: REMOVE_ITEM,
  item // Should be instance of Product model
})

const updateQuantity = (item, qty) => ({
  type: UPDATE_QUANTITY,
  item, // Should be instance of Product model
  qty
})

/**
 * THUNK CREATOR
 */

export const addToOrder = (product, user) => async dispatch => {
  try {
    // res.data will have user order (no other user data)
    const res = await axios.get(`/api/users/:${user.id}/orders`)
    const order = res.data
    const orderDetails = order.orderDetails

    // Create obj w/ productIds as key to orderDetail
    const productsObj = orderDetails.reduce((obj, orderDetail) => {
      obj[orderDetail.productId] = orderDetail
      return obj
    }, {})

    // If orderDetail with productId exists, update qty
    // Otherwise, add product as new orderDetail to order
    if (productsObj[product.id]) {
      const orderDetail = productsObj[product.id]
      await axios.put(`/api/orderdetails/${orderDetail.id}`, {
        itemQty: orderDetail.itemQty + 1
      })
    } else {
      await axios.post(`/api/orderdetails/${order.id}`, {
        itemUnitAmt: product.price,
        itemQty: 1,
        itemExtAmt: product.price,
        productId: product.id
      })
    }

    dispatch(addToCart(product))
  } catch (err) {
    console.error(err)
  }
}

export const checkout = user => async dispatch => {
  // Currently the thunk only updates the order to "completed"
  // This thunk will need to be updated for future tiers because
  // completedOrder will be used to:
  //  1. charge customer
  //  2. notify warehouse what products to ship to customer
  try {
    const res = await axios.put(`/api/orders/${user.id}`, {
      isFulfilled: 'completed'
    })
    const completedOrder = res.data
    dispatch(clearCart())
  } catch (err) {
    console.error(err)
  }
}

export const removeProduct = (product, user) => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${user.id}/orders`)
    const order = res.data
    const orderDetails = order.orderDetails

    // Create obj w/ productIds as key to orderDetail
    const productsObj = orderDetails.reduce((obj, orderDetail) => {
      obj[orderDetail.productId] = orderDetail
      return obj
    }, {})

    // If the product to remove is in order, delete otherwise do nothing
    if (productsObj[product.id]) {
      const orderDetailId = productsObj[product.id].id
      await axios.delete(`/api/orderdetails/${orderDetailId}`)
      dispatch(removeItem(product))
    }
  } catch (err) {
    console.error(err)
  }
}

/**
 * HELPER FUNCTIONS
 * To clean up the code in the reducer cases
 */
const productMinItem = (products, item) => {
  // Removes the item from the list of products
  const updtProduct = {}
  let merchSub = 0
  for (let key in products) {
    // If product key does not match item to remove, add to new product
    if (key !== item.id) {
      updtProduct[key] = products[key]
      // Otherwise calculate the value to remove from merchAmt
    } else {
      merchSub = products[key] * item.price // qty * item.price
    }
  }
  return [updtProduct, merchSub]
}

const productUpdtItemQty = (products, item, qty) => {
  // Updates the product array with the quantity listed
  // If quantity is 0, remove item from products obj.
  if (!qty) return productMinItem(products, item)

  const merchSub = (products[item.id] - qty) * item.price
  const updtProduct = {...products, [item.id]: qty}

  return [updtProduct, merchSub]
}

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const item = action.item // Product obj from db
      // Exists in cart, update qty
      if (state.products[item.id]) {
        // products = [{pId: pQty}]
        const stateCopy = {
          ...state,
          merchantAmt: state.merchantAmt + item.price
        }
        stateCopy.products[item.id]++
        return stateCopy
        // Doesn't exist in cart, add to cart
      } else {
        return {
          ...state,
          merchantAmt: state.merchantAmt + item.price,
          products: {...state.products, [item.id]: 1}
        }
      }
    }
    case REMOVE_ITEM: {
      const item = action.item
      const [updtProduct, merchSub] = productMinItem(state.products, item)

      return {
        ...state,
        merchantAmt: state.merchantAmt - merchSub,
        products: updtProduct
      }
    }
    case UPDATE_QUANTITY: {
      const item = action.item
      const qty = action.qty
      const [updtProduct, merchSub] = productUpdtItemQty(
        state.products,
        item,
        qty
      )
      return {
        ...state,
        merchantAmt: state.merchantAmt - merchSub,
        products: updtProduct
      }
    }
    case CLEAR_CART:
      return defaultCart
    default:
      return state
  }
}
