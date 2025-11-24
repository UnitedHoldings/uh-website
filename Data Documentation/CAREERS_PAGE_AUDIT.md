markdown
# 📄 Careers Page Data Audit & CMS Migration

**File**: `app/careers/page.js`  
**Type**: Page Component  
**Date Analyzed**: November 11, 2025

---

## 📋 Executive Summary

The Careers page contains **hardcoded content** across 3 main sections and includes **mock job data** that should be managed through a CMS. The page features job listings, filtering capabilities, and detailed job views.

---

## 🔍 Hardcoded Data Inventory

### Section 1: Hero Section

**Location**: Lines 216-244

**Current Hardcoded Data**:
```javascript
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
Data to Migrate:

json
{
  "section": "hero",
  "title": "Join Our Team",
  "subtitle": "Build your career with Eswatini's leading insurance and financial services group",
  "statistics": [
    { "label": "Companies", "value": "3" },
    { "label": "Branches", "value": "12+" },
    { "label": "Employees", "value": "50+" },
    { "label": "Years Legacy", "value": "80+" }
  ],
  "backgroundColor": "gradient-to-r from-[#9b1c20] to-[#3d834d]"
}
Section 2: Job Vacancies Data
Location: Lines 9-181 (Mock data array)

Current Hardcoded Data Structure:

javascript
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
    description: "We are looking for a motivated Insurance Sales Agent...",
    responsibilities: ["Sell insurance policies...", "Build and maintain..."],
    requirements: ["Diploma in Sales/Marketing...", "2+ years sales experience..."],
    benefits: ["Competitive salary + commission", "Medical insurance..."],
    company: "UGI",
    category: "Sales"
  },
  // ... 5 more job objects
];
Data to Migrate (Job Entity):

json
{
  "section": "job_vacancies",
  "jobs": [
    {
      "id": "uuid",
      "title": "Insurance Sales Agent",
      "department": "Sales & Marketing",
      "location": "Mbabane",
      "type": "Full-time",
      "experience": "2+ years",
      "salary": "E8,000 - E12,000",
      "postedDate": "2024-01-15",
      "deadline": "2024-02-15",
      "description": "We are looking for a motivated Insurance Sales Agent...",
      "responsibilities": ["Sell insurance policies...", "Build and maintain..."],
      "requirements": ["Diploma in Sales/Marketing...", "2+ years sales experience..."],
      "benefits": ["Competitive salary + commission", "Medical insurance..."],
      "company": "UGI",
      "category": "Sales",
      "status": "published",
      "applicationLink": "/careers/apply/{id}",
      "slug": "insurance-sales-agent-mbabane"
    }
  ]
}
Section 3: Company Information
Location: Lines 184-194

Current Hardcoded Data:

javascript
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
Data to Migrate:

json
{
  "section": "company_info",
  "companies": [
    {
      "code": "UGI",
      "name": "United General Insurance",
      "color": "#9b1c20",
      "description": "Providing short-term insurance solutions"
    },
    {
      "code": "ULA", 
      "name": "United Life Assurance",
      "color": "#3d834d",
      "description": "Offering long-term insurance and life coverage"
    },
    {
      "code": "UP",
      "name": "United Pay", 
      "color": "#f79620",
      "description": "Delivering fast, reliable cash loans"
    }
  ]
}
Section 4: Filter Options
Location: Lines 327-330 (Derived from job data)

Current Implementation:

javascript
const companies = ['All', ...new Set(jobs.map(job => job.company))];
const locations = ['All', ...new Set(jobs.map(job => job.location))];
const categories = ['All', ...new Set(jobs.map(job => job.category))];
const jobTypes = ['All', ...new Set(jobs.map(job => job.type))];
Data to Migrate (Filter Configuration):

json
{
  "section": "filter_config",
  "filterOptions": {
    "locations": ["Mbabane", "Manzini HQ", "Siteki", "Nhlangano"],
    "categories": ["Sales", "Operations", "Finance", "Customer Service", "Technology"],
    "jobTypes": ["Full-time", "Part-time", "Contract", "Remote"],
    "companies": ["UGI", "ULA", "UP"]
  }
}
Section 5: Application CTA
Location: Lines 468-482

Current Hardcoded Data:

javascript
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
Data to Migrate:

json
{
  "section": "application_cta",
  "heading": "Ready to Apply?",
  "description": "Join our team and build your career with Eswatini's leading financial services group.",
  "primaryButton": {
    "text": "Apply Now",
    "action": "apply",
    "color": "#9b1c20"
  },
  "secondaryButton": {
    "text": "Download Job Description", 
    "action": "download",
    "color": "gray"
  }
}
📊 Data Summary
Section	Type	Fields	Records
Hero	Text + Stats	2 text, 4 stats	1
Job Vacancies	Structured Data	15 fields × 6	6
Company Info	Reference Data	4 fields × 3	3
Filter Options	Configuration	4 arrays	1
Application CTA	Text + CTA	1 heading, 1 desc, 2 CTAs	1
TOTAL	-	106 data points	12 data items
🗄️ CMS Entities
Entity 1: CareersPage
typescript
interface CMSCareersPage {
  id: string
  slug: string = "careers"
  
  // Hero Section
  heroTitle: string
  heroSubtitle: string
  heroStatistics: {
    label: string
    value: string
  }[]
  
  // Filter Configuration
  filterLocations: string[]
  filterCategories: string[]
  filterJobTypes: string[]
  
  // Application CTA
  ctaHeading: string
  ctaDescription: string
  ctaPrimaryText: string
  ctaSecondaryText: string
  
  // Metadata
  createdAt: ISO8601
  updatedAt: ISO8601
  publishedAt?: ISO8601
  status: 'draft' | 'published'
}
Entity 2: JobVacancy
typescript
interface CMSJobVacancy {
  id: string
  slug: string
  
  // Basic Info
  title: string
  department: string
  location: string
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote'
  experience: string
  salary: string
  
  // Dates
  postedDate: ISO8601
  deadline: ISO8601
  
  // Content
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  
  // Classification
  company: 'UGI' | 'ULA' | 'UP'
  category: string
  
  // Status
  status: 'draft' | 'published' | 'closed' | 'filled'
  applicationCount: number
  
  // Metadata
  createdAt: ISO8601
  updatedAt: ISO8601
  publishedAt?: ISO8601
}
Entity 3: Company
typescript
interface CMSCompany {
  id: string
  code: string
  name: string
  color: string
  description: string
  careersDescription?: string
  website?: string
  contactEmail?: string
}
🔌 API Endpoints Needed
text
// Careers Page Content
GET  /api/cms/pages/careers              // Get careers page data
PUT  /api/cms/pages/careers              // Update careers page (admin)

// Job Vacancies
GET  /api/cms/jobs                       // Get all published jobs
GET  /api/cms/jobs?status=published      // Filter by status
GET  /api/cms/jobs/{id}                  // Get single job
POST /api/cms/jobs                       // Create job (admin)
PUT  /api/cms/jobs/{id}                  // Update job (admin)
DELETE /api/cms/jobs/{id}                // Delete job (admin)

// Companies
GET  /api/cms/companies                  // Get all companies
GET  /api/cms/companies/{code}           // Get company by code

// Applications
POST /api/cms/applications               // Submit application
GET  /api/cms/applications/{jobId}       // Get applications for job (admin)
🛠️ Migration Implementation
Current Implementation
javascript
// app/careers/page.js - CURRENT
export default function CareersPage() {
  const [jobs, setJobs] = useState(initialJobVacancies); // Hardcoded data
  // ... component logic
}
After Migration
javascript
'use client'
import { useEffect, useState } from 'react'

export default function CareersPage() {
  const [pageData, setPageData] = useState(null)
  const [jobs, setJobs] = useState([])
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch page content and jobs in parallel
    Promise.all([
      fetch('/api/cms/pages/careers').then(r => r.json()),
      fetch('/api/cms/jobs?status=published').then(r => r.json()),
      fetch('/api/cms/companies').then(r => r.json())
    ])
    .then(([pageRes, jobsRes, companiesRes]) => {
      setPageData(pageRes.data)
      setJobs(jobsRes.data)
      setCompanies(companiesRes.data)
    })
    .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading careers...</div>
  if (!pageData) return <div>Careers page not found</div>

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Dynamic */}
      <div className="bg-gradient-to-r from-[#9b1c20] to-[#3d834d] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {pageData.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {pageData.heroSubtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {pageData.heroStatistics.map((stat, index) => (
                <div key={index} className="bg-white/20 rounded-full px-6 py-2">
                  <span className="font-semibold">{stat.value} {stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rest of component using dynamic jobs data */}
      {/* Filtering and job display logic remains similar but uses API data */}
    </div>
  )
}