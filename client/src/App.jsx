import React, { useEffect } from 'react'

import webFont from 'webfontloader'

import { Outlet } from 'react-router-dom'
import { Header } from './components/Navbar/Header'


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
      <Header/>
      <Outlet/>
    </>    

  )
}

export default App