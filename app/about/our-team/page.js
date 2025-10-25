'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Validation helper function
const validateTeamData = (data) => {
  const innerData = data?.data || {};
  return {
    directorsSeniorManagers: Array.isArray(innerData.directorsSeniorManagers) 
      ? innerData.directorsSeniorManagers 
      : [],
    operationsManagement: Array.isArray(innerData.operationsManagement) 
      ? innerData.operationsManagement 
      : [],
    supportServicesManagement: Array.isArray(innerData.supportServicesManagement) 
      ? innerData.supportServicesManagement 
      : []
  };
};

// Define the exact order for each category
const EXECUTIVE_LEADERSHIP_ORDER = [
  'Executive Chairman',
  'GCEO',
  'Group Technical Advisor',
  'GM Corporate Affairs',
  'GM Finance',
  'GM Operations'
];

const OPERATIONS_MANAGEMENT_ORDER = [
  'Group Operations Manager - United Life Assurance',
  'Group Operations Manager - United General Insurance',
  'Group Operations Manager - United Pay'
];

const SUPPORT_SERVICES_ORDER = [
  'Group Company Secretary & legal',
  'Group Internal Audit Manager',
  'Group Risk & Compliance Manager',
  'Group HRM',
  'Group Marketing Manager',
  'Group ICT Manager',
  'Finance Manager',
  'Group Corporate Sales Manager',
  'Retail Retail Sales Manager'
];

// Sort function by predefined sequence
const sortTeamDataBySequence = (teamData) => {
  const sortBySequence = (array, sequence) => {
    return [...array].sort((a, b) => {
      const indexA = sequence.indexOf(a.title);
      const indexB = sequence.indexOf(b.title);
      
      // If both titles are in the sequence, sort by sequence order
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      
      // If only A is in sequence, A comes first
      if (indexA !== -1) return -1;
      
      // If only B is in sequence, B comes first
      if (indexB !== -1) return 1;
      
      // If neither is in sequence, maintain original order
      return 0;
    });
  };

  return {
    directorsSeniorManagers: sortBySequence(teamData.directorsSeniorManagers, EXECUTIVE_LEADERSHIP_ORDER),
    operationsManagement: sortBySequence(teamData.operationsManagement, OPERATIONS_MANAGEMENT_ORDER),
    supportServicesManagement: sortBySequence(teamData.supportServicesManagement, SUPPORT_SERVICES_ORDER)
  };
};

