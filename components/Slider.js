'use client'
import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import slidesData from './Slides';
import { SlInfo } from 'react-icons/sl';
import Image from 'next/image';
import React from 'react';

gsap.registerPlugin(Observer);

const Slider = () => {
    const sliderRef = useRef(null);
    const observerRef = useRef(null);
    // Ensure slides are in chronological order by using the original array order
    const [slides] = useState(slidesData);
    const [isMobile, setIsMobile] = useState(false);
    const [userActive, setUserActive] = useState(true);
    const [isLastSlide, setIsLastSlide] = useState(false);

    const currentIndexRef = useRef(0);
    const animatingRef = useRef(false);
    const inactivityTimerRef = useRef(null);
    const isInitializedRef = useRef(false);

    // Check if device is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    // Track user activity
    useEffect(() => {
        const resetInactivityTimer = () => {
            setUserActive(true);

            if (inactivityTimerRef.current) {
                clearTimeout(inactivityTimerRef.current);
            }

            inactivityTimerRef.current = setTimeout(() => {
                setUserActive(false);

                if (observerRef.current) {
                    observerRef.current.kill();
                    observerRef.current = null;
                }
            }, 300000);
        };

        const activityEvents = [
            'mousedown', 'mousemove', 'keypress', 'scroll',
            'touchstart', 'touchmove', 'click'
        ];

        activityEvents.forEach(event => {
            window.addEventListener(event, resetInactivityTimer);
        });

        resetInactivityTimer();

        return () => {
            activityEvents.forEach(event => {
                window.removeEventListener(event, resetInactivityTimer);
            });

            if (inactivityTimerRef.current) {
                clearTimeout(inactivityTimerRef.current);
            }

            if (observerRef.current) {
                observerRef.current.kill();
            }
        };
    }, []);

    const initializeObserver = useCallback(() => {
        const slider = sliderRef.current;
        const totalSlides = slides.length;

        if (totalSlides === 0 || !slider || isLastSlide) return;

        if (observerRef.current) {
            observerRef.current.kill();
        }

        observerRef.current = Observer.create({
            type: 'wheel,touch,pointer',
            wheelSpeed: -1,
            onDown: () => !animatingRef.current && gotoSection(currentIndexRef.current - 1, -1),
            onUp: () => !animatingRef.current && gotoSection(currentIndexRef.current + 1, 1),
            tolerance: 10,
            preventDefault: true,
            allowClicks: true,
            capture: false,
        });
    }, [slides.length, isLastSlide]);

    // Reinitialize observer when user becomes active again
    useEffect(() => {
        if (userActive && !observerRef.current && sliderRef.current && !isLastSlide) {
            initializeObserver();
        }
    }, [userActive, isLastSlide, initializeObserver]);

    // Preload all slide images
    useEffect(() => {
        const preloadImages = () => {
            slides.forEach((slide) => {
                if (typeof window !== 'undefined') {
                    // Preload main image
                    const img = new window.Image();
                    img.src = slide.slideImg;
                    
                    // Preload mobile image if available
                    if (slide.slideImgSM) {
                        const imgSM = new window.Image();
                        imgSM.src = slide.slideImgSM;
                    }
                }
            });
        };
        
        preloadImages();
    }, [slides]);

    const gotoSection = useCallback((index, direction) => {
        const totalSlides = slides.length;
        if (totalSlides === 0) return;

        const sections = gsap.utils.toArray('.slide', sliderRef.current);
        const outerWrappers = gsap.utils.toArray('.outer', sliderRef.current);
        const innerWrappers = gsap.utils.toArray('.inner', sliderRef.current);
        const images = gsap.utils.toArray('.bg img', sliderRef.current);
        const wrap = gsap.utils.wrap(0, totalSlides);

        if (animatingRef.current) return;

        index = wrap(index);

        if (currentIndexRef.current === totalSlides - 1 && direction === 1 && index === 0) {
            setIsLastSlide(true);

            if (observerRef.current) {
                observerRef.current.kill();
                observerRef.current = null;
            }

            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';

            setTimeout(() => {
                window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
            }, 500);

            return;
        }

        animatingRef.current = true;

        const tl = gsap.timeline({
            defaults: { ease: 'power2.inOut' },
            onComplete: () => {
                animatingRef.current = false;
                sections.forEach((section, i) => {
                    gsap.set(section, {
                        autoAlpha: i === index ? 1 : 0,
                        zIndex: i === index ? 1 : 0,
                        y: 0,
                        rotation: 0,
                        scale: 1,
                    });
                });

                currentIndexRef.current = index;
            },
        });

        if (currentIndexRef.current >= 0) {
            tl.to(sections[currentIndexRef.current], {
                y: direction === 1 ? '-100vh' : '100vh',
                scale: 0.25,
                opacity: 0,
                rotation: direction === 1 ? 30 : -30,
                duration: 2,
                force3D: true,
            }, 0)
                .to([outerWrappers[currentIndexRef.current], innerWrappers[currentIndexRef.current]], {
                    yPercent: direction === 1 ? -100 : 100,
                    duration: 2,
                }, 0)
                .to(images[currentIndexRef.current], {
                    yPercent: direction === 1 ? -15 : 15,
                    duration: 2,
                }, 0);
        }

        gsap.set(sections[index], {
            y: direction === 1 ? '100vh' : '-100vh',
            autoAlpha: 1,
            zIndex: 1,
            rotation: 0,
            scale: 1,
        });
        tl.to(sections[index], {
            y: 0,
            duration: 1.25,
        }, 0)
            .fromTo(
                [outerWrappers[index], innerWrappers[index]],
                {
                    yPercent: direction === 1 ? 100 : -100,
                },
                {
                    yPercent: 0,
                    duration: 1.25,
                },
                0
            )
            .fromTo(
                images[index],
                {
                    yPercent: direction === 1 ? 15 : -15,
                },
                {
                    yPercent: 0,
                    duration: 1.25,
                },
                0
            );

        currentIndexRef.current = index;
    }, [slides.length]);

    // Enable normal scrolling when component mounts
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
            
            // Clear all timers
            if (inactivityTimerRef.current) {
                clearTimeout(inactivityTimerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isInitializedRef.current) return;
        
        const slider = sliderRef.current;
        const totalSlides = slides.length;

        if (totalSlides === 0) return;

        const sections = gsap.utils.toArray('.slide', slider);
        const outerWrappers = gsap.utils.toArray('.outer', slider);
        const innerWrappers = gsap.utils.toArray('.inner', slider);
        const images = gsap.utils.toArray('.bg img', slider);

        gsap.set(sections, { autoAlpha: 0, position: 'absolute', top: 0, left: 0, y: 0, rotation: 0, scale: 1 });

        if (totalSlides > 0) {
            gsap.set(sections[0], { y: 0, autoAlpha: 1, zIndex: 1, rotation: 0, scale: 1 });
            gsap.set([outerWrappers[0], innerWrappers[0]], { yPercent: 0 });
            gsap.set(images[0], { yPercent: 0 });
            currentIndexRef.current = 0;
        }

        // Initialize observer only after animations are set up
        if (!isLastSlide) {
            initializeObserver();
        }

        isInitializedRef.current = true;

        return () => {
            gsap.killTweensOf('*');
            if (observerRef.current) {
                observerRef.current.kill();
            }
        };
    }, [slides, isMobile, isLastSlide, initializeObserver]);

    const SlideComponent = React.memo(({ slideData, slideIndex, isMobile }) => {
        if (!slideData) return null;

        const imageSrc = isMobile && slideData.slideImgSM ? slideData.slideImgSM : slideData.slideImg;
        const mobileImageSrc = slideData.slideImgSM || slideData.slideImg;

        return (
            <section className="slide absolute top-0 left-0 w-screen h-screen bg-white text-white overflow-hidden" aria-label={`Slide ${slideIndex + 1}: ${slideData.slideTitle1} ${slideData.slideTitle11}`}>
                <div className="outer h-full w-full flex items-center justify-center">
                    <div className="inner w-full h-full max-w-[99vw] max-h-[98vh] mx-auto flex items-center justify-center">
                        <div className="bg flex flex-col h-full w-full">
                            <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
                                <Image
                                    src={imageSrc || '/placeholder-image.jpg'}
                                    alt={slideData.slideTitle || `Slide ${slideIndex}`}
                                    width={1200}
                                    height={800}
                                    quality={90}
                                    priority={slideIndex === 0}
                                    className={`object-contain w-full ${isMobile ? 'h-[70vh]' : 'h-auto'} object-center hidden lg:inline`}
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMkck8YsYilbU5xuTQqoCgkmgT//Z"
                                />
                                {isMobile && (
                                    <Image
                                        src={mobileImageSrc}
                                        alt={slideData.slideTitle || `Slide ${slideIndex}`}
                                        width={800}
                                        height={600}
                                        quality={85}
                                        className="object-contain w-full object-center lg:hidden"
                                        placeholder="blur"
                                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMkck8YsYilbU5xuTQqQCgkmgT//Z"
                                    />
                                )}
                            </div>

                            {/* Floating Info Icons */}
                            <div className="absolute top-0 font-outfit w-full h-full z-20 pointer-events-none">
                                {/* Icon 1 - Top Left */}
                                <div className="absolute top-[23%] left-[10%] group pointer-events-auto flex items-center">
                                    <div className='border relative rounded-full hover:w-64 border-[#F9AF55] p-1 flex animate-pulse-custom'>
                                        <div className="bg-[#F9AF55] text-white rounded-full p-3 lg:w-16 h-12 w-12 lg:h-16 flex items-center justify-center cursor-pointer flex-shrink-0 z-10" aria-label="More information">
                                            <span className="text-xl"><SlInfo /></span>
                                        </div>
                                        <div className="text-[#F9AF55] bg-white rounded-full absolute ml-1 pl-18 pr-2 lg:h-16 h-12 cursor-pointer transition-all duration-300 ease-in-out group-hover:w-60 w-0 overflow-hidden opacity-0 group-hover:opacity-100">
                                            <div className='-space-y-2 text-lg flex flex-col justify-center lg:pt-2'>
                                                <p className="font-bold leading-5 pt-1">{slideData.greenIcon}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute top-[12%] right-[15%] lg:top-[25%] lg:right-[20%] group pointer-events-auto flex items-center">
                                    <div className='border relative rounded-full hover:w-68 justify-end border-[#D72423] p-1 flex animate-pulse-custom'>
                                        <div className="bg-[#D72423] text-white rounded-full p-3 lg:w-16 h-12 w-12 lg:h-16 flex items-center justify-center cursor-pointer flex-shrink-0 z-10" aria-label="More information">
                                            <span className="text-lg"><SlInfo /></span>
                                        </div>
                                        <div className="text-[#D72423] bg-white rounded-full absolute ml-1 pr-14 lg:pr-18 pl-4 lg:h-16 h-12 cursor-pointer transition-all duration-300 ease-in-out -translate-x-2 w-0 group-hover:w-64 overflow-hidden opacity-0 group-hover:opacity-100">
                                            <div className='-space-y-2 text-lg flex flex-col justify-center lg:pt-2'>
                                                <p className="font-bold leading-5 pt-1">{slideData.redIcon}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute lg:top-[65%] top-[45%] lg:left-[25%] left-[25%] group pointer-events-auto flex items-center">
                                    <div className='border relative rounded-full hover:w-64 border-[#ffffff] p-1 flex animate-pulse-custom'>
                                        <div className="bg-[#ffffff] text-[#646565] rounded-full p-3 lg:w-16 h-12 w-12 lg:h-16 flex items-center justify-center cursor-pointer flex-shrink-0 z-10" aria-label="More information">
                                            <span className="text-3xl"><SlInfo /></span>
                                        </div>
                                        <div className="text-[#646565] bg-white rounded-full absolute ml-1 pl-18 pr-2 lg:h-16 h-12 cursor-pointer transition-all duration-300 ease-in-out w-0 group-hover:w-60 overflow-hidden opacity-0 group-hover:opacity-100">
                                            <div className='-space-y-2 flex text-lg flex-col justify-center lg:pt-2 '>
                                                <p className="font-bold leading-5 pt-1">{slideData.whiteIcon}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='absolute lg:top-[84%] top-[88%] left-[11%]  lg:left-[20%] lg:max-w-4xl max-w-80 lg:text-xl text-sm'>
                                    <p className='text-center'>{slideData.slideDescription}</p>
                                </div>
                            </div>

                            {/* Branding elements */}
                            <div className="absolute bottom-[35vh] lg:bottom-[29vh] right-[8vw] lg:right-[10vw] p-8 flex flex-col justify-center -rotate-1 text-white z-10 hover:-translate-y-2 cursor-pointer transition-all duration-300 ease-in-out">
                                <div className="bg-white px-8 py-0 rounded-full shadow-md max-h-24 flex items-center justify-center">
                                    <h2 className={`text-4xl lg:text-7xl mb-0 text-[#8B8B8B]  font-bold uppercase font-outfit`}>
                                        {slideData.slideTitle1} <span className='text-[#D72423]'>{slideData.slideTitle11}</span>
                                    </h2>
                                </div>
                            </div>
                            <div className="absolute bottom-[30vh] lg:bottom-[21vh] right-[10vw] p-8 flex flex-col justify-center rotate-1 text-white hover:translate-y-2 cursor-pointer transition-all duration-300 ease-in-out">
                                <div className="bg-white px-8 py-0 rounded-full shadow-md max-h-24 flex items-center justify-center">
                                    <h2 className={`text-4xl lg:text-7xl mb-0 text-[#F9AF55]  font-bold uppercase font-outfit`}>
                                        {slideData.slideTitle2}
                                    </h2>
                                </div>
                            </div>
                            <div className="absolute bottom-[20vh] right-[12vw] lg:bottom-[10vh] lg:right-[10vw] px-8  flex flex-col justify-center items-center space-y-2  font-outfit text-lg text-white">
                                <button className='bg-[#D72423] px-16 py-0 rounded-full h-12 shadow-md max-h-24 flex items-center justify-center' aria-label="Sign up today">
                                    <p>Sign Up Today</p>
                                </button>
                                <p className='text-sm'>Quick & Easy - No Delays</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    });

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            <div className="slider relative h-screen w-screen" ref={sliderRef}>
                {slides.map((slide, index) => (
                    <SlideComponent
                        key={index}
                        slideData={slide}
                        slideIndex={index}
                        isMobile={isMobile}
                    />
                ))}
            </div>
            
            {/* CSS for pulse animation and initial slide hiding */}
            <style jsx global>{`
                @keyframes pulse-custom {
                    0%, 100% {
                        box-shadow: 0 0 0 0 rgba(215, 36, 35, 0.3);
                        border-width: 1px;
                    }
                    5% {
                        box-shadow: 0 0 0 4px rgba(215, 36, 35, 0.3);
                        border-width: 2px;
                    }
                    10% {
                        box-shadow: 0 0 0 8px rgba(215, 36, 35, 0);
                        border-width: 1px;
                    }
                }
                
                .animate-pulse-custom {
                    animation: pulse-custom 15s infinite;
                }
            `}</style>
        </div>
    );
};

export default Slider;