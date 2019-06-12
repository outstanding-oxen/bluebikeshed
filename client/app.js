import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import Loading from './components/Loading'
import Home from './components/Home'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Home />
      {/* <Loading /> */}
      <Footer />
    </div>
  )
}

export default App
