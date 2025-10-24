'use client';

import { useState, useEffect, useRef } from 'react';
import { FaShieldAlt, FaHandshake, FaGlobeAfrica, FaQuoteLeft, FaPlay, FaPause } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Constants
const AUTO_PLAY_INTERVAL = 6000;
const MAX_STARS = 5;

// Color palette based on primary color #9b1c20
const colors = {
  primary: '#9b1c20',
  primaryLight: '#c8232c',
  primaryDark: '#7a1619',
  accent: '#F9AF55',
  accentLight: '#fbc374',
  darkBg: '#1a1a1a',
  lightBg: '#f8f9fa'
};

// Enhanced Data
const reasonsData = [
  {
    title: "80+ Years of Trusted Service",
    content: "We're the right partner you can choose with over 70 years of doing business in the Kingdom of Eswatini. We're your trusted brand here to provide not just products and services, but rather the peace of mind to get on with the things in life that really matter to you.",
    icon: <FaShieldAlt className="text-white text-3xl" aria-label="Trusted Service" />,
    gradient: `from-[${colors.primary}] to-[${colors.primaryLight}]`,
    accent: `bg-[${colors.primary}]`
  },
  {
    title: "Serving you with Integrity",
    content: "We don't do insurance for ourselves, we do it for your peace of mind. Our commitment to ethical practices and transparent dealings ensures you always get the best service possible.",
    icon: <FaHandshake className="text-white text-3xl" aria-label="Integrity" />,
    gradient: `from-[${colors.primaryDark}] to-[${colors.primary}]`,
    accent: `bg-[${colors.primaryDark}]`
  },
  {
    title: "Swazi Insurance for the International Market",
    content: "With over 80 years of doing business in Eswatini, United Holdings is best suited and experienced to provide uniquely tailored solutions that understand both local needs and global standards.",
    icon: <FaGlobeAfrica className="text-white text-3xl" aria-label="International Market" />,
    gradient: `from-[${colors.primary}] to-[${colors.accent}]`,
    accent: `bg-[${colors.primary}]`
  },
];

const statsData = [
  { value: "80+", label: "Years of Excellence", color: "text-white", sublabel: "Trusted Service" },
  { value: "50K+", label: "Happy Clients", color: "text-white", sublabel: "Satisfied Customers" },
  { value: "24/7", label: "Support", color: "text-white", sublabel: "Always Available" },
  { value: "98%", label: "Satisfaction", color: "text-white", sublabel: "Claim Approval Rate" }
];

// Enhanced Components
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
        <div key={`full-${i}`} className={`${sizeClasses[size]} bg-[${colors.accent}] rounded-full`} />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <div className={`${sizeClasses[size]} bg-gray-300 rounded-full`} />
          <div className={`absolute inset-0 ${sizeClasses[size]} bg-[${colors.accent}] rounded-full clip-half`} />
        </div>
      )}
      {[...Array(MAX_STARS - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <div key={`empty-${i}`} className={`${sizeClasses[size]} bg-gray-300 rounded-full`} />
      ))}
    </div>
  );
};

const ReviewCard = ({ review, isActive = false, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className={`relative cursor-pointer transition-all duration-500 ${isActive ? 'scale-105 z-20' : 'scale-95 opacity-70 z-10 hover:scale-100 hover:opacity-90'
        }`}
      whileHover={{ y: -5 }}
      layout
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8  border border-white/20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[${colors.primary}]/5 to-transparent rounded-full -translate-y-16 translate-x-16`} />

        {/* Quote Icon */}
        <div className={`absolute top-6 right-6 text-[${colors.primary}]/10`}>
          <FaQuoteLeft className="text-4xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-start space-x-4 mb-6">
            <div className={`w-14 h-14 bg-[${colors.primary}]  rounded-2xl flex items-center justify-center text-white font-bold text-lg `}>
              {review.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-gray-900 text-lg">{review.name}</h4>
                <StarRating rating={review.rating} size="sm" />
              </div>
              <p className="text-sm text-gray-600 font-medium">{review.role}</p>
              <p className={`text-xs text-[${colors.primary}] font-semibold`}>{review.company}</p>
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
            className={`absolute bottom-0 left-1/2 w-24 h-1 bg-gradient-to-r from-[${colors.primary}] to-[${colors.accent}] rounded-t-full -translate-x-1/2`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          />
        )}
      </div>
    </motion.div>
  );
};

const ReasonCard = ({ title, content, icon, gradient, accent, index }) => {
  return (
    <motion.div
      className="group relative bg-white/95 backdrop-blur-sm rounded-3xl p-6  border border-black/20 overflow-hidden  transition-all duration-500"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ y: -10 }}
    >
      {/* Animated Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

      {/* Accent Bar */}
      <div className={`absolute top-0 left-0 w-2 h-full ${accent} transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500`} />

      <div className="relative z-10  bg-[${colors.primary}]/40 rounded-2xl p-6  duration-300">
        <div className="flex items-start justify-between mb-6">
          <div className={`p-4 rounded-2xl bg-[${colors.primary}]  transform group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          <motion.div
            className="text-5xl font-bold text-gray-100"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.2 + 0.3 }}
          >
            {String(index + 1).padStart(2, '0')}
          </motion.div>
        </div>

        <h3 className="text-2xl h-16 font-bold text-gray-900 mb-4 font-outfit leading-tight">
          {title}
        </h3>

        <p className="text-gray-600 leading-relaxed text-lg font-light">
          {content}
        </p>

        {/* Hover Effect Line */}
        <div className={`absolute bottom-0 left-8 w-0 h-1 bg-gradient-to-r from-transparent via-[${colors.primary}] to-transparent group-hover:w-24 transition-all duration-500`} />
      </div>
    </motion.div>
  );
};

