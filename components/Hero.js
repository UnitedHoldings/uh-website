'use client'
import React from 'react'
import Image from 'next/image'
import VideoPlayer from './VideoPlayer';
import CallBackForm from './CallBackForm';

const DEPARTMENT_COLORS = {
  'Life Assurance': '#3d834d', // Green
  'General Insurance': '#286278', // Blue
  'United Pay': '#f79620', // Orange
};

// Map slides to departments
const SLIDE_DEPARTMENTS = {
  'life': 'Life Assurance',
  'general': 'General Insurance',
  'pay': 'United Pay'
};

// All available products across departments
const ALL_PRODUCTS = [
  'Funeral Plan',
  'Family Protection',
  'Life Insurance',
  'Education Plan',
  'Retirement Plan',
  'Home Insurance',
  'Motor Insurance',
  'Business Insurance',
  'Travel Insurance',
  'Asset Insurance',
  'Umlamleli - Salary Advance',
  'Personal Loan',
  'Business Loan',
  'Not Sure - Need Advice'
];

const slidesData = [
  {
    id: 'life',
    image: '/slide1.jpg',
    imageSM: '/slide1-SM.jpg',
    shortVideo: 'https://res.cloudinary.com/loooktrial/video/upload/v1760905891/Life_ij6tld.mp4',
    title1: 'United',
    title11: 'Life',
    title2: 'Assurance',
    description: 'Protect your loved ones with comprehensive life insurance coverage. From funeral plans to family protection, we have you covered.',
    button: 'Learn More',
    url: '../../united-life-assurance',
  },
  {
    id: 'general',
    image: '/home.jpg',
    imageSM: '/homeSM.jpg',
    shortVideo: 'https://res.cloudinary.com/loooktrial/video/upload/v1760906128/General_n2du5m.mp4',
    title1: 'United',
    title11: 'General',
    title2: 'Insurance',
    description: 'Comprehensive insurance solutions for your home, motor, and business. Get protected against unexpected events and losses.',
    button: 'Get Covered',
    url: '../../united-general-insurance',
  },
  {
    id: 'pay',
    image: '/micro.jpg',
    imageSM: '/microSM.jpg',
    shortVideo: 'https://res.cloudinary.com/loooktrial/video/upload/v1760906181/Pay_ayuii9.mp4',
    title1: 'Umlamleli -',
    title11: 'Salary ',
    title2: 'Advance',
    description: 'We know mid-month crisis is not easy to get over, Umlamleli is there boost you need to get through the month. Umlamleli provides loans from E1, 000.00 – E5,000.00 payable within 3 months.',
    button: 'Apply Now',
    url: '../../united-pay',
  },
];

