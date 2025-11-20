'use client'
import Agent from '@/components/Agent';
import Products from '@/components/Products';
import SeoHead from '@/components/SEOhead';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { trackEvent, trackPageDuration } from '@/lib/posthog';



export default function About() {
  const [aboutData, setAboutData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  // Track page duration
  useEffect(() => {
    const stopTracking = trackPageDuration('about_our_journey');
    return () => stopTracking();
  }, []);

  // Fetch data from API
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/about-page`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.data.length > 0) {
          setAboutData(data.data[0]);
        } else {
          throw new Error('No data available');
        }
      } catch (err) {
        console.error('Error fetching about page data:', err);
        setError('Failed to load page content');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Show error state
  if (error || !aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error || 'Failed to load content'}</div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen font-outfit mx-auto">
        {/* Header Section */}
        <div className='bg-[#881a1e] h-6 sm:h-8 w-full' />
        <div className='bg-[#9b1c20] py-4 sm:py-6'>
          <header className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-semibold text-white text-center sm:text-left">
              {aboutData.headerTitle}
            </h1>
            <p className="text-xs sm:text-sm text-white text-center sm:text-left mt-2">
              {aboutData.headerSubtitle}
            </p>
          </header>
        </div>

        {/* Hero Image */}
        <div className='relative'>
          <Image
            src={aboutData.headerImage.asset.url}
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
                {aboutData.claimsBannerText}
              </p>
              <Link href={aboutData.claimsCTALink}>
                <div className="flex-shrink-0">
                  <button className='border-white border text-white py-2 px-6 sm:px-8 rounded-full text-sm sm:text-base hover:bg-white hover:text-[#9b1c20] transition-colors'>
                    {aboutData.claimsCTAText}
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
              <h2 className="text-2xl font-semibold text-left ">{aboutData.journeyHeading}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 py-4 sm:py-6">
                {aboutData.journeyParagraphs.slice(0, 2).map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed text-lg">
                    {paragraph}
                  </p>
                ))}
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
                  <h2 className="text-xl sm:text-2xl font-semibold mb-3 md:text-left">
                    {aboutData.visionHeading}
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {aboutData.visionContent}
                  </p>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-3 md:text-left">
                    {aboutData.missionHeading}
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {aboutData.missionContent}
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
              {aboutData.groupHeading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {aboutData.companies.map((company) => (
                <div key={company.id} className="bg-white shadow-sm overflow-hidden rounded-lg hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 flex-col sm:h-60 w-full rounded-t-lg relative bg-gradient-to-br flex items-center justify-center p-4">
                    <Image
                      src={`/${company.id === 'ula' ? 'life2.jpg' : company.id === 'ugi' ? 'general.jpg' : 'Pay.jpg'}`}
                      alt={`${company.name} Logo`}
                      width={400}
                      height={400}
                      className="w-full h-auto my-8"
                    />
                    <div className="text-start w-full">
                      <h3 
                        className="font-semibold text-2xl"
                        style={{ color: company.color }}
                      >
                        {company.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {company.description}
                    </p>
                    <Link
                      href={company.link}
                      className="inline-block mt-4 font-semibold hover:underline"
                      style={{ color: company.color }}
                      onClick={() => trackEvent('group_of_companies_clicked', {
                        company_name: company.name,
                        location: 'about_page',
                        page_section: 'group_of_companies'
                      })}
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 sm:mt-6 text-white text-sm sm:text-base text-center sm:text-left">
              {aboutData.groupDescription}
            </p>
          </section>
        </main>

        {/* Final CTA */}
        <div className="bg-[#9b1c20] py-8 sm:py-12">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {aboutData.ctaHeading}
            </h2>
            <p className="text-white text-lg mb-6 max-w-2xl mx-auto">
              {aboutData.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={aboutData.ctaCTALink}
                className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#9b1c20] transition-colors"
                onClick={() => trackEvent('contact_us_clicked', {
                  location: 'about_page',
                  page_section: 'cta_footer'
                })}
              >
                {aboutData.ctaCTAText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}