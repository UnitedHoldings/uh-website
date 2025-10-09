"use client"
import ProductsData from '@/components/ProductsData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RenderForm from '@/components/RenderForm';
import ProductBenefits from '@/components/ProductBenefits';
import ProductCoverage from '@/components/ProductCoverage';
import ProductExclusions from '@/components/ProductExclusions';
import ProductEligibility from '@/components/ProductEligibility';
import ProductHowToApply from '@/components/ProductHowToApply';
import ProductFAQs from '@/components/ProductFAQs';
import RelatedProducts from '@/components/RelatedProducts';
import { notFound } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import Agent from '@/components/Agent';

// Department color mapping
const DEPARTMENT_COLORS = {
    'Life Assurance': '#3d834d', // Green
    'General Insurance': '#286278', // Blue
    'Business Insurance': '#286379', // Blue (same as General Insurance)
    'Loans & Financing': '#f79620', // Gray
};

export default function ProductPage({ params }) {
    // Unwrap params if it's a Promise (Next.js 14+)
    const [tab, setTab] = useState('file');
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        amount: '',
        dob: '',
        vehicle: '',
        address: '',
    });

    const unwrappedParams = typeof params.then === 'function' ? React.use(params) : params;
    const product = ProductsData.find(
        p => p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === unwrappedParams.slug
    );
    if (!product) return notFound();

    // Get department color based on product category
    const getDepartmentColor = (productName) => {
        // Map product names to departments
        const productToDepartment = {
            // Life Assurance products
            'Life Assurance': 'Life Assurance',
            'Dignified Family Support Cover': 'Life Assurance',
            'Funeral Assurance': 'Life Assurance',
            'Dignified Tribute Cover': 'Life Assurance',
            
            // General Insurance products
            'Motor Insurance': 'General Insurance',
            'Home Insurance': 'General Insurance',
            'Legal Insurance': 'General Insurance',
            'Personal Accident Insurance': 'General Insurance',
            'Comprehensive Motor Insurance': 'General Insurance',
            'Third Party Motor Insurance': 'General Insurance',
            'Third Party, Fire & Theft Motor Insurance': 'General Insurance',
            'Buildings, Outbuildings & Contents Insurance': 'General Insurance',
            
            // Business Insurance products
            'Multimark Policy': 'Business Insurance',
            'Medical Malpractice Insurance': 'Business Insurance',
            'Professional Indemnity Insurance': 'Business Insurance',
            'Fidelity Guarantee Insurance': 'Business Insurance',
            'Political Violence & Terrorism Insurance': 'Business Insurance',
            'Engineering Policies & Guarantees': 'Business Insurance',
            'Contractor\'s All Risk': 'Business Insurance',
            'Business Interruption / Corporate Extensions': 'Business Insurance',
            
            // Loans & Financing products
            'Micro Loans': 'Loans & Financing',
            'Umlamleli Loan (Salary Advance)': 'Loans & Financing',
            'Shesha Loans': 'Loans & Financing',
        };

        const department = productToDepartment[productName] || 'General Insurance';
        return DEPARTMENT_COLORS[department] || '#9b1c20'; // Fallback to red
    };

    const departmentColor = getDepartmentColor(product.name);
    const isLightColor = departmentColor === '#f79620'; // United Pay is light gray

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="min-h-screen font-outfit mx-auto">
            <div className='bg-[#881a1e] h-8 w-full' />
            <div className='bg-[#9b1c20] py-4'>
                <header className="max-w-[1400px] mx-auto px-4">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white text-center md:text-left">
                        {product.tagline}
                    </h1>
                </header>
            </div>
            
            {/* Hero Section */}
            <div className='relative'>
                <div className='absolute w-full -z-10'>
                    <div className='bg-gradient-to-r absolute from-[#9b1c20]/20 to-[#9b1c20]/10 h-full w-full' />
                    <img 
                        src={product.heroImage} 
                        alt={product.name} 
                        className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[720px] object-cover"
                    />
                </div>
                
                <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-32 flex items-center">
                    <div className="max-w-[1400px] mx-auto px-4 w-full gap-8 sm:gap-12 md:gap-16 lg:gap-24 flex flex-col">
                        {/* Product Name */}
                        <div className='flex items-center justify-center text-center'>
                            <h1 className='font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-tight'>
                                {product.name}
                            </h1>
                        </div>
                        
                        {/* Quote Form Section */}
                        <div 
                            className="w-full px-4 sm:px-6 md:px-8 flex flex-col rounded-xl sm:rounded-2xl shadow-xl mx-auto text-white py-6 sm:py-8"
                            style={{ backgroundColor: departmentColor }}
                        >
                            <div className='space-y-3 sm:space-y-4 text-center sm:text-left'>
                                <p className='text-2xl sm:text-3xl md:text-4xl font-semibold max-w-lg mx-auto sm:mx-0'>
                                    Get hassle-free cover for all your needs
                                </p>
                                <p className='text-sm sm:text-base font-light max-w-md mx-auto sm:mx-0'>
                                    {product.tagline}
                                </p>
                            </div>
                            
                            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:items-center">
                                <form 
                                    onSubmit={handleSubmit} 
                                    className="bg-white w-full rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-4 items-center mx-auto text-black"
                                >
                                    <div className='w-full flex flex-col text-center sm:text-left'>
                                        <p className='text-xl sm:text-2xl md:text-3xl font-light mb-2'>
                                            Let&apos;s get started
                                        </p>
                                        <p className='font-semibold text-base sm:text-lg md:text-xl mb-4 sm:mb-6 md:mb-8'>
                                            Please complete the details of the person taking out the policy
                                        </p>
                                    </div>

                                    <RenderForm product={product} formData={formData} handleInputChange={handleInputChange} />
                                    
                                    <div className='w-full flex flex-col sm:flex-row gap-3 sm:gap-2 justify-center sm:justify-start mt-4 sm:mt-6'>
                                        {/* Request A Call Button */}
                                        <button
                                            type="button"
                                            className={`px-6 sm:px-8 py-2 sm:py-3 border rounded-full font-semibold transition flex-1 sm:flex-none text-sm sm:text-base ${
                                                isLightColor 
                                                    ? 'border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white' 
                                                    : `border-[${departmentColor}] text-[${departmentColor}] hover:bg-[${departmentColor}] hover:text-white`
                                            }`}
                                            style={!isLightColor ? {
                                                borderColor: departmentColor,
                                                color: departmentColor
                                            } : {}}
                                            onMouseOver={(e) => {
                                                if (!isLightColor) {
                                                    e.target.style.backgroundColor = departmentColor;
                                                    e.target.style.color = 'white';
                                                }
                                            }}
                                            onMouseOut={(e) => {
                                                if (!isLightColor) {
                                                    e.target.style.backgroundColor = 'white';
                                                    e.target.style.color = departmentColor;
                                                }
                                            }}
                                        >
                                            Request A Qoute
                                        </button>

                                        {/* Sign Me Up Today Button */}
                                        <button
                                            type="submit"
                                            className={`px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold transition flex-1 sm:flex-none text-sm sm:text-base ${
                                                isLightColor 
                                                    ? 'bg-gray-600 text-white hover:bg-white hover:text-gray-600 hover:border-gray-600 border' 
                                                    : `bg-[${departmentColor}] text-white hover:bg-white hover:text-[${departmentColor}] hover:border-[${departmentColor}] border`
                                            }`}
                                            style={!isLightColor ? {
                                                backgroundColor: departmentColor
                                            } : {}}
                                            onMouseOver={(e) => {
                                                if (!isLightColor) {
                                                    e.target.style.backgroundColor = 'white';
                                                    e.target.style.color = departmentColor;
                                                    e.target.style.borderColor = departmentColor;
                                                }
                                            }}
                                            onMouseOut={(e) => {
                                                if (!isLightColor) {
                                                    e.target.style.backgroundColor = departmentColor;
                                                    e.target.style.color = 'white';
                                                    e.target.style.borderColor = departmentColor;
                                                }
                                            }}
                                        >
                                            Sign Me Up Today
                                        </button>
                                    </div>

                                    {submitted && (
                                        <div className="text-green-700 text-sm mt-2 text-center sm:text-left">
                                            Quote request submitted! We&apos;ll contact you soon.
                                        </div>
                                    )}
                                </form>
                            </div>
                            
                            {/* Disclaimer */}
                            <div className={`text-xs mt-4 sm:mt-6 space-y-2 ${isLightColor ? 'text-gray-700' : 'text-gray-200'}`}>
                                <p className={`font-bold text-lg sm:text-xl ${isLightColor ? 'text-gray-800' : 'text-gray-100'}`}>
                                    Disclaimer
                                </p>
                                <p className='text-justify'>
                                    We value your privacy and are committed to safeguarding your personal information. By submitting your details, you consent to us processing them for the purpose of providing you with a personalized quote. Please note that some of our advisors operate under supervision to ensure consistently excellent service. Quoted premiums are based on your individual risk profile and are subject to annual review in line with economic conditions and underwriting criteria. Terms, conditions, and benefit limits apply. It is essential that all information provided is accurate, as discrepancies may impact the validity or outcome of any future claims.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details Sections */}
            <div className='max-w-[1400px] px-4 my-8 sm:my-12 md:my-16 space-y-6 mx-auto flex flex-col lg:flex-row'>
                {/* Left Column - Product Title */}
                <div className='lg:min-w-3/12 w-full lg:w-auto'>
                    <h2 className='font-semibold text-2xl sm:text-3xl lg:text-4xl text-center lg:text-left'>
                        {product.name}
                    </h2>
                    <p className='font-light text-gray-600 text-center lg:text-left mt-2'>
                        {product.tagline}
                    </p>
                    <div className="flex flex-col w-full justify-between py-4 lg:py-6"></div>
                </div>

                {/* Right Column - Content */}
                <div className='w-full lg:border-l lg:border-gray-400 lg:pl-6'>
                    <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div>
                            <p className="text-gray-500 max-w-4xl text-base sm:text-lg leading-relaxed">
                                {product.overview}
                            </p>
                        </div>
                        <div>
                            <div className="flex gap-3 sm:gap-4 mt-4 flex-wrap justify-center md:justify-start">
                                {product.stats && product.stats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div 
                                            className="text-white px-3 sm:px-4 py-2 rounded-full font-bold text-sm sm:text-base whitespace-nowrap"
                                            style={{ backgroundColor: departmentColor }}
                                        >
                                            {stat}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Additional Product Sections */}
            <div className='max-w-[1400px] px-4 mb-8 sm:mb-12 md:mb-16 mx-auto'>
                <ProductBenefits benefits={product.benefits} />
                <ProductEligibility eligibility={product.eligibility} />
                
                {/* Final CTA */}
                <div className="mt-12 sm:mt-16">
                    <Agent />
                </div>
            </div>
        </div>
    );
}