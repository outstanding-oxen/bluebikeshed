import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import {loadState, saveState} from './localStorage'

const reducer = combineReducers({user})
// What persistedState will be will depend on how we design our state
const persistedState = loadState()
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)
// May need to use lodash throttle if system slows down.
// How often is the store state changing?
store.subscribe(() => {
  saveState(store.getState().cart)
})

export default store
export * from './user'
