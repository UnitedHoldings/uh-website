'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ReasonCard from './ReasonCard';
import EnhancedReviewsCarousel from './EnhancedReviewsCarousel';
import StatsSkeleton from './StatsSkeleton';
import ReasonCardSkeleton from './ReasonCardSkeleton';

const WhyChooseUs = () => {
  const statsRef = useRef(null);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reasonsData, setReasonsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reviews from local proxy API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Use local proxy to avoid CORS/beta access issues
        const response = await fetch('/api/home');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && data.data && data.data.reviews) {
          setReviews(data.data.reviews);
          setReasonsData(data.data.reasons);
        } else {
          throw new Error(data.message || 'Failed to fetch reviews from API');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (error) {
    return (
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-red-600 text-lg">Error loading reviews: {error}</div>
          <p className="text-gray-600 mt-2">Please check if the API server is running.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col justify-between items-start md:items-center">
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl md:text-3xl font-bold text-[#9b1c20] font-outfit">
                Why Choose <span className="">United Holdings</span>?
              </h3>
              <p className="text-gray-600 max-w-5xl text-lg lg:text-xl">
                At United Holdings, we pride ourselves on delivering unparalleled insurance and financial services tailored to meet the unique needs of our clients. With over 80 years of trusted service in Eswatini, we combine local expertise with global standards to provide you with peace of mind and security for your future.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Section Skeleton */}
        {loading && <StatsSkeleton />}

        {/* Reasons Grid Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 mb-8 gap-4 lg:gap-8">
            {[...Array(3)].map((_, index) => (
              <ReasonCardSkeleton key={index} index={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 mb-8 gap-4 lg:gap-8">
            {reasonsData.map((reason, index) => (
              <ReasonCard key={index} {...reason} index={index} />
            ))}
          </div>
        )}

        {/* Enhanced Reviews Carousel */}
        <EnhancedReviewsCarousel reviews={reviews} loading={loading} />
      </div>
    </section>
  );
};

export default WhyChooseUs;