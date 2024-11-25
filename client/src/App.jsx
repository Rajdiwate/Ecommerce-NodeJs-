import React, { useEffect } from 'react'
import webFont from 'webfontloader'
import { Outlet } from 'react-router-dom'
import { Header } from './components/Navbar/Header'
import { useAuth } from './utils/customHooks/useAuth'
import Loading from './components/Loading'


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

  if(loading) return <Loading/>

  return (
    <div className='h-screen '>
      <Header/>
      <div className='mt-16'>
      <Outlet/>
      </div>
    </div>    

  )
}

export default App