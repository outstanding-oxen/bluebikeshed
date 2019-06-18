import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store/user'
import SignIn from './SignIn'
import RenderToLayer from 'material-ui/internal/RenderToLayer'

class SignInPage extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    console.log('userid', this.props.userId)
    return <SignIn handleSubmit={this.props.handleSubmit} />
  }
}

const mapState = state => ({
  userId: state.id
})

// const mapDispatch = dispatch => ({
//   authLogin: (email, password) => dispatch(auth(email, password, 'login'))
// })

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()

      const email = evt.target.email.value
      const password = evt.target.password.value
      console.log('HAHAHA', email, password)
      dispatch(auth(email, password, 'login')).then(() => {
        ownProps.history.push('/products')
      })
    }
  }
}

export default connect(mapState, mapDispatch)(SignInPage)

//export default SignIn
