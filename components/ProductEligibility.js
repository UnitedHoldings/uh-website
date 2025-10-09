"use client"
import Link from 'next/link';
import React, { useState } from 'react';

export default function ProductEligibility({ eligibility }) {
    const [tab, setTab] = useState('file');

    if (!eligibility || eligibility.length === 0) return null;
    
    return (
        <section className="bg-white overflow-hidden">
            <div className='max-w-[1400px] px-4 my-8 sm:my-12 md:my-16 space-y-6 mx-auto flex flex-col lg:flex-row'>
                {/* Left Column - Title & Help Info */}
                <div className='lg:min-w-3/12 w-full lg:w-auto'>
                    <p className='font-semibold text-2xl sm:text-3xl lg:text-4xl text-center lg:text-left'>
                        Eligibility & Requirements
                    </p>
                    <div className="flex flex-col w-full justify-between py-4 lg:py-6">
                        <div className="text-sm text-gray-600 text-center lg:text-left mt-2 lg:mt-0">
                            <span className="font-semibold">Need help?</span> Call 800 1010 or email{' '}
                            <a 
                                href="mailto:info@united.co.sz" 
                                className="text-[#9b1c20] underline hover:text-[#881a1e]"
                            >
                                info@united.co.sz
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Column - Eligibility List */}
                <div className='w-full lg:border-l lg:border-gray-400 lg:pl-6'>
                    <div className="py-4">
                        <div className="p-4 sm:p-6 bg-gray-50 rounded-lg">
                            <ul className="list-disc pl-5 space-y-2 sm:space-y-3">
                                {eligibility.map((item, index) => (
                                    <li 
                                        key={index} 
                                        className="text-gray-700 text-base sm:text-lg leading-relaxed"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}