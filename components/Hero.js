'use client'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import slidesData from './Slides'; // Adjust the import path as needed

function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slidesData.length);
        }, 10000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative lg:w-full lg:max-w-[1800px] w-[95vw] h-[90vh] mb-8 mx-auto overflow-hidden rounded-xl ">
            {/* Image Container */}
            <div className="relative w-full  h-[90vh] rounded-xl">
                {/* Slides */}
                {slidesData.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 p-2 rounded-xl  lg:p-4 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <Image
                            src={slide.slideImg || '/home.jpg'}
                            fill
                            alt={slide.slideTitle1 + ' ' + slide.slideTitle11}
                            className="object-cover hidden lg:inline rounded-xl"
                            priority={index === 0}
                        />
                        <Image
                            src={slide.slideImgSM || '/home.jpg'}
                            fill
                            alt={slide.slideTitle1 + ' ' + slide.slideTitle11}
                            className="object-cover lg:hidden rounded-xl"
                            priority={index === 0}
                        />
                        {/* Gradient overlay for better text visibility */}
                    </div>
                ))}

                {/* Content Container */}
                <div className="relative z-20 max-w-[1400px] mx-auto  flex flex-col justify-end px-4 md:px-8 lg:px-12 pb-4 md:pb-8 lg:pb-12">
                    {/* Slides Content */}
                    {slidesData.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute h-[90vh]  inset-0 flex flex-col items-center lg:items-end justify-end transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            {/* Text Content */}
                            <div className="flex flex-col items-end mb-2 md:mb-4 lg:mb-6">
                                {/* First Title Block */}
                                <div className='-space-y-2 flex justify-end items-end flex-col'>
                                    <div className="  bg-white px-4 sm:px-6 md:px-8 py-1 md:py-2 rounded-full shadow-md   transform -rotate-1 hover:-translate-y-1 md:hover:-translate-y-2 cursor-pointer  transition-all duration-300 ease-in-out   max-w-full md:max-w-max
                ">
                                        <h2 className="
                    text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
                    text-[#8B8B8B] font-bold uppercase font-outfit
                    whitespace-nowrap
                  ">
                                            {slide.slideTitle1} <span className="text-[#D72423]">{slide.slideTitle11}</span>
                                        </h2>
                                    </div>

                                    {/* Second Title Block */}
                                    <div className="
                  bg-white px-4 py-1 md:py-2 rounded-full shadow-md 
                  transform rotate-1 hover:translate-y-1 md:hover:translate-y-2 cursor-pointer
                  transition-all duration-300 ease-in-out
                  max-w-full md:max-w-max mx-auto
                ">
                                        <h2 className="
                    text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
                    text-[#F9AF55] font-bold uppercase font-outfit mx-auto
                    whitespace-nowrap
                  ">
                                            {slide.slideTitle2}
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div className="flex flex-col lg:items-end items-center mt-8 mb-8 md:mb-6 lg:mb-20 xl:mb-20  2xl:mb-20  space-y-1 md:space-y-2">
                                <button className='
                  bg-[#D72423] px-6 md:px-8 py-2 md:py-3 rounded-full shadow-md 
                  flex items-center justify-center hover:bg-[#b01c1b] 
                  transition-colors text-white font-outfit font-bold
                  text-base md:text-lg min-w-xs max-w-xs w-auto
                ' aria-label="Sign up today">
                                    Sign Up Today
                                </button>
                                <p className='text-sm md:text-base text-white drop-shadow-md pr-0 md:pr-4 text-center md:text-right w-full md:w-auto'>
                                    Quick & Easy - No Delays
                                </p>
                            </div>

                            {/* Description Text */}
                            <div className='lg:max-w-4xl lg:-translate-x-[25vw] lg:translate-y-[-15vh] xl:translate-y-[-10vh] 2xl:translate-y-[-10vh] max-w-[360px] w-full  text-white drop-shadow-md text-sm mb-16 md:text-base lg:text-xl text-center lg:text-left md:mb-0'>
                                <p>{slide.slideDescription}</p>
                            </div>
                        </div>
                    ))}

                    {/* Navigation Dots */}

                </div>
            </div>
        </div>
    );
}

export default Hero;