import Image from 'next/image';
import Link from 'next/link';

export default function Team() {
  const directorsSeniorManagers = [
    {
      id: 1,
      name: "Philip De Sousa",
      title: "Executive Chairman",
      bio: "MR. De Sousa is the Executive Chairman of United Holdings Ltd. He is also the founding Chairman of the Group's Think-tank and Special Projects Committees. He took over the running of the Dups business in 1996 and was the Founding Managing Director and Executive Chairman of Dups Insurance.",
      image: "/philip-de-sousa.jpeg",
      email: "philip.desousa@unitedholdings.co.sz",
      phone: "+268 7600 0001",
      linkedin: "https://linkedin.com/in/philip-de-sousa"
    },
    {
      id: 2,
      name: "Nelisiwe De Sousa",
      title: "Group Chief Executive Officer",
      bio: "Group Chief Executive Officer Mrs. De Sousa is a University of Eswatini Alumnus holding a BSc. Bio/Geo, Post Graduate Certificate, CoP Short Term Insurance, and various other qualifications. She started as an administrator at Dups Insurance in 2001 and progressed to CEO in 2011.",
      image: "/Nelisiwe De Sousa.jpeg",
      email: "nelisiwe.desousa@unitedholdings.co.sz",
      phone: "+268 7600 0002",
      linkedin: "https://linkedin.com/in/nelisiwe-de-sousa"
    },
    {
      id: 3,
      name: "Zombodze Magagula",
      title: "Technical Advisor",
      bio: "Mr Magagula is the Technical Advisor at United Holdings Ltd focusing on the policies and legislature framework of the companies in the subsidy. He offers oversight in the Risk, Legal and Compliance division as well as the necessary network in the industry.",
      image: "/Zombodze Magagula.jpeg",
      email: "zombodze.magagula@unitedholdings.co.sz",
      phone: "+268 7600 0003",
      linkedin: "https://linkedin.com/in/zombodze-magagula"
    },
    {
      id: 4,
      name: "Mlamuli Magagula",
      title: "Group General Manager Finance",
      bio: "Mr Magagula is the Group General Manager Finance. He previously oversaw the financial function of the group and held the role of an Audit Manager at PKF Chartered Accountant Swaziland before joining the Group.",
      image: "/Mlamuli Magagula.jpeg",
      email: "mlamuli.magagula@unitedholdings.co.sz",
      phone: "+268 7600 0004",
      linkedin: "https://linkedin.com/in/mlamuli-magagula"
    },
    {
      id: 5,
      name: "Witness Msibi",
      title: "General Manager Operations",
      bio: "Mr. Msibi is the General Manager Operations at United Holdings, with over 19 years of extensive experience in the insurance industry. He began his journey as a retail broker after earning a Bachelor's Degree in Accounting from the University of Eswatini.",
      image: "/Witness Msibi (GM Ops).jpg",
      email: "witness.msibi@unitedholdings.co.sz",
      phone: "+268 7600 0005",
      linkedin: "https://linkedin.com/in/witness-msibi"
    },
    {
      id: 6,
      name: "Winile Sibandze",
      title: "Group Company Secretary & Legal",
      bio: "Mrs. W. Sibandze is an experienced legal and compliance professional with expertise in corporate governance, regulatory compliance, and risk management. She currently serves as Company Secretary & Legal at United Holdings.",
      image: "/Winile Sibandze (Group Secretary & Legal).jpg",
      email: "winile.sibandze@unitedholdings.co.sz",
      phone: "+268 7600 0006",
      linkedin: "https://linkedin.com/in/winile-sibandze"
    }
  ];

  const operationsManagement = [
    {
      id: 7,
      name: "Sihle Dlamini",
      title: "United Life Assurance Operations Manager",
      bio: "Sihle Dlamini is the Operations Manager at United Life Assurance, responsible for overseeing daily operations and ensuring high-quality service delivery. Since joining the company in 2018 as a Branch Controller, he has progressed through various leadership roles.",
      image: "/Sihle Dlamini (ULA Ops).jpg",
      email: "sihle.dlamini@unitedholdings.co.sz",
      phone: "+268 7600 0007",
      linkedin: "https://linkedin.com/in/sihle-dlamini"
    },
    {
      id: 8,
      name: "Sebenele Zwane",
      title: "United Pay Operations Manager",
      bio: "Sebenele M. Zwane is an experienced Operations Manager with a strong background in financial services, spanning insurance, credit, lending, and investment advisory. Currently leading operations at United Pay Ltd.",
      image: "/Sebenele Zwane.jpeg",
      email: "sebenele.zwane@unitedholdings.co.sz",
      phone: "+268 7600 0008",
      linkedin: "https://linkedin.com/in/sebenele-zwane"
    },
    {
      id: 9,
      name: "Lovemore Gundani",
      title: "United General Insurance Operations Manager",
      bio: "Mr. Gundani is a seasoned insurance professional with a Master's in Business Administration and a Bachelor of Commerce Honours Degree in Insurance and Risk Management from Midlands State University.",
      image: "/Lovemore Gundani (UGI Ops Man).jpeg",
      email: "lovemore.gundani@unitedholdings.co.sz",
      phone: "+268 7600 0009",
      linkedin: "https://linkedin.com/in/lovemore-gundani"
    }
  ];

  const supportServicesManagement = [
    {
      id: 17,
      name: "Roison Pave",
      title: "Group Corporate Affairs Manager",
      bio: "Roison Daniel Pave is a seasoned executive with over 12 years of expertise in Human Capital Management, Corporate Governance, and organizational leadership across diverse sectors.",
      image: "/Roison Pave (GM Corporate Affairs).jpg",
      email: "roison.pave@unitedholdings.co.sz",
      phone: "+268 7600 0017",
      linkedin: "https://linkedin.com/in/roison-pave"
    },
    {
      id: 10,
      name: "Lungile Ngwenya",
      title: "Corporate Sales Manager",
      bio: "Corporate Sales & Retention Manager Ms. Ngwenya is a Regent Business school Alumnus from South Africa, holding a Degree in Business Management, Certificate of Proficiency (COP) in insurance and AAT 11.",
      image: "/Lungile Ngwenya (Corporate Sales Manager).jpeg",
      email: "lungile.ngwenya@unitedholdings.co.sz",
      phone: "+268 7600 0010",
      linkedin: "https://linkedin.com/in/lungile-ngwenya"
    },
    {
      id: 11,
      name: "Justice Dlamini",
      title: "Group ICT Manager",
      bio: "Mr. Justice Dlamini serves as the Group ICT Manager. He holds a Bachelor's Degree in Information Technology from the University of Eswatini, as well as an Associate Degree in Business Information Technology from Limkokwing University.",
      image: "/Justice Dlamini (IT Manager).jpg",
      email: "justice.dlamini@unitedholdings.co.sz",
      phone: "+268 7600 0011",
      linkedin: "https://linkedin.com/in/justice-dlamini"
    },
    {
      id: 12,
      name: "Simeon Simelane",
      title: "Group Internal Audit Manager",
      bio: "Mr. S. Simelane is a Certified Internal Auditor and risk management professional with over 20 years of experience in internal auditing, banking, insurance, compliance, and enterprise risk management.",
      image: "/Simeon Simelane (GIAM).jpeg",
      email: "simeon.simelane@unitedholdings.co.sz",
      phone: "+268 7600 0012",
      linkedin: "https://linkedin.com/in/simeon-simelane"
    },
    {
      id: 13,
      name: "Temahlubi Dlamini",
      title: "Group Marketing Manager",
      bio: "Ms. T. Dlamini is a seasoned marketing professional with academic qualifications in marketing and management from Monash University and the University of the Witwatersrand.",
      image: "/Temahlubi Dlamini (Group Marketing Manager) (1).jpg",
      email: "temahlubi.dlamini@unitedholdings.co.sz",
      phone: "+268 7600 0013",
      linkedin: "https://linkedin.com/in/temahlubi-dlamini"
    },
    {
      id: 14,
      name: "Siphesihle Dlamini",
      title: "Group Risk & Compliance Manager",
      bio: "Ms. S. Dlamini is a legal and risk management professional with experience spanning compliance oversight, enterprise risk assessment, and legal advisory services.",
      image: "/team/siphesihle-dlamini.jpg",
      email: "siphesihle.dlamini@unitedholdings.co.sz",
      phone: "+268 7600 0014",
      linkedin: "https://linkedin.com/in/siphesihle-dlamini"
    },
    {
      id: 15,
      name: "Peter Maseko",
      title: "Finance Manager",
      bio: "Mr. P. Maseko serves as the Finance Manager at United Holdings, bringing over 15 years of experience in financial management, auditing, and strategic operations.",
      image: "/Peter Maseko (Finance Manager).jpg",
      email: "peter.maseko@unitedholdings.co.sz",
      phone: "+268 7600 0015",
      linkedin: "https://linkedin.com/in/peter-maseko"
    },
    {
      id: 16,
      name: "Nozwelethu Nxumalo",
      title: "Retail Sales Manager",
      bio: "Ms. Nxumalo is an Institute of Marketing Management Graduate School (IMM GS) alumnus holding a BBA in Marketing Management, Diploma in Law from University of Eswatini.",
      image: "/Nozwelethu Nxumalo (Retail Sales Manager).jpg",
      email: "nozwelethu.nxumalo@unitedholdings.co.sz",
      phone: "+268 7600 0016",
      linkedin: "https://linkedin.com/in/nozwelethu-nxumalo"
    },

  ];

  // Team Card Component for consistent styling
  const TeamCard = ({ member }) => (
    <div className="bg-[#9b1c20] rounded-xl flex flex-col md:flex-row lg:flex-row hover:-xl transition-all duration-300 overflow-hidden group border border-gray-100 h-full">
      <div className="relative min-h-[350px] h-full  min-w-[40%]   bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <Image
          src={member.image}
          alt={member.name}
          width={300}
          height={300}
          quality={100}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      <div className="p-6  flex flex-col justify-between">
        <div className="mb-4">
          <h3 className="text-2xl font-semibold text-gray-100">{member.name}</h3>
          <div className='flex-wrap flex'>
            <p className=" text-sm mt-1 px-4 rounded-full bg-white text-[#9b1c20] py-1">{member.title}</p>

          </div>
        </div>
        <p className="text-gray-100 text-base leading-relaxed mb-4 line-clamp-4">
          {member.bio}
        </p>

        <div className="border-t border-gray-200/20 pt-4 mt-auto">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-3">
              <svg className="w-4 h-4 text-gray-100 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <a href={`mailto:${member.email}`} className="text-sm text-gray-100 hover:text-gray-300 transition-colors truncate">
                {member.email}
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <svg className="w-4 h-4 text-gray-100 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <a href={`tel:${member.phone}`} className="text-sm text-gray-100 hover:text-gray-300 transition-colors">
                {member.phone}
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <svg className="w-4 h-4 text-gray-100 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
              </svg>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-100 hover:text-gray-300 transition-colors">
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
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
          src={'/team-hero.jpg'}
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

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
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

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
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

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
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
    </div>
  );
}