import { useState } from 'react'
import SignInForm from '../components/Auth/SignInForm'
import SignUpForm from '../components/Auth/SignUpForm'


export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true)

  return (
    <div className=" flex  justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 min-h-screen   ">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {isSignIn ? 'Sign in to your account' : 'Create a new account'}
          </h2>
          <div className="mt-4 flex justify-center space-x-4">
            <button
              onClick={() => setIsSignIn(true)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                isSignIn
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignIn(false)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                !isSignIn
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>
        {isSignIn ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  )
}

