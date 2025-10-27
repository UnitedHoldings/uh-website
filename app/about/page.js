'use client'
import Agent from '@/components/Agent';
import Products from '@/components/Products';
import SeoHead from '@/components/SEOhead';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { trackEvent, trackPageDuration } from '@/lib/posthog';

export default function About() {
    // Track page duration
    useEffect(() => {
        const stopTracking = trackPageDuration('about_our_journey');
        return () => stopTracking();
    }, []);

    return (
        <>

            <div className="min-h-screen font-outfit mx-auto">
                {/* Header Section */}
                <div className='bg-[#881a1e] h-6 sm:h-8 w-full' />
                <div className='bg-[#9b1c20] py-4 sm:py-6'>
                    <header className="max-w-[1400px] mx-auto px-4 sm:px-6">
                        <h1 className="text-xl sm:text-2xl md:text-4xl font-semibold text-white text-center sm:text-left">
                            About United Holdings
                        </h1>
                        <p className="text-xs sm:text-sm text-white text-center sm:text-left mt-2">
                            Learn about our purpose, values and commitment to Eswatini.
                        </p>
                    </header>
                </div>
               {/* Hero Image */}
                <div className='relative'>
                    <Image
                        src={'/mall.png'}
                        alt="About hero"
                        width={1920}
                        height={360}
                        className="w-full h-[200px] sm:h-[280px] md:h-[320px] object-cover"
                        priority
                    />
                </div>

                {/* Client Area Section */}
                <div className='w-full bg-[#9b1c20] py-6 sm:py-8 mb-6 sm:mb-8'>
                    <div className='max-w-[1400px] mx-auto px-4 sm:px-6 space-y-4 sm:space-y-6'>
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8">
                            <p className='max-w-[800px] text-white text-lg sm:text-xl md:text-2xl text-center sm:text-left'>
                                Most claims, including home, life, funeral, vehicles can be taken care of in{' '}
                                <span className="hover:underline cursor-pointer font-semibold">My Account</span>.
                                Check out the information below for other claims that are handled a little differently.
                            </p>
                            <Link href={'../../contact'} >
                                <div className="flex-shrink-0">
                                    <button className='border-white border text-white py-2 px-6 sm:px-8 rounded-full text-sm sm:text-base hover:bg-white hover:text-[#9b1c20] transition-colors'>
                                        Find Us
                                    </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>



                {/* About Us Section */}
                <div className="bg-white overflow-hidden">
                    <div className='max-w-[1400px] px-4 sm:px-6 mt-6 sm:mt-8 mb-12 mx-auto flex flex-col lg:flex-row'>
                        <div className='lg:min-w-[300px] lg:pr-8'>
                            <p className='font-semibold text-4xl sm:text-3xl text-left'>About Us</p>
                            <div className="flex flex-col w-full justify-between py-4 sm:py-6"></div>
                        </div>
                        <div className='w-full lg:border-l lg:border-gray-400 lg:pl-6'>
                            <h2 className="text-2xl font-semibold text-left ">Our Journey</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 py-4 sm:py-6">
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    United Holdings Ltd – Live With Purpose.
                                    United Holdings is a proudly Eswatini‑owned financial services group that has steadily grown into one of the Kingdom&apos;s most trusted providers of insurance and financial solutions. Since acquiring our operating license in 2016, we have been on a mission to transform the way individuals, families, and businesses access financial protection.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    Our story is one of resilience, innovation, and deep commitment to the people of Eswatini. We were founded on the belief that financial services should not be a privilege for the few, but a right for all. Today, we stand as a diversified group under the Dups Group of Companies, offering a wide range of products that address both short‑term and long‑term financial needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vision & Mission Section */}
                <div className="bg-white overflow-hidden">
                    <div className='max-w-[1400px] px-4 sm:px-6 mb-12 sm:mb-16 space-y-6 py-12 mx-auto flex flex-col lg:flex-row'>
                        <div className='lg:min-w-[300px] lg:pr-8'>
                            <p className='font-semibold text-4xl'>
                                Our Vision & Mission
                            </p>
                            <div className="flex flex-col w-full justify-between py-4 sm:py-6"></div>
                        </div>

                        <div className='w-full lg:border-l lg:border-gray-400 lg:pl-6'>
                            <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-semibold mb-3  md:text-left">
                                        Our Vision
                                    </h2>
                                    <p className="text-gray-700 text-lg leading-relaxed">
                                        To be the leading customer‑centric financial services provider in Eswatini and beyond, setting the standard for trust, innovation, and inclusivity.
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-semibold mb-3  md:text-left">
                                        Our Mission
                                    </h2>
                                    <p className="text-gray-700 text-lg leading-relaxed">
                                        We exist to uplift lives by delivering affordable, accessible, and innovative financial services. By being an employer of choice and a partner to communities, we ensure that our growth is shared with the people and places we serve.
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

                {/* Group of Companies Section */}
                <main className="px-4 sm:px-6 py-8 sm:py-12 bg-[#9b1c20]">
                    <section className="max-w-[1400px] mx-auto rounded-lg">
                        <h2 className="text-xl sm:text-2xl font-thin mb-6 text-white text-center sm:text-left">
                            Our Group of Companies
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {/* United Life Assurance */}
                            <div className="bg-white shadow-sm overflow-hidden rounded-lg hover:shadow-lg transition-shadow duration-300">
                                <div className="h-48 flex-col sm:h-60 w-full rounded-t-lg relative bg-gradient-to-br flex items-center justify-center p-4">

                                    <Image
                                        src={'/life2.jpg'}
                                        alt="UGI Logo"
                                        width={400}
                                        height={400}
                                        className="w-full h-auto my-8"
                                    />
                                    <div className="text-start w-full">

                                        <h3 className="text-[#3d834d] font-semibold text-2xl">United Life Assurance</h3>
                                    </div>
                                </div>
                                <div className="p-4 sm:p-6">
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        Offering long‑term insurance solutions such as funeral plans, credit life, and group life cover. These products provide families with dignity, security, and peace of mind during life&apos;s most challenging moments.
                                    </p>
                                    <Link
                                        href="/united-life-assurance"
                                        className="inline-block mt-4 text-[#3d834d] font-semibold hover:underline"
                                        onClick={() => trackEvent('group_of_companies_clicked', {
                                            company_name: 'United Life Assurance',
                                            location: 'about_page',
                                            page_section: 'group_of_companies'
                                        })}
                                    >
                                        Learn more →
                                    </Link>
                                </div>
                            </div>

                            {/* United General Insurance */}
                            <div className="bg-white shadow-sm overflow-hidden rounded-lg hover:shadow-lg transition-shadow duration-300">
                                <div className="h-48 flex-col sm:h-60 w-full rounded-t-lg relative bg-gradient-to-br flex items-center justify-center p-4">

                                    <Image
                                        src={'/general.jpg'}
                                        alt="UGI Logo"
                                        width={400}
                                        height={400}
                                        className="w-full h-auto my-8"
                                    />
                                    <div className="text-start w-full">
                                        <h3 className="text-[#9b1c20] font-semibold text-2xl">United General Insurance</h3>
                                    </div>
                                </div>
                                <div className="p-4 sm:p-6">
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        Providing short-term insurance for motor, home, legal, and business protection. We safeguard the assets and livelihoods of our clients, ensuring they can recover quickly from unexpected events.
                                    </p>
                                    <Link
                                        href="/united-general-insurance"
                                        className="inline-block mt-4 text-[#9b1c20] font-semibold hover:underline"
                                        onClick={() => trackEvent('group_of_companies_clicked', {
                                            company_name: 'United General Insurance',
                                            location: 'about_page',
                                            page_section: 'group_of_companies'
                                        })}
                                    >
                                        Learn more →
                                    </Link>
                                </div>
                            </div>

                            {/* United Pay */}
                            <div className="bg-white shadow-sm overflow-hidden rounded-lg hover:shadow-lg transition-shadow duration-300">
                                <div className="h-48 flex-col sm:h-60 w-full rounded-t-lg relative bg-gradient-to-br flex items-center justify-center p-4">
                                    <Image
                                        src={'/Pay.jpg'}
                                        alt="UGI Logo"
                                        width={400}
                                        height={400}
                                        className="w-full h-auto  my-8"
                                    />
                                    <div className="text-start w-full">
                                        <h3 className="text-[#f79620] font-semibold text-lg sm:text-xl">United Pay</h3>
                                    </div>
                                </div>
                                <div className="p-4 sm:p-6">
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        Delivering fast, reliable cash loans with flexible repayment options. This service empowers individuals and small businesses to access credit when they need it most.
                                    </p>
                                    <Link
                                        href="/united-pay"
                                        className="inline-block mt-4 text-[#f79620] font-semibold hover:underline"
                                        onClick={() => trackEvent('group_of_companies_clicked', {
                                            company_name: 'United Pay',
                                            location: 'about_page',
                                            page_section: 'group_of_companies'
                                        })}
                                    >
                                        Learn more →
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <p className="mt-4 sm:mt-6 text-white text-sm sm:text-base text-center sm:text-left">
                            Together, these subsidiaries make United Holdings a one‑stop partner for financial security, ensuring that our clients can plan, protect, and prosper.
                        </p>
                    </section>
                </main>





                {/* Final CTA */}
                <div className="bg-[#9b1c20] py-8 sm:py-12">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                            Ready to Get Started?
                        </h2>
                        <p className="text-white text-lg mb-6 max-w-2xl mx-auto">
                            Join thousands of satisfied clients who trust United Holdings with their financial security.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">

                            <Link
                                href="/contact"
                                className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#9b1c20] transition-colors"
                                onClick={() => trackEvent('contact_us_clicked', {
                                    location: 'about_page',
                                    page_section: 'cta_footer'
                                })}
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>


            </div>
        </>

    );
}