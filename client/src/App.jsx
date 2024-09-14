import React, { useEffect } from 'react'
import Header from './components/layout/Header'
import webFont from 'webfontloader'
import Footer from './components/layout/Footer'
import { Outlet } from 'react-router-dom'


const App = () => {

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  }, [])


  return (
    <>
      <Header />
      <Outlet/>
      <Footer/>
    </>    

  )
}

export default App