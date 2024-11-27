import React, { useEffect, useState } from 'react';
import { Search, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllOrders } from '../../api/orders.api';
import Loading from '../Loading';



const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orders,setOrders]=useState([])
  const [loading,setLoading]=useState(false)

  const GetOrders = async()=>{
    const data=await getAllOrders();
    setOrders(data.orders)
  }

  useEffect(()=>{
    GetOrders()
    setLoading(true);
  },[])

  const filteredOrders = orders.filter(order =>
    order.items.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toString().includes(searchTerm)
  );

  if(loading) return <Loading/>

  return (
    <div className="flex min-h-screen bg-[#0F1117]">
      {/* Main content area */}
      <main className="flex-grow pr-64"> {/* Right padding matches sidebar width */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-6">Orders</h1>
          
          {/* Search Bar */}
          <div className="mb-6 relative">
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full px-4 py-2 pl-10 bg-[#1E2330] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>

          {/* Order Table */}
          <div className="overflow-x-auto bg-[#1E2330] rounded-lg">
            <table className="w-full">
              <thead className="bg-[#2C3344] text-gray-300">
                <tr>
                  <th className="px-6 py-3 text-left">Order ID</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Items</th>
                  <th className="px-6 py-3 text-left">Quantity</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-700 text-white">
                    <td className="px-6 py-4">{order.id}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'Completed' ? 'bg-green-500' :
                        order.status === 'Processing' ? 'bg-blue-500' :
                        order.status === 'Shipped' ? 'bg-yellow-500' :
                        order.status === 'Pending' ? 'bg-orange-500' :
                        'bg-red-500'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{order.items}</td>
                    <td className="px-6 py-4">{order.quantity}</td>
                    <td className="px-6 py-4">${order.amount.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <button className="text-[#2563EB] hover:text-blue-400 mr-2" aria-label={`Edit order ${order.id}`}>
                        <Edit size={20} />
                      </button>
                      <button className="text-red-500 hover:text-red-400" aria-label={`Delete order ${order.id}`}>
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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

      {/* Right Sidebar */}
      <aside className="fixed right-0 top-0 w-64 h-full bg-[#1E2330] p-6 overflow-y-auto">
        <h2 className="text-xl font-bold text-white mb-6">Sidebar</h2>
        <nav>
          <ul className="space-y-2">
            {['Dashboard', 'Orders', 'Products', 'Customers', 'Analytics'].map((item) => (
              <li key={item}>
                <a href="#" className="block py-2 px-4 text-gray-300 hover:bg-[#2C3344] rounded-md">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default AdminOrders;


