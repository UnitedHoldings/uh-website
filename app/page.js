'use client'
import Agent from '@/components/Agent';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import slidesData from '@/components/Slides';
import WhyChooseUs from '@/components/WhyChooseUs';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);
  const tabCount = 4; // Life, Home, Car, Loan

  // Start the interval when component mounts
  useEffect(() => {
    startInterval();
    
    // Clean up interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      setActiveTab(prev => (prev + 1) % tabCount);
      setCurrentSlide(prev => (prev + 1) % slidesData.length);
    }, 10000);
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
    setCurrentSlide(index % slidesData.length); // Ensure we don't go out of bounds
    startInterval(); // Reset the interval when a tab is clicked
  };

  return (
    <div className='flex flex-col pb-16 lg:space-y-16'>
      <div className='relative mb-4 lg:mb-8 flex flex-col items-center'>
        <Hero currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
        <div className='w-full'>
          <div className='absolute z-50 bottom-2 w-full flex'>
            <ul className="bg-gray-100 p-2 flex gap-2 space-x-1 h-14 mx-auto drop-shadow-lg border-[#F9AF55] border-2 rounded-full relative">
              {/* Animated highlight bar */}
              <div
                className="absolute bg-[#F9AF55] h-9 rounded-full transition-all duration-500 ease-in-out"
                style={{
                  width: `calc(25% - 4px)`,
                  transform: `translateX(${activeTab * 100}%)`
                }}
              />

              {/* Tabs */}
              {['Life', 'Home', 'Car', 'Loan'].map((tab, index) => (
                <li
                  key={index}
                  className={`cursor-pointer relative z-10 lg:min-w-20 flex items-center justify-center py-1 font-bold lg:text-lg px-4 rounded-full transition-all duration-300 ease-in-out ${
                    index === activeTab
                      ? 'text-white'
                      : 'text-gray-800 hover:bg-[#f9af5525] '
                  }`}
                  onClick={() => handleTabClick(index)}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Products />
      <Agent />
      <WhyChooseUs />

    </div>
  );
}