import { useEffect, useState } from "react";
import { Star, StarHalf, Plus, Minus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProduct } from "../api/products.api";
import Loading from "../components/Loading";
import ImageGallary from "../components/Product/ImageGallary";
import AddReview from "../components/Product/AddReview";
import AddToCart from "../components/Product/AddToCart";
import Reviews from "../components/Product/Reviews";

export default function Product() {
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  async function getProduct() {
    const res = await getSingleProduct(productId);
    if (res.success) {
      setProduct(res.product);
    } else {
      alert("No product found");
      navigate("/products");
    }
  }

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-5 h-5 fill-current text-yellow-500" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf key="half" className="w-5 h-5 fill-current text-yellow-500" />
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-400" />);
    }

    return stars;
  };

  useEffect(() => {
    setLoading(true);
    getProduct();
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8  ">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Image Gallery */}
          <ImageGallary product={product} />

          {/* Product Info */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-300 mb-4">{product.description}</p>
            <div className="flex items-center mb-4">
              <div className="flex mr-2">{renderStars(product.ratings)}</div>
              <span className="text-sm text-gray-400">
                ({product?.reviews?.length} reviews)
              </span>
            </div>
            <p className="text-2xl font-bold text-blue-400 mb-6">
              ₹{product.price}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="bg-gray-800 text-white rounded-l-md px-3 py-2"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="bg-gray-800 text-white px-4 py-2">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="bg-gray-800 text-white rounded-r-md px-3 py-2"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <AddToCart />
            <AddReview />
          </div>
        </div>

        <Reviews product={product} />
      </div>
    </div>
  );
}
