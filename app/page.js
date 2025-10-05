'use client'
import Agent from '@/components/Agent';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import StartQuote from '@/components/Startqoute';
import WhyChooseUs from '@/components/WhyChooseUs';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);
  const tabCount = 4; // Life, Home, Car, Loan
  
  // Tab to slide mapping: Life->0, Home->2, Car->3, Loan->1
  const slideMap = [0, 2, 3, 1];
  // Slide to tab mapping: 0->0(Life), 1->3(Loan), 2->1(Home), 3->2(Car)
  const tabMap = [0, 3, 1, 2];

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
      setActiveTab((prev) => {
        const nextTab = (prev + 1) % tabCount;
        const nextSlide = slideMap[nextTab];
        setCurrentSlide(nextSlide);
        return nextTab;
      });
    }, 6000);
  };

  // Sync active tab when currentSlide changes (from carousel interaction)
  useEffect(() => {
    const correspondingTab = tabMap[currentSlide];
    if (correspondingTab !== undefined && correspondingTab !== activeTab) {
      setActiveTab(correspondingTab);
    }
  }, [currentSlide]);

  const handleTabClick = (index) => {
    const newSlide = slideMap[index];
    setActiveTab(index);
    setCurrentSlide(newSlide);
    resetInterval(); // Reset the interval when a tab is clicked
  };

  // Handle manual carousel navigation
  const handleCarouselChange = (index) => {
    setCurrentSlide(index);
    resetInterval(); // Reset interval on manual carousel navigation
  };

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    startInterval();
  };

  return (
    <div className='flex flex-col bg-[#9b1c20] pb-16 lg:space-y-16'>
      <div className='relative lg:px-2 mb-4 lg:mb-8 flex flex-col items-center'>
        <Hero 
          currentSlide={currentSlide} 
          setCurrentSlide={handleCarouselChange} 
        />
        
        {/* Tab Navigation */}
        <div className='w-full'>
          <div className='absolute z-40 lg:bottom-2 bottom-[-5%] w-full flex'>
            <ul className="bg-gray-100 p-2 flex gap-2 space-x-1 h-14 mx-auto drop-shadow-lg border-[#9b1c20] border-2 rounded-full relative">
              {/* Animated highlight bar */}
              <div
                className="absolute bg-[#9b1c20] h-9 rounded-full transition-all duration-500 ease-in-out"
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
                      : 'text-[#9b1c20] hover:bg-[#f9af5525]'
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
      
      <StartQuote />
      <Agent />
      <Products />
      <WhyChooseUs />
    </div>
  );
}