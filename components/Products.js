"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {
    BsArrowRight,
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
        bgColor: '#286278'
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
        bgColor: '#286278'
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
        bgColor: '#286278'
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
        bgColor: '#286278'
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

const ProductCard = ({ title, desc, img, company, icon, stats, link, color, bgColor }) => (
<Link href={link} className="block group h-full px-2">
    <div
        className="   hover:-2xl rounded-2xl relative flex flex-col h-full cursor-pointer transition-all duration-500 overflow-hidden"
        style={{ backgroundColor: bgColor }}
    >
        {/* Image Container with Overlay */}
        <div className="h-[800px] relative overflow-hidden">
            <Image
                src={img}
                alt={title}
                fill
                priority={true}
                className="object-cover  transition-transform duration-700 group-hover:scale-110"
            />

            {/* Icon Overlay */}
            <div style={{ backgroundColor: bgColor }} className="absolute rounded-full flex items-center justify-center px-6 top-4 -left-4 text-white ">
                <div className="flex items-center gap-2">
                    <div
                        className="p-2 rounded-lg backdrop-blur-sm"

                    >
                        {icon}
                    </div>
                    <h3 className="text-xl text-center font-bold  font-outfit group-hover:text-white transition-colors">
                        {title}
                    </h3>
                </div>
            </div>
        </div>

        {/* Content */}
        <div className="flex flex- pb-0 flex-grow items-center justify-between text-white" style={{ backgroundColor: bgColor }}>

            <div className="p-2 line-clamp-2 h-12 text-sm space-y-4">
                <p>{desc} </p>
            </div>
            {/* CTA */}
            <div
                className="flex items-center min-w-[10rem] justify-center hover:bg-white py-6 space-x-2 text-white hover:text-current border-t border-white/30 transition-all duration-300 group-hover:border-transparent"
                style={{
                    '--hover-text-color': bgColor
                }}
            >
                <span className="text-sm font-semibold group-hover:text-[var(--hover-text-color)]">
                    Learn More
                </span>
                <BsArrowRight
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--hover-text-color)]"
                />
            </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-2xl pointer-events-none" />
    </div>
</Link>
);

// Custom arrow components
const CustomLeftArrow = ({ onClick, ...rest }) => {
    const {
        onMove,
        carouselState: { currentSlide, deviceType }
    } = rest;

    return (
        <button
            onClick={() => onClick()}
            className="absolute left-10 top z-10 p-3 rounded-xl  bg-[#9b1c20] text-white hover:bg-[#9b1c20] hover:text-white transition-all duration-300 -lg hover:-xl "
            aria-label="Previous products"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
        </button>
    );
};

const CustomRightArrow = ({ onClick, ...rest }) => {
    const {
        onMove,
        carouselState: { currentSlide, deviceType }
    } = rest;

    return (
        <button
            onClick={() => onClick()}
            className="absolute right-10 z-10 p-3 rounded-xl   bg-[#9b1c20] text-white hover:bg-[#9b1c20] hover:text-white transition-all duration-300 -lg hover:-xl "
            aria-label="Next products"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </button>
    );
};

function Products() {
    const [shuffledProducts] = useState(() => shuffleArray(productData));

    // Responsive configuration for react-multi-carousel
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1400 },
            items: 3,
            partialVisibilityGutter: 20
        },
        desktop: {
            breakpoint: { max: 1400, min: 1024 },
            items: 3,
            partialVisibilityGutter: 20
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 2,
            partialVisibilityGutter: 0
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 1,
            partialVisibilityGutter: 30
        }
    };

    // Custom dot component
    const CustomDot = ({ onClick, ...rest }) => {
        const {
            onMove,
            index,
            active,
            carouselState: { currentSlide, deviceType }
        } = rest;

        return (
            <button
                className={`mx-1 w-3 h-3 rounded-full transition-all duration-300 ${active ? 'bg-[#9b1c20] w-8' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                onClick={() => onClick()}
            />
        );
    };

    return (
        <div className=''>
            <div className="font-outfit max-w-[1400px] mx-auto px-4 lg:p-0 w-full space-y-12 ">
                {/* Carousel Section */}
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-2xl md:text-3xl font-bold text-[#9b1c20] mb-2 font-outfit">
                                Featured Products
                            </h3>
                            <p className="text-gray-600 max-w-2xl text-lg lg:text-xl">
                                Explore our range of innovative solutions from United General Insurance,
                                United Life Assurance, and United Pay.
                            </p>
                        </div>
                    </div>

                    {/* React Multi Carousel */}
                    <div className="relative py-2 gap-4">
                        <Carousel
                            responsive={responsive}
                            infinite={true}
                            autoPlaySpeed={5000}
                            keyBoardControl={true}
                            customTransition="transform 500ms ease-in-out"
                            transitionDuration={500}
                            containerClass="carousel-container"
                            itemClass="carousel-item-padding-80-px"
                            arrows={true}
                            customLeftArrow={<CustomLeftArrow />}
                            customRightArrow={<CustomRightArrow />}
                       
                            autoPlay={true}
                            customDot={<CustomDot />}
                            dotListClass="custom-dot-list"
                            partialVisible={true}
                            removeArrowOnDeviceType={['mobile']}
                            rewind={false}
                            rewindWithAnimation={false}
                            rtl={false}
                            shouldResetAutoplay={true}
                            slidesToSlide={1}
                            swipeable={true}
                            draggable={true}
                        >
                            {shuffledProducts.map((product, idx) => (
                                <div key={idx} className="h-[520px]">
                                    <ProductCard {...product} />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;