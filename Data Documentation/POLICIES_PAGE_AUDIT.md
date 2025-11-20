CMS Structure Analysis
Key Patterns Identified:
Response Format:

typescript
{
  success: boolean;
  data: {
    pageConfig: PageConfig;
    jobs: Array<Job>; // Dynamic content array
  };
  message: string;
}
Page Configuration Structure:

Uses _id and _type fields for CMS identification

Organized by sections (hero, filters, CTA)

Contains both content and styling properties

Includes status management

Data Organization:

pageConfig for static page elements

Separate array for dynamic content (jobs in this case)

Mix of text content and configuration data

📝 Applying This to Policies Page
Based on this structure, here's how we should structure the Policies page CMS response:

typescript
// Proposed Policies Page CMS Structure
{
  success: true,
  data: {
    pageConfig: {
      _id: "policies_page_id",
      _type: "policiesPage",
      
      // Header Section
      headerTitle: "Our Policies",
      headerSubtitle: "Review our policies for consumer protection, data handling, and more.",
      
      // Hero Banner
      heroImage: "/legal.jpg",
      heroTitle: "Transparent Policies for Your Peace of Mind", 
      heroDescription: "We're committed to clear communication about how we protect your rights and data.",
      
      // Introduction
      introductionText: "Our policies ensure transparency and protect your rights. All policies are regularly updated in accordance with Eswatini regulations.",
      highlightedText: "Eswatini regulations",
      highlightColor: "#9b1c20",
      
      // Contact Information
      helpText: "Need help? Call 800 1010 or email info@united.co.sz",
      contactEmail: "info@united.co.sz",
      contactPhone: "800 1010",
      
      status: "published"
    },
    policies: [
      {
        _id: "policy_consumer",
        _type: "policy",
        id: "consumer",
        name: "Consumer Protection Policy",
        title: "United Holdings Consumer Protection Policy",
        effectiveDate: "October 09, 2025",
        content: "Full HTML content of the policy...",
        status: "published"
      },
      {
        _id: "policy_cookie", 
        _type: "policy",
        id: "cookie",
        name: "Cookie Policy",
        title: "United Holdings Cookie Policy",
        effectiveDate: "October 09, 2025",
        content: "Full HTML content...",
        status: "published"
      }
      // ... other policies
    ]
  },
  message: "OK"
}
🔄 Updated Implementation Approach
javascript
// Updated frontend implementation using the CMS structure
'use client'
import { useEffect, useState } from 'react'

export default function PolicyPage() {
  const [activePolicy, setActivePolicy] = useState('consumer')
  const [pageData, setPageData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/cms/pages/policies')
      .then(r => r.json())
      .then((response) => {
        if (response.success) {
          setPageData(response.data)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading policies...</div>
  if (!pageData) return <div>Policies page not found</div>

  const { pageConfig, policies } = pageData
  const currentPolicy = policies.find(p => p.id === activePolicy)

  return (
    <div className="min-h-screen font-outfit mx-auto">
      {/* Header section - Dynamic */}
      <div className='bg-[#9b1c20] py-4'>
        <header className="max-w-[1400px] mx-auto px-4">
          <h1 className="text-2xl md:text-4xl font-semibold text-white">
            {pageConfig.headerTitle}
          </h1>
          <p className="text-sm text-white">{pageConfig.headerSubtitle}</p>
        </header>
      </div>

      {/* Rest of the dynamic implementation */}
      {/* ... */}
    </div>
  )
}
🗄️ Updated Database Schema
sql
-- Following the pattern from careers page
CREATE TABLE policy_pages (
  _id UUID PRIMARY KEY,
  _type VARCHAR(50) DEFAULT 'policiesPage',
  
  -- Page configuration
  header_title VARCHAR(255),
  header_subtitle TEXT,
  hero_image_url TEXT,
  hero_title VARCHAR(255),
  hero_description TEXT,
  introduction_text TEXT,
  highlighted_text VARCHAR(255),
  highlight_color VARCHAR(7) DEFAULT '#9b1c20',
  help_text TEXT,
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  
  status VARCHAR(20) DEFAULT 'published',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE policies (
  _id UUID PRIMARY KEY,
  _type VARCHAR(50) DEFAULT 'policy',
  policy_page_id UUID REFERENCES policy_pages(_id),
  id VARCHAR(50), -- consumer, cookie, etc.
  name VARCHAR(255),
  title VARCHAR(255),
  effective_date VARCHAR(100),
  content TEXT, -- HTML content
  status VARCHAR(20) DEFAULT 'published',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);