import { Star, StarHalf } from "lucide-react";

const Reviews = ({product}) => {

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

      const reviews = product.reviews || []
  // Mock reviews data
  // const reviews = [
  //   {
  //     id: 1,
  //     user: "John D.",
  //     rating: 5,
  //     comment:
  //       "Excellent sound quality and comfortable for long listening sessions.",
  //   },
  //   {
  //     id: 2,
  //     user: "Sarah M.",
  //     rating: 4,
  //     comment: "Great headphones, but the battery life could be better.",
  //   },
  //   {
  //     id: 3,
  //     user: "Mike R.",
  //     rating: 4.5,
  //     comment: "Very impressed with the noise cancellation feature.",
  //   },
  // ];
  return (
    <>
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-2">
                <div className="flex mr-2">{renderStars(review.rating)}</div>
                <span className="text-sm text-gray-400">by {review.name}</span>
              </div>
              <p className="text-gray-300">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Reviews;
