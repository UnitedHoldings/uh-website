"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useEffect, useState } from 'react';
import { 
    BsArrowRight, 
    BsChevronLeft, 
    BsChevronRight, 
    BsShieldCheck,
    BsHeart,
    BsCash,
    BsBriefcase,
    BsHouse,
    BsPeople,
    BsGraphUp
} from 'react-icons/bs';
import { 
    PiCar,
    PiGavel,
    PiUsersThree,
    PiCurrencyCircleDollar,
    PiShieldCheck,
    PiHouse,
    PiFileText
} from 'react-icons/pi';

// Enhanced product data with balanced distribution
const productData = [
    // ULA Products (4)
    { 
        title: 'Family Funeral Plan', 
        desc: 'Comprehensive funeral coverage for your entire family with quick claims processing and flexible payment terms. Protect your loved ones during difficult times.',
        img: '/family.jpg',
        company: 'ULA',
        icon: <BsHeart className="text-2xl" />,
        stats: ['From E50/month', 'Family Coverage', 'Quick Payouts'],
        link: '/products/family-funeral-plan',
        color: '#3d834d',
        bgColor: '#3d834d'
    },
    { 
        title: 'Individual Funeral Plan', 
        desc: 'Personalized funeral coverage with fast payouts and premium flexibility. Ensure your final journey is handled with dignity and care.',
        img: '/individual-funeral.jpg',
        company: 'ULA',
        icon: <BsPeople className="text-2xl" />,
        stats: ['From E30/month', 'Personal Coverage', 'Flexible Payments'],
        link: '/products/individual-funeral-plan',
        color: '#3d834d',
        bgColor: '#3d834d'
    },
    { 
        title: 'Credit Life', 
        desc: 'Protect your loans and family by covering repayments in case of death or disability. Peace of mind for borrowers across Eswatini.',
        img: '/credit-life.jpg',
        company: 'ULA',
        icon: <PiCurrencyCircleDollar className="text-2xl" />,
        stats: ['From E25/month', 'Loan Protection', 'Quick Claims'],
        link: '/products/credit-life',
        color: '#3d834d',
        bgColor: '#3d834d'
    },
    { 
        title: 'Group Life', 
        desc: 'Comprehensive life coverage for employee groups with employer-backed benefits and quick payouts. Protect your team\'s future.',
        img: '/group-life.jpg',
        company: 'ULA',
        icon: <PiUsersThree className="text-2xl" />,
        stats: ['Group Coverage', 'Employer Benefits', 'Fast Settlements'],
        link: '/products/group-life',
        color: '#3d834d',
        bgColor: '#3d834d'
    },
    
    // UGI Products (4)
    { 
        title: 'Motor Insurance', 
        desc: 'Comprehensive vehicle protection with options for third-party, fire & theft, or full comprehensive coverage. Drive with total confidence.',
        img: '/motor.jpg',
        company: 'UGI',
        icon: <PiCar className="text-2xl" />,
        stats: ['From E200/month', '3 Coverage Options', '24/7 Support'],
        link: '/products/motor-insurance',
        color: '#9b1c20',
        bgColor: '#9b1c20'
    },
    { 
        title: 'Home Insurance', 
        desc: 'Complete protection for your home and belongings against theft, natural disasters, and accidental damage. Protect what matters most.',
        img: '/home-contents.jpg',
        company: 'UGI',
        icon: <PiHouse className="text-2xl" />,
        stats: ['From E100/month', 'Full Protection', 'Quick Claims'],
        link: '/products/home-contents-insurance',
        color: '#9b1c20',
        bgColor: '#9b1c20'
    },
    { 
        title: 'Legal Insurance', 
        desc: 'Expert legal protection covering civil, criminal, and labor disputes. Access to professional legal counsel and representation.',
        img: '/legal.jpg',
        company: 'UGI',
        icon: <PiGavel className="text-2xl" />,
        stats: ['From E50/month', 'Legal Representation', 'Nationwide'],
        link: '/products/legal-insurance',
        color: '#9b1c20',
        bgColor: '#9b1c20'
    },
    { 
        title: 'Personal Accident', 
        desc: 'Financial security against unexpected accidents with lump-sum payouts for injuries, disabilities, or death. Secure your future.',
        img: '/personal-accident.jpg',
        company: 'UGI',
        icon: <PiShieldCheck className="text-2xl" />,
        stats: ['From E30/month', 'Accident Cover', 'Income Protection'],
        link: '/products/personal-accident-insurance',
        color: '#9b1c20',
        bgColor: '#9b1c20'
    },
    
    // UP Products (2)
    { 
        title: 'Micro Loans', 
        desc: 'Fast, accessible financial solutions up to E50,000 with flexible repayment terms. Quick cash for life\'s unexpected moments.',
        img: '/loan.jpg',
        company: 'UP',
        icon: <BsCash className="text-2xl" />,
        stats: ['Up to E50,000', '48hr Approval', 'Flexible Terms'],
        link: '/products/micro-loan',
        color: '#f79620',
        bgColor: '#f79620'
    },
    { 
        title: 'Govt Employee Loans', 
        desc: 'Specialized financial solutions for government employees with higher limits and favorable terms. Secure funding tailored for public servants.',
        img: '/civil-servant-loan.jpg',
        company: 'UP',
        icon: <BsBriefcase className="text-2xl" />,
        stats: ['Up to E20,000', 'Low Rates', 'Salary Deduction'],
        link: '/products/civil-servant-micro-loan',
        color: '#f79620',
        bgColor: '#f79620'
    },
];

