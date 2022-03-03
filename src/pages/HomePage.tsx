import React from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import ProductList from '../components/ProductList'
import IsLoggedIn from '../components/IsLoggedIn'

function HomePage() {
  return (<>
    {/* <IsLoggedIn /> */}
    <ProductList />
  </>
  )
}

export default HomePage