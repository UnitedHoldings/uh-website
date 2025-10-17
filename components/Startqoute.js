"use client";
import React, { useState, useEffect } from 'react';
import {
    IoHeartOutline,
    IoCarSportOutline,
    IoHomeOutline,
    IoBriefcaseOutline,
    IoCashOutline,
    IoChevronForwardOutline,
    IoShieldOutline,
    IoDocumentTextOutline,
    IoBusinessOutline,
    IoConstructOutline,
    IoCloseOutline
} from "react-icons/io5";
import {
    PiHeart,
    PiShieldCheck,
    PiBriefcase,
    PiMoney,
    PiUsers,
    PiUser,
    PiCalendar,
    PiCar,
    PiHouse,
    PiScales,
    PiWarningCircle,
    PiBuildingOffice,
    PiFileText,
    PiLock,
    PiTrendUp
} from "react-icons/pi";
import Link from 'next/link';

// Reusable Tab Button Component
const TabButton = ({ label, icon, active, slug }) => (
    <Link
        href={`/products/${slug}`}
        className={`flex flex-col items-center justify-center bgbl rounded-full lg:h-36 lg:w-36 w-28 h-28 relative p-4 transition-all duration-300 transform hover:scale-105 ${active
                ? 'text-[#9b1c20] bg-white -lg border-2 border-[#9b1c20]'
                : 'text-white   hover:bg-white hover:-lg border '
            }`}
    >
        <div className="flex flex-col items-center justify-center w-full space-y-2">
            <div className="text-3xl md:text-4xl lg:text-5xl flex justify-center">
                {icon}
            </div>
            <span className="font-medium text-sm md:text-base text-center leading-tight">
                {label}
            </span>
        </div>
    </Link>
);