// Function to shuffle array randomly
const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const CompanyBadge = ({ company, color }) => (
    <div 
        className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold -lg border border-white/30"
    >
        {company}
    </div>
);

const ProductCard = ({ title, desc, img, company, icon, stats, link, color, bgColor }) => (
    <Link href={link} className="block group h-full">
        <div 
            className="rounded-xl hover:-2xl relative flex flex-col h-full cursor-pointer transition-all duration-500 overflow-hidden"
            style={{ backgroundColor: bgColor }}
        >
            {/* Company Badge */}
            <CompanyBadge company={company} color={color} />
            
            {/* Image Container with Overlay */}
            <div className="h-48 relative overflow-hidden">
                <Image
                    src={img}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40" />
                
                {/* Icon Overlay */}
                <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                            {icon}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col p-6 flex-grow text-white">
                <h3 className="text-xl font-bold mb-3 font-outfit group-hover:text-white transition-colors">
                    {title}
                </h3>
                
                <p className="text-white/90 text-sm leading-relaxed mb-4 flex-grow">
                    {desc}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {stats.map((stat, index) => (
                        <span 
                            key={index}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30"
                        >
                            {stat}
                        </span>
                    ))}
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/30">
                    <span className="text-sm font-semibold text-white">
                        Learn More
                    </span>
                    <BsArrowRight 
                        className="transition-transform duration-300 group-hover:translate-x-1 text-white" 
                    />
                </div>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-2xl pointer-events-none" />
        </div>
    </Link>
);

