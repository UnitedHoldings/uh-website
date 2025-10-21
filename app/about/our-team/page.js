'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Team() {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (id) => {
    setActiveCard(activeCard === id ? null : id);
  };

  const directorsSeniorManagers = [
    {
      id: 1,
      name: "Philip De Sousa",
      title: "Executive Chairman",
      bio: "Philip De Sousa is the Executive Chairman of United Holdings Ltd and the visionary leader behind the group's expansion. With over 28 years of industry experience, he took over the running of the Dups business in 1996 and was the Founding Managing Director and Executive Chairman of Dups Insurance. He chairs the Group's Think-tank and Special Projects Committees, driving strategic innovation across all subsidiaries.",
      image: "/philip-de-sousa.jpeg",
      linkedin: "https://linkedin.com/in/philip-de-sousa"
    },
    {
      id: 2,
      name: "Nelisiwe De Sousa",
      title: "Group Chief Executive Officer",
      bio: "Nelisiwe De Sousa is the Group Chief Executive Officer with over 22 years of experience in the insurance industry. A University of Eswatini Alumnus holding a BSc. Bio/Geo and Post Graduate Certificate in CoP Short Term Insurance, she started as an administrator at Dups Insurance in 2001 and progressed to CEO in 2011. Under her leadership, the group has seen remarkable growth and diversification into new financial services.",
      image: "/Nelisiwe De Sousa.jpeg",
      linkedin: "https://linkedin.com/in/nelisiwe-de-sousa"
    },
    {
      id: 3,
      name: "Zombodze Magagula",
      title: "Technical Advisor",
      bio: "Zombodze Magagula serves as the Technical Advisor at United Holdings Ltd, bringing extensive expertise in insurance policies and legislative frameworks. With a career spanning over two decades in the financial sector, he provides crucial oversight in the Risk, Legal and Compliance division. His deep industry knowledge and extensive professional network have been instrumental in navigating regulatory requirements across the group's subsidiaries.",
      image: "/Zombodze Magagula.jpeg",
      linkedin: "https://linkedin.com/in/zombodze-magagula"
    },
    {
      id: 17,
      name: "Roison Pave",
      title: "Group Corporate Affairs Manager",
      bio: "Roison Daniel Pave is a seasoned executive with over 12 years of expertise in Human Capital Management, Corporate Governance, and organizational leadership. His career spans diverse sectors including financial services, manufacturing, and consulting. He holds multiple certifications in corporate governance and has been instrumental in developing the group's talent management strategies and corporate communication frameworks.",
      image: "/Roison Pave (GM Corporate Affairs).jpg",
      linkedin: "https://linkedin.com/in/roison-pave"
    },
    {
      id: 4,
      name: "Mlamuli Magagula",
      title: "Group General Manager Finance",
      bio: "Mlamuli Magagula is the Group General Manager Finance with comprehensive experience in financial management and auditing. Prior to joining United Holdings, he served as an Audit Manager at PKF Chartered Accountant Swaziland, where he honed his expertise in financial controls and compliance. He oversees the group's financial strategy, budgeting, and financial reporting across all subsidiaries, ensuring robust financial health and compliance.",
      image: "/Mlamuli Magagula.jpeg",
      linkedin: "https://linkedin.com/in/mlamuli-magagula"
    },
    {
      id: 5,
      name: "Witness Msibi",
      title: "General Manager Operations",
      bio: "Witness Msibi is the General Manager Operations at United Holdings with over 19 years of extensive experience in the insurance industry. He began his career as a retail broker after earning a Bachelor's Degree in Accounting from the University of Eswatini. His operational expertise encompasses process optimization, customer service excellence, and strategic implementation across the group's diverse business units.",
      image: "/Witness Msibi (GM Ops).jpg",
      linkedin: "https://linkedin.com/in/witness-msibi"
    },
    {
      id: 6,
      name: "Winile Sibandze",
      title: "Group Company Secretary & Legal",
      bio: "Winile Sibandze is an experienced legal and compliance professional with expertise in corporate governance, regulatory compliance, and risk management. She currently serves as Company Secretary & Legal at United Holdings, where she ensures adherence to statutory requirements and corporate governance standards. Her legal acumen has been crucial in contract negotiations, compliance frameworks, and corporate structuring across the group.",
      image: "/Winile Sibandze (Group Secretary & Legal).jpg",
      linkedin: "https://linkedin.com/in/winile-sibandze"
    },
  ];

  const operationsManagement = [
    {
      id: 7,
      name: "Sihle Dlamini",
      title: "United Life Assurance Operations Manager",
      bio: "Sihle Dlamini is the Operations Manager at United Life Assurance, responsible for overseeing daily operations and ensuring high-quality service delivery. Since joining the company in 2018 as a Branch Controller, he has progressed through various leadership roles. His expertise includes process optimization, team leadership, and implementing operational efficiencies that enhance customer experience and drive business growth.",
      image: "/Sihle Dlamini (ULA Ops).jpg",
      linkedin: "https://linkedin.com/in/sihle-dlamini"
    },
    {
      id: 8,
      name: "Sebenele Zwane",
      title: "United Pay Operations Manager",
      bio: "Sebenele M. Zwane is an experienced Operations Manager with a strong background in financial services, spanning insurance, credit, lending, and investment advisory. Currently leading operations at United Pay Ltd, he has been instrumental in developing robust operational frameworks for the payment solutions platform. His expertise ensures seamless transaction processing and customer service excellence in the digital payments space.",
      image: "/Sebenele Zwane.jpeg",
      linkedin: "https://linkedin.com/in/sebenele-zwane"
    },
    {
      id: 9,
      name: "Lovemore Gundani",
      title: "United General Insurance Operations Manager",
      bio: "Lovemore Gundani is a seasoned insurance professional with a Master's in Business Administration and a Bachelor of Commerce Honours Degree in Insurance and Risk Management from Midlands State University. With extensive experience in insurance operations, he oversees underwriting, claims management, and customer service operations, ensuring United General Insurance maintains its reputation for reliability and excellence.",
      image: "/Lovemore Gundani (UGI Ops Man).jpeg",
      linkedin: "https://linkedin.com/in/lovemore-gundani"
    }
  ];

  const supportServicesManagement = [
    {
      id: 10,
      name: "Lungile Ngwenya",
      title: "Corporate Sales Manager",
      bio: "Lungile Ngwenya is the Corporate Sales & Retention Manager with a strong background in business management and insurance. A Regent Business School Alumnus from South Africa, she holds a Degree in Business Management, Certificate of Proficiency (COP) in insurance, and AAT 11. Her expertise lies in developing corporate client relationships, sales strategy implementation, and client retention programs that drive sustainable business growth.",
      image: "/Lungile Ngwenya (Corporate Sales Manager).jpeg",
      linkedin: "https://linkedin.com/in/lungile-ngwenya"
    },
    {
      id: 11,
      name: "Justice Dlamini",
      title: "Group ICT Manager",
      bio: "Justice Dlamini serves as the Group ICT Manager, bringing comprehensive expertise in information technology systems and digital transformation. He holds a Bachelor's Degree in Information Technology from the University of Eswatini, as well as an Associate Degree in Business Information Technology from Limkokwing University. He leads the group's technology strategy, ensuring robust IT infrastructure and digital innovation across all business units.",
      image: "/Justice Dlamini (IT Manager).jpg",
      linkedin: "https://linkedin.com/in/justice-dlamini"
    },
    {
      id: 12,
      name: "Simeon Simelane",
      title: "Group Internal Audit Manager",
      bio: "Simeon Simelane is a Certified Internal Auditor and risk management professional with over 20 years of experience in internal auditing, banking, insurance, compliance, and enterprise risk management. His extensive career includes developing comprehensive audit frameworks and risk management strategies that ensure organizational compliance and operational integrity across the United Holdings group.",
      image: "/Simeon Simelane (GIAM).jpeg",
      linkedin: "https://linkedin.com/in/simeon-simelane"
    },
    {
      id: 14,
      name: "Siphesihle Dlamini",
      title: "Group Risk & Compliance Manager",
      bio: "Siphesihle Dlamini is a legal and risk management professional with experience spanning compliance oversight, enterprise risk assessment, and legal advisory services. She plays a critical role in identifying, assessing, and mitigating risks across the group while ensuring compliance with regulatory requirements. Her expertise helps maintain the group's strong compliance culture and risk-aware decision-making processes.",
      image: "/2.jpg",
      linkedin: "https://linkedin.com/in/siphesihle-dlamini"
    },
    {
      id: 15,
      name: "Peter Maseko",
      title: "Finance Manager",
      bio: "Peter Maseko serves as the Finance Manager at United Holdings, bringing over 15 years of experience in financial management, auditing, and strategic operations. His expertise encompasses financial reporting, budget management, and strategic financial planning. He plays a key role in financial decision-making and ensuring the group's financial operations align with strategic objectives and regulatory requirements.",
      image: "/Peter Maseko (Finance Manager).jpg",
      linkedin: "https://linkedin.com/in/peter-maseko"
    },
    {
      id: 16,
      name: "Nozwelethu Nxumalo",
      title: "Retail Sales Manager",
      bio: "Nozwelethu Nxumalo is the Retail Sales Manager with a strong background in marketing and business development. An Institute of Marketing Management Graduate School (IMM GS) alumnus holding a BBA in Marketing Management and a Diploma in Law from University of Eswatini. She leads the retail sales strategy, driving customer acquisition and retention through innovative marketing approaches and excellent customer service delivery.",
      image: "/Nozwelethu Nxumalo (Retail Sales Manager).jpg",
      linkedin: "https://linkedin.com/in/nozwelethu-nxumalo"
    },
  ];

  // Updated Team Card Component with Click Interaction
  const TeamCard = ({ member }) => (
    <div
      className=" rounded-3xl rounded-b-[9999px] border-2 border-transparent hover:border-[#9b1c20] transition-all duration-300 group cursor-pointer overflow-hidden relative h-full flex flex-col"
      onClick={() => handleCardClick(member.id)}
    >
      {/* Image Container with Oval Shape */}
      <div className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 rounded-b-[9999px] rounded-t-3xl overflow-hidden">
          <Image
            src={member.image}
            alt={member.name}
            width={1080}
            height={1080}
            priority={true}
            quality={100}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gradient Overlay for Name & Title */}
          {activeCard !== member.id && (
            <div className="absolute bg-gradient-to-t h-40 w-full -bottom-1 z-30 from-[#9b1c20] via-[#9b1c20] 80 to-transparent rounded-b-[9999px] rounded-t-3xl" />
          )}
        </div>

        {/* Name and Title Overlay */}
        {activeCard !== member.id && (
          <div className="absolute z-50 bottom-[10%] left-0 right-0 text-center px-4">
            <h3 className="text-2xl font-semibold text-white mb-1">{member.name}</h3>
            <p className="text-lg text-white text-center max-w-[20rem] mx-auto">{member.title}</p>
          </div>
        )}
      </div>

      {/* Click-activated Content - Bio and LinkedIn */}
      {activeCard === member.id && (
        <div className="absolute inset-0 bg-white rounded-3xl p-6 flex flex-col transform translate-y-0 animate-fadeIn">
          <div className="flex-grow">
            <h3 className="text-3xl font-bold text-gray-900 mb-2 text-center">{member.name}</h3>
            <p className="text-sm text-[#9b1c20] font-medium mb-4 text-center">{member.title}</p>
            <p className="text-gray-600 text-lg leading-relaxed overflow-y-auto max-h-64">
              {member.bio}
            </p>
          </div>

          {/* LinkedIn Icon */}
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
            {directorsSeniorManagers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
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

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-18 '>
            {operationsManagement.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
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
            {supportServicesManagement.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
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