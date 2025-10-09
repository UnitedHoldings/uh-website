"use client";
import React, { useState, useEffect } from 'react';
import {
    IoHeartOutline,
    IoHeartCircleOutline,
    IoCarSportOutline,
    IoHomeOutline,
    IoBriefcaseOutline,
    IoCashOutline,
    IoChevronForwardOutline,
    IoStatsChartOutline,
    IoShieldOutline,
    IoDocumentTextOutline
} from "react-icons/io5";
import Link from 'next/link';

// Reusable Tab Button Component
const TabButton = ({ label, icon, active, slug }) => (
    <Link
        href={`/products/${slug}`}
        className={`flex flex-col items-center justify-center bgbl rounded-full lg:h-36 lg:w-36 w-28 h-28 relative p-4 transition-all duration-300 transform hover:scale-105 ${active
                ? 'text-[#9b1c20] bg-white shadow-lg border-2 border-[#9b1c20]'
                : 'text-white   hover:bg-white hover:shadow-lg border '
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
    const [activeTab, setActiveTab] = useState('car');

    // Map tab id to product slug
    const tabSlugMap = {
        life: 'life-insurance',
        car: 'motor-insurance',
        home: 'home-insurance',
        business: 'multimark-policy',
        funeral: 'funeral-assurance',
        legal: 'legal-insurance',
        professional: 'professional-indemnity',
        micro: 'micro-loans',
    };

    const tabs = [
        { id: 'life', label: 'Funeral Insurance', icon: <IoHeartOutline /> },
        { id: 'car', label: 'Motor Insurance', icon: <IoCarSportOutline /> },
        { id: 'home', label: 'Home Insurance', icon: <IoHomeOutline /> },
        { id: 'business', label: 'Business Insurance', icon: <IoBriefcaseOutline /> },
        { id: 'funeral', label: 'Funeral Cover', icon: <IoHeartCircleOutline /> },
        { id: 'legal', label: 'Legal Insurance', icon: <IoDocumentTextOutline /> },
        { id: 'professional', label: 'Professional', icon: <IoShieldOutline /> },
        { id: 'micro', label: 'Micro Loans', icon: <IoCashOutline /> },
    ];

    const statsData = [
        { value: 70, label: "Years in Business", color: "text-[#9b1c20]", prefix: "+" },
        { value: 3, label: "Group Companies", color: "text-[#9b1c20]" },
        { value: 24, label: "Customer Support", color: "text-[#9b1c20]", suffix: "/7" },
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

    return (
        <div className="w-full mx-auto text-[#9b1c20] flex flex-col">
            {/* Header */}
            <header className="max-w-[1400px] w-full border-b border-gray-200 mx-auto px-4">
                <div className="container mx-auto pb-6 md:pb-8 flex flex-col-reverse pt-8 md:flex-row lg:flex-row justify-between items-center gap-6 md:gap-0">
                    <div className="text-xl md:text-3xl lg:text-4xl text-[#9b1c20] text-center lg:text-left md:text-left">
                        <p>Lets get you the <span className="text-[#9b1c20] font-semibold">Cover</span> You Deserve... <br />and<span className="text-[#9b1c20] font-semibold"> Sign you up</span> Today!</p>
                    </div>
                    <StatCarousel />
                </div>
            </header>

            {/* Main Content */}
            <main className="w-full bg-[#9b1c20] py-16">
                <div className="max-w-[1400px] mx-auto py-6 px-4 md:px-6 rounded-2xl">
                    {/* Insurance Type Tabs */}
                    <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6'>
                        <p className='text-xl lg:text-2xl max-w-lg text-white lg:text-left text-center md:text-left'>
                            Explore our wide range of offerings tailored to your insurance needs
                        </p>

                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4 w-full pt-4 pb-4 rounded-lg">
                        {tabs.map((tab) => (
                            <TabButton
                                key={tab.id}
                                label={tab.label}
                                icon={tab.icon}
                                active={activeTab === tab.id}
                                slug={tabSlugMap[tab.id]}
                            />
                        ))}
                    </div>

                    {/* Quick Stats Bar */}
                    <Link
                        href="/products"
                        className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors self-center md:self-auto"
                    >
                        <span className="text-lg underline">View all products</span>
                        <IoChevronForwardOutline className="text-xl" />
                    </Link>
                </div>
            </main>

            {/* CTA Section */}
          
        </div>
    );
}