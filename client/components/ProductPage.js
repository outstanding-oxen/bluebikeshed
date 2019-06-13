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
const ProductPage = props => {
  console.log('rendering')
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>{<h1>TITLE OF ITEM</h1>}</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            {<h1>erlkgmeklgrmerkmg;ermg;elr,ger,g'er,lgerg,</h1>}
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default ProductPage
