import { MAX_STARS } from './constants';

const StarRating = ({ rating, size = "sm" }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  return (
    <div className="flex items-center space-x-1" aria-label={`Rating: ${rating} out of ${MAX_STARS} stars`}>
      {[...Array(fullStars)].map((_, i) => (
        <div key={`full-${i}`} className={`${sizeClasses[size]} bg-[#F9AF55] rounded-full`} />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <div className={`${sizeClasses[size]} bg-gray-300 rounded-full`} />
          <div className={`absolute inset-0 ${sizeClasses[size]} bg-[#F9AF55] rounded-full clip-half`} />
        </div>
      )}
      {[...Array(MAX_STARS - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <div key={`empty-${i}`} className={`${sizeClasses[size]} bg-gray-300 rounded-full`} />
      ))}
    </div>
  );
};

export default StarRating;