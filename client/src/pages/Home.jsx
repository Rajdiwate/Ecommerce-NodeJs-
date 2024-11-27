const featuredProducts = [
  { id: 1, name: 'Eco-Friendly Water Bottle', price: '$24.99', image: '/placeholder.svg?height=200&width=200' },
  { id: 2, name: 'Organic Cotton T-Shirt', price: '$29.99', image: '/placeholder.svg?height=200&width=200' },
  { id: 3, name: 'Recycled Leather Wallet', price: '$39.99', image: '/placeholder.svg?height=200&width=200' },
]

const quotes = [
  "Shop sustainably, live responsibly.",
  "Quality products for a better tomorrow.",
  "Discover eco-friendly alternatives for everyday life.",
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <main className="flex-grow pt-16">
        <section className="py-12 px-4 text-center bg-gradient-to-r from-blue-800 to-purple-900">
          <h1 className="text-4xl font-bold mb-4">Welcome to EcoShop</h1>
          <p className="text-xl mb-8">Your one-stop shop for sustainable and eco-friendly products</p>
          <button className="bg-white text-blue-800 font-bold py-2 px-4 rounded hover:bg-blue-100 transition-colors">
            Shop Now
          </button>
        </section>

        <section className="py-12 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                <div className="p-4">
                  <h3 className="font-bold text-xl mb-2">{product.name}</h3>
                  <img
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="mx-auto mb-4"
                  />
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{product.price}</span>
                    <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 px-4 bg-gray-800">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose EcoShop?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quotes.map((quote, index) => (
              <div key={index} className="bg-gray-700 shadow-md rounded-lg p-6 text-center">
                <p className="text-lg italic">&ldquo;{quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 py-6 px-4 text-center border-t border-gray-700">
        <p>&copy; 2023 EcoShop. All rights reserved.</p>
      </footer>
    </div>
  )
}

