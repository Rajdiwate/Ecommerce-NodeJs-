import { Star, StarHalf } from 'lucide-react'

export default function ProductCard({ product }) {
  const { name, ratings, numOfReviews, price } = product
  const image = product.images[0].url

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-5 h-5 fill-current text-yellow-500" />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-5 h-5 fill-current text-yellow-500" />)
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-400" />)
    }

    return stars
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 flex flex-col h-full">
      <div className="relative h-64 w-full">
        <img
          src={image}
          alt={name}
          layout="fill"
        />
      </div>
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">{name}</h3>
          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {renderStars(ratings)}
            </div>
            <span className="text-sm text-gray-400">({numOfReviews})</span>
          </div>
        </div>
        <div className="text-2xl font-bold text-blue-400">₹{Number(price).toFixed(2)}</div>
      </div>
    </div>
  )
}

