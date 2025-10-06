'use client';


import { useState, useEffect, useRef } from 'react';
import { SlStar } from 'react-icons/sl';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { FiAward, FiShield, FiGlobe } from 'react-icons/fi';
import Image from 'next/image';

// Constants
const AUTO_PLAY_INTERVAL = 5000;
const MAX_STARS = 5;

// Data
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

const reasonsData = [
  {
    title: "70+ Years of Trusted Service",
    content: "We're the right partner you can choose with over 70 years of doing business in the Kingdom of Eswatini. We're your trusted brand here to provide not just products and services, but rather the peace of mind to get on with the things in life that really matter to you.",
    icon: <FiAward className="text-2xl text-[#9b1c20] mb-2" />
  },
  {
    title: "Serving you with Integrity",
    content: "We don't do insurance for ourselves, we do it for your peace of mind. Our commitment to ethical practices and transparent dealings ensures you always get the best service possible.",
    icon: <FiShield className="text-2xl text-[#9b1c20] mb-2" />
  },
  {
    title: "Swazi Insurance for the International Market",
    content: "With over 70 years of doing business in Eswatini, United Holdings is best suited and experienced to provide uniquely tailored solutions that understand both local needs and global standards.",
    icon: <FiGlobe className="text-2xl text-[#9b1c20] mb-2" />
  },
];

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-1" aria-label={`Rating: ${rating} out of 5 stars`}>
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

const ReviewCard = ({ review }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col h-full min-w-[320px] max-w-[380px] shadow-sm">
    <p className="text-gray-800 text-base mb-6 flex-1">{review.content}</p>
    <div className="flex items-center mt-auto">
      <Image
        src={review.image}
        alt={review.name}
        width={40}
        height={40}
        className="rounded-full object-cover w-10 h-10 border border-gray-200"
      />
      <div className="ml-3">
        <div className="font-semibold text-gray-900 text-sm leading-tight">{review.name}</div>
        <div className="text-xs text-gray-500">{review.role}</div>
        <div className="flex items-center mt-1">
          <StarRating rating={review.rating} />
        </div>
      </div>
    </div>
  </div>
);

const ReviewsCarousel = () => {
  const [current, setCurrent] = useState(0);
  const visibleCount = 3;
  const total = reviewsData.length;
  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);
  const getVisible = () => {
    let arr = [];
    for (let i = 0; i < visibleCount; i++) {
      arr.push(reviewsData[(current + i) % total]);
    }
    return arr;
  };

  return (
    <div className="w-full bg-white rounded-2xl p-0 sm:p-6 md:p-8 flex flex-col md:flex-row items-stretch gap-0 md:gap-8 shadow-md">
      {/* Left image */}
      <div className="hidden md:block w-1/3 min-w-[260px] max-w-[340px] rounded-l-2xl overflow-hidden relative">
        <Image src={reviewsData[current].image} alt={reviewsData[current].name} width={400} height={400} className="w-full h-full object-cover" />
        <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F9AF55] text-white rounded-full p-4 shadow-lg border-4 border-white">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M8 5v14l11-7L8 5z" fill="currentColor"/></svg>
        </button>
      </div>
      {/* Reviews */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex flex-row gap-6 overflow-x-auto py-8 px-4 md:px-0 scrollbar-hide">
          {getVisible().map((review, idx) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
        {/* Navigation */}
        <div className="flex items-center justify-between px-4 md:px-0 pb-4">
          <div className="flex items-center gap-2">
            <button onClick={prev} className="rounded-full border border-gray-300 w-8 h-8 flex items-center justify-center text-[#F9AF55] bg-white hover:bg-gray-100 transition">
              <BsChevronLeft />
            </button>
            <button onClick={next} className="rounded-full border border-gray-300 w-8 h-8 flex items-center justify-center text-[#F9AF55] bg-white hover:bg-gray-100 transition">
              <BsChevronRight />
            </button>
          </div>
          <div className="flex gap-2 items-center">
            {Array.from({ length: total }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-200 ${i === current ? 'w-8 bg-[#F9AF55]' : 'w-4 bg-gray-200'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ReasonCard = ({ title, content, icon }) => (
  <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 transition-shadow duration-300 flex flex-col items-start">
    {icon}
    <h3 className="text-lg sm:text-xl font-semibold text-[#9b1c20] mb-2 font-outfit">{title}</h3>
    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{content}</p>
  </div>
);

const StatCard = ({ value, label, color }) => (
  <div className="text-center">
    <div className={`text-3xl sm:text-4xl font-bold text-[#9b1c20] mb-2`}>{value}</div>
    <div className="text-gray-600 text-sm sm:text-base">{label}</div>
  </div>
);


const WhyChooseUs = () => (
  <section className="">
    <div className="max-w-[1400px] flex flex-col mx-auto px-4 lg:px-0 w-full">
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-16 mb-8 sm:mb-12 md:mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="text-xl sm:text-2xl min-w-xs  font-semibold text-gray-500">
              <p>Choose <span className="text-[#9b1c20]">United Holdings</span></p>
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl max-w-3xl">
              <p>
                <span className="text-[#8B8B8B] font-light">Discover why thousands of Swazis </span>
                trust us with their insurance and financial needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:gap-10 md:gap-12 items-start">
        <div>
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Customer Reviews</h3>
          <ReviewsCarousel />
        </div>
        <div className="space-y-2 grid grid-cols-3 gap-4">
          {reasonsData.map((reason, index) => (
            <ReasonCard key={index} title={reason.title} content={reason.content} icon={reason.icon} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseUs;