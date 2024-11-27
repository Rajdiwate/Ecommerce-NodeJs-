import { useState } from 'react'
import { loginUser } from '../../api/user.api'
import { useAuth } from '../../utils/customHooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../Loading'

export default function SignInForm() {
  const {getCurrentUser , loading} = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }



  const handleSubmit = async(e) => {
    e.preventDefault()

      // Handle form submission logic here
      e.preventDefault()  
     const res = await loginUser(formData)
     // user is successfully created
     if(res.success){
        getCurrentUser();
        navigate('/')
     }
     else{
      setError(res.message)
     }

  }

  if(loading) return<Loading/>

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
       {error  && (
        <div className="text-red-500 rounded relative text-center" role="alert">
          {error}
        </div>
      )}

      <div className="rounded-md shadow-sm space-y-4">

        <div>
          <label htmlFor="email-address" className="block text-sm font-medium text-gray-300">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div>
        <Link to={'forgotpassword'} className='py-0  text-blue-600 relative mt-0 mb-0'>forgot password?</Link>
      </div>

      <div> 
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign in
        </button>
      </div>
    </form>
  )
}

