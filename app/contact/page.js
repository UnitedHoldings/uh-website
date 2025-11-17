"use client";

import React, { useState, useMemo, Suspense, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { trackEvent, trackPageDuration } from '@/lib/posthog';
// Head removed: Google Analytics moved to global layout

// Browser-safe function to open Google Maps
const openGoogleMaps = (coords, branchName) => {
  if (typeof window === 'undefined') return;
  const [lat, lng] = coords;
  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}&layer=c&cbll=${lat},${lng}&cbp=`;
  window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
};

// Dynamically import BranchMap with no SSR
const BranchMap = dynamic(() => import('@/components/BranchMap'), {
  ssr: false,
  loading: () => <div className="h-[500px] bg-gray-200 rounded-lg flex items-center justify-center">Loading map...</div>
});

// Skeleton Loader Components
const MapSkeleton = () => (
  <div className="h-[800px] bg-gray-200 rounded-lg flex items-center justify-center animate-pulse">
    <div className="text-center">
      <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
      <p className="text-gray-500">Loading map data...</p>
    </div>
  </div>
);

const BranchCardSkeleton = () => (
  <div className="p-6 border bg-gray-200 rounded-lg animate-pulse">
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
    <div className="flex gap-2 mb-3">
      <div className="h-5 bg-gray-300 rounded w-16"></div>
      <div className="h-5 bg-gray-300 rounded w-20"></div>
    </div>
    <div className="h-5 bg-gray-300 rounded w-32 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-40 mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-28"></div>
  </div>
);

const SearchFiltersSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <div className="h-12 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="flex gap-2">
        <div className="h-12 bg-gray-200 rounded-lg w-32"></div>
        <div className="h-12 bg-gray-200 rounded-lg w-40"></div>
      </div>
    </div>
    <div className="h-4 bg-gray-200 rounded w-32"></div>
  </div>
);

const ContactInfoSkeleton = () => (
  <div className="space-y-6 mt-8">
    {[...Array(4)].map((_, index) => (
      <div key={index} className="flex items-start gap-4 animate-pulse">
        <div className="bg-gray-300 p-3 rounded-full w-12 h-12"></div>
        <div className="space-y-2 flex-1">
          <div className="h-5 bg-gray-300 rounded w-24"></div>
          <div className="h-4 bg-gray-300 rounded w-32"></div>
          <div className="h-4 bg-gray-300 rounded w-40"></div>
        </div>
      </div>
    ))}
  </div>
);

const HeaderSkeleton = () => (
  <div className="min-h-screen font-outfit mx-auto">
    <div className='bg-gray-300 h-8 w-full animate-pulse' />
    <div className='bg-gray-200 py-4 animate-pulse'>
      <header className="max-w-[1400px] mx-auto px-4">
        <div className="h-8 bg-gray-300 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-64"></div>
      </header>
    </div>

    <div className='relative'>
      <div className='bg-gray-300 absolute inset-0'></div>
      <div className="w-full h-[320px] bg-gray-200 object-cover"></div>
    </div>

    <div className='max-w-[1400px] px-4 mt-8 lg:mb-16 mb-12 space-y-6 mx-auto'>
      <div className="flex justify-between items-center md:flex-row md:items-center gap-4 md:gap-8">
        <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
      </div>
    </div>
  </div>
);

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [activeTab, setActiveTab] = useState('branches');
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [showAllBranches, setShowAllBranches] = useState(false);
  const [completeBranches, setCompleteBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Track page duration
  useEffect(() => {
    const stopTracking = trackPageDuration('contact_us');
    return () => stopTracking();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch('https://uh-server-staging-688256516165.asia-east1.run.app/api/branches');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && data.data) {
          setCompleteBranches(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch branches from API');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching branches from API:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBranches();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: 'error', message: 'Please fill all fields.' });
      return;
    }

    setStatus({ type: 'success', message: 'Thanks — we will get back to you shortly.' });
    setForm({ name: '', email: '', message: '' });
  };

  // Filter branches based on search and filters
  const filteredBranches = useMemo(() => {
    return completeBranches.filter(branch => {
      const matchesSearch = branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.phone.includes(searchQuery);
      const matchesRegion = regionFilter === 'All' || branch.region === regionFilter;
      const matchesDepartment = departmentFilter === 'All' ||
        branch.departments.includes(departmentFilter);

      return matchesSearch && matchesRegion && matchesDepartment;
    });
  }, [searchQuery, regionFilter, departmentFilter, completeBranches]);

  const displayedBranches = showAllBranches ? filteredBranches : filteredBranches.slice(0, 4);

  // Get unique regions and departments for filters
  const regions = ['All', ...new Set(completeBranches.map(branch => branch.region))];
  const departments = ['All', 'Life Assurance', 'General Insurance', 'United Pay'];

  if (loading) {
    return (
      <HeaderSkeleton>
        <div className="bg-white overflow-hidden">
          <div className='max-w-[1400px] px-4 lg:mt-8 mb-16 space-y-6 mx-auto flex flex-col lg:flex-row'>
            <div className='lg:min-w-[400px] lg:pr-8'>
              <div className="h-7 bg-gray-300 rounded w-32 mb-6 animate-pulse"></div>
              <div className="flex flex-col w-full justify-between py-6">
                <div className="flex gap-2 mb-3">
                  <div className="h-10 bg-gray-200 rounded-full w-32 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded-full w-32 animate-pulse"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
              </div>
              <ContactInfoSkeleton />
            </div>

            <div className='w-full lg:border-l lg:border-gray-400 lg:pl-6 mt-8 lg:mt-0'>
              <div className="space-y-6">
                <MapSkeleton />
                <SearchFiltersSkeleton />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, index) => (
                    <BranchCardSkeleton key={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeaderSkeleton>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl text-gray-300 mx-auto mb-4">📍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Failed to load branches</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-[#9b1c20] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#881a1e] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-outfit mx-auto">
      <div className='bg-[#881a1e] h-8 w-full' />
      <div className='bg-[#9b1c20] py-4'>
        <header className="max-w-[1400px] mx-auto px-4">
          <h1 className="text-2xl md:text-4xl font-semibold text-white">Contact Us</h1>
          <p className="text-sm text-white">Get in touch with us for any inquiries or support.</p>
        </header>
      </div>

      <div className='relative'>
        <Image
          src="/44585.jpg"
          alt="Contact"
          width={1920}
          height={1080}
          quality={100}
          className="w-full h-[320px] object-cover"
          priority
        />

      </div>

      <div className='max-w-[1400px] px-4 mt-8 lg:mb-16 mb-12 space-y-6 mx-auto'>
        <div className="flex justify-between items-center md:flex-row md:items-center gap-4 md:gap-8">
          <p className='max-w-[800px] text-2xl'>We have multiple branches across the country. Find the one nearest to you or reach out through our contact channels.</p>
        </div>
      </div>

      <div className="bg-white overflow-hidden">
        <div className='max-w-[1400px] px-4 lg:mt-8 mb-16 space-y-6 mx-auto flex flex-col lg:flex-row'>
          <div className='lg:min-w-[400px] lg:pr-8'>
            <p className='font-semibold text-3xl'>Get in Touch</p>
            <div className="flex flex-col w-full justify-between py-6">
              <nav className="flex gap-2">
                <button
                  onClick={() => setActiveTab('branches')}
                  className={`px-4 py-2 rounded-full transition ${activeTab === 'branches' ? 'bg-[#9b1c20] text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Our Branches
                </button>
                
              </nav>
              <div className="text-sm text-gray-600 mt-3 md:mt-0">
                <span className="font-semibold">Need help?</span> Call 800 1010 or email <a href="mailto:info@united.co.sz" className="text-[#9b1c20] underline">info@united.co.sz</a>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6 mt-8">
              <div className="flex items-start gap-4">
                <div className="bg-[#9b1c20] p-3 rounded-full text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Head Office</h4>
                  <p className="text-gray-600">Manzini, Eswatini</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#9b1c20] p-3 rounded-full text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Call Us</h4>
                  <a href="tel:8001010" className="text-[#9b1c20] text-lg font-semibold">800 1010</a>
                  <p className="text-gray-600">Toll Free</p>
                  <a href="tel:+26825086000" className="text-gray-600 block">(+268) 2508 6000</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#9b1c20] p-3 rounded-full text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Email Us</h4>
                  <a href="mailto:info@united.co.sz" className="text-[#9b1c20] text-lg font-semibold">info@united.co.sz</a>
                  <p className="text-gray-600">We&apos;ll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#9b1c20] p-3 rounded-full text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Business Hours</h4>
                  <p className="text-gray-600">Monday - Friday: 8:00 AM - 5:00 PM</p>
                  <p className="text-gray-600">Saturday: 8:00 AM - 1:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full lg:border-l lg:border-gray-400 lg:pl-6 mt-8 lg:mt-0'>
            
              <div className="space-y-6">
                <div className="h-[800px] rounded-lg overflow-hidden">
                  <Suspense fallback={<MapSkeleton />}>
                    <BranchMap branches={completeBranches} />
                  </Suspense>
                </div>

                {/* Search and Filters */}
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Search branches by name or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                      />
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={regionFilter}
                        onChange={(e) => setRegionFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                      >
                        {regions.map(region => (
                          <option key={region} value={region}>
                            {region === 'All' ? 'All Regions' : region}
                          </option>
                        ))}
                      </select>
                      <select
                        value={departmentFilter}
                        onChange={(e) => setDepartmentFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                      >
                        {departments.map(dept => (
                          <option key={dept} value={dept}>
                            {dept === 'All' ? 'All Departments' : dept}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    Showing {filteredBranches.length} of {completeBranches.length} branches
                  </div>
                </div>

                {/* Branches List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {displayedBranches.map((branch, index) => (
                    <div key={index} className="p-6 border bg-[#9b1c20] rounded-lg hover:-md transition-">
                      <h4 className="text-xl font-semibold text-white mb-2">{branch.name}</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm border text-white px-2 py-1 rounded">
                          {branch.region}
                        </span>
                        {branch.departments.map((dept, idx) => (
                          <span key={idx} className="text-sm bg-[#7c161a] text-white px-2 py-1 rounded">
                            {dept}
                          </span>
                        ))}
                      </div>
                      <p className="text-lg text-gray-100 mb-2">{branch.phone}</p>
                      <p className="text-md text-gray-300 mb-4">{branch.hours}</p>
                      <button
                        onClick={() => {
                          trackEvent('branch_get_direction_clicked', {
                            branch_name: branch.name,
                            branch_region: branch.region,
                            location: 'contact_us_map_view'
                          });
                          openGoogleMaps(branch.coords, branch.name);
                        }}
                        className="text-gray-300 font-semibold underline hover:text-white transition-colors"
                      >
                        Get Directions
                      </button>
                    </div>
                  ))}
                </div>

                {filteredBranches.length > 4 && (
                  <div className="text-center">
                    <button
                      onClick={() => setShowAllBranches(!showAllBranches)}
                      className="border border-[#9b1c20] text-[#9b1c20] py-2 px-6 rounded-full font-semibold hover:bg-[#9b1c20] hover:text-white transition-colors"
                    >
                      {showAllBranches ? 'Show Less' : `View All ${filteredBranches.length} Branches`}
                    </button>
                  </div>
                )}
              </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}