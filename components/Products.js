"use client"
import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';
import { BsArrowRight, BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const productData = [
    { title: 'Life Assurance', desc: 'United Life Assurance offers a range of long-term insurance products tailored to individuals, families, and community groups in Eswatini. Their coverage includes funeral plans like the Dignified Tribute, Family Support, and Homelink Covers, as well as group life, personal life, and credit life insurance. ', img: '/family.jpg' },
    { title: 'Micro Loans', desc: 'Micro loans in Eswatini offer fast, accessible financial relief for individuals facing short-term cash needs—whether it is for emergencies, school fees, or unexpected expenses. Providers like United Pay (under United Holdings) offer tailored micro-loans up to E50,000, with repayment terms stretching up to 36 months, and salary-based deductions that simplify repayment', img: '/loan.jpg' },
    { title: 'Legal Insurance', desc: 'United Legal Insurance offers comprehensive legal support for individuals and families facing civil, criminal, labour, or administrative disputes. Policyholders receive face-to-face or telephonic counselling, in-court representation, and access to a nationwide network of attorneys in Eswatini. Coverage includes matters like breach of contract, assault, unfair dismissal, and will drafting. Plans range from individual to family options, with premiums based on coverage level and number of dependents.', img: '/legal.jpg' },
    { title: 'Dignified Family Cover', desc: 'United Legal Insurance\'s Dignified Family Support Cover is a funeral plan designed to ease financial stress on loved ones after the death of a policyholder, especially if they were the household breadwinner. It provides interim monthly income to a nominated beneficiary for six months, helping cover essential expenses like rent and electricity while the deceased\'s estate is being settled. The plan pays out up to E30,000 and is available from as little as E12.50 per month, offering an affordable way to prepare for life\'s uncertainties', img: '/Life.jpg' },
    { title: 'Motor Insurance', desc: 'United Holdings\' Motor Insurance offers three coverage options: Comprehensive, Third-Party Only, and Third-Party Fire and Theft. The Comprehensive plan protects both the vehicle and the policyholder against accidents, theft, fire, explosions, and third-party liability. Third-Party Only covers legal liabilities for injuries, death, or property damage to others. The Fire and Theft option adds protection for the insured vehicle against fire, lightning, explosions, and theft, along with third-party coverage. Additional benefits include free towing, windscreen cover, funeral and health cover for accident-related incidents', img: '/motor.jpg' },
];

const ProductCard = ({ title, desc, img }) => (
    <div className="shadow-md bg-gray-50 group-hover:scale-105 relative rounded-xl flex flex-col h-full group cursor-pointer transition-all duration-500">
        <div className=" rounded-t-xl h-64  flex items-center justify-center overflow-hidden">
            <Image
                src={img}
                alt={title}
                width={320}
                height={192}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
        </div>
        <div className="flex flex-col items-start p-4 flex-grow">
            <h3 className="text-lg font-bold text-[#D72423] mb-2 font-outfit">{title}</h3>
            <p className="text-sm text-gray-700 font-outfit line-clamp-4 mb-4 flex-grow">{desc}</p>
            <p className='text-blue-500 hover:underline text-sm'>Learn More</p>
        </div>
        <span className='text-white bg-[#D72423] h-8 w-8 flex items-center justify-center right-4 bottom-4 absolute transition-all ease-in-out duration-500 group-hover:-rotate-45 group-hover:scale-110 rounded-full'>
            <BsArrowRight />
        </span>
    </div>
);

function Products() {
    const carouselRef = useRef(null);
    const carouselTrackRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [cardWidth, setCardWidth] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);
    const [currentPosition, setCurrentPosition] = useState(0);

    // Initialize carousel dimensions and controls
    useEffect(() => {
        if (!carouselTrackRef.current || !carouselRef.current) return;

        const updateDimensions = () => {
            const cards = carouselTrackRef.current.querySelectorAll('.product-card');
            if (cards.length > 0) {
                const newCardWidth = cards[0].offsetWidth + 24; // width + gap
                setCardWidth(newCardWidth);
                
                const trackWidth = carouselTrackRef.current.offsetWidth;
                const containerWidth = carouselRef.current.offsetWidth;
                const newMaxScroll = trackWidth - containerWidth;
                setMaxScroll(newMaxScroll);
                
                // Update button states
                setIsBeginning(currentPosition === 0);
                setIsEnd(currentPosition >= newMaxScroll);
            }
        };

        // Initial update
        updateDimensions();

        // Update on window resize
        window.addEventListener('resize', updateDimensions);
        
        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, [currentPosition]);

    // Navigation functions
    const scrollNext = () => {
        if (carouselTrackRef.current && cardWidth > 0) {
            const newPosition = Math.min(currentPosition + cardWidth, maxScroll);
            carouselTrackRef.current.style.transform = `translateX(-${newPosition}px)`;
            setCurrentPosition(newPosition);
            setIsBeginning(newPosition === 0);
            setIsEnd(newPosition >= maxScroll);
        }
    };

    const scrollPrev = () => {
        if (carouselTrackRef.current && cardWidth > 0) {
            const newPosition = Math.max(currentPosition - cardWidth, 0);
            carouselTrackRef.current.style.transform = `translateX(-${newPosition}px)`;
            setCurrentPosition(newPosition);
            setIsBeginning(newPosition === 0);
            setIsEnd(newPosition >= maxScroll);
        }
    };

    // Touch handling for mobile
    useEffect(() => {
        if (!carouselTrackRef.current) return;

        let startX = 0;
        let scrollLeft = 0;
        let isDown = false;

        const carouselTrack = carouselTrackRef.current;

        const handleTouchStart = (e) => {
            isDown = true;
            startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
            scrollLeft = currentPosition;
        };

        const handleTouchMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
            const walk = (x - startX) * 2; // Scroll-fastness
            const newPosition = Math.max(0, Math.min(maxScroll, scrollLeft - walk));
            
            // Update position immediately for smooth dragging
            carouselTrack.style.transform = `translateX(-${newPosition}px)`;
            setCurrentPosition(newPosition);
            setIsBeginning(newPosition === 0);
            setIsEnd(newPosition >= maxScroll);
        };

        const handleTouchEnd = () => {
            isDown = false;
        };

        // Add event listeners
        carouselTrack.addEventListener('mousedown', handleTouchStart);
        carouselTrack.addEventListener('touchstart', handleTouchStart);
        
        carouselTrack.addEventListener('mousemove', handleTouchMove);
        carouselTrack.addEventListener('touchmove', handleTouchMove);
        
        carouselTrack.addEventListener('mouseup', handleTouchEnd);
        carouselTrack.addEventListener('touchend', handleTouchEnd);
        carouselTrack.addEventListener('mouseleave', handleTouchEnd);

        return () => {
            // Clean up event listeners
            carouselTrack.removeEventListener('mousedown', handleTouchStart);
            carouselTrack.removeEventListener('touchstart', handleTouchStart);
            
            carouselTrack.removeEventListener('mousemove', handleTouchMove);
            carouselTrack.removeEventListener('touchmove', handleTouchMove);
            
            carouselTrack.removeEventListener('mouseup', handleTouchEnd);
            carouselTrack.removeEventListener('touchend', handleTouchEnd);
            carouselTrack.removeEventListener('mouseleave', handleTouchEnd);
        };
    }, [currentPosition, maxScroll]);

    return (
        <div className="font-outfit max-w-[1600px] mx-auto px-4 md:px-16 w-full space-y-8 py-12 overflow-hidden">
            <div className="flex flex-col gap-8 md:gap-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                        <div className="text-2xl min-w-xs font-semibold text-gray-500">
                            <p>Our Products</p>
                        </div>
                        <div className="text-2xl md:text-3xl max-w-3xl">
                            <p>
                                <span className="text-[#8B8B8B]">United Holding</span> has a solution for individuals, families & teams. Find the{' '}
                                <span className="text-[#D72423]">product</span> that you need.
                            </p>
                        </div>
                    </div>
                    
                    {/* Navigation buttons for desktop */}
                    <div className="hidden md:flex gap-2 mt-4 md:mt-0">
                        <button 
                            onClick={scrollPrev}
                            disabled={isBeginning}
                            className={`p-3 rounded-full border ${isBeginning ? 'text-gray-300 border-gray-200' : 'text-[#D72423] border-[#D72423] hover:bg-[#D72423] hover:text-white'}`}
                            aria-label="Previous products"
                        >
                            <BsChevronLeft />
                        </button>
                        <button 
                            onClick={scrollNext}
                            disabled={isEnd}
                            className={`p-3 rounded-full border ${isEnd ? 'text-gray-300 border-gray-200' : 'text-[#D72423] border-[#D72423] hover:bg-[#D72423] hover:text-white'}`}
                            aria-label="Next products"
                        >
                            <BsChevronRight />
                        </button>
                    </div>
                </div>
                
                <div ref={carouselRef} className="relative overflow-hidden py-4">
                    <div 
                        ref={carouselTrackRef} 
                        className="flex gap-6 w-max touch-pan-x transition-transform duration-300"
                        style={{ transform: `translateX(-${currentPosition}px)` }}
                    >
                        {productData.map((product, idx) => (
                            <div key={idx} className="product-card w-[300px] md:w-[350px] flex-shrink-0">
                                <ProductCard {...product} />
                            </div>
                        ))}
                    </div>
                    
                    {/* Navigation buttons for mobile */}
                    <div className="flex md:hidden justify-center gap-4 mt-6">
                        <button 
                            onClick={scrollPrev}
                            disabled={isBeginning}
                            className={`p-3 rounded-full border ${isBeginning ? 'text-gray-300 border-gray-200' : 'text-[#D72423] border-[#D72423] hover:bg-[#D72423] hover:text-white'}`}
                            aria-label="Previous products"
                        >
                            <BsChevronLeft />
                        </button>
                        <button 
                            onClick={scrollNext}
                            disabled={isEnd}
                            className={`p-3 rounded-full border ${isEnd ? 'text-gray-300 border-gray-200' : 'text-[#D72423] border-[#D72423] hover:bg-[#D72423] hover:text-white'}`}
                            aria-label="Next products"
                        >
                            <BsChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;