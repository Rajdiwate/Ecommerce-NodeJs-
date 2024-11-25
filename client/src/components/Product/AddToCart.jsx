import { ShoppingCart } from 'lucide-react'
import React from 'react'
import {useAuth} from '../../utils/customHooks/useAuth'
import { useNavigate } from 'react-router-dom'

const AddToCart = () => {

  const {isAuthenticated} = useAuth()
  const navigate = useNavigate()

  const handleAddToCart = async()=>{
    if(!isAuthenticated){
      navigate('/auth')
    }
    else{
      //add product to cart
    }

  }


  return (
     <button className="bg-blue-600 text-white rounded-md px-6 py-3 flex items-center justify-center w-full mb-6 hover:bg-blue-700 transition-colors" onClick={handleAddToCart}>
     <ShoppingCart className="w-5 h-5 mr-2" />
     Add to Cart
   </button>
  )
}

export default AddToCart
