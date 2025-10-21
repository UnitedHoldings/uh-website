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
  IoChevronDownOutline
} from "react-icons/io5";

// Mock data for job vacancies
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
    category: "Sales"
  },
  {
    id: 2,
    title: "Claims Processing Officer",
    department: "Claims Department",
    location: "Manzini HQ",
    type: "Full-time",
    experience: "3+ years",
    salary: "E10,000 - E15,000",
    postedDate: "2024-01-10",
    deadline: "2024-02-10",
    description: "Join our claims team as a Processing Officer. You will handle insurance claims efficiently and provide excellent service to our clients.",
    responsibilities: [
      "Process and evaluate insurance claims",
      "Communicate with clients regarding claim status",
      "Verify policy coverage and documentation",
      "Coordinate with assessors and investigators",
      "Maintain accurate claim records"
    ],
    requirements: [
      "Bachelor's degree in Finance or related field",
      "3+ years in claims processing",
      "Knowledge of insurance regulations",
      "Strong analytical skills",
      "Attention to detail"
    ],
    benefits: [
      "Competitive salary package",
      "Health and life insurance",
      "Pension fund",
      "Training opportunities",
      "Career growth path"
    ],
    company: "UGI",
    category: "Operations"
  },
  {
    id: 3,
    title: "Loan Officer",
    department: "Credit Department",
    location: "Mbabane",
    type: "Full-time",
    experience: "2+ years",
    salary: "E9,000 - E13,000",
    postedDate: "2024-01-12",
    deadline: "2024-02-12",
    description: "United Pay is seeking a Loan Officer to evaluate, authorize, and recommend approval of loan applications.",
    responsibilities: [
      "Evaluate loan applications and documentation",
      "Interview applicants to determine financial eligibility",
      "Determine all applicable ratios and metrics",
      "Approve loans within specified limits",
      "Complete loan contracts and counsel clients"
    ],
    requirements: [
      "Diploma in Finance or related field",
      "2+ years in lending or banking",
      "Knowledge of lending procedures",
      "Strong numerical skills",
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
    category: "Finance"
  },
  {
    id: 4,
    title: "Customer Service Representative",
    department: "Client Services",
    location: "Siteki",
    type: "Full-time",
    experience: "1+ years",
    salary: "E6,000 - E9,000",
    postedDate: "2024-01-08",
    deadline: "2024-02-08",
    description: "Provide exceptional customer service to our clients, handling inquiries and resolving issues efficiently.",
    responsibilities: [
      "Handle customer inquiries via phone and email",
      "Resolve customer complaints",
      "Process policy changes and updates",
      "Maintain customer records",
      "Provide product information"
    ],
    requirements: [
      "Matric certificate required",
      "1+ years customer service experience",
      "Excellent communication skills",
      "Computer literacy",
      "Problem-solving skills"
    ],
    benefits: [
      "Stable working hours",
      "Comprehensive training",
      "Career advancement opportunities",
      "Staff insurance benefits",
      "Supportive team environment"
    ],
    company: "ULA",
    category: "Customer Service"
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
    description: "Support our technology infrastructure and ensure smooth operation of all IT systems across the organization.",
    responsibilities: [
      "Maintain computer systems and networks",
      "Provide technical support to staff",
      "Install and configure software/hardware",
      "Troubleshoot system issues",
      "Ensure cybersecurity measures"
    ],
    requirements: [
      "Degree in IT or related field",
      "3+ years IT support experience",
      "Networking and hardware knowledge",
      "Windows/Linux server experience",
      "Relevant certifications (advantageous)"
    ],
    benefits: [
      "Competitive IT industry salary",
      "Latest technology exposure",
      "Certification support",
      "Flexible working hours",
      "Comprehensive benefits package"
    ],
    company: "UGI",
    category: "Technology"
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
    description: "Help families secure their future by providing life assurance solutions and financial advice.",
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
    category: "Sales"
  }
];

