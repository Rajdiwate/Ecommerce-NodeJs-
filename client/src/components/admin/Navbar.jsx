import {useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../utils/customHooks/useAuth'

export default function Sidebar() {
    const [activeItem, setActiveItem] = useState('')

    // const {isAuthenticated}=useAuth();
    const navItems = [
        { name: 'Home', href: '/', visible: true },
        { name: 'Dashboard', href: '/admin/dashboard', visible: true},
        { name: 'Users', href: '/admin/users', visible:true},
        { name: 'Products', href: '/admin/products', visible: true },
        { name: 'Orders', href: '/admin/orders', visible: true },
        // { name: 'Reviews', href: '/admin/reviews', visible: true }

    ]

    return (
        <div className='fixed top-0 right-0 h-full w-64 bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out'>
            <div
                className="p-4"
            >

            <div className="space-y-4">
                    {navItems.map((item) => (
                        item.visible && <Link
                            key={item.name}
                            to={item.href}
                            className={`block py-2 px-4 text-lg font-medium rounded transition-colors ${activeItem === item.name
                                ? 'bg-blue-600 text-white'
                                : 'text-white hover:bg-gray-600 hover:text-white'
                                }`}
                            onClick={() => {
                                setActiveItem(item.name)
                            }}
                        >
                            {item.name}
                        </Link>
                    ))}
                    {/* {isAuthenticated ? (
                        <button
                            onClick={handleLogout}
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
                            }}
                        >
                            Login/Register
                        </Link>
                    )} */}
                </div>

            </div>
        </div>
    )
}

