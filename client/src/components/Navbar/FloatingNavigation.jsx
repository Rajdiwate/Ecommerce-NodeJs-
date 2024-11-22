import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const navItems = [
    {name : 'My Profile' , href : '/me' , admin: false , isAuthenticated : true},
    { name: 'Home', href: '/',admin: false , isAuthenticated : false },
    { name: 'Products', href: '/products' , admin: false , isAuthenticated : true},
    {name : 'Cart' , href : '/cart' ,admin: false , isAuthenticated : true},
    {name : 'Orders' , href : '/orders' ,admin: false , isAuthenticated : true},
    
]

const FloatingNavigation = React.memo(({isSidebarOpen , setIsSidebarOpen}) => {
    const [activeItem, setActiveItem] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <div
    className={`fixed top-0 right-0 h-full w-64 bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
>
    <div className="p-4">
        <button
            onClick={() => setIsSidebarOpen(false)}
            className="mb-4 p-2 text-white"
            aria-label="Close navigation menu"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <div className="space-y-4">
            {navItems.map((item) => (
                <Link
                    key={item.name}
                    to={item.href}
                    className={`block py-2 px-4 text-lg font-medium rounded transition-colors ${activeItem === item.name
                            ? 'bg-blue-600 text-white'
                            : 'text-white hover:bg-gray-600 hover:text-white'
                        }`}
                    onClick={() => {
                        setActiveItem(item.name)
                        setIsSidebarOpen(false)
                    }}
                >
                    {item.name}
                </Link>
            ))}
            {isLoggedIn ? (
                <button
                    onClick={() => {
                        setIsLoggedIn(false)
                        setIsSidebarOpen(false)
                        setActiveItem('')
                    }}
                    className="block w-full text-left py-2 px-4 text-lg font-medium text-white hover:bg-gray-600 hover:text-white rounded transition-colors"
                >
                    Logout
                </button>
            ) : (
                <Link
                    to="/auth"
                    className={`block py-2 px-4 text-lg font-medium rounded transition-colors ${activeItem === 'Login/Register'
                            ? 'bg-blue-600 text-white'
                            : 'text-white hover:bg-gray-600 hover:text-white'
                        }`}
                    onClick={() => {
                        setActiveItem('Login/Register')
                        setIsSidebarOpen(false)
                    }}
                >
                    Login/Register
                </Link>
            )}
        </div>
    </div>
</div>
  )
})

export default FloatingNavigation