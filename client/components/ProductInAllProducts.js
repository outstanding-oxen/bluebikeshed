import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import {styled} from '@material-ui/styles'
import {makeStyles} from '@material-ui/core/styles'
// import Button from '@material-ui/core/Button'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingTop: '150px'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize: 14
  },
  img: {
    width: 100,
    height: 100
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 160
  },
  links: {
    textDecoration: 'none'
  }
}))

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #8ed8ff  30%, #8ea0ff 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px #0090db',
  color: 'white',
  height: 20,
  padding: '0 30px'
})

const ProductInAllProducts = props => {
  console.log('rendering')
  const notify = name => toast(`${name} added to your cart`)
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {props.products.map(product => (
          <Grid item xs={3} key={product.id}>
            {/* <Link to= */}
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={product.imageUrl}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  <Link
                    to={`/products/${product.id}`}
                    className={classes.links}
                  >
                    {product.name}
                  </Link>

                  <Box textAlign="right" m={1} fontWeight="fontWeightBold">
                    ${product.price / 100}
                  </Box>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {product.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <MyButton
                size="small"
                color="primary"
                onClick={() => {
                  props.onSubmit(product)
                }}
                onClick={() => notify(product.name)}
              >
                Add to cart
              </MyButton>
            </CardActions>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default ProductInAllProducts
