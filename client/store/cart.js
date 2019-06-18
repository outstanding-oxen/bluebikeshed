import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
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

const getCart = (products, merchantAmt) => ({
  type: GET_CART,
  products,
  merchantAmt
})
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
export const getOrder = userId => async dispatch => {
  try {
    // Only interact with database if userId is not NULL (e.g. logged in)
    if (userId) {
      const res = await axios.get(`/api/users/:${userId}/orders`)
      const order = res.data
      const orderDetails = order.orderDetails

      const cartObj = orderDetails.reduce(
        (obj, orderDetail) => {
          const productId = orderDetail.productId
          const productQty = orderDetail.itemQty
          obj.products[productId] = productQty
          obj.merchantAmt += orderDetail.itemExtAmt
          return obj
        },
        {products: {}, merchantAmt: 0}
      )

      dispatch(getCart(cartObj.products, cartObj.merchantAmt))
    } else {
      // If user is null (e.g. is a guest)
      dispatch(getCart(null, null))
    }
    dispatch(getCart())
  } catch (err) {
    console.error(err)
  }
}

export const addToOrder = (product, userId) => async dispatch => {
  console.log('i started')
  try {
    // If userId is not null (e.g. user is logged in)
    if (userId) {
      // res.data will have user order (no other user data)
      const res = await axios.get(`/api/users/:${userId}/orders`)
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
        console.log('i entered correct spot')
        const orderDetail = productsObj[product.id]
        console.log('step 2', orderDetail)
        await axios.put(`/api/orderdetails/${orderDetail.id}`, {
          itemQty: orderDetail.itemQty + 1,
          itemExtAmt: orderDetail.itemExtAmt + orderDetail.itemUnitAmt
        })
        console.log('step 3')
      } else {
        await axios.post(`/api/orderdetails/${order.id}`, {
          itemUnitAmt: product.price,
          itemQty: 1,
          itemExtAmt: product.price,
          productId: product.id
        })
      }
    }
    dispatch(addToCart(product))
  } catch (err) {
    console.error(err)
  }
}

export const checkout = userId => async dispatch => {
  // Currently the thunk only updates the order to "completed"
  // This thunk will need to be updated for future tiers because
  // completedOrder will be used to:
  //  1. charge customer
  //  2. notify warehouse what products to ship to customer
  try {
    const res = await axios.put(`/api/orders/${userId}`, {
      isFulfilled: 'completed'
    })
    const completedOrder = res.data
    dispatch(clearCart())
  } catch (err) {
    console.error(err)
  }
}

export const removeProduct = (product, userId) => async dispatch => {
  try {
    if (userId) {
      const res = await axios.get(`/api/users/${userId}/orders`)
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
    }
  } catch (err) {
    console.error(err)
  }
}

export const clearOrder = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId.id}/orders`)
    const order = res.data
    const orderDetails = order.orderDetails

    for (let i = 0; i < orderDetails.length; i++) {
      const orderDetailId = orderDetails[i].id
      await axios.delete(`/api/orderdetails/${orderDetailId}`)
    }

    dispatch(clearCart())
  } catch (err) {
    console.error(err)
  }
}

export const updateProductQuantity = (
  product,
  qty,
  userId
) => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/orders`)
    const order = res.data
    const orderDetails = order.orderDetails

    // Create obj w/ productIds as key to orderDetail
    const productsObj = orderDetails.reduce((obj, orderDetail) => {
      obj[orderDetail.productId] = orderDetail
      return obj
    }, {})

    if (productsObj[product.id]) {
      const orderDetail = productsObj[product.id]
      const orderDetailId = orderDetail.id

      // If qty is 0 delete the orderDetail
      if (!qty) {
        await axios.delete(`/api/orderdetails/${orderDetailId}`)
      } else {
        const updtAmt = qty * orderDetail.itemUnitAmt
        await axios.put(`/api/orderdetails/${orderDetailId}`, {
          itemExtAmt: updtAmt,
          itemQty: qty
        })
        dispatch(updateQuantity(product, qty))
      }
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
    case GET_CART:
      // If a user is logged in, data depends on database
      if (action.products) {
        return {
          ...state,
          products: action.products,
          merchantAmt: action.merchantAmt
        }
      } else {
        // If user is a guest, data depends on local state
        return state
      }
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
