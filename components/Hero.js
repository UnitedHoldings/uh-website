'use client'
import React from 'react'
import VideoPlayer from './VideoPlayer';
import CallBackForm from './CallBackForm';
import { trackEvent } from '@/lib/posthog';

const DEPARTMENT_COLORS = {
  'Life Assurance': '#3d834d',
  'General Insurance': '#286278',
  'United Pay': '#f79620',
};

const SLIDE_DEPARTMENTS = {
  'life': 'Life Assurance',
  'general': 'General Insurance',
  'pay': 'United Pay'
};

// Skeleton Loader Components
const HeroSkeleton = () => {
  return (
    <div className="w-screen flex flex-col max-w-none h-auto lg:h-[80vh] relative overflow-hidden">
      <div className="relative w-full h-[80vh] lg:h-[90vh] overflow-hidden bg-gray-200">
        {/* Video Skeleton */}
        <div className="relative w-full h-1/2 lg:h-full bg-gray-300 animate-pulse flex items-center justify-center">
          <div className="text-gray-500">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>

        {/* Desktop Skeleton Content */}
        <div className="hidden lg:block absolute inset-0 z-30">
          <div className="max-w-[1200px] xxl:max-w-[1400px] mx-auto flex items-center h-full w-full px-8">
            <div className='h-full space-y-6 max-w-3xl flex flex-col items-start justify-center'>
              {/* Title Skeleton */}
              <div className="space-y-4">
                <div className="h-16 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                <div className="h-16 bg-gray-400 rounded w-2/3 animate-pulse"></div>
              </div>
              
              {/* Divider Skeleton */}
              <div className="h-1 w-24 bg-gray-300 rounded animate-pulse"></div>
              
              {/* Description Skeleton */}
              <div className="space-y-2 w-full max-w-[500px]">
                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-4/6 animate-pulse"></div>
              </div>

              {/* Buttons Skeleton */}
              <div className='flex items-center gap-4 pt-4'>
                <div className="w-40 h-12 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="w-48 h-12 bg-gray-300 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Skeleton Content */}
        <div className="lg:hidden absolute bottom-0 w-full h-1/2 bg-gray-400 animate-pulse">
          <div className="p-4 space-y-4">
            {/* Title Skeleton */}
            <div className="space-y-3">
              <div className="h-8 bg-gray-300 rounded w-4/5 animate-pulse"></div>
              <div className="h-8 bg-gray-300 rounded w-3/5 animate-pulse"></div>
            </div>
            
            {/* Divider Skeleton */}
            <div className="h-0.5 bg-gray-300 rounded w-full animate-pulse"></div>
            
            {/* Description Skeleton */}
            <div className="space-y-2">
              <div className="h-3 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-3 bg-gray-300 rounded w-5/6 animate-pulse"></div>
              <div className="h-3 bg-gray-300 rounded w-4/6 animate-pulse"></div>
            </div>

            {/* Buttons Skeleton */}
            <div className="flex gap-4 pt-4">
              <div className="w-24 h-8 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="w-20 h-8 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Navigation Dots Skeleton */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="w-3 h-3 bg-gray-400 rounded-full animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Hero = ({ currentSlide = 0, setCurrentSlide }) => {
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [showCallBackForm, setShowCallBackForm] = React.useState(false);
  const [slidesData, setSlidesData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Fetch slides data from API
  React.useEffect(() => {
    const fetchSlidesData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/home');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.success && data.data && data.data.slides) {
          setSlidesData(data.data.slides);
        } else {
          throw new Error('Invalid data format from API');
        }
      } catch (err) {
        console.error('Failed to fetch slides from API:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSlidesData();
  }, []);

  const toggleCallBackForm = () => {
    setShowCallBackForm(prev => !prev);
  };

  // Get current slide data safely
  const currentSlideData = slidesData[currentSlide];
  const currentDepartment = currentSlideData ? SLIDE_DEPARTMENTS[currentSlideData.id] : 'Life Assurance';
  const currentColor = DEPARTMENT_COLORS[currentDepartment];

  const goToSlide = (index) => {
    if (index === currentSlide || isTransitioning || !slidesData.length) return;

    setIsTransitioning(true);
    setCurrentSlide(index);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const nextSlide = () => {
    if (!slidesData.length) return;
    const next = (currentSlide + 1) % slidesData.length;
    goToSlide(next);
  };

  const prevSlide = () => {
    if (!slidesData.length) return;
    const prev = currentSlide === 0 ? slidesData.length - 1 : currentSlide - 1;
    goToSlide(prev);
  };

  // Loading state
  if (loading) {
    return <HeroSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <div className="w-screen flex flex-col max-w-none h-auto lg:h-[80vh] relative overflow-hidden">
        <div className="relative w-full h-[80vh] lg:h-[90vh] overflow-hidden bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">Error loading slides: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No slides data
  if (!slidesData.length) {
    return (
      <div className="w-screen flex flex-col max-w-none h-auto lg:h-[80vh] relative overflow-hidden">
        <div className="relative w-full h-[80vh] lg:h-[90vh] overflow-hidden bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">No slides available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen flex flex-col max-w-none h-auto lg:h-[80vh] relative overflow-hidden">
      {/* Call Back Form Modal */}
      {showCallBackForm && (
        <div className=" flex items-center justify-center z-30 p-4">
          <div className="bg-white rounded-lg max-w-md w-full mx-4">
            <CallBackForm onClose={toggleCallBackForm} />
          </div>
        </div>
      )}

      {/* Carousel Container */}
      <div className="relative w-full h-[80vh] lg:h-[90vh] overflow-hidden">
        {/* Slides */}
        {slidesData.map((slide, index) => {
          const department = SLIDE_DEPARTMENTS[slide.id];
          const color = DEPARTMENT_COLORS[department];

          return (
            <div
              key={slide._id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Video container */}
              <div className="relative w-full h-1/2 lg:h-full">
                <VideoPlayer src={slide.shortVideo} />
                <div className="absolute z-10 inset-0 bg-black/20 bg-gradient-to-r from-black/20 bg-opacity-5 hidden lg:block" />
              </div>

              {/* Desktop/Large overlay */}
              <div className="hidden lg:block z-30 absolute top-[20%] w-full mx-auto right-[5%] h-full">
                <div className="max-w-[1200px] xxl:max-w-[1400px] mx-auto flex items-center h-full w-full px-8">
                  <div className='h-full space-y-6 max-w-3xl flex flex-col items-start'>
                    <h1 className="text-7xl font-bold font-outfit text--2xs">
                      <span style={{ color: 'white' }}>{slide.title1}</span>{' '}
                      <span style={{ color: 'white' }}>{slide.title11}</span>{' '} <br />
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
                        onClick={() => {
                          trackEvent('hero_cta_clicked', {
                            cta_text: slide.button,
                            destination_url: slide.url,
                            slide_department: currentDepartment,
                            location: 'desktop_hero'
                          });
                          window.open(slide.url, '_blank');
                        }}
                      >
                        {slide.button}
                      </button>

                      <button
                        onClick={() => {
                          trackEvent('request_callback_clicked', {
                            location: 'desktop_hero',
                            slide_department: currentDepartment,
                            button_number: 1
                          });
                          toggleCallBackForm();
                        }}
                        className='px-8 py-4 text-lg font-semibold rounded-full border-2 hover:bg-white/25 hover:bg-opacity-10 transition-colors duration-200 focus:outline-none font-outfit text-white'
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
                      onClick={() => {
                        trackEvent('hero_cta_clicked', {
                          cta_text: slide.button,
                          destination_url: slide.url,
                          slide_department: currentDepartment,
                          location: 'mobile_hero'
                        });
                        window.open(slide.url, '_blank');
                      }}
                    >
                      {slide.button}
                    </button>

                    <button
                      onClick={() => {
                        trackEvent('request_callback_clicked', {
                          location: 'mobile_hero',
                          slide_department: currentDepartment,
                          button_number: 1
                        });
                        toggleCallBackForm();
                      }}
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
      </div>
    </div>
  )
}

export default Hero