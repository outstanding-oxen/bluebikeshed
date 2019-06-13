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
import {fade, makeStyles} from '@material-ui/core/styles'

import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
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
const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
))

const Navbar = ({handleClick, isLoggedIn}) => {
  const classes = useStyles()
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
            <Typography variant="h6" className={classes.title}>
              {/* <Link to="/campuses">Campuses</Link> */}
              <Link to="/categories">Categories</Link>
            </Typography>
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
          </Toolbar>
        </AppBar>
      </nav>
    </div>
  )
}

// CONTAINER

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

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
