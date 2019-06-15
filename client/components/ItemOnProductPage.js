import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
// import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingTop: '150px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))

const ItemOnProductPage = props => {
  console.log('INSIDE ITEM ON PRODUCT PAGE')
  console.log(props)

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            {/* <CardMedia
              className={classes.media}
              image={props.product.imageUrl}
              title="Contemplative Reptile"
            /> */}

            <img src={props.product.imageUrl} />
            {<h1>{props.product.name}</h1>}
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.product.description}
                <Box textAlign="right" m={1} fontWeight="fontWeightBold">
                  ${props.product.price / 100}
                </Box>
              </Typography>
            </CardContent>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>{<h1>RIGHT</h1>}</Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default ItemOnProductPage
