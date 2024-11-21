import { useState } from 'react'
import { registerUser } from '../../api/user.api'
import { useAuth } from '../../utils/customHooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function SignUpForm() {
  const {getCurrentUser , loading} = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: null
  })
  const [error, setError] = useState()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, avatar: e.target.files[0] }))
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
     const res = await registerUser(formData)
     // user is successfully created
     if(res.success){
        getCurrentUser();
        navigate('/')
     }
     //some error is occured 
     else{
      //display error
      setError(res.message)
     } 
  }

  return (
    <form className="mt-5 space-y-6" onSubmit={handleSubmit} noValidate>
      {/* Consolidated Error Messages at Top */}
      {error  && (
        <div className="text-red-500 rounded relative text-center" role="alert">
          {error}
        </div>
      )}

      <div className="rounded-md shadow-sm space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-300">
            Username
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Username"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
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
            autoComplete="new-password"
            required
            className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="avatar" className="block text-sm font-medium text-gray-300">
            Avatar (optional)
          </label>
          <div className="mt-1 flex items-center justify-between px-3 py-2 border border-gray-700 rounded-md bg-gray-800">
            <input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleAvatarChange}
            />
            <label
              htmlFor="avatar"
              className="cursor-pointer text-sm font-medium text-blue-500 hover:text-blue-400"
            >
              Choose Avatar
            </label>
            {formData.avatar && (
              <div className="flex items-center">
                <img
                  src={URL.createObjectURL(formData.avatar)}
                  alt="Avatar preview"
                  width={24}
                  height={24}
                  className="rounded-full mr-2"
                />
                <span className="text-sm text-gray-400">{formData.avatar.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign up
        </button>
      </div>
    </form>
  )
}

