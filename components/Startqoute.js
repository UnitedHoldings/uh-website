"use client";
import React, { useState } from 'react';
import {
    IoHeartOutline,
    IoHeartCircleOutline,
    IoCarSportOutline,
    IoHomeOutline,
    IoBriefcaseOutline,
    IoCashOutline
} from "react-icons/io5";
import Link from 'next/link';
import RenderForm from './RenderForm';

// Reusable Input Field Component
const InputField = ({ label, name, type = 'text', value, onChange, required = false, className = '', ...props }) => (
    <div className={className}>
        <label className="block text-sm font-medium text-gray-800 mb-1">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full px-4 py-2 bg-white border-gray-200 border rounded-xl placeholder-gray-800"
            {...props}
        />
    </div>
);

// Reusable Select Field Component
const SelectField = ({ label, name, value, onChange, options, required = false, className = '' }) => (
    <div className={className}>
        <label className="block text-sm font-medium text-gray-800 mb-1">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full px-4 py-2 bg-white border-gray-200 border rounded-xl placeholder-gray-800"
        >
            <option value="">Select {label}</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

// Reusable Tab Button Component
const TabButton = ({ id, label, icon, active, onClick, slug }) => (
    <Link
        href={slug ? `/products/${slug}` : '#'}
        className={`flex flex-col items-center justify-center h-[150px] w-[150px] rounded-full relative py-4 px-2 transition-all duration-200 ${active
            ? ' text-[#9b1c20] bg-white shadow-lg transform -translate-y-1'
            : ' text-white border border-white hover:bg-[#801619] hover:-translate-y-2 transition-all ease-in-out hover:shadow-md'
            }`}
        onClick={onClick}
    >
        <div className='flex flex-col h-full items-center justify-center w-full'>
            <div className='w-full'>
                <div className="text-6xl top-0 flex justify-center p-2 rounded-full left-0">{icon}</div>
            </div>
            <div className='w-full flex items-center justify-center'>
                <span className="font-medium text-lg">{label}</span>
            </div>
        </div>
    </Link>
);

export default function StartQuote() {
    const [activeTab, setActiveTab] = useState('car');
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        // Common fields
        name: '',
        surname: '',
        idPassport: '',
        email: '',
        phone: '',

        // Car insurance fields
        vehicleType: 'car',
        vehicleValue: '',
        vehicleMake: '',
        vehicleModel: '',
        vehicleYear: '',
        carCoverageType: 'comprehensive',

        // Life insurance fields
        lifeDob: '',
        lifeGender: '',
        lifeMaritalStatus: '',
        lifeDependents: '',
        lifeOccupation: '',
        lifeAnnualIncome: '',
        lifeCoverageAmount: '',
        lifeBeneficiary: '',
        lifeSmoker: '',
        lifeMedicalHistory: '',

        // Health insurance fields
        healthDob: '',
        healthGender: '',
        healthId: '',
        healthEmployment: '',
        healthConditions: '',
        healthProvider: '',
        healthCoverageType: 'individual',
        healthFamilyMembers: '',
        healthHospital: '',
        healthBudget: '',
        healthAddons: [],

        // Home insurance fields
        homeAddress: '',
        homeOwnership: 'owned',
        homeType: 'house',
        homeYearBuilt: '',
        homePropertyValue: '',
        homeContentsValue: '',
        homeSecurity: [],
        homeCoverageType: 'both',
        homeDisasterRisk: [],

        // Business insurance fields
        businessName: '',
        businessOwner: '',
        businessType: 'retail',
        businessRegistration: '',
        businessEmployees: '',
        businessRevenue: '',
        businessAddress: '',
        businessCoverageNeeds: [],
        businessRiskFactors: [],
        businessExistingPolicies: '',
        businessAddons: [],

        // Funeral insurance fields
        funeralDob: '',
        funeralCoverageType: 'individual',
        funeralCoveredMembers: '',
        funeralProvider: '',
        funeralPreferences: 'burial',
        funeralCoverageAmount: '',
        funeralBeneficiary: '',
        funeralBudget: '',
        funeralAddons: [],

        // Legal insurance fields
        legalId: '',
        legalEmployment: '',
        legalCoverageNeeds: [],
        legalFrequency: 'rare',
        legalProvider: '',
        legalBudget: '',
        legalAddons: [],

        // Professional insurance fields
        professionalOccupation: '',
        professionalExperience: '',
        professionalRegistration: '',
        professionalCoverageType: 'malpractice',
        professionalWorkLocation: 'office',
        professionalClientInteraction: 'medium',
        professionalRiskExposure: 'moderate',
        professionalAddons: [],

        // Micro Loans insurance fields
        loanAmount: '',
        loanPurpose: 'business',
        loanTerm: '',
        loanIncome: '',
        loanEmployment: '',
        loanCollateral: '',
        loanCoverageType: 'default',
        loanAddons: [],
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData(prev => {
                const currentArray = prev[name] || [];
                if (checked) {
                    return { ...prev, [name]: [...currentArray, value] };
                } else {
                    return { ...prev, [name]: currentArray.filter(item => item !== value) };
                }
            });
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    // Map tab id to product slug
    const tabSlugMap = {
        life: 'life-insurance',
        car: 'motor-insurance',
        home: 'home-insurance',
        business: 'multimark-policy',
        funeral: 'funeral-assurance',
        legal: 'legal-insurance',
        professional: 'professional-indemnity-insurance',
        micro: 'micro-loans',
    };

    const tabs = [
        { id: 'life', label: 'Life', icon: <IoHeartOutline className="text-5xl" /> },
        { id: 'car', label: 'Car', icon: <IoCarSportOutline className="text-5xl" /> },
        { id: 'home', label: 'Home', icon: <IoHomeOutline className="text-5xl" /> },
        { id: 'business', label: 'Business', icon: <IoBriefcaseOutline className="text-5xl" /> },
        { id: 'funeral', label: 'Funeral', icon: <IoHeartCircleOutline className="text-5xl" /> },
        { id: 'legal', label: 'Legal', icon: <IoBriefcaseOutline className="text-5xl" /> },
        { id: 'professional', label: 'Professional', icon: <IoHomeOutline className="text-5xl" /> },
        { id: 'micro', label: 'Micro Loans', icon: <IoCashOutline className="text-5xl" /> },
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
    React.useEffect(() => {
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
    React.useEffect(() => {
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
            <div className="flex flex-col items-center justify-center min-w-[180px] px-8 py-4">
                <div className={`text-5xl font-bold ${stat.color}`}>
                    {stat.prefix || ''}{formatNumber(displayValue)}{stat.suffix || ''}
                </div>
                <div className="text-gray-600 text-base mt-2 text-center">{stat.label}</div>
            </div>
        );
    };

    // Get current product for RenderForm
    const getCurrentProduct = () => {
        // Create a simple product object based on active tab
        const productTitles = {
            life: 'Life Insurance',
            car: 'Motor Insurance',
            home: 'Home Insurance',
            business: 'Business Insurance',
            funeral: 'Funeral Cover',
            legal: 'Legal Insurance',
            professional: 'Professional Insurance',
            micro: 'Micro Loans'
        };

        const productTaglines = {
            life: 'Protect your loved ones with comprehensive life coverage',
            car: 'Comprehensive, Third Party, Fire & Theft coverage for your vehicle',
            home: 'Protect Your Home and Peace of Mind',
            business: 'All-inclusive corporate/business cover',
            funeral: 'Funeral support for individuals and groups',
            legal: 'Legal Protection for You & Family',
            professional: 'Covers professional errors and negligence',
            micro: 'Immediate Access to Cash'
        };

        return {
            name: productTitles[activeTab] || 'Insurance',
            tagline: productTaglines[activeTab] || 'Get the coverage you need'
        };
    };

    return (
        <div className="w-full mx-auto text-[#9b1c20] flex flex-col">
            {/* Header */}
            <header className="max-w-[1400px] w-full border-b border-gray-200 mx-auto">
                <div className="container mx-auto px-4 pb-8 flex md:flex-row justify-between items-center">
                    <div className="text-4xl text-[#9b1c20] md:mb-0">
                        <p> Lets get you the <span className="text-[#9b1c20] font-semibold">Cover</span> You Deserve... <br />and<span className="text-[#9b1c20] font-semibold"> Sign you up</span>  Today!</p>
                    </div>
                    <StatCarousel />
                </div>
            </header>

            {/* Main Content */}
            <main className="w-full bg-[#9b1c20]">
                <div className="max-w-[1400px] mx-auto py-6 px-6 rounded-2xl">
                    {/* Insurance Type Tabs */}
                    <div className='flex items-start justify-between'>
                        <p className='text-2xl max-w-sm mb-8 text-white'> Explore our wide range of offerings tailored to your insurance needs</p>
                    </div>
                    <div className="gap-2 grid grid-cols-3 lg:grid-cols-8 w-full pt-4 pb-4 rounded-lg ">
                        {tabs.map((tab) => (
                            <TabButton
                                key={tab.id}
                                id={tab.id}
                                label={tab.label}
                                icon={tab.icon}
                                active={activeTab === tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                slug={tabSlugMap[tab.id]}
                            />
                        ))}
                    </div>
                    <div className='flex items-start justify-end'>
                        <p className='text-xl underline max-w-sm mt-8 text-end text-white'> View all of our products</p>
                    </div>

                    {/* Quote Form Section */}
                   \
                </div>
            </main>
        </div>
    );
}