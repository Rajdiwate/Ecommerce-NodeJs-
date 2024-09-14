import React from 'react'
import appStore from "../../images/Appstore.png"
import playStore from "../../images/playstore.png"

const Footer = () => {
  return (
    <footer className='flex flex-col md:flex-row justify-between h-auto md:h-[250px] p-4 bg-gray-800 text-white'>
    {/* Get Our App Section */}
    <div className='flex flex-col justify-between items-center p-2 m-2'>
        <h4 className='font-semibold text-xl text-center'>Get Our App</h4>
        <p className='text-center '>Download App for Android and iOS mobile phones</p>
        <div className='flex space-x-4 mt-4'>
            <img src={playStore} alt="PlayStore" className='h-10 sm:h-12' />
            <img src={appStore} alt="AppStore" className='h-10 sm:h-12' />
        </div>
    </div>

    {/* Brand and Info Section */}
    <div className='flex flex-col p-2 m-2 justify-center font-serif items-center text-center'>
        <h1 className='text-4xl sm:text-6xl md:text-7xl font-bold my-4'>Ecom</h1>
        <p className='font-thin mb-1'>Best Quality is our first priority</p>
        <p className='text-slate-100'>Copyrights 2021 &copy; RajDiwate</p>
    </div>

    {/* Follow Us Section */}
    <div className='p-2 m-2 flex flex-col justify-center items-center md:items-start mx-10 font-serif'>
        <h4 className='text-2xl font-semibold my-2'>Follow Us</h4>
        <div className='flex flex-col justify-center items-center md:items-start'>
            <a href="https://www.instagram.com/rajdiwate89" className='m-1 hover:underline italic' target='_blank' rel='noopener noreferrer'>Instagram</a>
            <a href="https://www.linkedin.com/in/raj-diwate-209353207" className='m-1 italic hover:underline' target='_blank' rel='noopener noreferrer'>Linkedin</a>
            <a href="https://www.facebook.com/raj.diwate.7/" className='m-1 italic hover:underline' target='_blank' rel='noopener noreferrer'>Facebook</a>
        </div>
    </div>
</footer>
  )
}

export default Footer