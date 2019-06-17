import React from 'react'
import {makeStyles, styled} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingTop: '150px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  image: {
    width: '400px',
    height: '200px'
  }
}))

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px'
})

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

            <img src={props.product.imageUrl} className={classes.image} />
            {<h1>{props.product.name}</h1>}
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.product.description}
                <Box textAlign="right" m={1} fontWeight="fontWeightBold">
                  ${props.product.price / 100}
                </Box>
              </Typography>
            </CardContent>
            <MyButton color="default" fullWidth={true} onClick={props.onSubmit}>
              Add to Cart
            </MyButton>
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
