"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

export default function PolicyPage() {
    const [activePolicy, setActivePolicy] = useState('');
    const [pageData, setPageData] = useState(null);
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/policies`);
                const result = await response.json();
                
                if (result.success) {
                    setPageData(result.data.pageConfig);
                    setPolicies(result.data.policies);
                    
                    // Set first policy as active if available
                    if (result.data.policies.length > 0) {
                        setActivePolicy(result.data.policies[0].id);
                    }
                }
            } catch (error) {
     
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen font-outfit mx-auto flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9b1c20] mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading policies...</p>
                </div>
            </div>
        );
    }

    if (!pageData || !policies.length) {
        return (
            <div className="min-h-screen font-outfit mx-auto flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Failed to load policies. Please try again later.</p>
                </div>
            </div>
        );
    }

    const getPolicyById = (id) => policies.find(policy => policy.id === id);

    return (
        <div className="min-h-screen font-outfit mx-auto">
            {/* Top red bar */}
            <div className='bg-[#881a1e] h-8 w-full' />
            
            {/* Header section */}
            <div className='bg-[#9b1c20] py-4'>
                <header className="max-w-[1400px] mx-auto px-4">
                    <h1 className="text-2xl md:text-4xl font-semibold text-white">{pageData.headerTitle}</h1>
                    <p className="text-sm text-white">{pageData.headerSubtitle}</p>
                </header>
            </div>
            
            {/* Hero banner with image */}
            <div className='relative'>
                <div className='bg-gradient-to-r absolute from-[#9b1c20]/60 to-[#9b1c20]/20 h-full w-full' />
                <Image 
                    src={'/legal.jpg'} 
                    alt="Policy Information" 
                    width={1920} 
                    height={400} 
                    className="w-full h-[320px] object-cover" 
                />

                <div className="absolute right-[10%] top-[20%] flex items-center">
                    <div className="max-w-[1100px] mx-auto px-4 w-full">
                        <div className="bg-[#9b1c20] px-8 flex flex-col mx-auto text-white py-8">
                            <div className='left-[13%] space-y-4 top-[30%] text-white'>
                                <p className='text-4xl max-w-96 font-semibold'>{pageData.heroTitle}</p>
                                <p className='text-sm font-light'>{pageData.heroDescription}</p>
                            </div>
                            
                            <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center">
                                <label className="sr-only">Select Policy</label>
                                <select
                                    value={activePolicy}
                                    onChange={(e) => {
                                        setActivePolicy(e.target.value);
                                    }}
                                    className="rounded-full px-4 py-2 min-w-[300px] bg-white border text-gray-800"
                                >
                                    {policies.map((policy) => (
                                        <option key={policy.id} value={policy.id}>
                                            {policy.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Main content area */}
            <div className='max-w-[1400px] px-4 mt-8 mb-16 space-y-6 mx-auto'>
                <div className="flex justify-between items-center md:flex-row md:items-center gap-4 md:gap-8">
                    <p className='max-w-[800px] text-2xl'>
                        {pageData.introductionText.replace(
                            pageData.highlightedText, 
                            pageData.highlightedText
                        )}
                        <span className="text-[#9b1c20] font-semibold"> {pageData.highlightedText}</span>
                    </p>
                </div>
            </div>
            
            {/* Policy tabs and content */}
            <div className="bg-white overflow-hidden">
                <div className='max-w-[1400px] px-4 mt-8 mb-16 space-y-6 mx-auto flex flex-col md:flex-row'>
                    {/* Tab navigation */}
                    <div className='md:w-4/12 mb-6 md:mb-0'>
                        <p className='font-semibold text-3xl'>Our Policies</p>
                        <div className="flex flex-col w-full justify-between py-6">
                            <nav className="flex flex-col gap-2">
                                {policies.map((policy) => (
                                    <button
                                        key={policy.id}
                                        onClick={() => {
                                            setActivePolicy(policy.id);
                                        }}
                                        className={`px-4 py-3 rounded-full transition text-left ${
                                            activePolicy === policy.id 
                                                ? 'bg-[#9b1c20] text-white' 
                                                : 'bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        {policy.name}
                                    </button>
                                ))}
                            </nav>
                            <div className="text-sm text-gray-600 mt-6">
                                <span className="font-semibold">Need help?</span> Call {pageData.contactPhone} or email <a href={`mailto:${pageData.contactEmail}`} className="text-[#9b1c20] underline">{pageData.contactEmail}</a>
                            </div>
                        </div>
                    </div>

                    {/* Policy content */}
                    <div className='md:w-8/12 md:border-l md:border-gray-400 md:pl-6'>
                        <div className="py-4">
                            {policies.map((policy) => (
                                activePolicy === policy.id && (
                                    <div key={policy.id} className="policy-content">
                                        <h2 className="text-2xl font-semibold mb-4 text-[#9b1c20]">{policy.title}</h2>
                                        <p className="text-gray-600 mb-6">Effective Date: {policy.effectiveDate}</p>
                                        
                                        <div className="prose max-w-none">
                                            <ReactMarkdown
                                                components={{
                                                    h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-6 mb-4 text-[#881a1e]" {...props} />,
                                                    h2: ({node, ...props}) => <h2 className="text-xl font-semibold mt-5 mb-3 text-[#881a1e]" {...props} />,
                                                    h3: ({node, ...props}) => <h3 className="text-lg font-semibold mt-4 mb-2 text-[#881a1e]" {...props} />,
                                                    p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
                                                    ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
                                                    li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                                                    strong: ({node, ...props}) => <strong className="font-semibold" {...props} />,
                                                }}
                                            >
                                                {policy.content}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}