function Products() {
    const carouselRef = useRef(null);
    const carouselTrackRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [cardWidth, setCardWidth] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    
    // Shuffle products on component mount
    const [shuffledProducts] = useState(() => shuffleArray(productData));

    // Initialize carousel dimensions and controls
    useEffect(() => {
        if (!carouselTrackRef.current || !carouselRef.current) return;

        const updateDimensions = () => {
            const cards = carouselTrackRef.current.querySelectorAll('.product-card');
            if (cards.length > 0) {
                const newCardWidth = cards[0].offsetWidth + 24; // width + gap
                setCardWidth(newCardWidth);

                const trackWidth = carouselTrackRef.current.scrollWidth;
                const containerWidth = carouselRef.current.offsetWidth;
                const newMaxScroll = trackWidth - containerWidth;
                setMaxScroll(newMaxScroll);

                // Update button states
                setIsBeginning(currentPosition === 0);
                setIsEnd(currentPosition >= newMaxScroll - 10); // Small tolerance
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
            setIsEnd(newPosition >= maxScroll - 10);
            setActiveIndex(Math.min(activeIndex + 1, shuffledProducts.length - 1));
        }
    };

    const scrollPrev = () => {
        if (carouselTrackRef.current && cardWidth > 0) {
            const newPosition = Math.max(currentPosition - cardWidth, 0);
            carouselTrackRef.current.style.transform = `translateX(-${newPosition}px)`;
            setCurrentPosition(newPosition);
            setIsBeginning(newPosition === 0);
            setIsEnd(newPosition >= maxScroll - 10);
            setActiveIndex(Math.max(activeIndex - 1, 0));
        }
    };

    // Auto-advance carousel
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isEnd) {
                scrollNext();
            } else {
                // Reset to beginning
                carouselTrackRef.current.style.transform = `translateX(0px)`;
                setCurrentPosition(0);
                setIsBeginning(true);
                setIsEnd(false);
                setActiveIndex(0);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [isEnd, currentPosition]);

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
            const walk = (x - startX) * 2;
            const newPosition = Math.max(0, Math.min(maxScroll, scrollLeft - walk));

            carouselTrack.style.transform = `translateX(-${newPosition}px)`;
            setCurrentPosition(newPosition);
            setIsBeginning(newPosition === 0);
            setIsEnd(newPosition >= maxScroll - 10);
        };

        const handleTouchEnd = () => {
            isDown = false;
        };

        carouselTrack.addEventListener('mousedown', handleTouchStart);
        carouselTrack.addEventListener('touchstart', handleTouchStart);
        carouselTrack.addEventListener('mousemove', handleTouchMove);
        carouselTrack.addEventListener('touchmove', handleTouchMove);
        carouselTrack.addEventListener('mouseup', handleTouchEnd);
        carouselTrack.addEventListener('touchend', handleTouchEnd);
        carouselTrack.addEventListener('mouseleave', handleTouchEnd);

        return () => {
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
        <div className='py-16'>
            <div className="font-outfit max-w-[1400px] mx-auto px-4 lg:px-8 w-full space-y-12 overflow-hidden">
                {/* Header Section */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#9b1c20]/10 text-[#9b1c20] text-sm font-semibold">
                        <BsShieldCheck className="text-lg" />
                        Trusted Financial Solutions
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 max-w-4xl mx-auto leading-tight">
                        Comprehensive <span className="text-[#9b1c20]">Protection</span> for Every Aspect of Your Life
                    </h2>
                    
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        United Holding offers tailored insurance and financial products designed to secure your future, 
                        protect your assets, and empower your financial growth across Eswatini.
                    </p>
                </div>

                {/* Carousel Section */}
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                                Featured Products
                            </h3>
                            <p className="text-gray-600 max-w-2xl">
                                Explore our range of innovative solutions from United General Insurance, 
                                United Life Assurance, and United Pay.
                            </p>
                        </div>

                        {/* Navigation and Indicators */}
                        <div className="flex items-center gap-6">
                            {/* Progress Indicators */}
                            <div className="hidden md:flex items-center gap-2">
                                {shuffledProducts.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            const newPosition = idx * cardWidth;
                                            carouselTrackRef.current.style.transform = `translateX(-${newPosition}px)`;
                                            setCurrentPosition(newPosition);
                                            setActiveIndex(idx);
                                            setIsBeginning(newPosition === 0);
                                            setIsEnd(newPosition >= maxScroll - 10);
                                        }}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                            activeIndex === idx 
                                                ? 'bg-[#9b1c20] w-8' 
                                                : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                    />
                                ))}
                            </div>

                            {/* Navigation buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={scrollPrev}
                                    disabled={isBeginning}
                                    className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                                        isBeginning 
                                            ? 'text-gray-300 border-gray-200 cursor-not-allowed' 
                                            : 'text-[#9b1c20] border-[#9b1c20] hover:bg-[#9b1c20] hover:text-white -lg hover:-xl'
                                    }`}
                                    aria-label="Previous products"
                                >
                                    <BsChevronLeft className="text-lg" />
                                </button>
                                <button
                                    onClick={scrollNext}
                                    disabled={isEnd}
                                    className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                                        isEnd 
                                            ? 'text-gray-300 border-gray-200 cursor-not-allowed' 
                                            : 'text-[#9b1c20] border-[#9b1c20] hover:bg-[#9b1c20] hover:text-white -lg hover:-xl'
                                    }`}
                                    aria-label="Next products"
                                >
                                    <BsChevronRight className="text-lg" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Carousel Container */}
                    <div ref={carouselRef} className="relative overflow-hidden py-2">
                        <div
                            ref={carouselTrackRef}
                            className="flex gap-6 w-max touch-pan-x transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${currentPosition}px)` }}
                        >
                            {shuffledProducts.map((product, idx) => (
                                <div 
                                    key={idx} 
                                    className="product-card w-[320px] md:w-[380px] h-[520px] flex-shrink-0"
                                >
                                    <ProductCard {...product} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="flex md:hidden justify-center items-center gap-4">
                        <div className="flex items-center gap-2 mr-4">
                            {shuffledProducts.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                        activeIndex === idx ? 'bg-[#9b1c20]' : 'bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={scrollPrev}
                            disabled={isBeginning}
                            className={`p-3 rounded-xl border-2 ${
                                isBeginning 
                                    ? 'text-gray-300 border-gray-200' 
                                    : 'text-[#9b1c20] border-[#9b1c20]'
                            }`}
                        >
                            <BsChevronLeft />
                        </button>
                        <button
                            onClick={scrollNext}
                            disabled={isEnd}
                            className={`p-3 rounded-xl border-2 ${
                                isEnd 
                                    ? 'text-gray-300 border-gray-200' 
                                    : 'text-[#9b1c20] border-[#9b1c20]'
                            }`}
                        >
                            <BsChevronRight />
                        </button>
                    </div>
                </div>

                {/* CTA Section */}
             
            </div>
        </div>
    );
}

export default Products;