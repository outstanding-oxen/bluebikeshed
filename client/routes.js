import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
// import {Login, Signup, UserHome} from './components'

import {me} from './store'

import SignInPage from './components/SignInPage'
import SignUpPage from './components/SignUpPage'
import AllProducts from './components/AllProducts'
import ProductPage from './components/ProductPage'
import Cart from './components/CartPage'
import MyProfile from './components/MyProfile'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        {/* <Route path="/login" component={Login} /> */}
        <Route path="/login" component={SignInPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/:id(\d+)" component={ProductPage} />
        <Route exact path="/cart" component={Cart} />
        {/* <Route exact path="/products/:id(\d+)" component={SingleCampus} /> */}

        {isLoggedIn && (
          <Switch>
            <Route exact path="/myprofile" component={MyProfile} />
            {/* Routes placed here are only available after logging in */}
            {/* <Route path="/home" component={UserHome} /> */}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        {/* <Route component={Login} /> */}
        {/* <Route component={SignIn} /> */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
