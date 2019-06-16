import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import Loading from './components/Loading'
import Home from './components/Home'
import Footer from './components/Footer'
import ProductPage from './components/ProductPage'
import AllProducts from './components/AllProducts'
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      {/* <Home /> */}
      {/* <AllProducts />  */}
      {/* <Loading /> */}
      {/* <ProductPage /> */}
      {/* <Footer /> */}
    </div>
  )
}

export default App