export default function Team() {
  const [activeCard, setActiveCard] = useState(null);
  const [teamData, setTeamData] = useState({
    directorsSeniorManagers: [],
    operationsManagement: [],
    supportServicesManagement: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://uh-server.onrender.com/api/profile');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data); // Debug log
        
        const validatedData = validateTeamData(data);
        const sortedData = sortTeamDataBySequence(validatedData);
        setTeamData(sortedData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching team data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  const handleCardClick = (id) => {
    setActiveCard(activeCard === id ? null : id);
  };

  // Team Card Component with Click Interaction
  const TeamCard = ({ member }) => (
    <div
      className="rounded-3xl rounded-b-[9999px] border-2 border-transparent hover:border-[#9b1c20] transition-all duration-300 group cursor-pointer overflow-hidden relative h-full flex flex-col"
      onClick={() => handleCardClick(member._id)}
    >
      {/* Image Container with Oval Shape */}
      <div className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 rounded-b-[9999px] rounded-t-3xl overflow-hidden">
          <Image
            src={member.image?.asset?.url || '/default-avatar.jpg'}
            alt={member.name}
            width={1080}
            height={1080}
            priority={true}
            quality={100}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src = '/default-avatar.jpg';
            }}
          />
          {/* Gradient Overlay for Name & Title */}
          {activeCard !== member._id && (
            <div className="absolute bg-gradient-to-t h-40 w-full -bottom-1 z-30 from-[#9b1c20] via-[#9b1c20] 80 to-transparent rounded-b-[9999px] rounded-t-3xl" />
          )}
        </div>

        {/* Name and Title Overlay */}
        {activeCard !== member._id && (
          <div className="absolute z-40 bottom-[10%] left-0 right-0 text-center px-4">
            <h3 className="text-2xl font-semibold text-white mb-1">{member.name}</h3>
            <p className="text-lg text-white text-center max-w-[20rem] mx-auto">{member.title}</p>
          </div>
        )}
      </div>

      {/* Click-activated Content - Bio and LinkedIn */}
      {activeCard === member._id && (
        <div className="absolute inset-0 bg-white rounded-3xl p-6 flex flex-col transform translate-y-0 animate-fadeIn">
          <div className="flex-grow">
            <h3 className="text-3xl font-bold text-gray-900 mb-2 text-center">{member.name}</h3>
            <p className="text-sm text-[#9b1c20] font-medium mb-4 text-center">{member.title}</p>
            <p className="text-gray-600 text-lg leading-relaxed overflow-y-auto max-h-64">
              {member.bio || 'No biography available.'}
            </p>
          </div>

          {/* LinkedIn Icon */}
          {member.linkedin && (
            <div className="flex justify-center pt-4">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-12 h-12 bg-[#9b1c20] text-white rounded-full hover:bg-[#7a1619] transition-colors duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
                </svg>
              </a>
            </div>
          )}

          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setActiveCard(null);
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen font-outfit mx-auto flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#9b1c20] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading team data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen font-outfit mx-auto flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Failed to load team data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-[#9b1c20] text-white px-6 py-2 rounded-full hover:bg-[#7a1619] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-outfit mx-auto">
      {/* Header Section */}
      <div className='bg-[#881a1e] h-6 sm:h-8 w-full' />
      <div className='bg-[#9b1c20] py-4 sm:py-6'>
        <header className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-semibold text-white text-center sm:text-left">
            Our Leadership Team
          </h1>
          <p className="text-xs sm:text-sm text-white text-center sm:text-left mt-2">
            Meet the dedicated professionals driving United Holdings forward
          </p>
        </header>
      </div>

      {/* Hero Image */}
      <div className='relative'>
        <Image
          src={'/group-life.jpg'}
          alt="Our Team"
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
              Our experienced leadership team is committed to delivering exceptional financial services{' '}
              <span className="hover:underline cursor-pointer font-semibold">tailored to your needs</span>.
              Get to know the people behind our success.
            </p>
            <Link href={'../../contact'} >
              <div className="flex-shrink-0">
                <button className='border-white border text-white py-2 px-6 sm:px-8 rounded-full text-sm sm:text-base hover:bg-white hover:text-[#9b1c20] transition-colors'>
                  Contact Us
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Executive Leadership Section */}
      <div className="bg-white overflow-hidden py-12">
        <div className='max-w-[1400px] mx-auto px-4 sm:px-6'>
          <div className='mb-12 text-center'>
            <h2 className='font-semibold text-3xl sm:text-4xl text-gray-900 mb-4'>Executive Leadership</h2>
            <div className="w-24 h-1 bg-[#9b1c20] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our senior leadership team provides strategic direction and oversees the growth and development of United Holdings across all subsidiaries.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-18'>
            {teamData.directorsSeniorManagers?.length > 0 ? (
              teamData.directorsSeniorManagers.map((member) => (
                <TeamCard key={member._id} member={member} />
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500 text-lg">No executive leadership data available.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Operations Management Section */}
      <div className="bg-gray-50 py-12">
        <div className='max-w-[1400px] mx-auto px-4 sm:px-6'>
          <div className='mb-12 text-center'>
            <h2 className='font-semibold text-3xl sm:text-4xl text-gray-900 mb-4'>Operations Management</h2>
            <div className="w-24 h-1 bg-[#9b1c20] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our operations managers ensure seamless service delivery across all United Holdings subsidiaries.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-18'>
            {teamData.operationsManagement?.length > 0 ? (
              teamData.operationsManagement.map((member) => (
                <TeamCard key={member._id} member={member} />
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500 text-lg">No operations management data available.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Support Services Management Section */}
      <div className="bg-white py-12">
        <div className='max-w-[1400px] mx-auto px-4 sm:px-6'>
          <div className='mb-12 text-center'>
            <h2 className='font-semibold text-3xl sm:text-4xl text-gray-900 mb-4'>Support Services Management</h2>
            <div className="w-24 h-1 bg-[#9b1c20] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our support services team provides the essential backbone that enables our operational excellence and strategic growth.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-18'>
            {teamData.supportServicesManagement?.length > 0 ? (
              teamData.supportServicesManagement.map((member) => (
                <TeamCard key={member._id} member={member} />
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500 text-lg">No support services management data available.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-[#9b1c20] py-12 sm:py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center mb-12">
            Our Leadership Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#9b1c20]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Integrity</h3>
              <p className="text-white text-sm leading-relaxed">
                We conduct business with honesty and transparency, building trust with our clients and stakeholders.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#9b1c20]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Collaboration</h3>
              <p className="text-white text-sm leading-relaxed">
                We work together across departments to deliver comprehensive financial solutions.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#9b1c20]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Innovation</h3>
              <p className="text-white text-sm leading-relaxed">
                We continuously seek new ways to improve and adapt to our clients&apos; evolving needs.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#9b1c20]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Commitment</h3>
              <p className="text-white text-sm leading-relaxed">
                We are dedicated to serving the people of Eswatini with excellence and purpose.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animation for fade-in effect */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}