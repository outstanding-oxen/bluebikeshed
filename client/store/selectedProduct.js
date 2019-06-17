import axios from 'axios'

// Action Types
const GET_PRODUCT = 'GET_PRODUCT'

// Action Creator
export function getProduct(product) {
  const action = {type: GET_PRODUCT, product}
  return action
}

// Thunk Creator
export const fetchProduct = productId => dispatch =>
  axios
    .get('/api/products/' + productId)
    .then(res => res.data)
    .then(product => {
      dispatch(getProduct(product))
    })

// Reducer
export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return state
  }
}
