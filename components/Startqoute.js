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
import { PiCrossLight } from "react-icons/pi";
import { GoLaw } from "react-icons/go";
import { GrUserWorker } from "react-icons/gr";
import Agent from './Agent';
import ProductsData from './ProductsData';
import { BsPlus } from 'react-icons/bs';

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
            className="w-full px-4 py-2  bg-white border-gray-200 border rounded-xl placeholder-gray-800  "
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
            className="w-full px-4 py-2  bg-white border-gray-200 border rounded-xl placeholder-gray-800  "
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

// Reusable Textarea Field Component
const TextareaField = ({ label, name, value, onChange, rows = 3, className = '' }) => (
    <div className={className}>
        <label className="block text-sm font-medium text-gray-800  mb-1">{label}</label>
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            rows={rows}
            className="w-full px-4 py-2 rounded-md"
        />
    </div>
);

// Reusable Checkbox Group Component
const CheckboxGroup = ({ label, name, options, value = [], onChange, className = '', gridCols = 'grid-cols-2 md:grid-cols-4' }) => (
    <div className={className}>
        <label className="block text-sm font-medium text-gray-800 mb-2">{label}</label>
        <div className={`grid ${gridCols} gap-2`}>
            {options.map((option) => (
                <label key={option.value} className="flex items-center">
                    <input
                        type="checkbox"
                        name={name}
                        value={option.value}
                        checked={value.includes(option.value)}
                        onChange={onChange}
                        className="mr-2"
                    />
                    <span className="text-gray-800">{option.label}</span>
                </label>
            ))}
        </div>
    </div>
);

// Reusable Tab Button Component
const TabButton = ({ id, label, icon, active, onClick }) => (
    <button
        className={`flex flex-col items-center justify-center h-[150px] w-[150px] rounded-full relative   py-4 px-2   transition-all duration-200 ${active
            ? ' text-[#9b1c20] bg-white shadow-lg transform -translate-y-1'
            : '  text-white border border-white hover:bg-[#801619] hover:-translate-y-2 transition-all  ease-in-out hover:shadow-md'
            }`}
        onClick={onClick}
    >

        <div className=' flex flex-col h-full  items-center justify-center  w-full '>
            <div className='w-full '>
                <div className="text-6xl   top-0  flex justify-center p-2 rounded-full left-0">{icon}</div>
            </div>
            <div className='w-full '>
                <span className="font-medium text-lg bg">{label}</span>
            </div>
        </div>
    </button>
);

