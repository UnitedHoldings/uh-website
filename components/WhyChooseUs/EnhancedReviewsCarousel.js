import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';
import { trackEvent } from '@/lib/posthog';
import { AUTO_PLAY_INTERVAL } from './constants';
import ReviewCard from './ReviewCard';
import ReviewCardSkeleton from './ReviewCardSkeleton';

const EnhancedReviewsCarousel = ({ reviews, loading = false }) => {
  const [currentReview, setCurrentReview] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);

  // Sort reviews by id to maintain consistent order
  const sortedReviews = [...reviews].sort((a, b) => a.id - b.id);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % sortedReviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + sortedReviews.length) % sortedReviews.length);
  };

  const goToReview = (index) => {
    setCurrentReview(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (isAutoPlaying && sortedReviews.length > 0 && !loading) {
      autoPlayRef.current = setInterval(nextReview, AUTO_PLAY_INTERVAL);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, sortedReviews.length, loading]);

  const visibleReviews = [];
  for (let i = -1; i <= 1; i++) {
    const index = (currentReview + i + sortedReviews.length) % sortedReviews.length;
    visibleReviews.push(index);
  }

  if (loading) {
    return (
      <div className="relative bg-[#9b1c20] rounded-4xl p-8 sm:p-12 lg:p-16 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-[#F9AF55]/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#9b1c20]/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse delay-500" />
        </div>

        <div className="relative z-10">
          {/* Skeleton Carousel */}
          <div className="relative">
            {/* Desktop Layout Skeleton */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
                {[...Array(3)].map((_, position) => (
                  <div key={position} className={position === 1 ? 'row-start-1' : 'row-start-1'}>
                    <ReviewCardSkeleton isActive={position === 1} />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Layout Skeleton */}
            <div className="lg:hidden">
              <div className="flex justify-center">
                <ReviewCardSkeleton isActive={true} />
              </div>
            </div>

            {/* Skeleton Controls */}
            <div className="flex justify-center items-center space-x-6 mt-12">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 animate-pulse" />
              
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 animate-pulse" />
                
                <div className="flex space-x-3">
                  {[...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className="w-3 h-3 rounded-full bg-white/40 animate-pulse"
                    />
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 animate-pulse" />
            </div>
          </div>

          {/* Skeleton CTA */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center px-8 py-4 bg-white/20 rounded-2xl animate-pulse">
              <div className="h-6 w-40 bg-white/30 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (sortedReviews.length === 0) {
    return (
      <div className="relative bg-[#9b1c20] rounded-4xl p-8 sm:p-12 lg:p-16 overflow-hidden">
        <div className="text-center text-white text-xl">
          No reviews available
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#9b1c20] rounded-4xl p-8 sm:p-12 lg:p-16 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#F9AF55]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#9b1c20]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-8 h-8 bg-[#F9AF55] rounded-full opacity-20 animate-bounce" />
      <div className="absolute bottom-32 left-24 w-4 h-4 bg-white rounded-full opacity-30 animate-bounce delay-300" />

      <div className="relative z-10">
        {/* Carousel */}
        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
              {visibleReviews.map((reviewIndex, position) => (
                <div key={sortedReviews[reviewIndex]._id} className={position === 1 ? 'row-start-1' : 'row-start-1'}>
                  <ReviewCard
                    review={sortedReviews[reviewIndex]}
                    isActive={position === 1}
                    onClick={() => goToReview(reviewIndex)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            <div className="flex justify-center">
              <ReviewCard
                review={sortedReviews[currentReview]}
                isActive={true}
                onClick={() => { }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center space-x-6 mt-12">
            <button
              onClick={() => {
                trackEvent('client_feedback_previous_clicked', {
                  location: 'why_choose_us_section',
                  current_review_index: currentReview
                });
                prevReview();
                setIsAutoPlaying(false);
              }}
              className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white transition-all duration-300 hover:scale-110"
              aria-label="Previous review"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white transition-all duration-300"
                aria-label={isAutoPlaying ? "Pause auto-play" : "Play auto-play"}
              >
                {isAutoPlaying ? <FaPause className="w-4 h-4" /> : <FaPlay className="w-4 h-4" />}
              </button>

              <div className="flex space-x-3">
                {sortedReviews.map((_, index) => (
                  <button
                    key={sortedReviews[index]._id}
                    onClick={() => goToReview(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentReview
                        ? 'bg-[#F9AF55] scale-125'
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                trackEvent('client_feedback_next_clicked', {
                  location: 'why_choose_us_section',
                  current_review_index: currentReview
                });
                nextReview();
                setIsAutoPlaying(false);
              }}
              className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white transition-all duration-300 hover:scale-110"
              aria-label="Next review"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* CTA Section */}
     
      </div>
    </div>
  );
};

export default EnhancedReviewsCarousel;