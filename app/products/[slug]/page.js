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

export default function ProductPage({ params }) {
    // Unwrap params if it's a Promise (Next.js 14+)
    const [tab, setTab] = useState('file');

    const unwrappedParams = typeof params.then === 'function' ? React.use(params) : params;
    const product = ProductsData.find(
        p => p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === unwrappedParams.slug
    );
    if (!product) return notFound();

    // --- Dynamic Quote Form State & Logic ---
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        // Add more fields as needed for each product type
        amount: '',
        dob: '',
        vehicle: '',
        address: '',
    });
    const [submitted, setSubmitted] = useState(false);
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
                <header className=" max-w-[1400px] mx-auto">
                    <h1 className="text-2xl md:text-4xl font-semibold text-white"> {product.tagline}</h1>
                </header>
            </div>
            <div className='relative'>
                <div className='absolute w-full -z-10' >
                    <div className='bg-gradient-to-r absolute from-[#9b1c20]/20 to-[#9b1c20]/10 h-full w-full' />
                    <img src={product.heroImage} alt={product.name} className="w-full h-[720px] object-cover" />
                </div>
                <div className=" pt-32 flex items-center">
                    <div className="max-w-[1400px] mx-auto px-4 w-full gap-32 flex flex-col">
                        <div className='flex items-center justify-center'>
                            <p className='font-bold text-white text-8xl'>{product.name}</p>
                        </div>
                        <div className="bg-[#9b1c20] w-full  px-8 flex flex-col rounded-2xl shadow-xl mx-auto text-white py-8">
                            <div className='left-[13%] space-y-4 top-[30%] text-white '>
                                <p className='text-4xl max-w-lg font-semibold'>Get hassle-free cover for all your needs</p>
                                <p className='text-sm font-light'>{product.tagline}</p>
                            </div>
                            <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center">
                                <form onSubmit={handleSubmit} className="bg-white w-full rounded-lg shadow-lg p-8 flex flex-col gap-2 items-center  mx-auto text-black">
                                    <div className='w-full flex flex-col'>
                                        <p className=' text-3xl font-light mb-2'>Let's get started</p>
                                        <p className='font-semibold text-lg mb-8'>Please complete the details of the person taking out the policy (e.g. policyholder)</p>
                                    </div>
                                    <div className='h-[0.5px] w-full bg- mt-1' />

                                    <RenderForm product={product} formData={formData} handleInputChange={handleInputChange} />
                                    <button type="submit" className="btn-primary w-full">Get Instant Quote</button>

                                    {submitted && <div className="text-green-700 text-sm mt-2">Quote request submitted! We'll contact you soon.</div>}
                                </form>
                            </div>
                            <div className='text-xs  text-gray-300 mt-4 space-y-1'>
                                <p className='font-bold text-xl text-gray-200'>Disclaimer</p>
                                <p>We value your privacy and are committed to safeguarding your personal information. By submitting your details, you consent to us processing them for the purpose of providing you with a personalized quote. Please note that some of our advisors operate under supervision to ensure consistently excellent service. Quoted premiums are based on your individual risk profile and are subject to annual review in line with economic conditions and underwriting criteria. Terms, conditions, and benefit limits apply. It is essential that all information provided is accurate, as discrepancies may impact the validity or outcome of any future claims.</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Product Details Sections */}

            <div className='max-w-[1400px] px-4   my-16 space-y-6 mx-auto flex'>
                <div className='min-w-3/12'>
                    <p className='font-semibold text-3xl'>{product.name}</p>
                    <p className='font-light text-gray-600'>{product.tagline}</p>
                    <div className="flex flex-col  w-full justify-between py-6 ">


                    </div>
                </div>

                <div className='w-full border-l border-gray-400 pl-6'>
                    <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-gray-500 max-w-4xl text-lg">{product.overview}</p>
                        </div>
                        <div>
                            <div className="flex gap-4 mt-4 flex-wrap">
                                {product.stats && product.stats.map(stat => (
                                    <div key={stat} className="text-center">
                                        <div className="text- bg-[#9b1c20] text-white px-4 rounded-full py-2 font-bold">{stat}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <div className='max-w-[1400px] px-4 mb-16  mx-auto'>
                <ProductBenefits benefits={product.benefits} />
                <ProductEligibility eligibility={product.eligibility} />
                {/* Final CTA */}
            <Agent />
                
            </div>
        </div>
    );
}