export default function StartQuote() {
    const [activeTab, setActiveTab] = useState('car');
    const [formData, setFormData] = useState({
        // Common fields
        name: '',
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
        loanAddons: []
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
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Quote request submitted! We will contact you shortly.');
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

    // Render the appropriate form based on activeTab using reusable components
    const renderForm = () => {
        switch (activeTab) {
            case 'life':
                return (
                    <div className="grid grid-cols-3 md:grid-cols-2 gap-6">
                        <InputField label="Date of Birth" name="lifeDob" type="date" value={formData.lifeDob} onChange={handleInputChange} required />
                        <SelectField
                            label="Gender"
                            name="lifeGender"
                            value={formData.lifeGender}
                            onChange={handleInputChange}
                            options={[
                                { value: '', label: 'Select Gender' },
                                { value: 'male', label: 'Male' },
                                { value: 'female', label: 'Female' },
                                { value: 'other', label: 'Other' }
                            ]}
                            required
                        />
                        <InputField label="Coverage Amount (SZL)" name="lifeCoverageAmount" type="number" value={formData.lifeCoverageAmount} onChange={handleInputChange} required />
                    </div>
                );

            case 'health':
                return (
                    <div className="grid grid-cols-3 md:grid-cols-2 gap-6">
                        <InputField label="Date of Birth" name="healthDob" type="date" value={formData.healthDob} onChange={handleInputChange} required />
                        <SelectField
                            label="Gender"
                            name="healthGender"
                            value={formData.healthGender}
                            onChange={handleInputChange}
                            options={[
                                { value: '', label: 'Select Gender' },
                                { value: 'male', label: 'Male' },
                                { value: 'female', label: 'Female' },
                                { value: 'other', label: 'Other' }
                            ]}
                            required
                        />
                        <SelectField
                            label="Coverage Type"
                            name="healthCoverageType"
                            value={formData.healthCoverageType}
                            onChange={handleInputChange}
                            options={[
                                { value: 'individual', label: 'Individual' },
                                { value: 'family', label: 'Family' }
                            ]}
                            required
                        />
                    </div>
                );

            case 'car':
                return (
                    <div className="grid grid-cols-3 md:grid-cols-2 gap-6">
                        <SelectField
                            label="Vehicle Type"
                            name="vehicleType"
                            value={formData.vehicleType}
                            onChange={handleInputChange}
                            options={[
                                { value: 'car', label: 'Car' },
                                { value: 'suv', label: 'SUV' },
                                { value: 'truck', label: 'Truck' },
                                { value: 'motorcycle', label: 'Motorcycle' }
                            ]}
                            required
                        />
                        <InputField label="Vehicle Make" name="vehicleMake" value={formData.vehicleMake} onChange={handleInputChange} required />
                        <InputField label="Year" name="vehicleYear" type="number" value={formData.vehicleYear} onChange={handleInputChange} required />
                        <InputField label="Estimated Vehicle Value (SZL)" name="vehicleValue" type="number" value={formData.vehicleValue} onChange={handleInputChange} required />
                    </div>
                );

            case 'home':
                return (
                    <div className="grid grid-cols-3 md:grid-cols-2 gap-6">
                        <InputField label="Property Address" name="homeAddress" value={formData.homeAddress} onChange={handleInputChange} required className="md:col-span-2" />
                        <SelectField
                            label="Ownership Status"
                            name="homeOwnership"
                            value={formData.homeOwnership}
                            onChange={handleInputChange}
                            options={[
                                { value: 'owned', label: 'Owned' },
                                { value: 'mortgaged', label: 'Mortgaged' },
                                { value: 'rented', label: 'Rented' }
                            ]}
                            required
                        />
                        <InputField label="Estimated Property Value (SZL)" name="homePropertyValue" type="number" value={formData.homePropertyValue} onChange={handleInputChange} required />
                        <SelectField
                            label="Coverage Type"
                            name="homeCoverageType"
                            value={formData.homeCoverageType}
                            onChange={handleInputChange}
                            options={[
                                { value: 'building', label: 'Building Only' },
                                { value: 'contents', label: 'Contents Only' },
                                { value: 'both', label: 'Both' }
                            ]}
                            required
                        />
                    </div>
                );

            case 'business':
                return (
                    <div className="grid grid-cols-3 md:grid-cols-2 gap-6">
                        <InputField label="Business Name" name="businessName" value={formData.businessName} onChange={handleInputChange} required />
                        <InputField label="Owner's Name" name="businessOwner" value={formData.businessOwner} onChange={handleInputChange} required />
                        <SelectField
                            label="Business Type"
                            name="businessType"
                            value={formData.businessType}
                            onChange={handleInputChange}
                            options={[
                                { value: 'retail', label: 'Retail' },
                                { value: 'services', label: 'Services' },
                                { value: 'manufacturing', label: 'Manufacturing' },
                                { value: 'other', label: 'Other' }
                            ]}
                            required
                        />
                        <InputField label="Estimated Annual Revenue (SZL)" name="businessRevenue" type="number" value={formData.businessRevenue} onChange={handleInputChange} required />
                    </div>
                );

            // Placeholder for other forms (funeral, legal, professional, micro) - can be implemented similarly using reusable components
            default:
                return (
                    <div className="grid grid-cols-3 md:grid-cols-2 gap-6">
                        <InputField label="Contact Name" name="name" value={formData.name} onChange={handleInputChange} />
                        <InputField label="Contact Phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                        <p className="text-white text-center py-4 md:col-span-2">Select a product tab to show a brief quote form.</p>
                    </div>
                );
        }
    };


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

    // Animate stat value
    const [displayValue, setDisplayValue] = useState(statsData[0].value);
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
        // Format number with commas
        const formatNumber = (num) => {
            if (typeof num === 'number') {
                return num.toLocaleString();
            }
            return num;
        };
        return (
            <div className="flex flex-col items-center justify-center min-w-[180px] px-8 py-4">
                <div className={`text-5xl font-bold ${stat.color}`}>{stat.prefix || ''}{formatNumber(displayValue)}{stat.suffix || ''}</div>
                <div className="text-gray-600 text-base mt-2 text-center">{stat.label}</div>
            </div>
        );
    };

    return (
        <div className="  w-full mx-auto text-[#9b1c20]  flex flex-col ">
            {/* Header */}
            <header className="max-w-[1400px] w-full border-b border-gray-200 mx-auto">
                <div className="container mx-auto px-4 pb-8 flex  md:flex-row justify-between items-center ">
                    <div className="text-4xl text-[#9b1c20]  md:mb-0">
                        <p> Lets get you the <span className="text-[#9b1c20] font-semibold">Cover</span> You Deserve... <br />and<span className="text-[#9b1c20] font-semibold"> Sign you up</span>  Today!</p>
                    </div>
                    <StatCarousel />
                </div>
            </header>


            {/* Main Content */}
            <main className="w-full   bg-[#9b1c20]">
                <div className=" max-w-[1400px] mx-auto  py-6 px-6 rounded-2xl">
                    {/* Insurance Type Tabs */}
                    <div className='flex  items-start justify-between  '>

                        <p className='text-2xl max-w-sm mb-8  text-white '> Explore our wide range of offerings tailored to your insurance needs</p>

                    </div>
                    <div className="gap-2 grid  grid-cols-3 lg:grid-cols-8  w-full  pt-4 pb-4 rounded-lg ">
                        {tabs.map((tab) => (
                            <TabButton
                                key={tab.id}
                                id={tab.id}
                                label={tab.label}
                                icon={tab.icon}
                                active={activeTab === tab.id}
                                onClick={() => setActiveTab(tab.id)}
                            />
                        ))}
                    </div>
                    <div className='flex  items-start justify-end  '>
                        <p className='text-xl underline max-w-sm mt-8 text-end text-white '> View all of our products</p>

                    </div>

                    {/* Quote Form */}

                </div>
            </main>


        </div>
    );
}
