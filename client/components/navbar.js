import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

//MATERIAL UI

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
// import {IconButton} from '@material-ui/core/IconButton'
// import {MenuIcon} from '@material-ui/core/Menu'
import {fade, makeStyles, withStyles} from '@material-ui/core/styles'

import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

//MATERIAL UI
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  logo: {
    color: 'yellow',
    fontSize: 20,
    textDecoration: 'underline',
    textDecorationColor: 'red'
    // padding: '0px',
    // margin: '0px',
    // '&:hover': {
    //   background: 'blue',
    //   padding: '0px',
    //   margin: '0px'
    // }
  },
  btn: {
    margin: '0px',
    padding: '0px',
    '&:hover': {
      background: 'blue',
      padding: '0px',
      margin: '0px'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  }
}))

const StyledBadge = withStyles(theme => ({
  badge: {
    top: '50%',
    right: -3,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
    }`
  }
}))(Badge)

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
))

const Navbar = props => {
  let {handleClick, isLoggedIn, products} = props
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  console.log('navbar')
  console.log('isloggedin', isLoggedIn)

  function handleMenuClick(event) {
    setAnchorEl(event.currentTarget)
  }

  let res
  if (Object.keys(products).length === 0) {
    res = 0
  } else {
    res = Object.values(products).reduce((acc, next) => acc + next)
  }

  function handleMenuClose() {
    setAnchorEl(null)
  }

  let firstName = props.user.user ? props.user.user.firstName : 'First Name'
  return (
    <div className={classes.root}>
      <nav>
        <AppBar position="fixed">
          <Toolbar>
            {/* <IconButton
              edge="start"
              className={classes.menuButton}
              color="primary"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton> */}
            {/* <Link to="/"> */}
            <Button
              component={AdapterLink}
              to="/"
              color="inherit"
              className={classes.logo}
            >
              DREAMS & CO
            </Button>
            {/* </Link> */}
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleMenuClick}
              color="inherit"
            >
              Categories
              {/* <Link to="/campuses">Campuses</Link> */}
            </Button>
            <Button component={AdapterLink} to="/products" color="inherit">
              Products
              {/* <Link to="/campuses">Campuses</Link> */}
            </Button>
            <Typography variant="h6" className={classes.title}>
              {/* <Link onClick={handleMenuClick} to="/categories">
                Categories
              </Link> */}
              {/* <Link to="/products">Products</Link> */}
            </Typography>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Travel</MenuItem>
              <MenuItem onClick={handleMenuClose}>Business</MenuItem>
              <MenuItem onClick={handleMenuClose}>Soul</MenuItem>
            </Menu>
            {/* SEARCH FORM */}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon color="primary" />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{'aria-label': 'Search'}}
              />
            </div>
            <IconButton
              component={AdapterLink}
              to="/cart"
              aria-label="Cart"
              style={{color: 'white'}}
            >
              <StyledBadge badgeContent={res} color="primary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
            {isLoggedIn ? (
              <div>
                {/* <Link to="/login"> */}
                <Button component={AdapterLink} to="/products" color="inherit">
                  {firstName}
                </Button>
                {/* </Link> */}
                {/* <Link to="/signup"> */}
                <Button onClick={handleClick} to="/products" color="inherit">
                  Log out
                </Button>
                {/* </Link> */}
              </div>
            ) : (
              <div>
                {/* <Link to="/login"> */}
                <Button component={AdapterLink} to="/login" color="inherit">
                  Login
                </Button>
                {/* </Link> */}
                {/* <Link to="/signup"> */}
                <Button component={AdapterLink} to="/signup" color="inherit">
                  Sign up
                </Button>
                {/* </Link> */}
              </div>
            )}
          </Toolbar>
        </AppBar>
      </nav>
    </div>
  )
}

// CONTAINER

const mapState = state => ({
  isLoggedIn: !!state.user.id,
  products: state.cart.products,
  user: state.user
})

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