// Company colors
const COMPANY_COLORS = {
  'UGI': '#9b1c20',
  'ULA': '#3d834d',
  'UP': '#f79620'
};

const COMPANY_NAMES = {
  'UGI': 'United General Insurance',
  'ULA': 'United Life Assurance',
  'UP': 'United Pay'
};

export default function CareersPage() {
  const [jobs, setJobs] = useState(initialJobVacancies);
  const [filteredJobs, setFilteredJobs] = useState(initialJobVacancies);
  const [selectedJob, setSelectedJob] = useState(initialJobVacancies[0]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    company: 'All',
    location: 'All',
    category: 'All',
    type: 'All'
  });

  // Filter jobs based on search and filters
  useEffect(() => {
    let results = jobs;

    // Search filter
    if (searchTerm) {
      results = results.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase())
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

    setFilteredJobs(results);
  }, [searchTerm, filters, jobs]);

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

  // Calculate days until deadline
  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <>
      <SeoHead
        title="Careers at United Holdings | Join Our Team"
        description="Explore exciting career opportunities at United Holdings. Build your future with a trusted leader in insurance and financial services in Eswatini."
        keywords="United Holdings Careers, Jobs in Eswatini, Insurance Jobs, Financial Services Careers"
        image="/images/careers-og.jpg"
        url="https://www.unitedholdings.co.sz/about/careers"
      /><div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#9b1c20] to-[#3d834d] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Build your career with Eswatini&lsquo;s leading insurance and financial services group
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="bg-white/20 rounded-full px-6 py-2">
                  <span className="font-semibold">3 Companies</span>
                </div>
                <div className="bg-white/20 rounded-full px-6 py-2">
                  <span className="font-semibold">12+ Branches</span>
                </div>
                <div className="bg-white/20 rounded-full px-6 py-2">
                  <span className="font-semibold">50+ Employees</span>
                </div>
                <div className="bg-white/20 rounded-full px-6 py-2">
                  <span className="font-semibold">80+ Years Legacy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg -lg p-6 sticky top-8">
                <h3 className="text-lg font-semibold mb-4">Filter Jobs</h3>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Job title, department..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                    />
                    <IoSearchOutline className="absolute left-3 top-3 text-gray-400" />
                  </div>
                </div>

                {/* Company Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <select
                    value={filters.company}
                    onChange={(e) => setFilters({ ...filters, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                  >
                    {companies.map(company => (
                      <option key={company} value={company}>
                        {company === 'All' ? 'All Companies' : COMPANY_NAMES[company]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                  >
                    {locations.map(location => (
                      <option key={location} value={location}>
                        {location === 'All' ? 'All Locations' : location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'All' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Job Type Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                  >
                    {jobTypes.map(type => (
                      <option key={type} value={type}>
                        {type === 'All' ? 'All Types' : type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Reset Filters */}
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({
                      company: 'All',
                      location: 'All',
                      category: 'All',
                      type: 'All'
                    });
                  }}
                  className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Jobs List and Details */}
            <div className="lg:col-span-3">
              <div className="flex flex-col gap-8 lg:gap-12">
                {/* Jobs List */}
                <div className="xl:col-span-1">
                  <div className="bg-white rounded-lg -lg">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold">
                        Available Positions ({filteredJobs.length})
                      </h3>
                    </div>
                    <div className="max-h-[600px] overflow-y-auto">
                      {filteredJobs.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">
                          <p>No jobs found matching your criteria.</p>
                          <p className="text-sm mt-2">Try adjusting your filters.</p>
                        </div>
                      ) : (
                        filteredJobs.map(job => (
                          <div
                            key={job.id}
                            className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${selectedJob.id === job.id ? 'bg-blue-50 border-l-4 border-l-[#9b1c20]' : ''
                              }`}
                            onClick={() => setSelectedJob(job)}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900">{job.title}</h4>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSaveJob(job.id);
                                }}
                                className="text-gray-400 hover:text-yellow-500"
                              >
                                {savedJobs.includes(job.id) ? (
                                  <IoBookmark className="text-yellow-500" />
                                ) : (
                                  <IoBookmarkOutline />
                                )}
                              </button>
                            </div>

                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <IoBusinessOutline className="mr-1" />
                              <span
                                className="font-medium px-2 py-1 rounded-full text-xs"
                                style={{
                                  backgroundColor: `${COMPANY_COLORS[job.company]}20`,
                                  color: COMPANY_COLORS[job.company]
                                }}
                              >
                                {COMPANY_NAMES[job.company]}
                              </span>
                            </div>

                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <IoLocationOutline className="mr-1" />
                              <span>{job.location}</span>
                            </div>

                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <IoTimeOutline className="mr-1" />
                              <span>{job.type}</span>
                            </div>

                            <div className="flex justify-between items-center mt-3">
                              <span className="text-sm font-semibold text-green-600">
                                {job.salary}
                              </span>
                              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                                {getDaysUntilDeadline(job.deadline)} days left
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Job Details */}
                <div className="xl:col-span-2">
                  <div className="bg-white rounded-lg -lg p-6">
                    {selectedJob && (
                      <div>
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                              {selectedJob.title}
                            </h2>
                            <div className="flex flex-wrap gap-2 mb-4">
                              <span
                                className="px-3 py-1 rounded-full text-sm font-medium"
                                style={{
                                  backgroundColor: `${COMPANY_COLORS[selectedJob.company]}20`,
                                  color: COMPANY_COLORS[selectedJob.company]
                                }}
                              >
                                {COMPANY_NAMES[selectedJob.company]}
                              </span>
                              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                                {selectedJob.department}
                              </span>
                              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                                {selectedJob.location}
                              </span>
                              <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                                {selectedJob.type}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => toggleSaveJob(selectedJob.id)}
                              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                            >
                              {savedJobs.includes(selectedJob.id) ? (
                                <IoBookmark className="text-yellow-500 text-xl" />
                              ) : (
                                <IoBookmarkOutline className="text-gray-400 text-xl" />
                              )}
                            </button>
                            <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                              <IoShareSocialOutline className="text-gray-400 text-xl" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm text-gray-600">Experience</p>
                            <p className="font-semibold">{selectedJob.experience}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Salary</p>
                            <p className="font-semibold text-green-600">{selectedJob.salary}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Deadline</p>
                            <p className="font-semibold text-red-600">
                              {new Date(selectedJob.deadline).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Applications</p>
                            <p className="font-semibold">Open</p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          {/* Job Description */}
                          <div>
                            <h3 className="text-lg font-semibold mb-3">Job Description</h3>
                            <p className="text-gray-700">{selectedJob.description}</p>
                          </div>

                          {/* Responsibilities */}
                          <div>
                            <h3 className="text-lg font-semibold mb-3">Key Responsibilities</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                              {selectedJob.responsibilities.map((responsibility, index) => (
                                <li key={index}>{responsibility}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Requirements */}
                          <div>
                            <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                              {selectedJob.requirements.map((requirement, index) => (
                                <li key={index}>{requirement}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Benefits */}
                          <div>
                            <h3 className="text-lg font-semibold mb-3">Benefits & Perks</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                              {selectedJob.benefits.map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Application CTA */}
                          <div className="bg-blue-50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">Ready to Apply?</h3>
                            <p className="text-gray-700 mb-4">
                              Join our team and build your career with Eswatini&lsquo;s leading financial services group.
                            </p>
                            <div className="flex gap-4">
                              <button className="bg-[#9b1c20] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#881a1e] transition-colors flex items-center gap-2">
                                Apply Now
                                <IoArrowForwardOutline />
                              </button>
                              <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                                Download Job Description
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </>

  );
}