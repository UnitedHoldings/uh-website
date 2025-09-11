'use client'
import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import slidesData from './Slides';
import Image from 'next/image';
import React from 'react';

gsap.registerPlugin(Observer);

const Slider = () => {
    const sliderRef = useRef(null);
    const observerRef = useRef(null);
    const circleTimelinesRef = useRef([]);
    const [slides] = useState(slidesData);
    const [isMobile, setIsMobile] = useState(false);
    const [userActive, setUserActive] = useState(true);
    const [isLastSlide, setIsLastSlide] = useState(false);

    const currentIndexRef = useRef(0);
    const animatingRef = useRef(false);
    const inactivityTimerRef = useRef(null);
    const isInitializedRef = useRef(false);
    const scrollPositionRef = useRef(0);

    // Check if device is mobile
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth <= 1024; // Changed to 1024 to match lg breakpoint
            setIsMobile(mobile);

            // Kill animations if mobile, create if desktop
            if (mobile) {
                circleTimelinesRef.current.forEach(tl => tl.kill());
                circleTimelinesRef.current = [];
            } else if (circleTimelinesRef.current.length === 0) {
                setupCircleAnimations();
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    // Setup GSAP animations for info circles (desktop only)
    const setupCircleAnimations = useCallback(() => {
        circleTimelinesRef.current.forEach(tl => tl.kill());
        circleTimelinesRef.current = [];

        const createCircleAnimation = (circleClass, delay, showDuration, hideDelay, hideDuration) => {
            const tl = gsap.timeline({ repeat: -1 });

            gsap.set(`.${circleClass} .info-text`, {
                width: 0,
                opacity: 0,
                overflow: 'hidden'
            });

            tl.to(`.${circleClass} .info-text`, {
                width: 260,
                opacity: 1,
                duration: showDuration,
                delay: delay,
                ease: 'power2.out'
            })
                .to(`.${circleClass} .info-text`, {
                    width: 0,
                    opacity: 0,
                    duration: hideDuration,
                    delay: hideDelay,
                    ease: 'power2.in'
                });

            return tl;
        };

        circleTimelinesRef.current = [
            createCircleAnimation('circle-1', 2, 0.5, 7, 0.5),
            createCircleAnimation('circle-2', 4, 0.5, 6, 0.5),
            createCircleAnimation('circle-3', 6, 0.5, 5, 0.5)
        ];
    }, []);

    // Re-setup animations when screen size changes
    useEffect(() => {
        if (!isMobile) {
            setupCircleAnimations();
        }

        return () => {
            if (isMobile) {
                circleTimelinesRef.current.forEach(tl => tl.kill());
                circleTimelinesRef.current = [];
            }
        };
    }, [isMobile, setupCircleAnimations]);

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

    // Add scroll event listener to detect when user scrolls back to top
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY === 0 && isLastSlide) {
                setIsLastSlide(false);
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';

                setTimeout(() => {
                    initializeObserver();
                }, 100);
            }

            scrollPositionRef.current = window.scrollY;
        };

        if (isLastSlide) {
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isLastSlide, initializeObserver]);

    // Preload all slide images
    useEffect(() => {
        const preloadImages = () => {
            slides.forEach((slide) => {
                if (typeof window !== 'undefined') {
                    const img = new window.Image();
                    img.src = slide.slideImg;

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

            if (inactivityTimerRef.current) {
                clearTimeout(inactivityTimerRef.current);
            }

            circleTimelinesRef.current.forEach(tl => tl.kill());
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

        return (
            <section className="slide absolute top-0 left-0 w-screen h-screen bg-white text-white overflow-hidden" aria-label={`Slide ${slideIndex + 1}: ${slideData.slideTitle1} ${slideData.slideTitle11}`}>
                <div className="outer h-full w-full flex items-center justify-center">
                    <div className="inner w-full h-full max-w-[99vw] max-h-[98vh] mx-auto flex items-center justify-center">
                        <div className="bg flex flex-col h-full w-full">
                            <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-2xl relative">
                                {/* Gradient overlay for better text visibility */}
                                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/70 to-transparent z-10"></div>

                                {/* Desktop Image - Hidden on mobile */}
                                <div className="w-full h-full  hidden lg:block">
                                    <Image
                                        src={slideData.slideImg || '/placeholder-image.jpg'}
                                        alt={slideData.slideTitle || `Slide ${slideIndex}`}
                                        fill
                                        quality={90}
                                        priority={slideIndex === 0}
                                        className="object-cover rounded-2xl w-[98vw]"
                                        placeholder="blur"
                                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgDRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMkck8YsYilbU5xuTQqoCgkmgT//Z"
                                    />
                                </div>

                                {/* Mobile Image - Hidden on desktop */}
                                <div className="w-full h-full lg:hidden relative">
                                    <Image
                                        src={
                                            slideData.slideImgSM ||
                                            slideData.slideImg ||
                                            '/placeholder-image.jpg'
                                        }
                                        alt={slideData.slideTitle || `Slide ${slideIndex}`}
                                        fill
                                        quality={85}
                                        priority={slideIndex === 0}
                                        className="object-cover"
                                        placeholder="blur"
                                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgDRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMkck8YsYilbU5xuTQqQCgkmgT//Z"
                                    />
                                </div>
                            </div>

                            {/* Floating Info Icons */}
                            <div className="absolute hidden lg:block top-0 font-outfit w-full h-full z-20 pointer-events-none">
                                {/* Icon 1 - Top Left */}
                                <div className="circle-1 absolute top-[23%] left-[10%] group pointer-events-auto flex items-center">
                                    <div className='relative rounded-full lg:hover:w-[260px] border-[#F9AF55] p-1 flex transition-all duration-300'>
                                        <div className="bg-[#F9AF55] text-white rounded-full lg:w-16 h-12 w-12 lg:h-16 flex items-center justify-center cursor-pointer flex-shrink-0 z-10" aria-label="More information">
                                            <span className="text-3xl flex items-center justify-center">{slideData.greenIcon.icon}</span>
                                        </div>
                                        <div className="info-text lg:-translate-x-16 -translate-x-12 text-[#F9AF55] bg-white rounded-full ml-1 pl-18 pr-2 lg:h-16 h-12 cursor-pointer flex items-center overflow-hidden">
                                            <div className='-space-y-2 text-lg flex flex-col justify-center lg:pt-2 min-w-[240px]'>
                                                <p className="font-bold leading-5">
                                                    {(() => {
                                                        const words = slideData.greenIcon.info.split(' ');
                                                        if (words.length > 2) {
                                                            return (
                                                                <>
                                                                    {words.slice(0, 2).join(' ')}
                                                                    <br />
                                                                    {words.slice(2).join(' ')}
                                                                </>
                                                            );
                                                        }
                                                        return slideData.greenIcon.info;
                                                    })()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="circle-2 absolute top-[12%] right-[15%] lg:top-[25%] lg:right-[20%] group pointer-events-auto flex items-center">
                                    <div className="relative rounded-full lg:hover:w-[260px] border-[#D72423] p-1 flex transition-all duration-300">
                                        {/* TEXT FIRST */}
                                        <div className="info-text text-[#D72423] bg-white lg:translate-x-16 translate-x-12 rounded-full mr-1 pl-6 pr-14 lg:pr-18 lg:h-16 h-12 cursor-pointer flex items-center justify-start overflow-hidden">
                                            <div className="-space-y-2 text-lg flex flex-col justify-center lg:pt-2 min-w-[240px]">
                                                <p className="font-bold leading-5">
                                                    {(() => {
                                                        const words = slideData.redIcon.info.split(' ');
                                                        if (words.length > 2) {
                                                            return (
                                                                <>
                                                                    {words.slice(0, 2).join(' ')}
                                                                    <br />
                                                                    {words.slice(2).join(' ')}
                                                                </>
                                                            );
                                                        }
                                                        return slideData.redIcon.info;
                                                    })()}
                                                </p>
                                            </div>
                                        </div>

                                        {/* ICON SECOND (RIGHT SIDE) */}
                                        <div className="bg-[#D72423] text-white rounded-full p-3 lg:w-16 h-12 w-12 lg:h-16 flex items-center justify-center cursor-pointer flex-shrink-0 z-10" aria-label="More information">
                                            <span className="text-3xl flex items-center justify-center">{slideData.redIcon.icon}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="circle-3 absolute lg:top-[65%] top-[45%] lg:left-[25%] left-[25%] group pointer-events-auto flex items-center">
                                    <div className='relative rounded-full lg:hover:w-[260px] border-[#ffffff] p-1 flex transition-all duration-300'>
                                        <div className="bg-[#ffffff] text-[#646565] rounded-full p-3 lg:w-16 h-12 w-12 lg:h-16 flex items-center justify-center cursor-pointer flex-shrink-0 z-10" aria-label="More information">
                                            <span className="text-3xl flex items-center justify-center">{slideData.whiteIcon.icon}</span>
                                        </div>
                                        <div className="info-text text-[#646565] bg-white -translate-x-12 lg:-translate-x-18 rounded-full ml-1 pl-18 pr-2 lg:h-16 h-12 cursor-pointer flex items-center overflow-hidden">
                                            <div className='-space-y-2 flex text-lg flex-col justify-center leading-4'>
                                                {(() => {
                                                    const words = slideData.whiteIcon.info.split(' ');
                                                    if (words.length > 2) {
                                                        return (
                                                            <>
                                                                {words.slice(0, 2).join(' ')}
                                                                <br />
                                                                {words.slice(2).join(' ')}
                                                            </>
                                                        );
                                                    }
                                                    return slideData.whiteIcon.info;
                                                })()}
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            {/* Floating Info Icons - Mobile (hover/touch only) */}
                            <div className="lg:hidden absolute top-0 font-outfit w-full h-full z-20 pointer-events-none">
                                {/* Icon 1 - Top Left */}
                                <div className=" absolute top-[23%] left-[10%] group pointer-events-auto flex items-center">
                                    <div className='border relative rounded-full border-[#F9AF55] p-1 flex group-hover:w-[280px] group-active:w-[260px] transition-all duration-300 h-[58px] w-[58px] animate-pulse-custom'>
                                        <div className="bg-[#F9AF55] text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer flex-shrink-0 z-10" aria-label="More information">
                                            <span className="text-3xl pl-1 flex items-center justify-center">{slideData.greenIcon.icon}</span>
                                        </div>
                                        <div className=" absolute  text-[#F9AF55] bg-white rounded-full ml-1 pl-12 pr-2 h-12 cursor-pointer flex items-center overflow-hidden w-0 opacity-0 group-hover:w-[260px] group-hover:opacity-100 group-active:w-[260px] group-active:opacity-100 transition-all duration-300">
                                            <div className='-space-y-2 text-sm flex flex-col justify-center min-w-[100px]'>
                                                <p className="font-semibold leading-5">
                                                    {(() => {
                                                        const words = slideData.greenIcon.info.split(' ');
                                                        if (words.length > 2) {
                                                            return (
                                                                <>
                                                                    {words.slice(0, 2).join(' ')}
                                                                    <br />
                                                                    {words.slice(2).join(' ')}
                                                                </>
                                                            );
                                                        }
                                                        return slideData.greenIcon.info;
                                                    })()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Icon 2 - Top Right */}
                                <div className="mobile-circle-2 absolute top-[12%] right-[15%] group pointer-events-auto flex items-center">
                                    <div className="relative flex items-center border border-[#D72423] rounded-full h-[58px] w-[58px] transition-all duration-300 animate-pulse-custom">

                                        {/* TEXT PANEL (LEFT SIDE) */}
                                        <div className="absolute left-0 bg-white text-[#D72423] rounded-full pl-6 pr-4 h-12 -translate-x-[52vw] cursor-pointer flex items-center justify-start overflow-hidden w-0 opacity-0 group-hover:w-[260px] group-hover:opacity-100 group-active:w-[260px] group-active:opacity-100 transition-all duration-300 z-0">
                                            <div className="-space-y-2 text-sm flex flex-col justify-center max-w-[200px]">
                                                <p className="font-semibold leading-5">
                                                    {(() => {
                                                        const words = slideData.redIcon.info.split(' ');
                                                        if (words.length > 2) {
                                                            return (
                                                                <>
                                                                    {words.slice(0, 2).join(' ')}
                                                                    <br />
                                                                    {words.slice(2).join(' ')}
                                                                </>
                                                            );
                                                        }
                                                        return slideData.redIcon.info;
                                                    })()}
                                                </p>
                                            </div>
                                        </div>

                                        {/* ICON (RIGHT SIDE) */}
                                        <div className="bg-[#D72423] -translate-x-[62vw]  text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer flex-shrink-0 z-10 ml-[260px]" aria-label="More information">
                                            <span className="text-3xl pl-1.5 flex items-center justify-center">{slideData.redIcon.icon}</span>
                                        </div>
                                    </div>
                                </div>



                                {/* Icon 3 - Bottom Left */}
                                <div className="mobile-circle-3 absolute top-[45%] left-[25%] group pointer-events-auto flex items-center">
                                    <div className='relative rounded-full border animate-pulse-custom w-[58px] h-[58px] border-[#ffffff] p-1 flex group-hover:w-[240px] group-active:w-[260px] transition-all duration-300'>
                                        <div className="bg-[#ffffff] text-[#646565] rounded-full p-3 w-12 h-12 flex items-center justify-center cursor-pointer flex-shrink-0 z-10" aria-label="More information">
                                            <span className="text-3xl flex items-center justify-center">{slideData.whiteIcon.icon}</span>
                                        </div>
                                        <div className="absolute  text-[#646565] bg-white  rounded-full ml-1 pl-16 pr-2 h-12 cursor-pointer flex items-center overflow-hidden w-0 opacity-0 group-hover:w-[220px] group-hover:opacity-100 group-active:w-[260px] group-active:opacity-100 transition-all duration-300">
                                            <div className='-space-y-2 flex text-sm font-semibold flex-col justify-center leading-4'>
                                                {(() => {
                                                    const words = slideData.whiteIcon.info.split(' ');
                                                    if (words.length > 2) {
                                                        return (
                                                            <>
                                                                {words.slice(0, 2).join(' ')}
                                                                <br />
                                                                {words.slice(2).join(' ')}
                                                            </>
                                                        );
                                                    }
                                                    return slideData.whiteIcon.info;
                                                })()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description text (shared between desktop and mobile) */}
                            <div className='absolute lg:top-[84%] top-[88%] left-1/2 transform -translate-x-1/2 lg:max-w-4xl w-full lg:text-xl text-sm text-center px-4'>
                                <p className='text-white drop-shadow-md'>{slideData.slideDescription}</p>
                            </div>

                            {/* Branding elements */}
                            {/* First Title Block */}
                            <div className="
                                absolute
                                bottom-[35vh] sm:bottom-[25vh] md:bottom-[30vh] lg:bottom-[29vh] xl:bottom-[28vh] 2xl:bottom-[27vh]
                                right-[5vw] sm:right-[6vw] md:right-[8vw] lg:right-[10vw]
                                p-4 sm:p-6 md:p-8
                                flex flex-col justify-center
                                -rotate-1 text-white z-10
                                hover:-translate-y-2 cursor-pointer
                                transition-all duration-300 ease-in-out
                            ">
                                <div className="bg-white px-4 sm:px-6 md:px-8 py-0 rounded-full shadow-md max-h-24 flex items-center justify-center">
                                    <h2 className="
                                        text-3xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl
                                        mb-0 text-[#8B8B8B] font-bold uppercase font-outfit
                                    ">
                                        {slideData.slideTitle1} <span className="text-[#D72423]">{slideData.slideTitle11}</span>
                                    </h2>
                                </div>
                            </div>

                            {/* Second Title Block */}
                            <div className="
                                absolute
                                bottom-[31vh] sm:bottom-[30vh] md:bottom-[25vh] lg:bottom-[21vh] xl:bottom-[22vh] 2xl:bottom-[21vh]
                                right-[6vw] sm:right-[8vw] md:right-[10vw]
                                p-4 sm:p-6 md:p-8
                                flex flex-col justify-center
                                rotate-1 text-white z-10
                                hover:translate-y-2 cursor-pointer
                                transition-all duration-300 ease-in-out
                            ">
                                <div className="bg-white px-4 sm:px-6 md:px-8 py-0 rounded-full shadow-md max-h-24 flex items-center justify-center">
                                    <h2 className="
                                        text-3xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl
                                        mb-0 text-[#F9AF55] font-bold uppercase font-outfit
                                    ">
                                        {slideData.slideTitle2}
                                    </h2>
                                </div>
                            </div>

                            <div className="absolute bottom-[20vh] right-[12vw] lg:bottom-[10vh] lg:right-[10vw] px-8 flex flex-col justify-center items-center space-y-2 font-outfit text-lg text-white z-10">
                                <button className='bg-[#D72423] px-16 py-0 rounded-full h-12 shadow-md max-h-24 flex items-center justify-center hover:bg-[#b01c1b] transition-colors' aria-label="Sign up today">
                                    <p>Sign Up Today</p>
                                </button>
                                <p className='text-sm text-white drop-shadow-md'>Quick & Easy - No Delays</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    });

    SlideComponent.displayName = 'SlideComponent';

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

            {/* CSS for mobile info circles */}
            <style jsx global>{`
                @media (max-width: 1024px) {
                    .circle-1:active .info-text,
                    .circle-2:active .info-text,
                    .circle-3:active .info-text {
                        width: 260px !important;
                        opacity: 1 !important;
                    }
                }
                
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