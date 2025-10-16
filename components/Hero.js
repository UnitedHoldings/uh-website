'use client'
import React from 'react'
import Image from 'next/image'

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

const slidesData = [
  {
    id: 'life',
    image: '/slide1.jpg',
    imageSM: '/slide1-SM.jpg',
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
      {/* Carousel Container */}
      <div className="relative w-full h-[80vh] lg:h-[700px] overflow-hidden">
        {/* Slides */}
        {slidesData.map((slide, index) => {
          const department = SLIDE_DEPARTMENTS[slide.id];
          const color = DEPARTMENT_COLORS[department];
          
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
            >
              {/* Image container */}
              <div className="relative w-full h-1/2 lg:h-full">
                <Image
                  src={slide.image}
                  alt={`${slide.title1} ${slide.title11} ${slide.title2}`}
                  fill
                  className="object-cover object-center hidden lg:block"
                  sizes="100vw"
                  priority={index === 0}
                  quality={100}
                />
                <Image
                  src={slide.imageSM}
                  alt={`${slide.title1} ${slide.title11} ${slide.title2}`}
                  className="object-cover object-center h-[600px] lg:hidden"
                  width={800}
                  height={600}
                  priority={index === 0}
                  quality={100}
                />
                {/* 5% Black Overlay */}
                <div className="absolute z-10 inset-0 ] bg-black/50 bg-gradient-to-r from-black/20 bg-opacity-5 hidden lg:block" />
              </div>

              {/* Desktop/Large overlay */}
              <div className="hidden lg:block z-50 absolute w-full mx-auto top-0 left-0 right-0 h-full">
                <div className="max-w-[1400px] pt-48 mx-auto justify-center flex items-center h-full w-full">
                  <div className='h-full space-y-6 max-w-3xl flex flex-col'>
                    <h1 className="text-7xl font-bold font-outfit text-center text--2xs">
                      <span style={{ color: 'white' }}>{slide.title1}</span>{' '}
                      <span style={{ color: 'white' }}>{slide.title11}</span>{' '}
                      <span style={{ color: color }}>{slide.title2}</span>
                    </h1>
                    <div className="h-1 bg-white w-full" style={{ backgroundColor: color }} />
                    <p className="text-xl text-center pb-6 font-normal max-w-[700px] mx-auto font-outfit text-white" >
                      {slide.description}
                    </p>

                    <div className='flex items-center justify-center'>
                      <button
                        className='px-16 py-4 text-lg font-semibold rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 font-outfit'
                        style={{ 
                          backgroundColor: color,
                          color: '#ffffff',
                          '--focus-ring-color': color,
                        }}
                        aria-label={slide.button}
                        onClick={() => window.open(slide.url, '_blank')}
                      >
                        {slide.button}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile/Tablet */}
              <div 
                className="lg:hidden w-full  bg-opacity-90 absolute bottom-0 pb-16 px-4 py-6"
                style={{ backgroundColor: color }}
              >
                <div className="space-y-4  flex flex-col justify-center text-white font-outfit">
                  <h1 className="text-4xl xs:text-3xl sm:text-4xl font-black">
                    {slide.title1} <span style={{ color: '#ffffff' }}>{slide.title11}</span> {slide.title2}.
                  </h1>
                  <div className="h-0.5 bg-white w-full" />
                  <p className="text-lg sm:text-sm font-normal">{slide.description}</p>

                  <div>
                    <button
                      className='bg-white py-2 px-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200'
                      style={{ color: color }}
                      aria-label={slide.button}
                      onClick={() => window.open(slide.url, '_blank')}
                    >
                      {slide.button}
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