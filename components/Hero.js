'use client'
import React from 'react'
import Image from 'next/image'

// Import icons
import { MdOutlineFamilyRestroom } from "react-icons/md"
import { FaDove, FaHouseDamage, FaCarCrash, FaFire } from "react-icons/fa";
import { FaMoneyBills } from "react-icons/fa6";
import { GiReceiveMoney, GiFlatTire } from "react-icons/gi";
import { TbClock24 } from "react-icons/tb";
import { BsCalendar2DateFill } from "react-icons/bs";
import { IoThunderstorm } from "react-icons/io5";

const slidesData = [
  {
    id: 'life',
    image: '/slide1.jpg',
    imageSM: '/slide1-SM.jpg',
    title1: 'United',
    title11: 'Life',
    title2: 'Assurance',
    description: 'United Life Assurance, a division of United Holdings, specializes in funeral, personal, and group life insurance.',
    button: 'Learn More',
    url: 'https://example.com/united-life-assurance',
    greenIcon: {
      info: 'Family Cover for your loved ones',
      icon: <MdOutlineFamilyRestroom className="inline-block mr-2 text-xl align-middle" aria-label="Family Cover for your loved ones" />
    },
    redIcon: {
      info: 'Funeral Products for your loved ones',
      icon: <FaDove className="inline-block mr-2 text-xl align-middle" aria-label="Funeral Products for your loved ones" />
    },
    whiteIcon: {
      info: 'From as little as 15pm',
      icon: <FaMoneyBills className="inline-block mr-2 text-xl align-middle" aria-label="From as little as 15pm" />
    }
  },
  {
    id: 'loans',
    image: '/micro.jpg',
    imageSM: '/microSM.jpg',
    title1: 'Having a',
    title11: 'Bad Month?',
    title2: 'Try Shesha Loans',
    description: 'United Pay offers Shesha Loans, a fast and convenient product with access to funds almost immediately for emergency expenses.',
    button: 'Apply Now',
    url: 'https://example.com/shesha-loans',
    greenIcon: {
      info: 'Get a quick loan from E100 - E990',
      icon: <GiReceiveMoney className="inline-block mr-2 text-xl align-middle" aria-label="Get a quick loan from E100 - E990" />
    },
    redIcon: {
      info: 'Available within 24 hours',
      icon: <TbClock24 className="inline-block mr-2 text-xl align-middle" aria-label="Available within 24 hours" />
    },
    whiteIcon: {
      info: 'Payable within 30 days',
      icon: <BsCalendar2DateFill className="inline-block mr-2 text-xl align-middle" aria-label="Payable within 30 days" />
    }
  },
  {
    id: 'home',
    image: '/home.jpg',
    imageSM: '/homeSM.jpg',
    title1: 'Secure',
    title11: 'Your Home',
    title2: 'with Home Cover',
    description: 'This insurance product covers fixed buildings, immovable property, fixtures & fittings, outbuildings, walls, gates, and fences on the same premises.',
    button: 'Get Covered',
    url: 'https://example.com/home-cover',
    greenIcon: {
      info: 'Accidental damage to the house',
      icon: <FaHouseDamage className="inline-block mr-2 text-xl align-middle" aria-label="Accidental damage to the house" />
    },
    redIcon: {
      info: 'Natural Disasters Cover',
      icon: <FaHouseDamage className="inline-block mr-2 text-xl align-middle" aria-label="Natural Disasters Cover" />
    },
    whiteIcon: {
      info: 'Covers houses under SNL',
      icon: <IoThunderstorm className="inline-block mr-2 text-xl align-middle" aria-label="Covers houses under SNL" />
    }
  },
  {
    id: 'motor',
    image: '/car.jpg',
    imageSM: '/carSM.jpg',
    title1: 'Affordable',
    title11: 'Motor',
    title2: 'Insurance',
    description: 'Our motor insurance offers comprehensive coverage, third-party only, or third-party with fire and theft protection for your vehicle.',
    button: 'Get Quote',
    url: 'https://example.com/motor-insurance',
    greenIcon: {
      info: 'Comprehensive Motor Insurance',
      icon: <FaCarCrash className="inline-block mr-2 text-xl align-middle" aria-label="Comprehensive Motor Insurance" />
    },
    redIcon: {
      info: 'Third-Party Only Insurance',
      icon: <GiFlatTire className="inline-block mr-2 text-xl align-middle" aria-label="Third-Party Only Insurance" />
    },
    whiteIcon: {
      info: 'Third Party, Fire and Theft',
      icon: <FaFire className="inline-block mr-2 text-xl align-middle" aria-label="Third Party, Fire and Theft" />
    }
  },
];

const Hero = ({ currentSlide = 0, setCurrentSlide }) => {
  const [isTransitioning, setIsTransitioning] = React.useState(false);

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
      <div className="relative w-full h-[600px] md:h-[600px] lg:h-[700px] overflow-hidden">
        {/* Slides */}
        {slidesData.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Image container */}
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={`${slide.title1} ${slide.title11} ${slide.title2}`}
                fill
                className="object-cover object-right md:object-center"
                sizes="100vw"
                priority={index === 0}
                quality={100}
              />
              
              {/* Desktop/Large overlay */}
              <div className="hidden lg:block absolute top-0 pl-32 pr-16 left-0 w-7/12 h-full bg-gradient-to-r from-[#9b1c20] via-[#9b1c208f] to-transparent bg-opacity-90">
                <div className="space-y-6 flex flex-col max-w-8/12 justify-center h-full text-white font-outfit">
                <h1 className="text-7xl font-bold">
                    {slide.title1} <span style={{ color: '#ffffff' }}>{slide.title11}</span> {slide.title2}.
                  </h1>
                  <div className="h-1 bg-white w-full" />
                  <p className="text-xl pb-6 font-normal max-w-[700px]">{slide.description}</p>

                  {/* Icon information section */}
            

                  <div>
                    <button 
                      className='px-16 py-4 text-lg font-semibold bg-white rounded-full text-[#9b1c20] hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9b1c20]' 
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
            <div className="lg:hidden w-full pb-16 absolute bottom-0 bg-[#9b1c20] bg-opacity-90 px-4 py-6">
              <div className="space-y-4 flex flex-col justify-center text-white font-outfit">
                <h1 className="text-4xl xs:text-3xl sm:text-4xl font-black">
                  {slide.title1} <span style={{ color: '#ffffff' }}>{slide.title11}</span> {slide.title2}.
                </h1>
                <div className="h-0.5 bg-white w-full" />
                <p className="text-xs sm:text-sm font-normal">{slide.description}</p>

             

                <div>
                  <button 
                    className='bg-white text-[#9b1c20] py-2 px-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200' 
                    aria-label={slide.button}
                    onClick={() => window.open(slide.url, '_blank')}
                  >
                    {slide.button}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        

      
      </div>
    </div>
  )
}

export default Hero