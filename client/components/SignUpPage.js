import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import {connect} from 'react-redux'
import SignUp from './SignUp'
import {signUpUser} from '../store/user'

class SignUpPage extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    return <SignUp handleSubmit={this.props.handleSubmit} />
  }
}

const mapState = state => ({
  userId: state.id
})

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()

      const email = evt.target.email.value
      const password = evt.target.password.value
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value

      console.log('HAHAHA', email, password, firstName, lastName)
      dispatch(signUpUser(email, password, firstName, lastName)).then(() => {
        ownProps.history.push('/products')
      })
    }
  }
}

export default connect(mapState, mapDispatch)(SignUpPage)
