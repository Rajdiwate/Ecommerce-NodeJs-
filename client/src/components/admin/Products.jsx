import { useState, useEffect } from 'react'
import { Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import Loading from '../Loading';
import { getAllProducts } from '../../api/products.api';



const AdminProducts = () => {
  const [loading, setLoading] = useState(true)
  const [currentProducts, setCurrentProducts] = useState([])

  const getProducts = async (args = {}) => {
    const { products } = await getAllProducts(args)
    setCurrentProducts(products)
  }

  useEffect(() => {
    setLoading(true)
    getProducts();
    setLoading(false)
  }, [])

  if (loading) return <Loading />

  return (
    <div className="flex min-h-screen bg-[#0F1117]">
      {/* Main content area */}
      <main className="flex-grow pr-64"> {/* Right padding matches sidebar width */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-6">Products</h1>

          <div className="overflow-x-auto bg-[#1E2330] rounded-lg">
            <table className="w-full">
              <thead className="bg-[#2C3344] text-gray-300">
                <tr>
                  <th className="px-6 py-3 text-left">Product ID</th>
                  <th className="px-6 py-3 text-left">Product Name</th>
                  <th className="px-6 py-3 text-left">Stock</th>
                  <th className="px-6 py-3 text-left">Price</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product) => (
                  <tr key={product._id} className="border-b border-gray-700 text-white">
                    <td className="px-6 py-4">{product._id}</td>
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">{product.stock}</td>
                    <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <button className="text-[#2563EB] hover:text-blue-400 mr-2" aria-label={`Edit ${product.name}`}>
                        <Edit size={20} />
                      </button>
                      <button className="text-red-500 hover:text-red-400" aria-label={`Delete ${product.name}`}>
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-between items-center text-white">
            <span className="text-sm text-gray-400">Showing 1 to 5 of 5 entries</span>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-[#2C3344] rounded-md hover:bg-gray-700" aria-label="Previous page">
                <ChevronLeft size={20} />
              </button>
              <button className="px-3 py-1 bg-[#2563EB] rounded-md hover:bg-blue-600">1</button>
              <button className="px-3 py-1 bg-[#2C3344] rounded-md hover:bg-gray-700" aria-label="Next page">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminProducts
