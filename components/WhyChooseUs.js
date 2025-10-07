'use client';

import { useState, useEffect, useRef } from 'react';
import { FaShieldAlt, FaHandshake, FaGlobeAfrica } from 'react-icons/fa';
import { SlStar } from 'react-icons/sl';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

// Constants
const AUTO_PLAY_INTERVAL = 5000;
const MAX_STARS = 5;

// Data
const reasonsData = [
  {
    title: "70+ Years of Trusted Service",
    content: "We're the right partner you can choose with over 70 years of doing business in the Kingdom of Eswatini. We're your trusted brand here to provide not just products and services, but rather the peace of mind to get on with the things in life that really matter to you.",
    icon: <FaShieldAlt className="text-[#9b1c20] text-3xl mb-2" aria-label="Trusted Service" />
  },
  {
    title: "Serving you with Integrity",
    content: "We don't do insurance for ourselves, we do it for your peace of mind. Our commitment to ethical practices and transparent dealings ensures you always get the best service possible.",
    icon: <FaHandshake className="text-[#9b1c20] text-3xl mb-2" aria-label="Integrity" />
  },
  {
    title: "Swazi Insurance for the International Market",
    content: "With over 70 years of doing business in Eswatini, United Holdings is best suited and experienced to provide uniquely tailored solutions that understand both local needs and global standards.",
    icon: <FaGlobeAfrica className="text-[#9b1c20] text-3xl mb-2" aria-label="International Market" />
  },
];
// Reviews Data
const reviewsData = [
  {
    id: 1,
    name: "Thabo M.",
    role: "Business Owner",
    content: "United Holdings has been our insurance partner for over a decade. Their claims process is incredibly efficient and their customer service is exceptional.",
    rating: 5,
    image: "/customer1.jpg"
  },
  {
    id: 2,
    name: "Nomsa D.",
    role: "Family Provider",
    content: "The peace of mind that comes with knowing my family is protected is priceless. United Life Assurance made the process so simple and affordable.",
    rating: 4.5,
    image: "/customer2.jpg"
  },
  {
    id: 3,
    name: "James K.",
    role: "Entrepreneur",
    content: "As a small business owner, United's micro-loans helped me expand my operations when traditional banks turned me down. Quick, professional service.",
    rating: 5,
    image: "/customer3.jpg"
  },
  {
    id: 4,
    name: "Lindiwe S.",
    role: "Homeowner",
    content: "Their motor insurance saved me during an accident last year. The support I received was beyond expectations - truly a company that cares.",
    rating: 4.5,
    image: "/customer4.jpg"
  }
];


const statsData = [
  { value: "70+", label: "Years of Experience", color: "text-[#9b1c20]" },
  { value: "50K+", label: "Happy Clients", color: "text-[#F9AF55]" },
  { value: "24/7", label: "Customer Support", color: "text-[#9b1c20]" },
  { value: "98%", label: "Claim Satisfaction", color: "text-[#F9AF55]" }
];

// Components
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = MAX_STARS - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-1" aria-label={`Rating: ${rating} out of ${MAX_STARS} stars`}>
      {[...Array(fullStars)].map((_, i) => (
        <SlStar key={`full-${i}`} className="text-[#F9AF55] fill-current" />
      ))}
      {hasHalfStar && <SlStar className="text-[#F9AF55] fill-current" />}
      {[...Array(emptyStars)].map((_, i) => (
        <SlStar key={`empty-${i}`} className="text-gray-300" />
      ))}
    </div>
  );
};

const ReviewCard = ({ review, variant = 'center' }) => {
  // variant: 'center' | 'side' | 'small' - adjusts size/opacity/positioning
  const base = 'bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 transition-all duration-500 flex-shrink-0';
  const variants = {
    center: 'opacity-100 scale-105 z-20',
    side: 'opacity-95 scale-95 z-10',
    small: 'opacity-0 scale-95 z-0 hidden'
  };

  const sizeClass = variant === 'center' ? 'w-72 sm:w-96' : 'w-64 sm:w-80';

  return (
    <div
      className={`${base} ${variants[variant] || variants.center} ${sizeClass}`}
      role="group"
      aria-label={`Review by ${review.name}`}>
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#9b1c20] to-[#9b1c20] rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
          {review.name.charAt(0)}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 text-base sm:text-lg">{review.name}</h4>
          <p className="text-xs sm:text-sm text-gray-600">{review.role}</p>
          <StarRating rating={review.rating} />
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed italic text-sm sm:text-base">&quot;{review.content}&quot;</p>
    </div>
  );
};

const ReasonCard = ({ title, content, icon }) => (
  <div className="bg-[#9b1c20] rounded-2xl p-4 sm:p-6 border border-gray-100 transition-shadow duration-300 flex flex-col items-start">
    <div className='bg-white mb-8 flex items-center justify-center pt-1 rounded-full h-16 w-16'>{icon}</div>
    <h3 className="text-lg sm:text-xl font-semibold text-white  mb-4 font-outfit">{title}</h3>
    <p className="text-white/80 font-light text-sm sm:text-base leading-relaxed">{content}</p>
  </div>
);

const StatCard = ({ value, label, color }) => (
  <div className="text-center">
    <div className={`text-3xl sm:text-4xl font-bold text-[#9b1c20] mb-2`}>{value}</div>
    <div className="text-gray-600 text-sm sm:text-base">{label}</div>
  </div>
);

const ReviewsCarousel = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);

  const nextReview = () => setCurrentReview((prev) => (prev + 1) % reviewsData.length);
  const prevReview = () => setCurrentReview((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);
  const goToReview = (index) => {
    setCurrentReview(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(nextReview, AUTO_PLAY_INTERVAL);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying]);

  // compute left, center, right indices for the 3-up view
  const n = reviewsData.length;
  const center = currentReview;
  const left = (center - 1 + n) % n;
  const right = (center + 1) % n;

  return (
    <div className="w-full bg-gradient-to-br from-[#9b1c20] to-[#8d0f0f] rounded-2xl p-4 sm:p-6 md:p-8 text-white relative overflow-visible">
      <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-white opacity-5 rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-20 sm:w-24 h-20 sm:h-24 bg-white opacity-5 rounded-full translate-y-10 sm:translate-y-12 -translate-x-10 sm:-translate-x-12"></div>

      <div className="relative z-10">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold mb-2 font-outfit">What Our Clients Say</h3>
          <p className="text-white opacity-80 text-sm sm:text-base">Real stories from satisfied customers</p>
        </div>

        <div className="mb-6 sm:mb-8">
          {/* Mobile: single centered card */}
          <div className="md:hidden w-full flex justify-center ">
            <div className="">
              <ReviewCard review={reviewsData[center]} variant="center" />
            </div>
          </div>

          
        </div>

        <div className="flex justify-center items-center space-x-4 mb-4 sm:mb-6">
          <button
            onClick={() => {
              prevReview();
              setIsAutoPlaying(false);
            }}
            className="p-1 sm:p-2 rounded-full bg-white text-[#9b1c20] hover:bg-gray-100 transition-colors duration-200"
            aria-label="Previous review"
          >
            <BsChevronLeft className="text-lg sm:text-xl" />
          </button>

          <div className="flex space-x-2">
            {reviewsData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToReview(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === currentReview ? 'bg-white scale-125' : 'bg-white opacity-40'
                  }`}
                aria-label={`Go to review ${index + 1}`}
                aria-current={index === currentReview}
              />
            ))}
          </div>

          <button
            onClick={() => {
              nextReview();
              setIsAutoPlaying(false);
            }}
            className="p-1 sm:p-2 rounded-full bg-white text-[#9b1c20] hover:bg-gray-100 transition-colors duration-200"
            aria-label="Next review"
          >
            <BsChevronRight className="text-lg sm:text-xl" />
          </button>
        </div>

        <div className="text-center">
          <button
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-white text-[#9b1c20] rounded-full font-semibold hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base"
            aria-label="Share your experience"
          >
            <span>Share Your Experience</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const WhyChooseUs = () => (
  <section className="">
    <div className="max-w-[1400px] mx-auto px-4 lg:px-0 w-full">
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-16 mb-8 sm:mb-12 md:mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="text-xl sm:text-2xl min-w-xs text-[#9b1c20] font-semibold ">
              <p>Choose <span className="">United Holdings</span></p>
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl max-w-3xl text-[#9b1c20]">
              <p>
                <span className="text-[#9b1c20] font-light">Discover why thousands of Swazis </span>
                trust us with their insurance and financial needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex flex-col items-center">
        <div className="space-y-2 grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
          {reasonsData.map((reason, index) => (
            <ReasonCard key={index} title={reason.title} content={reason.content} icon={reason.icon} />
          ))}
          
        </div>
        <ReviewsCarousel />
      </div>
    </div>
  </section>
);

export default WhyChooseUs;