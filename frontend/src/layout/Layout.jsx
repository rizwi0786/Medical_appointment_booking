import React from 'react'
import Header from '../components/header/Header'
import Footer from '../components/Footer/Footer'
import Routers from '../routes/Routers'
const layout = () => {
  return (
    <>
        <Header></Header>
        <main>
            <Routers></Routers>
        </main>
        <Footer></Footer>
    </>
  )
}

export default layout