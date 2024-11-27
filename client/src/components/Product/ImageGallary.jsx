import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react'

const ImageGallary = ({product}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = product.images || []

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      };
    
      const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
      };
  return (
    <div className="md:w-1/2 relative">
            <div className="relative h-96 w-full">
              <img
                src={images[currentImageIndex]?.url}
                alt={`${product?.name} - Image ${currentImageIndex + 1}`}
                // layout="fill"
                // objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
  )
}

export default ImageGallary
