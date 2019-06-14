import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import Loading from './components/Loading'
import Home from './components/Home'
import Footer from './components/Footer'
import ProductPage from './components/ProductPage'
import Cart from './components/Cart'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      {/* <Home /> */}
      <Cart />
      {/* <Loading /> */}
      {/* <ProductPage /> */}
      <Footer />
    </div>
  )
}

export default App
