import React, { useEffect } from 'react'

import webFont from 'webfontloader'

import { Outlet } from 'react-router-dom'
import { Header } from './components/Navbar/Header'
import { useAuth } from './utils/customHooks/useAuth'


const App = () => {
  const {getCurrentUser , loading } =  useAuth()

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })

    getCurrentUser()
  }, [])

  if(loading) return <>Loading...</>

  return (
    <>
      <Header/>
      <Outlet/>
    </>    

  )
}

export default App