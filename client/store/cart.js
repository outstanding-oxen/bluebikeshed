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
  shipping: 0,
  total: 0,
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

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  /**
   * HELPER FUNCTIONS
   */
  const productMinItem = (products, item, qty = 0) => {
    const updtProduct = {}
    let merchSub = 0
    for (let key in products) {
      if (key !== item.id) {
        updtProduct[key] = products[key]
      } else {
        merchSub = products[key] * item.price
      }
    }
    return [updtProduct, merchSub]
  }

  const productUpdtItemQty = (products, item, qty) => {
    // If quantity is 0, remove item from products obj.
    if (!qty) return productMinItem(products, item)

    const merchSub = (products[item.id] - qty) * item.price
    const updtProduct = {...products, [item.id]: qty}

    return [updtProduct, merchSub]
  }

  /**
   * ACTION TYPE CASES
   */
  switch (action.type) {
    case ADD_TO_CART: {
      const item = action.item
      // Exists in cart, update qty
      if (state.products[item.id]) {
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
          [item.id]: 1
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
