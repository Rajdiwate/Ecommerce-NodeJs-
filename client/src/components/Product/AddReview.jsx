import React from 'react'
import { useAuth } from '../../utils/customHooks/useAuth'
import { useNavigate } from 'react-router-dom'

const AddReview = () => {

  const {isAuthenticated} = useAuth()
  const navigate = useNavigate()

  const handleAddReview = async()=>{
    if(!isAuthenticated) navigate('/auth')
  }


  return (
    <button className="bg-gray-700 text-white rounded-md px-6 py-3 w-full hover:bg-gray-600 transition-colors" onClick={handleAddReview}>
    Write a Review
  </button>
  )
}

export default AddReview
