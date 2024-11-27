import {Link} from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-white mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-blue-400 mb-6">Page Not Found</h2>
        <p className="text-xl text-gray-400 mb-8">Oops! The page you're looking for doesn't exist.</p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Go Back Home
        </Link>
      </div>
      <div className="mt-12 text-gray-500 text-sm">
        <p>If you believe this is an error, please contact support.</p>
      </div>
    </div>
  )
}

