import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard/ProductCard'
import { getAllProducts } from '../api/products.api'


const PRODUCTS_PER_PAGE = 12
export default function Products() {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentProducts , setCurrentProducts] = useState([])
  const [loading , setLoading] = useState(true)
  const [noOfProducts , setNoOfProducts] = useState(0)

  const getProducts = async(args = {})=>{
    const {products , productCount} = await getAllProducts(args)
    setCurrentProducts(products)
    setNoOfProducts(productCount)
  }

  const totalPages = Math.ceil(noOfProducts / PRODUCTS_PER_PAGE)

  useEffect(()=>{
    setLoading(true)
    getProducts();
    setLoading(false)
  },[])

  const handlePageChange = (pageNumber) => {
    //make api call to fetch page data
    setCurrentPage(pageNumber)
    getProducts({page: currentPage}) 
  }

  if(loading) return <>Loading...</>

  return (
    <div className=" bg-gray-900 py-12 pt-24 px-8 sm:px-12 lg:px-20 ">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white mb-12 text-center">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-4 py-2 text-sm font-medium ${
                  pageNumber === currentPage
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                } ${
                  pageNumber === 1 ? 'rounded-l-md' : ''
                } ${
                  pageNumber === totalPages ? 'rounded-r-md' : ''
                }`}
              >
                {pageNumber}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

