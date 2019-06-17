import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingTop: '10vh'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))
const Home = props => {
  console.log('rendering')
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            {
              <img
                style={{height: '300px'}}
                src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.audleytravel.com%2F-%2F-%2F79%2F039134048221126075017092184094198172080245117031.jpg&f=1"
                alt="background"
              />
            }
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper} style={{height: '300px'}}>
            EMAIL FORM "subscribe to DREAM & CO NEWS"
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>ITEM</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>SALE ITEM</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>ITEM</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>ITEM</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>ITEM</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>ITEM</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>ITEM</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>ITEM</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>ITEM</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>ITEM</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>ITEM</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>ITEM</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>ITEM</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>ITEM</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>ITEM</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>ITEM</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>ITEM</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>ITEM</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>ITEM</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>ITEM</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>ITEM</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>ITEM</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>ITEM</Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home
