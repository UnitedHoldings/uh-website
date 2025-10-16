"use client";

import React, { useState, useMemo, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Complete branch data with departments and regions
const completeBranches = [
  {
    name: "Manzini – Head Office",
    phone: "+268 2508 6000",
    coords: [-26.4988, 31.3800],
    hours: "Mon–Fri: 8am–5pm",
    departments: ["Life Assurance", "General Insurance", "United Pay"],
    region: "Manzini",
    address: "Manzini, Eswatini"
  },
  {
    name: "Manzini 1",
    phone: "+268 2508 6124",
    coords: [-26.4985, 31.3812],
    hours: "Mon–Fri: 8am–5pm",
    departments: ["Life Assurance"],
    region: "Manzini",
    address: "Manzini, Eswatini"
  },
  {
    name: "Matsapha",
    phone: "+268 2508 6125",
    coords: [-26.5167, 31.3167],
    hours: "Mon–Fri: 8am–5pm",
    departments: ["Life Assurance"],
    region: "Manzini",
    address: "Matsapha, Eswatini"
  },
  {
    name: "Ezulwini",
    phone: "+268 2508 6126",
    coords: [-26.4167, 31.2000],
    hours: "Mon–Fri: 8am–5pm",
    departments: ["Life Assurance"],
    region: "Hhohho",
    address: "Ezulwini, Eswatini"
  },
  {
    name: "Mbabane",
    phone: "+268 2508 6120",
    coords: [-26.3054, 31.1367],
    hours: "Mon–Fri: 8am–5pm",
    departments: ["Life Assurance", "General Insurance", "United Pay"], // ✅ updated
    region: "Hhohho",
    address: "Mbabane, Eswatini"
  },
  {
    name: "Piggs Peak",
    phone: "+268 2508 6122",
    coords: [-25.9670, 31.2500],
    hours: "Mon–Fri: 8am–5pm",
    departments: ["Life Assurance"],
    region: "Hhohho",
    address: "Piggs Peak, Eswatini"
  },
  {
    name: "Simunye",
    phone: "+268 2508 6127",
    coords: [-26.2020, 31.9330],
    hours: "Mon–Fri: 8am–5pm",
    departments: ["Life Assurance"],
    region: "Lubombo",
    address: "Simunye, Eswatini"
  },
  {
    name: "Siteki",
    phone: "+268 2508 6123",
    coords: [-26.4500, 31.9500],
    hours: "Mon–Fri: 8am–5pm",
    departments: ["Life Assurance", "General Insurance", "United Pay"], // ✅ updated
    region: "Lubombo",
    address: "Siteki, Eswatini"
  },
  {
    name: "Matata",
    phone: "+268 2508 6128",
    coords: [-27.0000, 31.6333],
    hours: "Mon–Fri: 8am–5pm",
    departments: ["Life Assurance"],
    region: "Shiselweni",
    address: "Matata, Eswatini"
  },
  {
    name: "Nhlangano",
    phone: "+268 2508 6121",
    coords: [-27.1167, 31.2000],
    hours: "Mon–Fri: 8am–5pm",
    departments: ["Life Assurance", "General Insurance", "United Pay"], // ✅ updated
    region: "Shiselweni",
    address: "Nhlangano, Eswatini"
  },
  {
    name: "Buhleni",
    phone: "+268 3460 1767",
    coords: [-26.0333, 31.3167],
    hours: "Mon–Fri: 8am–5pm",
    departments: ["Life Assurance"],
    region: "Hhohho",
    address: "Buhleni, Eswatini"
  },
  {
    name: "Hlathikhulu",
    phone: "N/A",
    coords: [-27.2167, 31.2167],
    hours: "Mon–Fri: 8am–5pm",
    departments: ["Life Assurance"],
    region: "Shiselweni",
    address: "Hlathikhulu, Eswatini"
  },
];

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

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [activeTab, setActiveTab] = useState('branches');
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [showAllBranches, setShowAllBranches] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
  }, [searchQuery, regionFilter, departmentFilter]);

  const displayedBranches = showAllBranches ? filteredBranches : filteredBranches.slice(0, 4);

  // Get unique regions and departments for filters
  const regions = ['All', ...new Set(completeBranches.map(branch => branch.region))];
  const departments = ['All', 'Life Assurance', 'General Insurance', 'United Pay'];

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
        <div className='bg-gradient-to-r absolute from-[#9b1c20]/60 to-[#9b1c20]/20 h-full w-full' />
        <Image 
          src="/claims.png" 
          alt="Contact" 
          width={1920} 
          height={400} 
          className="w-full h-[320px] object-cover"
          priority
        />
        
        <div className="absolute lg:right-[10%] lg:top-[10%] top-[5%] left-0 lg:left-auto right-0 flex items-center">
          <div className="max-w-[1100px] mx-auto px-4 w-full">
            <div className="bg-[#9b1c20] px-8 flex flex-col mx-auto text-white py-8">
              <div className='left-[13%] space-y-4 top-[30%] text-white'>
                <p className='text-4xl max-w-96 font-semibold'>We&apos;re here to help</p>
                <p className='text-sm font-light'>Reach out to us for any questions or concerns.</p>
              </div>
            
              <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="rounded-full px-4 py-2 min-w-[300px] bg-white border text-gray-800"
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="rounded-full px-4 py-2 min-w-[300px] bg-white border text-gray-800"
                />
                <button className="rounded-full px-6 py-2 bg-white text-[#9b1c20] font-semibold">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
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
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`px-4 py-2 rounded-full transition ${activeTab === 'contact' ? 'bg-[#9b1c20] text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Contact Form
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
            {activeTab === 'branches' ? (
              <div className="space-y-6">
                <div className="h-[800px] rounded-lg overflow-hidden">
                  <Suspense fallback={<div className="h-full bg-gray-200 flex items-center justify-center">Loading map...</div>}>
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
                        onClick={() => openGoogleMaps(branch.coords, branch.name)}
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
            ) : (
              <div className="p-6 bg-gray-50 rounded-lg">
                <h4 className="text-2xl font-semibold mb-4">Send us a Message</h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                      required
                    />
                  </div>

                  {status && (
                    <div className={`p-3 rounded-lg ${
                      status.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {status.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#9b1c20] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#881a1e] transition duration-200"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Contact Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Other Ways to Connect</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">We&apos;re available through multiple channels to serve you better</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-[#9b1c20] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Chat with our support team in real-time</p>
              <button className="bg-[#9b1c20] text-white py-2 px-6 rounded-full font-semibold">
                Start Chat
              </button>
            </div>

            <div className="text-center p-6">
              <div className="bg-[#9b1c20] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">Call us directly for immediate assistance</p>
              <a href="tel:8001010" className="bg-[#9b1c20] text-white py-2 px-6 rounded-full font-semibold inline-block">
                Call 800 1010
              </a>
            </div>

            <div className="text-center p-6">
              <div className="bg-[#9b1c20] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Send us an email for detailed inquiries</p>
              <a href="mailto:info@united.co.sz" className="bg-[#9b1c20] text-white py-2 px-6 rounded-full font-semibold inline-block">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}