export default function StartQuote() {
    const [activeTab, setActiveTab] = useState('motor');
    const [showAllProducts, setShowAllProducts] = useState(false);

    // Balanced product distribution - 3 UGI, 3 ULA, 2 UP
    const tabSlugMap = {
        // UGI Products (3)
        motor: 'motor-insurance',
        home: 'home-contents-insurance',
        legal: 'legal-insurance',
        
        // ULA Products (3) 
        funeral: 'family-funeral-plan',
        credit: 'credit-life',
        group: 'group-life',
        
        // UP Products (2)
        micro: 'micro-loan',
        civil: 'umlamleli-loan',
    };

    const tabs = [
        // United General Insurance (UGI) - 3 products
        { id: 'motor', label: 'Motor Insurance', icon: <IoCarSportOutline />, company: 'UGI' },
        { id: 'home', label: 'Home Insurance', icon: <IoHomeOutline />, company: 'UGI' },
        { id: 'legal', label: 'Legal Insurance', icon: <IoDocumentTextOutline />, company: 'UGI' },
        
        // United Life Assurance (ULA) - 3 products
        { id: 'funeral', label: 'Funeral Cover', icon: <IoHeartOutline />, company: 'ULA' },
        { id: 'credit', label: 'Credit Life', icon: <IoShieldOutline />, company: 'ULA' },
        { id: 'group', label: 'Group Life', icon: <IoBusinessOutline />, company: 'ULA' },
        
        // United Pay (UP) - 2 products
        { id: 'micro', label: 'Shesha Loans', icon: <IoCashOutline />, company: 'UP' },
        { id: 'civil', label: 'Umlamleli Loans', icon: <IoBriefcaseOutline />, company: 'UP' },
    ];

    // All products data organized by category
    const allProductsData = [
        {
            category: 'Life Assurance',
            icon: PiHeart,
            link: '/united-life-assurance',
            color: '#3d834d',
            items: [
                { name: 'Family Funeral Plan', link: '/products/family-funeral-plan', icon: PiUsers },
                { name: 'Individual Funeral Plan', link: '/products/individual-funeral-plan', icon: PiUser },
                { name: 'Tinkhundla Funeral Cover', link: '/products/tinkhundla-funeral-cover', icon: PiCalendar },
                { name: 'Group Life', link: '/products/group-life', icon: PiUsers },
                { name: 'Credit Life', link: '/products/credit-life', icon: PiMoney },
            ]
        },
        {
            category: 'General Insurance',
            icon: PiShieldCheck,
            link: '/united-general-insurance',
            color: '#9b1c20',
            items: [
                { name: 'Motor Insurance', link: '/products/motor-insurance', icon: PiCar },
                { name: 'Home Contents Insurance', link: '/products/home-contents-insurance', icon: PiHouse },
                { name: 'Home Warranty Insurance', link: '/products/home-warranty-insurance', icon: PiHouse },
                { name: 'Legal Insurance', link: '/products/legal-insurance', icon: PiScales },
                { name: 'Personal Accident Insurance', link: '/products/personal-accident-insurance', icon: PiWarningCircle },
            ]
        },
        {
            category: 'Business Insurance',
            icon: PiBriefcase,
            color: '#286278',
            items: [
                { name: 'Multimark Policy', link: '/products/multimark-policy', icon: PiBuildingOffice },
                { name: 'Medical Malpractice', link: '/products/medical-malpractice', icon: PiUser },
                { name: 'Professional Indemnity', link: '/products/professional-indemnity', icon: PiFileText },
                { name: 'Bonds and Guarantee', link: '/products/bonds-and-guarantee', icon: PiFileText },
                { name: 'Engineering Policies', link: '/products/engineering-policies', icon: PiBuildingOffice },
                { name: 'Fidelity Guarantee', link: '/products/fidelity-guarantee', icon: PiLock },
                { name: 'Political Violence and Terrorism', link: '/products/political-violence-and-terrorism', icon: PiWarningCircle },
            ]
        },
        {
            category: 'Loans & Financing',
            icon: PiMoney,
            color: '#f79620',
            items: [
                { name: 'Micro Loans', link: '/products/micro-loan', icon: PiMoney },
                { name: 'Umlamleli Loan (Salary Advance)', link: '/products/umlamleli-loan', icon: PiTrendUp },
            ]
        }
    ];

    const statsData = [
        { value: 80, label: "Years in Business", color: "text-[#9b1c20]", prefix: "+" },
        { value: 3, label: "Group Companies", color: "text-[#9b1c20]" },
        { value: 98, label: "Claim Satisfaction", color: "text-[#9b1c20]", suffix: "%" },
        { value: 50000, label: "Happy Clients", color: "text-[#9b1c20]", prefix: "+" },
        { value: 100, label: "% Swazi Owned", color: "text-[#9b1c20]", suffix: "%" },
    ];

    // Carousel state
    const [statIndex, setStatIndex] = useState(0);
    const [displayValue, setDisplayValue] = useState(statsData[0].value);

    // Animate stat value
    useEffect(() => {
        let start = 0;
        let end = statsData[statIndex].value;
        let duration = 1000;
        let startTime = null;
        let prefix = statsData[statIndex].prefix || '';
        let suffix = statsData[statIndex].suffix || '';

        function animateCountUp(ts) {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            setDisplayValue(current);
            if (progress < 1) {
                requestAnimationFrame(animateCountUp);
            } else {
                setDisplayValue(end);
            }
        }
        requestAnimationFrame(animateCountUp);
    }, [statIndex]);

    // Carousel auto-advance
    useEffect(() => {
        const interval = setInterval(() => {
            setStatIndex((prev) => (prev + 1) % statsData.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [statsData.length]);

    const StatCarousel = () => {
        const stat = statsData[statIndex];
        const formatNumber = (num) => {
            if (typeof num === 'number') {
                return num.toLocaleString();
            }
            return num;
        };

        return (
            <div className="flex flex-col items-center justify-center min-w-[180px] px-4 md:px-8 py-4">
                <div className={`text-6xl md:text-4xl lg:text-5xl font-black ${stat.color}`}>
                    {stat.prefix || ''}{formatNumber(displayValue)}{stat.suffix || ''}
                </div>
                <div className="text-gray-600 text-sm md:text-base mt-2 text-center">{stat.label}</div>
            </div>
        );
    };

    // All Products Modal
    const AllProductsModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto overflow-hidden">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-bold text-gray-900">All Products</h2>
                        <button
                            onClick={() => setShowAllProducts(false)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <IoCloseOutline className="text-2xl text-gray-600" />
                        </button>
                    </div>
                    <p className="text-gray-600 mt-2">
                        Explore our complete range of insurance and financial products
                    </p>
                </div>

                {/* Products Grid */}
                <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {allProductsData.map((category, index) => (
                        <div key={index} className="bg-gray-50 rounded-xl p-6">
                            {/* Category Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div 
                                    className="p-3 rounded-lg text-white"
                                    style={{ backgroundColor: category.color }}
                                >
                                    <category.icon className="text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
                                    {category.link && (
                                        <Link 
                                            href={category.link}
                                            className="text-sm text-gray-600 hover:text-[#9b1c20] transition-colors"
                                        >
                                            View all {category.category} products →
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* Products List */}
                            <div className="space-y-3">
                                {category.items.map((product, productIndex) => (
                                    <Link
                                        key={productIndex}
                                        href={product.link}
                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white transition-all duration-200 group border border-transparent hover:border-gray-200"
                                    >
                                        <div 
                                            className="p-2 rounded-md text-white group-hover:scale-110 transition-transform"
                                            style={{ backgroundColor: category.color }}
                                        >
                                            <product.icon className="text-lg" />
                                        </div>
                                        <span className="text-gray-700 group-hover:text-gray-900 font-medium flex-1">
                                            {product.name}
                                        </span>
                                        <IoChevronForwardOutline className="text-gray-400 group-hover:text-[#9b1c20] transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-2xl">
                    <div className="text-center">
                        <p className="text-gray-600 mb-4">
                            Can&lsquo;t find what you&lsquo;re looking for? Contact us for personalized assistance.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#9b1c20] text-white rounded-lg font-semibold hover:bg-[#881a1e] transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full mx-auto text-[#9b1c20] flex flex-col">
            {/* Header */}
            <header className="max-w-[1400px] w-full border-b border-gray-200 mx-auto px-4">
                <div className="container mx-auto pb-6 lgpb-16 flex flex-col-reverse py-8 md:flex-row lg:flex-row justify-between items-center gap-6 md:gap-0">
                    <div className="text-xl md:text-3xl lg:text-4xl text-[#9b1c20] text-center lg:text-left md:text-left">
                        <p>Lets get you the <span className="text-[#9b1c20] font-semibold">Cover</span> You Deserve... <br />and<span className="text-[#9b1c20] font-semibold"> Sign you up</span> Today!</p>
                    </div>
                    <StatCarousel />
                </div>
            </header>

            {/* Main Content */}
         

            {/* All Products Modal */}
            {showAllProducts && <AllProductsModal />}
        </div>
    );
}