import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import Loading from './components/Loading'
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      {/* <Loading /> */}
    </div>
  )
}

export default App
