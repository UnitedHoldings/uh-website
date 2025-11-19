import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCardSkeleton = ({ isActive = false }) => {
  return (
    <div className={`relative transition-all duration-500 ${isActive ? 'scale-105 z-20' : 'scale-95 opacity-70 z-10'}`}>
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gray-200/50 rounded-full -translate-y-16 translate-x-16" />

        {/* Quote Icon Skeleton */}
        <div className="absolute top-6 right-6 text-gray-200">
          <FaQuoteLeft className="text-4xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-14 h-14 bg-gray-300 rounded-2xl flex items-center justify-center animate-pulse" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="h-6 bg-gray-300 rounded w-32 animate-pulse" />
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-gray-300 rounded-full animate-pulse" />
                  ))}
                </div>
              </div>
              <div className="h-4 bg-gray-300 rounded w-24 mb-2 animate-pulse" />
              <div className="h-3 bg-gray-300 rounded w-20 animate-pulse" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-gray-300 rounded w-4/6 animate-pulse" />
          </div>
        </div>

        {/* Active Indicator Skeleton */}
        {isActive && (
          <div className="absolute bottom-0 left-1/2 w-24 h-1 bg-gray-300 rounded-t-full -translate-x-1/2 animate-pulse" />
        )}
      </div>
    </div>
  );
};

export default ReviewCardSkeleton;