const Hero = ({ currentSlide = 0, setCurrentSlide }) => {
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [showCallBackForm, setShowCallBackForm] = React.useState(false);

  // Get current slide department and color
  const currentSlideData = slidesData[currentSlide];
  const currentDepartment = SLIDE_DEPARTMENTS[currentSlideData.id];
  const currentColor = DEPARTMENT_COLORS[currentDepartment];

  // Handle slide transitions
  const goToSlide = (index) => {
    if (index === currentSlide || isTransitioning) return;

    setIsTransitioning(true);
    setCurrentSlide(index);

    // Reset transitioning state after animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // Navigation arrows
  const nextSlide = () => {
    const next = (currentSlide + 1) % slidesData.length;
    goToSlide(next);
  };

  const prevSlide = () => {
    const prev = currentSlide === 0 ? slidesData.length - 1 : currentSlide - 1;
    goToSlide(prev);
  };

  return (
    <div className="w-screen flex flex-col max-w-none h-auto lg:h-[700px] relative overflow-hidden">
      {/* Call Back Form Modal */}
   

      {/* Carousel Container */}
      <div className="relative w-full h-[80vh] lg:h-[700px] overflow-hidden">
        {/* Static Call Back Form - Only show on large screens */}
        <div className={ `${showCallBackForm ? 'block' : 'hidden'}   `}>
          <CallBackForm onClose={() => { }} />
        </div>

        {/* Slides */}
        {slidesData.map((slide, index) => {
          const department = SLIDE_DEPARTMENTS[slide.id];
          const color = DEPARTMENT_COLORS[department];

          return (
            <div
              key={slide.id}
              className={`absolute  inset-0 w-full h-full transition-opacity duration-500 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
            >
              {/* Image container */}
              <div className="relative w-full h-1/2 lg:h-full">
                <VideoPlayer src={slide.shortVideo} />

                {/* 5% Black Overlay */}
                <div className="absolute z-10 inset-0 bg-black/20 bg-gradient-to-r from-black/20 bg-opacity-5 hidden lg:block" />
              </div>

              {/* Desktop/Large overlay */}
              <div className="hidden lg:block z-40 absolute top-[20%] w-full mx-auto  right-[5%] h-full">
                <div className="max-w-[1200px] xxl:max-w-[1400px]   mx-auto flex items-center h-full w-full px-8">
                  {/* Text Content */}
                  <div className='h-full space-y-6 max-w-3xl flex flex-col items-start'>
                    <h1 className="text-7xl font-bold font-outfit text--2xs">
                      <span style={{ color: 'white' }}>{slide.title1}</span>{' '}
                      <span style={{ color: 'white' }}>{slide.title11}</span>{' '} <br></br>
                      <span style={{ color: color }}>{slide.title2}</span>
                    </h1>
                    <div className="h-1 max-w-[100px] bg-white w-full" style={{ backgroundColor: color }} />
                    <p className="text-xl pb-6 max-w-[500px] font-outfit font-light text-white">
                      {slide.description}
                    </p>

                    <div className='flex items-center gap-4'>
                      <button
                        className='px-16 py-4 text-lg font-semibold rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 font-outfit'
                        style={{
                          backgroundColor: color,
                          color: '#ffffff',
                        }}
                        aria-label={slide.button}
                        onClick={() => window.open(slide.url, '_blank')}
                      >
                        {slide.button}
                      </button>

                      {/* Call Back Button */}
                      <button
                        onClick={() => setShowCallBackForm(true)}
                        className='px-8 py-4 text-lg font-semibold rounded-full border-2 hover:bg-white hover:bg-opacity-10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 font-outfit text-white'
                        style={{
                          borderColor: 'white',
                          color: 'white',
                        }}
                      >
                        Need a Call Back?
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile/Tablet */}
              <div
                className="lg:hidden w-full h-1/2 bg-opacity-90 absolute bottom-0 pb-16 px-4 py-6"
                style={{ backgroundColor: color }}
              >
                <div className="space-y-4 flex flex-col justify-center text-white font-outfit">
                  <h1 className="text-4xl xs:text-3xl sm:text-4xl font-black">
                    {slide.title1} <span style={{ color: '#ffffff' }}>{slide.title11}</span> {slide.title2}.
                  </h1>
                  <div className="h-0.5 bg-white w-full" />
                  <p className="text-lg sm:text-sm font-normal">{slide.description}</p>

                  <div className="flex gap-4 flex-wrap">
                    <button
                      className='bg-white py-2 px-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200'
                      style={{ color: color }}
                      aria-label={slide.button}
                      onClick={() => window.open(slide.url, '_blank')}
                    >
                      {slide.button}
                    </button>

                    {/* Mobile Call Back Button */}
                    <button
                      onClick={() => setShowCallBackForm(true)}
                      className='border-2 border-white py-2 px-4 rounded-full font-semibold hover:bg-white hover:bg-opacity-10 transition-colors duration-200 text-white'
                    >
                      Call Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Navigation Arrows */}
        {/* Add your navigation arrows here if needed */}
      </div>
    </div>
  )
}

export default Hero