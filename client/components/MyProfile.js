import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingTop: '10vh'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  icon: {
    margin: theme.spacing(1),
    fontSize: 20
  }
}))
const MyProfile = props => {
  console.log(props)
  console.log('props', props.user.firstName)
  const classes = useStyles()
  console.log(props.user)

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper} style={{height: '200px'}}>
          <div>
            <br />
            <br />
            <h1>Welcome {props.user.firstName}!</h1>
          </div>
          <h1>My Address</h1>
          <h2>{props.user.Address.address}</h2>
          <h2>{props.user.Address.city}</h2>
          <h2>{props.user.Address.state}</h2>
          <h2>{props.user.Address.zipcode}</h2>
        </Paper>
      </Grid>
    </Grid>
  )
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState)(MyProfile)
//export default MyProfile
