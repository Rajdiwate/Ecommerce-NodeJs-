import React from 'react'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom';
import { IoMdSearch } from "react-icons/io";
import { FiShoppingBag } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useState } from 'react';


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
  return (
    <header className='flex justify-between items-center p-4 h-16 shadow-md'>
            <img src={logo} alt="logo" className='h-12 sm:h-16 md:h-24 hover:scale-110 duration-300' />

            {/* Desktop Menu */}
            <ul className='hidden md:flex justify-between w-[60%] lg:w-[40%] text-sm sm:text-lg'>
                <li className='hover:scale-125 duration-300'><Link to="/">Home</Link></li>
                <li className='hover:scale-125 duration-300'><Link to="/product">Product</Link></li>
                <li className='hover:scale-125 duration-300'><Link to="/contact">Contact</Link></li>
                <li className='hover:scale-125 duration-300'><Link to="/about">About</Link></li>
            </ul>

            {/* Icons */}
            <div className='flex justify-between w-[20%] sm:w-[15%] md:w-[8%] mx-2 sm:mx-5 text-xl sm:text-2xl'>
                <IoMdSearch className='hover:scale-125 duration-300' />
                <FiShoppingBag className='hover:scale-125 duration-300' />
                <FaUserCircle className='hover:scale-125 duration-300' />
            </div>

            {/* Mobile Hamburger Menu */}
            <div className='md:hidden'>
                <button onClick={toggleMenu}>
                    <svg
                        className="w-8 h-8 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <ul className="absolute top-16 left-0 w-full bg-white flex flex-col items-center space-y-4 py-5 shadow-lg md:hidden">
                    <li className='hover:scale-125 duration-300'><Link to="/">Home</Link></li>
                    <li className='hover:scale-125 duration-300'><Link to="/product">Product</Link></li>
                    <li className='hover:scale-125 duration-300'><Link to="/contact">Contact</Link></li>
                    <li className='hover:scale-125 duration-300'><Link to="/about">About</Link></li>
                </ul>
            )}
        </header>
  )
}

export default Header