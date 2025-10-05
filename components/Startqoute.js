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
        className={`flex flex-col items-center justify-end h-[150px] relative w-full  py-4 px-2 bg-[#9b1c20]  inset-shadow-2xs shadow  transition-all duration-200 ${active
            ? ' text-white bg-[#9b1c20] shadow-lg transform -translate-y-1'
            : ' bg-white text-gray-700 hover:bg-gray-200 hover:shadow-md'
            }`}
        onClick={onClick}
    >

        <div className=' flex flex-col h-full  items-center justify-between w-full '>
            <div className='w-full flex justify-start'>
                <div className="text-4xl mb-2  top-0 text-white bg-[#9b1c20] p-2 rounded-full left-0">{icon}</div>
            </div>
            <div className='w-full flex justify-start'>
                <span className="font-medium text-2xl bg">{label}</span>
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
        { id: 'life', label: 'Life', icon: <IoHeartOutline className="text-2xl" /> },
        { id: 'car', label: 'Car', icon: <IoCarSportOutline className="text-2xl" /> },
        { id: 'home', label: 'Home', icon: <IoHomeOutline className="text-2xl" /> },
        { id: 'business', label: 'Business', icon: <IoBriefcaseOutline className="text-2xl" /> },
        { id: 'funeral', label: 'Funeral', icon: <PiCrossLight className="text-2xl" /> },
        { id: 'legal', label: 'Legal', icon: <GoLaw className="text-2xl" /> },
        { id: 'professional', label: 'Professional', icon: <GrUserWorker className="text-2xl" /> },
        { id: 'micro', label: 'Micro Loans', icon: <IoCashOutline className="text-2xl" /> },
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

    return (
        <div className="min-h-screen  w-full mx-auto bg-[#9b1c20]  flex flex-col ">
            {/* Header */}
            <header className="max-w-[1400px] w-full  border-b border-gray-200 mx-auto">
                <div className="container mx-auto  py-4 flex pb-12 justify-between items-center">
                    <div className="text-5xl text-white">
                        <p> Lets get you the <span className="text-white font-bold">Cover</span> You Deserve... <br />and<span className="text-white font-bold"> Sign you up</span>  Today!</p>
                    </div>
                    <nav className="hidden md:flex space-x-6">
                        <a href="#home" className="text-gray-600 hover:text-[#9b1c20] transition-colors">Home</a>
                        <a href="#insurance" className="text-gray-600 hover:text-[#9b1c20] transition-colors">Insurance</a>
                        <a href="#claims" className="text-gray-600 hover:text-[#9b1c20] transition-colors">Claims</a>
                        <a href="#contact" className="text-gray-600 hover:text-[#9b1c20] transition-colors">Contact</a>
                    </nav>

                </div>
            </header>

            {/* Main Content */}
            <main className="w-full px-8 py-8 bg-[#9b1c20]">
                <div className=" max-w-[1400px] mx-auto">
                    {/* Insurance Type Tabs */}
                    <p className='text-xl text-white font-semibold'> Products</p>
                    <div className="flex gap-2  justify-between w-full  pt-4 pb-4 rounded-lg ">
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

                    {/* Quote Form */}
                    <div className='bg-white  p-6  '>

                        <form className="space-y-6  border border-gray-200 rounded-lg  py-8 px-8  " onSubmit={handleSubmit}>
                            {/* Common Fields */}
                            <div className='flex font-bold text-[#9b1c20] text-2xl pb-6'>
                                <p>Please enter your details to get a quote</p>
                            </div>
                            <div className="grid grid-cols-3 md:grid-cols-3 gap-6 mb-6">
                                <InputField label="Full Name" name="name" value={formData.name} onChange={handleInputChange} required />
                                <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                                <InputField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
                            </div>

                            {/* Insurance-Specific Fields */}
                            {renderForm()}

                            <div className='flex space-x-4'>
                                <button
                                    type="submit"
                                    className="w-full text-white hover:bg-gray-100 bg-[#9b1c20] font-bold py-3 px-4 rounded-full transition-colors shadow-md mt-6"
                                >
                                    Sign me Up
                                </button>
                                <button
                                    type="submit"
                                    className="w-full text-[#9b1c20] hover:bg-gray-100 border border-[#9b1c20] font-bold py-3 px-4 rounded-full transition-colors shadow-md mt-6"
                                >
                                    Get My Quote
                                </button>
                            </div>
                        </form>
                        <div className='px-8 py-8 space-y-1'>
                            <p className='font-black text-sm text-gray-700'>Disclaimer</p>
                            <p className='text-xs text-gray-600'>The quote provided is an indicative estimate based on the information you supplied and is not a binding insurance contract. Final terms, coverage and premium are subject to verification, underwriting and acceptance by United Holdings. Additional exclusions, limits, fees or taxes may apply. Submitting a quote request does not create coverage. Provide accurate information — misrepresentation may affect eligibility or claims. For a binding policy you must complete a formal proposal, payment and receive official policy documents. By requesting a quote you consent to processing your personal data in accordance with our Privacy Policy. For help, please use the Contact page.</p>
                        </div>
                    </div>
                </div>

            </main>


        </div>
    );
}
