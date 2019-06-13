import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Built with love by the us'}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    textAlign: 'center'
    // width: '100%'
    // position: 'fixed'
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: 'grey'
  }
}))

export default function StickyFooter() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          WE CAN SHOW YOU WHATEVER DREAM YOU WANT
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'Buy now and get 5% off'}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {"Get 95% off more if you use code 'Banana'"}
        </Typography>
        {/* <Typography variant="body1">Sticky footer placeholder.</Typography> */}
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">
            Winnie the Pooh and Dreams & CO
          </Typography>
          <MadeWithLove />
        </Container>
      </footer>
    </div>
  )
}
