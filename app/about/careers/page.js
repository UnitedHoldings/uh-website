"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  IoBusinessOutline,
  IoLocationOutline,
  IoTimeOutline,
  IoBookmarkOutline,
  IoBookmark,
  IoShareSocialOutline,
  IoArrowForwardOutline,
  IoSearchOutline,
  IoFilterOutline,
  IoChevronDownOutline,
  IoPeopleOutline,
  IoBriefcaseOutline,
  IoSchoolOutline,
  IoCalendarOutline,
  IoStatsChartOutline,
  IoHeartOutline,
  IoHeart,
  IoEyeOutline,
  IoShareOutline,
  IoDownloadOutline,
  IoPlayOutline,
  IoPauseOutline,
  IoCheckmarkCircleOutline,
  IoStarOutline,
  IoStar,
  IoCloseOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline
} from "react-icons/io5";
import { trackPageDuration } from '@/lib/posthog';

// Enhanced mock data with more details and variety
const initialJobVacancies = [
  {
    id: 1,
    title: "Insurance Sales Agent",
    department: "Sales & Marketing",
    location: "Mbabane",
    type: "Full-time",
    experience: "2+ years",
    salary: "E8,000 - E12,000",
    postedDate: "2024-01-15",
    deadline: "2024-02-15",
    description: "We are looking for a motivated Insurance Sales Agent to join our team. You will be responsible for selling insurance policies and providing excellent customer service.",
    responsibilities: [
      "Sell insurance policies to new and existing clients",
      "Build and maintain client relationships",
      "Explain policy features and benefits",
      "Process applications and documentation",
      "Meet sales targets and goals"
    ],
    requirements: [
      "Diploma in Sales/Marketing or related field",
      "2+ years sales experience",
      "Excellent communication skills",
      "Valid Eswatini driver's license",
      "Insurance certification (advantageous)"
    ],
    benefits: [
      "Competitive salary + commission",
      "Medical insurance",
      "Retirement benefits",
      "Professional development",
      "Performance bonuses"
    ],
    company: "UGI",
    category: "Sales",
    urgency: "high",
    views: 124,
    applications: 23,
    featured: true,
    skills: ["Sales", "Communication", "Customer Service", "Insurance", "Negotiation"]
  },
  {
    id: 2,
    title: "Senior Claims Processing Officer",
    department: "Claims Department",
    location: "Manzini HQ",
    type: "Full-time",
    experience: "3+ years",
    salary: "E10,000 - E15,000",
    postedDate: "2024-01-10",
    deadline: "2024-02-10",
    description: "Join our claims team as a Senior Processing Officer. You will handle complex insurance claims efficiently and provide excellent service to our clients.",
    responsibilities: [
      "Process and evaluate complex insurance claims",
      "Communicate with clients regarding claim status",
      "Verify policy coverage and documentation",
      "Coordinate with assessors and investigators",
      "Train junior claims officers"
    ],
    requirements: [
      "Bachelor's degree in Finance or related field",
      "3+ years in claims processing",
      "Knowledge of insurance regulations",
      "Strong analytical skills",
      "Leadership experience"
    ],
    benefits: [
      "Competitive salary package",
      "Health and life insurance",
      "Pension fund",
      "Training opportunities",
      "Career growth path"
    ],
    company: "UGI",
    category: "Operations",
    urgency: "medium",
    views: 89,
    applications: 15,
    featured: false,
    skills: ["Claims Processing", "Analytical Skills", "Insurance Law", "Leadership", "Communication"]
  },
  {
    id: 3,
    title: "Digital Loan Officer",
    department: "Credit Department",
    location: "Mbabane",
    type: "Full-time",
    experience: "2+ years",
    salary: "E9,000 - E13,000",
    postedDate: "2024-01-12",
    deadline: "2024-02-12",
    description: "United Pay is seeking a Digital Loan Officer to evaluate, authorize, and recommend approval of loan applications through our digital platform.",
    responsibilities: [
      "Evaluate digital loan applications and documentation",
      "Use AI-powered risk assessment tools",
      "Determine all applicable ratios and metrics",
      "Approve loans within specified limits",
      "Provide digital customer support"
    ],
    requirements: [
      "Diploma in Finance or related field",
      "2+ years in digital lending or banking",
      "Knowledge of fintech platforms",
      "Strong numerical and tech skills",
      "Excellent customer service"
    ],
    benefits: [
      "Performance-based bonuses",
      "Mobile and transport allowance",
      "Medical aid",
      "Staff loan benefits",
      "Professional certification support"
    ],
    company: "UP",
    category: "Finance",
    urgency: "high",
    views: 156,
    applications: 31,
    featured: true,
    skills: ["FinTech", "Risk Assessment", "Digital Lending", "Customer Service", "Analytics"]
  },
  {
    id: 4,
    title: "Customer Experience Specialist",
    department: "Client Services",
    location: "Siteki",
    type: "Full-time",
    experience: "1+ years",
    salary: "E6,000 - E9,000",
    postedDate: "2024-01-08",
    deadline: "2024-02-08",
    description: "Provide exceptional customer experience to our clients across multiple channels, handling inquiries and resolving issues efficiently.",
    responsibilities: [
      "Handle customer inquiries via phone, email, and chat",
      "Resolve customer complaints proactively",
      "Process policy changes and updates",
      "Maintain customer experience metrics",
      "Provide product information and guidance"
    ],
    requirements: [
      "Matric certificate required",
      "1+ years customer service experience",
      "Excellent communication skills",
      "Computer literacy",
      "Multilingual (advantageous)"
    ],
    benefits: [
      "Stable working hours",
      "Comprehensive training",
      "Career advancement opportunities",
      "Staff insurance benefits",
      "Supportive team environment"
    ],
    company: "ULA",
    category: "Customer Service",
    urgency: "low",
    views: 67,
    applications: 12,
    featured: false,
    skills: ["Customer Service", "Communication", "Problem Solving", "Multilingual", "CRM"]
  },
  {
    id: 5,
    title: "IT Support Specialist",
    department: "Information Technology",
    location: "Manzini HQ",
    type: "Full-time",
    experience: "3+ years",
    salary: "E12,000 - E18,000",
    postedDate: "2024-01-05",
    deadline: "2024-02-05",
    description: "Support our technology infrastructure and ensure smooth operation of all IT systems across the organization with modern cloud solutions.",
    responsibilities: [
      "Maintain computer systems and networks",
      "Provide technical support to staff",
      "Install and configure software/hardware",
      "Troubleshoot system issues",
      "Manage cloud infrastructure"
    ],
    requirements: [
      "Degree in IT or related field",
      "3+ years IT support experience",
      "Networking and hardware knowledge",
      "Cloud platform experience (AWS/Azure)",
      "Relevant certifications"
    ],
    benefits: [
      "Competitive IT industry salary",
      "Latest technology exposure",
      "Certification support",
      "Flexible working hours",
      "Comprehensive benefits package"
    ],
    company: "UGI",
    category: "Technology",
    urgency: "medium",
    views: 98,
    applications: 18,
    featured: true,
    skills: ["IT Support", "Networking", "Cloud Computing", "Troubleshooting", "Security"]
  },
  {
    id: 6,
    title: "Life Assurance Advisor",
    department: "Sales & Marketing",
    location: "Nhlangano",
    type: "Full-time",
    experience: "2+ years",
    salary: "E7,000 - E11,000 + Commission",
    postedDate: "2024-01-18",
    deadline: "2024-02-18",
    description: "Help families secure their future by providing life assurance solutions and financial advice through personalized consultations.",
    responsibilities: [
      "Sell life assurance products",
      "Conduct client needs analysis",
      "Provide financial advice",
      "Build client portfolio",
      "Meet sales targets"
    ],
    requirements: [
      "Relevant financial services qualification",
      "2+ years in financial services",
      "Excellent interpersonal skills",
      "Self-motivated and driven",
      "Valid regulatory certifications"
    ],
    benefits: [
      "Uncapped commission structure",
      "Company vehicle allowance",
      "Comprehensive health cover",
      "Retirement planning",
      "Performance incentives"
    ],
    company: "ULA",
    category: "Sales",
    urgency: "high",
    views: 112,
    applications: 27,
    featured: false,
    skills: ["Financial Advice", "Sales", "Client Relations", "Insurance", "Financial Planning"]
  },
  {
    id: 7,
    title: "Mobile App Developer",
    department: "Technology & Innovation",
    location: "Manzini HQ",
    type: "Full-time",
    experience: "3+ years",
    salary: "E15,000 - E22,000",
    postedDate: "2024-01-20",
    deadline: "2024-02-20",
    description: "Join our innovation team to develop cutting-edge mobile applications for United Pay's digital financial services platform.",
    responsibilities: [
      "Develop and maintain mobile applications",
      "Collaborate with UX/UI designers",
      "Implement new features and functionalities",
      "Ensure app performance and quality",
      "Stay updated with mobile technologies"
    ],
    requirements: [
      "Degree in Computer Science or related",
      "3+ years mobile development experience",
      "Proficiency in React Native/Flutter",
      "Experience with REST APIs",
      "Portfolio of published apps"
    ],
    benefits: [
      "Competitive tech salary",
      "Flexible remote work options",
      "Latest equipment provided",
      "Conference and training budget",
      "Stock options potential"
    ],
    company: "UP",
    category: "Technology",
    urgency: "high",
    views: 203,
    applications: 45,
    featured: true,
    skills: ["React Native", "Mobile Development", "JavaScript", "API Integration", "UI/UX"]
  },
  {
    id: 8,
    title: "HR Business Partner",
    department: "Human Resources",
    location: "Manzini HQ",
    type: "Full-time",
    experience: "4+ years",
    salary: "E14,000 - E20,000",
    postedDate: "2024-01-14",
    deadline: "2024-02-14",
    description: "Strategic HR partner supporting business units in talent management, employee relations, and organizational development.",
    responsibilities: [
      "Partner with business leaders on HR strategy",
      "Manage employee relations and engagement",
      "Drive talent development initiatives",
      "Oversee performance management",
      "Implement HR policies and procedures"
    ],
    requirements: [
      "Bachelor's degree in HR or related",
      "4+ years HR business partner experience",
      "Knowledge of Eswatini labor laws",
      "Strong interpersonal skills",
      "HR certification preferred"
    ],
    benefits: [
      "Strategic role impact",
      "Professional development",
      "Comprehensive benefits",
      "Leadership exposure",
      "Work-life balance"
    ],
    company: "Group",
    category: "HR",
    urgency: "medium",
    views: 76,
    applications: 14,
    featured: false,
    skills: ["HR Strategy", "Talent Management", "Employee Relations", "Labor Law", "Leadership"]
  }
];