const StatCard = ({ value, label, sublabel, color, index }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = parseInt(value.replace(/[^0-9]/g, ''));
    const duration = 2000;
    const steps = 60;
    const step = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      className="text-center group"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative inline-block">
        <div className={`text-5xl sm:text-6xl font-bold ${color} mb-3 relative z-10`}>
          {value.includes('+') || value.includes('%') ? `${count}${value.replace(/[0-9]/g, '')}` : count}
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent blur-xl rounded-full transform scale-150 group-hover:scale-200 transition-transform duration-500" />
      </div>
      <div className={`text-lg font-semibold ${color} mb-1`}>{label}</div>
      <div className="text-sm text-white/80 font-light">{sublabel}</div>
    </motion.div>
  );
};

const EnhancedReviewsCarousel = ({ reviews }) => {
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
    if (isAutoPlaying && sortedReviews.length > 0) {
      autoPlayRef.current = setInterval(nextReview, AUTO_PLAY_INTERVAL);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, sortedReviews.length]);

  const visibleReviews = [];
  for (let i = -1; i <= 1; i++) {
    const index = (currentReview + i + sortedReviews.length) % sortedReviews.length;
    visibleReviews.push(index);
  }

  if (sortedReviews.length === 0) {
    return (
      <div className={`relative bg-[${colors.primary}] rounded-4xl p-8 sm:p-12 lg:p-16 overflow-hidden`}>
        <div className="text-center text-white text-xl">
          No reviews available
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-[${colors.primary}] rounded-4xl p-8 sm:p-12 lg:p-16 overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className={`absolute top-10 left-10 w-72 h-72 bg-[${colors.accent}]/5 rounded-full blur-3xl animate-pulse`} />
        <div className={`absolute bottom-10 right-10 w-96 h-96 bg-[${colors.primary}]/10 rounded-full blur-3xl animate-pulse delay-1000`} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      {/* Floating Elements */}
      <div className={`absolute top-20 right-20 w-8 h-8 bg-[${colors.accent}] rounded-full opacity-20 animate-bounce`} />
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
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentReview
                        ? `bg-[${colors.accent}] scale-125`
                        : 'bg-white/40 hover:bg-white/60'
                      }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => {
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
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <button
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className={`group relative inline-flex items-center px-8 py-4 text-[${colors.primary}] bg-white rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 overflow-hidden`}
          >
            <span className="relative z-10">Share Your Experience</span>
            <div className={`absolute inset-0 bg-gradient-to-r from-[${colors.accent}] to-[${colors.primary}] opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

const WhyChooseUs = () => {
  const statsRef = useRef(null);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reviews from external API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('https://uh-server.onrender.com/api/home');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.data && data.data.reviews) {
          setReviews(data.data.reviews);
        } else {
          throw new Error(data.message || 'Failed to fetch reviews from API');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching reviews from API:', err);
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
                Why Choose <span className="text-[${colors.accent}]">United Holdings</span>?
              </h3>
              <p className="text-gray-600 max-w-5xl text-lg lg:text-xl">
                At United Holdings, we pride ourselves on delivering unparalleled insurance and financial services tailored to meet the unique needs of our clients. With over 70 years of trusted service in Eswatini, we combine local expertise with global standards to provide you with peace of mind and security for your future.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 mb-8 gap-4 lg:gap-8">
          {reasonsData.map((reason, index) => (
            <ReasonCard key={index} {...reason} index={index} />
          ))}
        </div>

        {/* Enhanced Reviews Carousel */}
        {!loading && reviews.length > 0 && <EnhancedReviewsCarousel reviews={reviews} />}
        
        {/* Loading state */}
        {loading && (
          <div className={`relative bg-[${colors.primary}] rounded-4xl p-8 sm:p-12 lg:p-16 overflow-hidden`}>
            <div className="text-center text-white text-xl">
              Loading reviews from API...
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WhyChooseUs;