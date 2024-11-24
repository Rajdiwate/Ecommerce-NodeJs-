import React, { useState } from 'react';
import { forgotPassword } from '../../api/user.api';

export default function ForgotPassword (){
  const [formData,setFormData]=useState({
    email:''
  })
  const [error,setError]=useState()

  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Email submitted:', formData.email);

    const res=await forgotPassword(formData)
    if(res.success){
      console.log("check your mail")
    }else(
      setError(res.error)
    )

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0d14] p-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} noValidate className="bg-[#0f1218] shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-6 text-white text-center">Enter your email</h2>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email-address">
              Email address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-[#1a1d24] border-gray-600"
              id="email-address"
              type="email"
              name='email'
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
                Request verification link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

