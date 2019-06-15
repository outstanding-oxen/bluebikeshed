import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADMIN_GET_USERS = 'ADMIN_GET_USERS'
const ADMIN_DEL_USERS = 'ADMIN_DEL_USERS'
const ADMIN_GET_ORDERS = 'ADMIN_GET_ORDERS'
const ADMIN_GET_PRODUCTS = 'ADMIN_GET_PRODUCTS'
const ADMIN_ADD_PRODUCT = 'ADMIN_ADD_PRODUCT'
const ADMIN_EDIT_PRODUCT = 'ADMIN_EDIT_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultInfo = {}

/**
 * ACTION CREATORS
 */
const adminGetUsersAC = users => ({type: ADMIN_GET_USERS, users})
const adminDelUsersAC = userid => ({type: ADMIN_DEL_USERS, userid})
const adminGetOrdersAC = orders => ({type: ADMIN_GET_ORDERS, orders})
const adminGetProductsAC = products => ({type: ADMIN_GET_PRODUCTS, products})
const adminAddProductAC = product => ({type: ADMIN_ADD_PRODUCT, product})
const adminEditProductAC = product => ({type: ADMIN_EDIT_PRODUCT, product})

/**
 * THUNK CREATORS
 */
export const adminGetInfo = () => dispatch =>
  Promise.all([
    axios.get('/api/users'),
    axios.get('/api/products'),
    axios.get('/api/orders')
  ])
    .then(([res1, res2, res3]) => {
      dispatch(adminGetUsersAC(res1.data || []))
      dispatch(adminGetProductsAC(res2.data || []))
      dispatch(adminGetOrdersAC(res3.data || []))
    })
    .catch(err => console.err(err))

export const adminDelUsers = id => dispatch =>
  axios
    .delete('/api/users/' + id)
    .then(res => dispatch(adminDelUsersAC(id)))
    .catch(err => console.err(err))

export const adminAddProduct = product => dispatch => {
  return axios
    .post('/api/products/', product)
    .then(res => dispatch(adminAddProductAC(product)))
    .catch(err => console.err(err))
}

export const adminEditProduct = product => dispatch => {
  const updateProduct = {
    sku: product.sku,
    name: product.name,
    price: product.price,
    description: product.description,
    imageUrl: product.imageUrl,
    categoryId: product.categoryId
  }
  return axios
    .put('/api/products/' + product.id, updateProduct)
    .then(res => dispatch(adminEditProductAC(product)))
    .catch(err => console.err(err))
}

/**
 * REDUCER
 */
export default function(state = defaultInfo, action) {
  switch (action.type) {
    case ADMIN_GET_USERS:
      return Object.assign({}, state, {users: action.users})
    case ADMIN_GET_PRODUCTS:
      return Object.assign({}, state, {products: action.products})
    case ADMIN_GET_ORDERS:
      return Object.assign({}, state, {orders: action.orders})
    case ADMIN_DEL_USERS:
      return Object.assign({}, state, {
        users: state.users.filter(u => u.id != action.userid)
      })
    case ADMIN_ADD_PRODUCT:
      return Object.assign({}, state, {
        products: state.products.concat(action.product)
      })
    case ADMIN_EDIT_PRODUCT:
      return Object.assign({}, state, {
        products: state.products.map(
          p => (action.product.id == p.id ? action.product : p)
        )
      })
    default:
      return state
  }
}