// Company information
const COMPANY_INFO = {
  'UGI': {
    name: 'United General Insurance',
    color: '#9b1c20',
    bgColor: 'bg-[#9b1c20]',
    description: 'Leading general insurance provider'
  },
  'ULA': {
    name: 'United Life Assurance',
    color: '#3d834d',
    bgColor: 'bg-[#3d834d]',
    description: 'Life assurance and financial planning'
  },
  'UP': {
    name: 'United Pay',
    color: '#f79620',
    bgColor: 'bg-[#f79620]',
    description: 'Digital financial services and payments'
  },
  'Group': {
    name: 'United Group',
    color: '#1e3a8a',
    bgColor: 'bg-[#1e3a8a]',
    description: 'Corporate headquarters and shared services'
  }
};

// Category icons
const CATEGORY_ICONS = {
  'Sales': IoPeopleOutline,
  'Operations': IoBriefcaseOutline,
  'Finance': IoStatsChartOutline,
  'Customer Service': IoHeartOutline,
  'Technology': IoSchoolOutline,
  'HR': IoBusinessOutline
};

export default function CareersPage() {
  const [jobs, setJobs] = useState(initialJobVacancies);
  const [filteredJobs, setFilteredJobs] = useState(initialJobVacancies);
  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    company: 'All',
    location: 'All',
    category: 'All',
    type: 'All',
    experience: 'All',
    urgency: 'All'
  });
  const [sortBy, setSortBy] = useState('newest');
  const [view, setView] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [applicationModal, setApplicationModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Track page duration
  useEffect(() => {
    const stopTracking = trackPageDuration('about_careers');
    return () => stopTracking();
  }, []);

  // Filter and sort jobs
  useEffect(() => {
    let results = jobs;

    // Search filter
    if (searchTerm) {
      results = results.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Company filter
    if (filters.company !== 'All') {
      results = results.filter(job => job.company === filters.company);
    }

    // Location filter
    if (filters.location !== 'All') {
      results = results.filter(job => job.location === filters.location);
    }

    // Category filter
    if (filters.category !== 'All') {
      results = results.filter(job => job.category === filters.category);
    }

    // Type filter
    if (filters.type !== 'All') {
      results = results.filter(job => job.type === filters.type);
    }

    // Experience filter
    if (filters.experience !== 'All') {
      results = results.filter(job => {
        const expYears = parseInt(job.experience);
        switch (filters.experience) {
          case 'entry': return expYears <= 1;
          case 'mid': return expYears > 1 && expYears <= 3;
          case 'senior': return expYears > 3;
          default: return true;
        }
      });
    }

    // Urgency filter
    if (filters.urgency !== 'All') {
      results = results.filter(job => job.urgency === filters.urgency);
    }

    // Sort results
    switch (sortBy) {
      case 'newest':
        results.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        break;
      case 'deadline':
        results.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        break;
      case 'salary':
        results.sort((a, b) => {
          const aSalary = parseInt(a.salary.replace(/[^\d]/g, ''));
          const bSalary = parseInt(b.salary.replace(/[^\d]/g, ''));
          return bSalary - aSalary;
        });
        break;
      case 'popular':
        results.sort((a, b) => b.views - a.views);
        break;
      default:
        break;
    }

    setFilteredJobs(results);
  }, [searchTerm, filters, sortBy, jobs]);

  // Toggle save job
  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  // Get unique values for filters
  const companies = ['All', ...new Set(jobs.map(job => job.company))];
  const locations = ['All', ...new Set(jobs.map(job => job.location))];
  const categories = ['All', ...new Set(jobs.map(job => job.category))];
  const jobTypes = ['All', ...new Set(jobs.map(job => job.type))];
  const experiences = ['All', 'Entry (0-1 years)', 'Mid (2-3 years)', 'Senior (4+ years)'];
  const urgencyLevels = ['All', 'High', 'Medium', 'Low'];

  // Calculate days until deadline with color coding
  const getDeadlineInfo = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return { days: 0, color: 'text-red-600', bg: 'bg-red-100', label: 'Expired' };
    if (diffDays <= 3) return { days: diffDays, color: 'text-red-600', bg: 'bg-red-100', label: 'Urgent' };
    if (diffDays <= 7) return { days: diffDays, color: 'text-orange-600', bg: 'bg-orange-100', label: 'Closing soon' };
    return { days: diffDays, color: 'text-green-600', bg: 'bg-green-100', label: 'Active' };
  };

  // Get experience level
  const getExperienceLevel = (experience) => {
    const years = parseInt(experience);
    if (years <= 1) return { level: 'Entry', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (years <= 3) return { level: 'Mid', color: 'text-green-600', bg: 'bg-green-100' };
    return { level: 'Senior', color: 'text-purple-600', bg: 'bg-purple-100' };
  };

  // Open job details overlay
  const openJobDetails = (job) => {
    setSelectedJob(job);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  // Close job details overlay
  const closeJobDetails = () => {
    setSelectedJob(null);
    document.body.style.overflow = 'unset'; // Re-enable scrolling
  };

  // Handle keyboard navigation for job details
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedJob) {
        if (e.key === 'Escape') {
          closeJobDetails();
        }
        if (e.key === 'ArrowRight') {
          const currentIndex = filteredJobs.findIndex(job => job.id === selectedJob.id);
          const nextIndex = (currentIndex + 1) % filteredJobs.length;
          setSelectedJob(filteredJobs[nextIndex]);
        }
        if (e.key === 'ArrowLeft') {
          const currentIndex = filteredJobs.findIndex(job => job.id === selectedJob.id);
          const prevIndex = (currentIndex - 1 + filteredJobs.length) % filteredJobs.length;
          setSelectedJob(filteredJobs[prevIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedJob, filteredJobs]);

  // Application steps
  const applicationSteps = [
    { number: 1, title: 'Personal Info', completed: currentStep > 1 },
    { number: 2, title: 'Resume Upload', completed: currentStep > 2 },
    { number: 3, title: 'Questions', completed: currentStep > 3 },
    { number: 4, title: 'Review', completed: currentStep > 4 }
  ];

  return (
    <div className="min-h-screen  ">
      {/* Enhanced Hero Section */}
      <div className="relative  bg-[#9b1c20] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl text-white mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text  bg-[#9b1c20] text-white">
              Build Your Future With Us
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Join Eswatini's leading financial services group and grow your career with purpose, impact, and innovation.
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 max-w-2xl mx-auto">
              {[
                { number: '3', label: 'Companies' },
                { number: '50+', label: 'Open Roles' },
                { number: '12+', label: 'Locations' },
                { number: '80+', label: 'Years Legacy' }
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl md:text-3xl font-bold mb-1">{stat.number}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Quick Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for your dream job... (e.g., 'Sales', 'Technology', 'Mbabane')"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 bg-white rounded-2xl border-0 text-gray-900 text-lg  focus:ring-4 focus:ring-blue-500/20"
                />
                <IoSearchOutline className="absolute right-6 top-4 text-2xl text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-current text-white"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-current text-white"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-current text-white"></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''} Available
            </h2>
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <span>•</span>
              <span>{jobs.reduce((sum, job) => sum + job.views, 0).toLocaleString()} views</span>
              <span>•</span>
              <span>{jobs.reduce((sum, job) => sum + job.applications, 0).toLocaleString()} applications</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* View Toggle */}
            <div className="flex bg-white rounded-lg  border border-gray-200 p-1">
              <button
                onClick={() => setView('grid')}
                className={`p-2 rounded-md transition-all ${
                  view === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded-md transition-all ${
                  view === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                List
              </button>
            </div>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="deadline">Deadline</option>
              <option value="salary">Salary</option>
              <option value="popular">Most Popular</option>
            </select>

            {/* Filter Toggle for Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg  hover:bg-gray-50"
            >
              <IoFilterOutline />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl  p-6 sticky top-8 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setFilters({
                    company: 'All',
                    location: 'All',
                    category: 'All',
                    type: 'All',
                    experience: 'All',
                    urgency: 'All'
                  })}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Reset All
                </button>
              </div>

              {/* Company Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Company</label>
                <div className="space-y-2">
                  {companies.map(company => (
                    <label key={company} className="flex items-center">
                      <input
                        type="radio"
                        name="company"
                        value={company}
                        checked={filters.company === company}
                        onChange={(e) => setFilters({ ...filters, company: e.target.value })}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        {company === 'All' ? 'All Companies' : COMPANY_INFO[company]?.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Location</label>
                <div className="space-y-2">
                  {locations.map(location => (
                    <label key={location} className="flex items-center">
                      <input
                        type="radio"
                        name="location"
                        value={location}
                        checked={filters.location === location}
                        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        {location === 'All' ? 'All Locations' : location}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={filters.category === category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        {category === 'All' ? 'All Categories' : category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Experience Level</label>
                <div className="space-y-2">
                  {experiences.map(exp => (
                    <label key={exp} className="flex items-center">
                      <input
                        type="radio"
                        name="experience"
                        value={exp.split(' ')[0].toLowerCase()}
                        checked={filters.experience === exp.split(' ')[0].toLowerCase()}
                        onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">{exp}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Job Market</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Featured Jobs</span>
                    <span className="font-semibold">{jobs.filter(j => j.featured).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Urgent Hiring</span>
                    <span className="font-semibold text-red-600">{jobs.filter(j => j.urgency === 'high').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Remote Options</span>
                    <span className="font-semibold">{jobs.filter(j => j.location.includes('Remote')).length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Jobs Grid/List */}
          <div className="lg:col-span-3">
            {view === 'grid' ? (
              // Grid View
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredJobs.map(job => {
                  const deadlineInfo = getDeadlineInfo(job.deadline);
                  const experienceInfo = getExperienceLevel(job.experience);
                  const CategoryIcon = CATEGORY_ICONS[job.category] || IoBriefcaseOutline;
                  
                  return (
                    <div
                      key={job.id}
                      className={`bg-white rounded-2xl   transition-all duration-300 cursor-pointer border-2 ${
                        job.featured ? 'ring-4 ring-yellow-500/20 border-yellow-500' : 'border-transparent'
                      }`}
                      onClick={() => openJobDetails(job)}
                    >
                      <div className="p-6">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span 
                                className="px-3 py-1 rounded-full text-white text-sm font-semibold"
                                style={{ backgroundColor: COMPANY_INFO[job.company]?.color }}
                              >
                                {COMPANY_INFO[job.company]?.name}
                              </span>
                              {job.featured && (
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                                  Featured
                                </span>
                              )}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{job.department}</p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSaveJob(job.id);
                            }}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            {savedJobs.includes(job.id) ? (
                              <IoBookmark className="text-yellow-500 text-xl" />
                            ) : (
                              <IoBookmarkOutline className="text-gray-400 text-xl" />
                            )}
                          </button>
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-1">
                            <IoLocationOutline />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <IoTimeOutline />
                            <span>{job.type}</span>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${experienceInfo.bg} ${experienceInfo.color}`}>
                            {experienceInfo.level}
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {job.skills.slice(0, 3).map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{job.skills.length - 3} more
                            </span>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1 text-gray-600">
                              <IoEyeOutline />
                              <span>{job.views}</span>
                            </div>
                            <div className="flex items-center gap-1 text-green-600">
                              <IoPeopleOutline />
                              <span>{job.applications}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-green-600 text-sm">{job.salary}</div>
                            <div className={`text-xs ${deadlineInfo.color}`}>
                              {deadlineInfo.days > 0 ? `${deadlineInfo.days} days left` : 'Expired'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // List View
              <div className="space-y-4">
                {filteredJobs.map(job => {
                  const deadlineInfo = getDeadlineInfo(job.deadline);
                  const experienceInfo = getExperienceLevel(job.experience);
                  
                  return (
                    <div
                      key={job.id}
                      className={`bg-white rounded-2xl  transition-all duration-300 cursor-pointer border-2 ${
                        job.featured ? 'ring-4 ring-yellow-500/20 border-yellow-500' : 'border-transparent'
                      }`}
                      onClick={() => openJobDetails(job)}
                    >
                      <div className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span 
                                className="px-3 py-1 rounded-full text-white text-sm font-semibold"
                                style={{ backgroundColor: COMPANY_INFO[job.company]?.color }}
                              >
                                {COMPANY_INFO[job.company]?.name}
                              </span>
                              {job.featured && (
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                                  Featured
                                </span>
                              )}
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${deadlineInfo.bg} ${deadlineInfo.color}`}>
                                {deadlineInfo.label}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                            <p className="text-gray-600 mb-2">{job.department} • {job.location}</p>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">{job.description}</p>
                            
                            <div className="flex flex-wrap gap-2">
                              {job.skills.slice(0, 4).map((skill, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end gap-3">
                            <div className="text-right">
                              <div className="font-bold text-green-600 text-lg">{job.salary}</div>
                              <div className="text-sm text-gray-600">{job.type}</div>
                              <div className={`text-sm ${deadlineInfo.color}`}>
                                {deadlineInfo.days > 0 ? `${deadlineInfo.days} days left` : 'Expired'}
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSaveJob(job.id);
                                }}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              >
                                {savedJobs.includes(job.id) ? (
                                  <IoBookmark className="text-yellow-500 text-xl" />
                                ) : (
                                  <IoBookmarkOutline className="text-gray-400 text-xl" />
                                )}
                              </button>
                              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <IoShareSocialOutline className="text-gray-400 text-xl" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Empty State */}
            {filteredJobs.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <IoBriefcaseOutline className="text-4xl text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No jobs found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  We couldn't find any jobs matching your criteria. Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({
                      company: 'All',
                      location: 'All',
                      category: 'All',
                      type: 'All',
                      experience: 'All',
                      urgency: 'All'
                    });
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all "
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Job Details Overlay */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="relative p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span 
                      className="px-3 py-1 rounded-full text-white text-sm font-semibold"
                      style={{ backgroundColor: COMPANY_INFO[selectedJob.company]?.color }}
                    >
                      {COMPANY_INFO[selectedJob.company]?.name}
                    </span>
                    {selectedJob.featured && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {selectedJob.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-3">{selectedJob.department}</p>
                  
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                      {selectedJob.location}
                    </span>
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                      {selectedJob.type}
                    </span>
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                      {selectedJob.experience}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => toggleSaveJob(selectedJob.id)}
                    className="p-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    {savedJobs.includes(selectedJob.id) ? (
                      <IoBookmark className="text-yellow-500 text-2xl" />
                    ) : (
                      <IoBookmarkOutline className="text-gray-400 text-2xl" />
                    )}
                  </button>
                  <button className="p-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors">
                    <IoShareSocialOutline className="text-gray-400 text-2xl" />
                  </button>
                  <button
                    onClick={closeJobDetails}
                    className="p-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    <IoCloseOutline className="text-gray-400 text-2xl" />
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Salary</p>
                  <p className="font-bold text-green-600 text-lg">{selectedJob.salary}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Deadline</p>
                  <p className="font-bold text-red-600 text-lg">
                    {new Date(selectedJob.deadline).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Views</p>
                  <p className="font-bold text-blue-600 text-lg">{selectedJob.views}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Applications</p>
                  <p className="font-bold text-purple-600 text-lg">{selectedJob.applications}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-8">
                {/* Job Description */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <IoBriefcaseOutline className="text-blue-600" />
                    Job Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{selectedJob.description}</p>
                </div>

                {/* Responsibilities */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <IoCheckmarkCircleOutline className="text-green-600" />
                    Key Responsibilities
                  </h3>
                  <ul className="space-y-3">
                    {selectedJob.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <IoSchoolOutline className="text-orange-600" />
                    Requirements
                  </h3>
                  <ul className="space-y-3">
                    {selectedJob.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <IoHeartOutline className="text-red-600" />
                    Benefits & Perks
                  </h3>
                  <ul className="space-y-3">
                    {selectedJob.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <IoStatsChartOutline className="text-purple-600" />
                    Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">Ready to Apply?</h4>
                  <p className="text-gray-600">Join our team and start your journey with United Group.</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setApplicationModal(true)}
                    className="px-8 py-3 bg-gradient-to-r from-[#9b1c20] to-[#3d834d] text-white rounded-xl font-semibold hover:from-[#881a1e] hover:to-[#2d6b3d] transition-all shadow-lg flex items-center gap-2"
                  >
                    Apply Now
                    <IoArrowForwardOutline />
                  </button>
                  <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-white transition-colors flex items-center gap-2">
                    <IoDownloadOutline />
                    Save PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application Modal */}
      {applicationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900">Apply for {selectedJob?.title}</h3>
                <button
                  onClick={() => setApplicationModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <IoCloseOutline className="text-2xl text-gray-400" />
                </button>
              </div>
              
              {/* Progress Steps */}
              <div className="flex justify-between mt-6">
                {applicationSteps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      step.completed ? 'bg-green-500 text-white' : 
                      currentStep === step.number ? 'bg-blue-600 text-white' : 
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {step.completed ? <IoCheckmarkCircleOutline /> : step.number}
                    </div>
                    <span className={`ml-2 text-sm font-medium ${
                      currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                    {index < applicationSteps.length - 1 && (
                      <div className={`w-12 h-0.5 mx-4 ${
                        step.completed ? 'bg-green-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6">
              {/* Application form would go here */}
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <IoBriefcaseOutline className="text-2xl text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Application Process</h4>
                <p className="text-gray-600 mb-6">
                  This would be a multi-step application form with file uploads and validation.
                </p>
                <button
                  onClick={() => setApplicationModal(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}