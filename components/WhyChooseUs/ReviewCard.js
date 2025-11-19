import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
import StarRating from './StarRating';

const ReviewCard = ({ review, isActive = false, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className={`relative cursor-pointer transition-all duration-500 ${
        isActive ? 'scale-105 z-20' : 'scale-95 opacity-70 z-10 hover:scale-100 hover:opacity-90'
      }`}
      whileHover={{ y: -5 }}
      layout
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#9b1c20]/5 to-transparent rounded-full -translate-y-16 translate-x-16" />

        {/* Quote Icon */}
        <div className="absolute top-6 right-6 text-[#9b1c20]/10">
          <FaQuoteLeft className="text-4xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-14 h-14 bg-[#9b1c20] rounded-2xl flex items-center justify-center text-white font-bold text-lg">
              {review.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-gray-900 text-lg">{review.name}</h4>
                <StarRating rating={review.rating} size="sm" />
              </div>
              <p className="text-sm text-gray-600 font-medium">{review.role}</p>
              <p className="text-xs text-[#9b1c20] font-semibold">{review.company}</p>
            </div>
          </div>

          <motion.p
            className="text-gray-700 leading-relaxed text-lg italic relative pl-4 border-l-4 border-[#F9AF55]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {review.content}
          </motion.p>
        </div>

        {/* Active Indicator */}
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-1/2 w-24 h-1 bg-gradient-to-r from-[#9b1c20] to-[#F9AF55] rounded-t-full -translate-x-1/2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default ReviewCard;