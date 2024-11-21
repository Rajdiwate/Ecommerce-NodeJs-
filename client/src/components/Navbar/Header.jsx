
import { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchInput from './SearchInput'
import FloatingNavigation from './FloatingNavigation'



export function Header() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <nav className="fixed top-0 left-0 w-full z-50">
            <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
                <Link to="/" className="text-2xl font-bold">
                    EcoShop
                </Link>

                {/* {search Input} */}
                {/* <SearchInput /> */}

                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2"
                    aria-label="Toggle navigation menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Floating Sidebar */}
            <FloatingNavigation isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />


        </nav>
    )
}

