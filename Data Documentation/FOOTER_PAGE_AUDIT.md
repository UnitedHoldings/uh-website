 Footer Component Data Audit & CMS Migration
File: components/Footer.js
Type: Global Component
Date Analyzed: November 11, 2025

📋 Executive Summary
The Footer component contains hardcoded content across 5 main sections including contact information, social links, and navigation. All content can be moved to a CMS for dynamic management.

🔍 Hardcoded Data Inventory
Section 1: Company Identity & Contact Information
Location: Lines 150-200

Current Hardcoded Data:

javascript
{/* Logo */}
<Image src="/Logo-white.svg" alt="United Holdings Logo" ... />

{/* Contact Info */}
<div className="space-y-3">
    <div className="flex items-center space-x-3">
        <PiMapPin className="w-5 h-5 text-gray-200" />
        <span className="font-semibold text-gray-100">Address</span>
    </div>
    <div className="flex items-center space-x-3">
        <PiPhone className="w-5 h-5 text-gray-200" />
        <a href="tel:8001010" className="font-semibold text-[#F7941D] hover:underline">
           Toll Free: 800 1010
        </a>
    </div>
    <div className="flex items-center space-x-3">
        <PiPhone className="w-5 h-5 text-gray-200" />
        <a href="tel:+26825086000" className="font-semibold text-[#F7941D] hover:underline">
            (+268) 2508 6000
        </a>
    </div>
    <div className="flex items-center space-x-3">
        <PiEnvelope className="w-5 h-5 text-gray-200" />
        <a href="mailto:info@united.co.sz" className="font-semibold text-[#F7941D] hover:underline">
            info@united.co.sz
        </a>
    </div>
</div>
Data to Migrate:

json
{
  "section": "company_identity",
  "logo": {
    "light": "/Logo-white.svg",
    "dark": "/Logo.svg"
  },
  "contact": {
    "address": {
      "label": "Address",
      "value": "Your physical address here",
      "icon": "PiMapPin"
    },
    "phone": [
      {
        "label": "Toll Free",
        "number": "800 1010",
        "href": "tel:8001010"
      },
      {
        "label": "Office",
        "number": "(+268) 2508 6000",
        "href": "tel:+26825086000"
      }
    ],
    "email": {
      "address": "info@united.co.sz",
      "href": "mailto:info@united.co.sz"
    }
  }
}
Section 2: Social Media Links
Location: Lines 45-65 & 205-225

Current Hardcoded Data:

javascript
const socialLinks = [
    { 
        name: 'Instagram', 
        url: 'https://www.instagram.com/unitedholdingseswatini', 
        icon: PiInstagramLogo 
    },
    { 
        name: 'Facebook', 
        url: 'https://www.facebook.com/UnitedHoldingsEswatini/', 
        icon: PiFacebookLogo 
    },
    { 
        name: 'LinkedIn', 
        url: 'https://www.linkedin.com/company/united-holdings-limited-swaziland', 
        icon: PiLinkedinLogo 
    },
    { 
        name: 'YouTube', 
        url: 'https://www.youtube.com/channel/UCpNKo7EddA4KhBenXb2X1fA', 
        icon: PiYoutubeLogo 
    },
]
Data to Migrate:

json
{
  "section": "social_links",
  "socials": [
    {
      "platform": "instagram",
      "name": "Instagram",
      "url": "https://www.instagram.com/unitedholdingseswatini",
      "icon": "PiInstagramLogo",
      "enabled": true,
      "order": 1
    },
    {
      "platform": "facebook",
      "name": "Facebook",
      "url": "https://www.facebook.com/UnitedHoldingsEswatini/",
      "icon": "PiFacebookLogo",
      "enabled": true,
      "order": 2
    },
    {
      "platform": "linkedin",
      "name": "LinkedIn",
      "url": "https://www.linkedin.com/company/united-holdings-limited-swaziland",
      "icon": "PiLinkedinLogo",
      "enabled": true,
      "order": 3
    },
    {
      "platform": "youtube",
      "name": "YouTube",
      "url": "https://www.youtube.com/channel/UCpNKo7EddA4KhBenXb2X1fA",
      "icon": "PiYoutubeLogo",
      "enabled": true,
      "order": 4
    }
  ]
}
Section 3: Company Navigation Links
Location: Lines 67-85

Current Hardcoded Data:

javascript
const companyLinks = [
    { 
        title: 'Our Journey', 
        path: '/about',
        icon: PiHouse
    },
    { 
        title: 'Our Team', 
        path: '/about/our-team',
        icon: PiUsersThree
    },
    { 
        title: 'Careers', 
        path: '/about/careers',
        icon: PiBriefcaseMetal
    },
    { 
        title: 'Gallery', 
        path: '/about/gallery',
        icon: PiImages
    },
]
Data to Migrate:

json
{
  "section": "company_links",
  "heading": "Company",
  "links": [
    {
      "id": "journey",
      "title": "Our Journey",
      "path": "/about",
      "icon": "PiHouse",
      "enabled": true,
      "order": 1
    },
    {
      "id": "team",
      "title": "Our Team",
      "path": "/about/our-team",
      "icon": "PiUsersThree",
      "enabled": true,
      "order": 2
    },
    {
      "id": "careers",
      "title": "Careers",
      "path": "/about/careers",
      "icon": "PiBriefcaseMetal",
      "enabled": true,
      "order": 3
    },
    {
      "id": "gallery",
      "title": "Gallery",
      "path": "/about/gallery",
      "icon": "PiImages",
      "enabled": true,
      "order": 4
    }
  ]
}
Section 4: Products Navigation Links
Location: Lines 87-115

Current Hardcoded Data:

javascript
const productsLinks = [
    { 
        title: 'Family Funeral Plan', 
        path: '/products/family-funeral-plan',
        icon: PiUsers
    },
    { 
        title: 'Individual Funeral Plan', 
        path: '/products/individual-funeral-plan',
        icon: PiUser
    },
    { 
        title: 'Motor Insurance', 
        path: '/products/motor-insurance',
        icon: PiCar
    },
    { 
        title: 'Home Contents Insurance', 
        path: '/products/home-contents-insurance',
        icon: PiHouse
    },
    { 
        title: 'Legal Insurance', 
        path: '/products/legal-insurance',
        icon: PiScales
    },
    { 
        title: 'Micro Loans', 
        path: '/products/micro-loan',
        icon: PiMoney
    },
]
Data to Migrate:

json
{
  "section": "products_links",
  "heading": "Our Products",
  "links": [
    {
      "id": "family_funeral",
      "title": "Family Funeral Plan",
      "path": "/products/family-funeral-plan",
      "icon": "PiUsers",
      "enabled": true,
      "order": 1
    },
    {
      "id": "individual_funeral",
      "title": "Individual Funeral Plan",
      "path": "/products/individual-funeral-plan",
      "icon": "PiUser",
      "enabled": true,
      "order": 2
    },
    {
      "id": "motor_insurance",
      "title": "Motor Insurance",
      "path": "/products/motor-insurance",
      "icon": "PiCar",
      "enabled": true,
      "order": 3
    },
    {
      "id": "home_insurance",
      "title": "Home Contents Insurance",
      "path": "/products/home-contents-insurance",
      "icon": "PiHouse",
      "enabled": true,
      "order": 4
    },
    {
      "id": "legal_insurance",
      "title": "Legal Insurance",
      "path": "/products/legal-insurance",
      "icon": "PiScales",
      "enabled": true,
      "order": 5
    },
    {
      "id": "micro_loans",
      "title": "Micro Loans",
      "path": "/products/micro-loan",
      "icon": "PiMoney",
      "enabled": true,
      "order": 6
    }
  ]
}
Section 5: Resources Navigation Links
Location: Lines 117-130

Current Hardcoded Data:

javascript
const resourcesLinks = [
    { 
        title: 'Policies', 
        path: '/policies',
        icon: PiFile
    },
    { 
        title: 'News Blog', 
        path: '/news',
        icon: PiNewspaper
    },
]
Data to Migrate:

json
{
  "section": "resources_links",
  "heading": "Resources",
  "links": [
    {
      "id": "policies",
      "title": "Policies",
      "path": "/policies",
      "icon": "PiFile",
      "enabled": true,
      "order": 1
    },
    {
      "id": "news",
      "title": "News Blog",
      "path": "/news",
      "icon": "PiNewspaper",
      "enabled": true,
      "order": 2
    }
  ]
}
Section 6: Copyright & Legal
Location: Lines 280-290

Current Hardcoded Data:

javascript
<p className="text-sm text-gray-200 text-center lg:text-left">
    © {new Date().getFullYear()} United Holdings Eswatini. All rights reserved.
</p>
Data to Migrate:

json
{
  "section": "legal",
  "copyright": {
    "text": "© {year} United Holdings Eswatini. All rights reserved.",
    "showYear": true
  },
  "additionalText": "",
  "privacyPolicy": {
    "enabled": false,
    "text": "Privacy Policy",
    "path": "/privacy-policy"
  },
  "termsOfService": {
    "enabled": false,
    "text": "Terms of Service",
    "path": "/terms-of-service"
  }
}
📊 Data Summary
Section	Type	Fields	Records
Company Identity	Mixed	1 logo, 4 contact items	1
Social Links	Array	4 social platforms	4
Company Links	Array	4 navigation items	4
Products Links	Array	6 navigation items	6
Resources Links	Array	2 navigation items	2
Legal	Text	1 copyright text	1
TOTAL	-	21 content fields	18 data items
🗄️ CMS Entity: Footer
typescript
interface CMSFooter {
  id: string
  slug: string = "footer"
  
  // Company Identity
  logo: {
    light: string
    dark: string
  }
  
  // Contact Information
  contactInfo: {
    address: {
      label: string
      value: string
      icon: string
    }
    phone: Array<{
      label: string
      number: string
      href: string
    }>
    email: {
      address: string
      href: string
    }
  }
  
  // Social Media Links
  socialLinks: Array<{
    platform: string
    name: string
    url: string
    icon: string
    enabled: boolean
    order: number
  }>
  
  // Navigation Sections
  navigationSections: Array<{
    id: string
    heading: string
    links: Array<{
      id: string
      title: string
      path: string
      icon: string
      enabled: boolean
      order: number
    }>
  }>
  
  // Legal Information
  legal: {
    copyright: {
      text: string
      showYear: boolean
    }
    additionalText: string
    privacyPolicy: {
      enabled: boolean
      text: string
      path: string
    }
    termsOfService: {
      enabled: boolean
      text: string
      path: string
    }
  }
  
  // Styling
  styling: {
    backgroundColor: string
    textColor: string
    accentColor: string
  }
  
  // Metadata
  createdAt: ISO8601
  updatedAt: ISO8601
  publishedAt?: ISO8601
  status: 'draft' | 'published'
}
🔌 API Endpoints Needed
text
GET  /api/cms/footer                    // Get footer data
PUT  /api/cms/footer                    // Update footer (admin)
GET  /api/cms/footer/social-links       // Get just social links
PUT  /api/cms/footer/social-links       // Update social links (admin)
GET  /api/cms/footer/navigation         // Get navigation sections
PUT  /api/cms/footer/navigation/{id}    // Update navigation section (admin)
🛠️ Migration Implementation
Current Implementation
javascript
// components/Footer.js - CURRENT
function Footer() {
  const socialLinks = [
    { name: 'Instagram', url: 'https://...', icon: PiInstagramLogo },
    // ... hardcoded data
  ]
  
  const companyLinks = [
    { title: 'Our Journey', path: '/about', icon: PiHouse },
    // ... hardcoded data
  ]
  
  return (
    <footer className="bg-[#9b1c20] text-white">
      {/* Hardcoded content */}
    </footer>
  )
}
After Migration
javascript
'use client'
import { useEffect, useState } from 'react'

// Icon mapping utility
const iconMap = {
  PiInstagramLogo, PiFacebookLogo, PiLinkedinLogo, PiYoutubeLogo,
  PiMapPin, PiPhone, PiEnvelope, PiHeart, PiShieldCheck, PiBriefcase,
  PiMoney, PiHouse, PiUsersThree, PiBriefcaseMetal, PiImages, PiFolderOpen,
  PiFile, PiNewspaper, PiCar, PiUsers, PiUser, PiScales
}

export default function Footer() {
  const [footerData, setFooterData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/cms/footer')
      .then(r => r.json())
      .then(({ data }) => setFooterData(data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <FooterSkeleton />
  if (!footerData) return <DefaultFooter />

  return (
    <footer className="bg-[#9b1c20] text-white">
      <div className="mx-auto px-4 sm:px-6 max-w-[1800px] py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Identity - Dynamic */}
          <div className="flex flex-col items-start space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src={footerData.logo.light} 
                alt="United Holdings Logo" 
                width={300} 
                height={50}  
                className="hidden lg:block"
              />
              <Image 
                src={footerData.logo.light} 
                alt="United Holdings Logo" 
                width={150} 
                height={50} 
                className="lg:hidden"
              />
            </Link>
            
            {/* Contact Info - Dynamic */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                {React.createElement(iconMap[footerData.contactInfo.address.icon], {
                  className: "w-5 h-5 text-gray-200"
                })}
                <span className="font-semibold text-gray-100">
                  {footerData.contactInfo.address.label}
                </span>
              </div>
              
              {footerData.contactInfo.phone.map((phone, index) => (
                <div key={index} className="flex items-center space-x-3">
                  {React.createElement(iconMap.PiPhone, {
                    className: "w-5 h-5 text-gray-200"
                  })}
                  <a 
                    href={phone.href}
                    className="font-semibold text-[#F7941D] hover:underline transition duration-150"
                  >
                    {phone.label}: {phone.number}
                  </a>
                </div>
              ))}
              
              <div className="flex items-center space-x-3">
                {React.createElement(iconMap.PiEnvelope, {
                  className: "w-5 h-5 text-gray-200"
                })}
                <a 
                  href={footerData.contactInfo.email.href}
                  className="font-semibold text-[#F7941D] hover:underline transition duration-150"
                >
                  {footerData.contactInfo.email.address}
                </a>
              </div>
            </div>

            {/* Social Links - Dynamic */}
            <div className="flex items-center space-x-4 pt-4">
              {footerData.socialLinks
                .filter(social => social.enabled)
                .sort((a, b) => a.order - b.order)
                .map((social) => {
                  const SocialIcon = iconMap[social.icon]
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition duration-150 ease-in-out"
                      aria-label={social.name}
                      onClick={() => trackEvent('social_media_clicked', {
                        social_media_chosen: social.name,
                        location: 'footer',
                        page_section: 'footer'
                      })}
                    >
                      <SocialIcon className="w-5 h-5 text-white" />
                    </a>
                  )
                })}
            </div>
          </div>

          {/* Navigation Sections - Dynamic */}
          {footerData.navigationSections.map((section) => (
            <div key={section.id}>
              <h3 className="font-bold text-lg text-white mb-6 font-outfit border-b border-white/20 pb-2">
                {section.heading}
              </h3>
              <ul className="font-outfit font-light space-y-3">
                {section.links
                  .filter(link => link.enabled)
                  .sort((a, b) => a.order - b.order)
                  .map((link) => {
                    const LinkIcon = iconMap[link.icon]
                    return (
                      <li key={link.id}>
                        <Link
                          href={link.path}
                          className="flex items-center space-x-3 hover:text-[#F7941D] transition-colors duration-150 group"
                          onClick={() => trackEvent('footer_link_clicked', {
                            link_clicked: link.title,
                            link_category: section.heading,
                            destination_path: link.path,
                            page_section: 'footer'
                          })}
                        >
                          <LinkIcon className="w-4 h-4 text-gray-200 group-hover:text-[#F7941D] transition-colors" />
                          <span>{link.title}</span>
                        </Link>
                      </li>
                    )
                  })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar - Dynamic */}
        <div className="border-t border-white/20 my-8 pt-6">
          <div className="flex mb-16 flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <p className="text-sm text-gray-200 text-center lg:text-left">
              {footerData.legal.copyright.text.replace(
                '{year}', 
                new Date().getFullYear()
              )}
            </p>
            
            {/* Additional Legal Links */}
            <div className="flex space-x-6">
              {footerData.legal.privacyPolicy.enabled && (
                <Link 
                  href={footerData.legal.privacyPolicy.path}
                  className="text-sm text-gray-200 hover:text-[#F7941D] transition-colors"
                >
                  {footerData.legal.privacyPolicy.text}
                </Link>
              )}
              {footerData.legal.termsOfService.enabled && (
                <Link 
                  href={footerData.legal.termsOfService.path}
                  className="text-sm text-gray-200 hover:text-[#F7941D] transition-colors"
                >
                  {footerData.legal.termsOfService.text}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Fallback components
function FooterSkeleton() {
  return <footer className="bg-[#9b1c20] h-64 animate-pulse"></footer>
}

function DefaultFooter() {
  return (
    <footer className="bg-[#9b1c20] text-white p-8 text-center">
      <p>Footer content unavailable</p>
    </footer>
  )
}
📋 Implementation Checklist
Phase 1: API Development
Create /api/cms/footer endpoint

Implement GET endpoint for footer data

Implement PUT endpoint (admin)

Add database table footer_content

Create icon mapping utility

Phase 2: Data Migration
Export current footer content

Create database records with current data

Validate data integrity

Create admin interface for footer management

Phase 3: Frontend Update
Update Footer component to use API

Implement icon mapping system

Add loading states

Add error handling with fallbacks

Test all dynamic sections

Implement client-side caching

Phase 4: Testing
Test data loading and error states

Test responsive design with dynamic content

Test link functionality

Test social media links

Test admin updates in real-time

Test icon rendering

🎯 Benefits of Migration
Current Issues
❌ Footer changes require code deployment

❌ Social media links hard to update

❌ Contact information static

❌ No way to A/B test footer content

❌ Difficult to manage multiple navigation sections

After Migration
✅ Update footer without code changes

✅ Marketing team can manage social links

✅ Contact info updates in real-time

✅ Easy to test different footer layouts

✅ Centralized navigation management

📊 Database Schema
sql
CREATE TABLE footer_content (
  id UUID PRIMARY KEY,
  slug VARCHAR(255) UNIQUE DEFAULT 'footer',
  
  -- Company Identity
  logo_light_url TEXT,
  logo_dark_url TEXT,
  
  -- Contact Information (JSON)
  contact_info JSONB,
  
  -- Social Links (JSON array)
  social_links JSONB,
  
  -- Navigation Sections (JSON array)
  navigation_sections JSONB,
  
  -- Legal Information (JSON)
  legal_info JSONB,
  
  -- Styling
  background_color VARCHAR(7) DEFAULT '#9b1c20',
  text_color VARCHAR(7) DEFAULT '#ffffff',
  accent_color VARCHAR(7) DEFAULT '#F7941D',
  
  -- Metadata
  status VARCHAR(20) DEFAULT 'published',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP DEFAULT NOW()
);
🔒 Security Notes
Admin endpoints require authentication

Validate all URLs before storing

Sanitize all text content

Implement rate limiting on public endpoint

Cache footer data (24-hour TTL recommended)

📈 Performance Considerations
Optimization Strategies
Static Generation with Revalidation:

javascript
// app/layout.js
export const revalidate = 86400 // 24 hours

async function getFooterData() {
  const res = await fetch(`${process.env.API_URL}/footer`, {
    next: { revalidate: 86400 }
  })
  return res.json()
}
Client-Side Caching:

javascript
// Custom hook for footer data
function useFooterData() {
  return useQuery(['footer'], fetchFooterData, {
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    cacheTime: 24 * 60 * 60 * 1000,
  })
}
Fallback Strategy:

Use static fallback data

Implement progressive enhancement

Graceful degradation

🎓 Learning from This Migration
Key Concepts
Dynamic Icon System: Mapping string icons to React components

Nested Data Structures: Managing complex JSON data

Fallback Strategies: Handling API failures gracefully

Caching Strategies: Optimizing performance

Content Versioning: Managing updates safely

📞 Next Steps
Review this audit with development team

Design admin interface for footer management

Create API endpoints with sample data

Update Footer component incrementally

Test thoroughly across all pages

Deploy with feature flag for rollback safety

📎 Related Documents
ABOUT_PAGE_AUDIT.md - About page migration pattern

HEADER_AUDIT.md - Header component audit (recommended next)

CMS_IMPLEMENTATION_GUIDE.md - Implementation patterns

ICON_SYSTEM_REFERENCE.md - Dynamic icon system guide

Audit Complete: November 11, 2025
Component Data Items: 18 major items
Content Fields: 21 fields
Hardcoded Content: 100%
CMS Complexity: Medium
Migration Time: 6-8 hours

✅ Ready for CMS Migration

'use client'
import React, { useState, useEffect } from 'react';
import { LoadingState } from './LoadingState';

// Reusable Input Field Component
const InputField = ({ label, name, type = 'text', value, onChange, required = false, className = ' ', ...props }) => (
    <div className={className}>
        <label className=" block text-xs font-medium text-gray-800 ">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={label}
            className="w-full  py-2 outline-none  bg-white border-gray-300 border-b   placeholder-gray-300  "
            {...props}
        />
    </div>
);

// Reusable Select Field Component
const SelectField = ({ label, name, value, onChange, options = [], required = false, className = '' }) => (
    <div className={className}>
        <label className="block text-xs font-medium text-gray-800 ">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full  py-2 outline-none  bg-white border-gray-300 border-b   placeholder-gray-900 "
        >
            <option value="" disabled>{`Select ${label}`}</option>
            {options.map((option) => (
                <option className='text-gray-900' key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

// Field renderer based on field configuration from API
const DynamicField = ({ field, value, onChange, className = '' }) => {
    const commonProps = {
        label: field.label,
        name: field.fieldKey, // Use fieldKey from API as name
        value: value || '',
        onChange: onChange,
        required: true, // All fields from API are required
        className: className
    };

    switch (field.type) {
        case 'select':
            return <SelectField {...commonProps} options={field.value || []} />;
        case 'date':
            return <InputField {...commonProps} type="date" />;
        case 'number':
            return <InputField {...commonProps} type="number" />;
        case 'email':
            return <InputField {...commonProps} type="email" />;
        case 'tel':
            return <InputField {...commonProps} type="tel" />;
        default:
            return <InputField {...commonProps} type="text" />;
    }
};

export default function RenderForm({ 
    product, 
    formData, 
    handleInputChange, 
    company,
    sendQuote,
    isSubmitting,
    submitMessage,
    submitError,
    companyText 
}) {
    const [formConfig, setFormConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Clear local validation error when user updates form data
    useEffect(() => {
        if (error) {
            setError(null);
        }
    }, [formData]);

    // Function to determine product category key based on API structure
    const getProductCategoryKey = () => {
        const productName = product.name;
        
        return productName;
    };

    // Fetch form configuration from external API
    useEffect(() => {
        const fetchFormConfig = async () => {
            // Don't fetch if no product
            if (!product) {
                setLoading(false);
                return;
            }

            const categoryName = getProductCategoryKey();
            
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://website.api.united.co.sz/api/form-category?categoryName=${categoryName}`
                );
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch form configuration: ${response.status}`);
                }
                
                const result = await response.json();
                
                if (result.success && result.data) {
                    setFormConfig(result.data);
                    console.log("Data from API", result.data);
                    
                } else {
                    throw new Error(result.message || 'Invalid API response');
                }
            } catch (err) {
                setError(err.message);
                setFormConfig(null);
            } finally {
                setLoading(false);
            }
        };

        fetchFormConfig();
    }, [product]);

    // Helper function to find field keys by type or label pattern
    const findFieldKey = (patterns, type = null) => {
        if (!formConfig || !formConfig.formFields) return null;
        
        for (const field of formConfig.formFields) {
            // Check by type first
            if (type && field.type === type) {
                return field.fieldKey;
            }
            // Check by field key patterns
            for (const pattern of patterns) {
                if (field.fieldKey.toLowerCase().includes(pattern)) {
                    return field.fieldKey;
                }
            }
            // Check by label patterns as fallback
            for (const pattern of patterns) {
                if (field.label.toLowerCase().includes(pattern)) {
                    return field.fieldKey;
                }
            }
        }
        return null;
    };

    // Transform flat form data to the required API payload structure
    const transformFormDataToPayload = (flatFormData) => {
        if (!formConfig || !formConfig.formFields) {
            return null;
        }

        const formFields = formConfig.formFields.map(field => {
            let value = flatFormData[field.fieldKey] || '';
            
            // Convert value types based on field type
            switch (field.type) {
                case 'number':
                    value = value ? Number(value) : 0;
                    break;
                case 'checkbox':
                    value = Boolean(value);
                    break;
                // Add other type conversions as needed
                default:
                    // Keep as string for text, email, tel, date, select
                    break;
            }

            return {
                fieldKey: field.fieldKey,
                label: field.label,
                value: value,
                type: field.type
            };
        });

        return {
            product: product?.name || '',
            companyCode: company?.code || 'UGI', // Fallback to UGI if company code not available
            formFields: formFields
        };
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted. formData:', formData);
        
        // Validate that all required fields have values
        if (!formConfig || !formConfig.formFields) {
            setError('Form configuration not loaded. Please try again.');
            return;
        }

        const emptyFields = [];

        // Check all required fields for empty values
        formConfig.formFields.forEach(field => {
            const fieldValue = (formData[field.fieldKey] || '').toString().trim();
            if (!fieldValue) {
                emptyFields.push(field.label);
            }
        });

        // If there are empty fields, show error with specific field names
        if (emptyFields.length > 0) {
            setError(`Please fill in all required fields: ${emptyFields.join(', ')}`);
            return;
        }

        // (email validation moved below after extracting the dynamic email value)

        // Build a flat payload expected by the page-level handler (name, email, phone at top-level)
        const nameFieldKey = findFieldKey(['name', 'fullname', 'firstname', 'lastname']);
        const emailFieldKey = findFieldKey(['email'], 'email');
        const phoneFieldKey = findFieldKey(['phone', 'mobile', 'tel', 'cell'], 'tel');

        const nameVal = nameFieldKey ? (formData[nameFieldKey] || '').toString().trim() : '';
        const emailVal = emailFieldKey ? (formData[emailFieldKey] || '').toString().trim() : '';
        const phoneVal = phoneFieldKey ? (formData[phoneFieldKey] || '').toString().trim() : '';

        // Validate email format if we found an email field
        if (emailVal) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailVal)) {
                setError('Please enter a valid email address.');
                return;
            }
        }

        // Build flat payload containing all form fields keyed by their fieldKey
        const flatPayload = formConfig.formFields.reduce((acc, f) => {
            acc[f.fieldKey] = formData[f.fieldKey] || '';
            return acc;
        }, {});

        // Ensure top-level name/email/phone keys exist for the page handler
        if (nameVal) flatPayload.name = nameVal;
        if (emailVal) flatPayload.email = emailVal;
        if (phoneVal) flatPayload.phone = phoneVal;

        // Also prepare the API-specific payload (kept for debugging/logs)
        const apiPayload = transformFormDataToPayload(formData);
        if (!apiPayload) {
            setError('Failed to prepare form data for submission.');
            return;
        }


        // Clear any previous error and call the page-level submit handler with the flat payload
        setError(null);
        sendQuote(apiPayload);
    };

    if (!product) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-gray-600">No product selected</div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <LoadingState />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-red-600 text-center">
                    <p>Error loading form configuration</p>
                    <p className="text-sm text-gray-600 mt-2">
                        Please try again later or contact support
                    </p>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleFormSubmit} className='gap-6 flex flex-col w-full'>
            {/* General Information Section - Using fields from API */}
            {formConfig && formConfig.formFields && formConfig.formFields.length > 0 && (
                <div>
                    <div className='flex w-full justify-center items-center gap-4'>
                        <p className='font-semibold text-[#9b1c20] whitespace-nowrap '>
                            {formConfig.categoryName || product.name} Information
                        </p>
                        <div className='h-[0.5px] w-full bg-gray-200 mt-1' />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        {formConfig.formFields.map((field) => (
                            <DynamicField
                                key={field.fieldKey}
                                field={field}
                                value={formData[field.fieldKey]}
                                onChange={handleInputChange}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Submit Button */}
            <div className='w-full flex justify-center sm:justify-start mt-4 sm:mt-6'>
                <button
                    type="submit"
                    disabled={isSubmitting || !formConfig}
                    className={`px-8 sm:px-12 py-3 sm:py-4 rounded-full text-white font-semibold transition text-sm sm:text-base w-full sm:w-auto ${
                        isSubmitting || !formConfig
                            ? 'bg-gray-400 cursor-not-allowed text-white'
                            : 'bg-[#9b1c20] text-white hover:opacity-90'
                    }`}
                >
                    {isSubmitting ? 'Submitting...' : "Submit"}
                </button>
            </div>

            {/* Display submit messages */}
            {submitMessage && (
                <div className="text-green-600 text-center">{submitMessage}</div>
            )}
            {submitError && (
                <div className="text-red-600 text-center">{submitError}</div>
            )}
            {error && (
                <div className="text-red-600 text-center">{error}</div>
            )}
        </form>
    );
}

## Error Type
Console Error

## Error Message
Each child in a list should have a unique "key" prop.

Check the render method of `select`. It was passed a child from SelectField. See https://react.dev/link/warning-keys for more information.


    at option (<anonymous>:null:null)
    at <unknown> (components/Product/RenderForm.js:35:17)
    at Array.map (<anonymous>:null:null)
    at SelectField (components/Product/RenderForm.js:34:22)
    at DynamicField (components/Product/RenderForm.js:56:20)
    at <unknown> (components/Product/RenderForm.js:318:29)
    at Array.map (<anonymous>:null:null)
    at RenderForm (components/Product/RenderForm.js:317:48)
    at ProductForm (components/Product/ProductForm.jsx:30:11)
    at HeroSection (components/Product/HeroSection.jsx:81:13)
    at ProductPage (app/products/[slug]/page.js:218:7)

## Code Frame
  33 |             <option value="" disabled>{`Select ${label}`}</option>
  34 |             {options.map((option) => (
> 35 |                 <option className='text-gray-900' key={option.value} value={option.value}>
     |                 ^
  36 |                     {option.label}
  37 |                 </option>
  38 |             ))}

Next.js version: 15.5.2 (Turbopack)


options not showing, all white
We are getting an error about each child in a list should have a unique "key" prop, and the error points to the option elements in the SelectField component.

Looking at the code frame, we are mapping over options and generating option elements. We are using option.value as the key. However, the error suggests that the key is not unique.

The issue might be that the options array has duplicate values for option.value. Since the key must be unique, we cannot have duplicate keys.

Let's check the options array that is passed to the SelectField. It is coming from field.value in the DynamicField component when the field type is 'select'. The field.value is an array of options, each with value and label.

We must ensure that each option in the array has a unique value. If the API returns options with duplicate values, then we will have duplicate keys.

Steps to fix:

We can try to make the key more unique by combining the option.value with the index, but that is not recommended if the value is not unique because it can cause rendering issues.

Alternatively, we can use the index as the key, but that is also not recommended if the list can change.

The best way is to ensure that the option.value is unique. If the API returns duplicate values, we might need to adjust the data or use a different unique identifier.

Since we don't have control over the API data, we can use a fallback: use the index as the key if the values are not unique, but note that this can cause performance issues and bugs if the list order changes.

However, in the context of a form select, the options are static and the order is unlikely to change, so using the index might be acceptable.

Let's change the key in the SelectField to use the index if the values are not unique? But we cannot know that at render time.

Alternatively, we can use a function to generate a unique key for each option by combining the value and the index, but that doesn't guarantee uniqueness if the same value appears at different indices? Actually, it would be unique because the index is unique.

Let's change the key to ${option.value}-${index} to ensure uniqueness even if the same value appears multiple times.

However, note that the error says "each child in a list should have a unique key", so we must have duplicate keys. Using the index in the key is acceptable here because the options are static and the order is fixed.

Alternatively, we can use the index alone, but the React documentation discourages that if the order may change. Since these options are from an API and we are mapping them in the order provided, and if the order changes, we want the keys to change? Actually, using index as key is safe if the list is static and the order won't change.

But note: the list of options can change when the form configuration changes (different product). So, if the same value appears in two different options and we use the value as key, then when the list changes, React might get confused. Using the index is also not safe because if the list of options changes (e.g., a new option is inserted at the beginning) then the index of each option changes and React will re-render unnecessarily.

The best practice is to have a unique and stable identifier for each option. If the option.value is not unique, then we cannot use it. We must use a combination of the value and the label? But the label might not be unique either.

Since we are getting the options from the API, we don't have control over the uniqueness of the value. Therefore, we can use the index as a last resort.

Let's change the key to the index for now to avoid the error, but note that if the list of options changes, the keys will change and React may re-render the options incorrectly. However, in this form, the options are static for a given product, so it might be acceptable.

Alternatively, we can use a unique identifier from the API if available, but the current structure only has value and label.

Let's update the SelectField component to use the index as the key:

Change:
{options.map((option) => (
<option ... key={option.value} ...>
))

To:
{options.map((option, index) => (
<option ... key={index} ...>

But note: the error message says "each child in a list should have a unique key", and using index is acceptable if the list is static and the order won't change.

However, the React documentation says that using index as key is safe if the list is static and the order won't change. Since the form fields are static for a given product, we can use index.

Let's change the key to the index.

Alternatively, we can use a function to generate a unique key by combining the fieldKey and the option value and index? But that might be overkill.

We'll change the key to the index for now to avoid the error.

However, note that the error is about the option elements. We are already using the index for the form fields in the main form, but for the options, we are using the value. We are now changing the options to use index.

Let's update the code in the SelectField component.

Also, note that the error says "Check the render method of select". It means that the select element is rendering a list of option elements without keys, but React requires keys for any element in an array.

We are already providing a key, but it's duplicate. So we change to index.

Let's update the code.

However, there is another issue: the options are not showing, they are all white. This might be a styling issue. The options are having class text-gray-900 which is a dark color, but if the background is white and the text is white, then we cannot see them.

Let's check the styles:

The select element has:
className="w-full py-2 outline-none bg-white border-gray-300 border-b placeholder-gray-900 "

And the option elements have:
className='text-gray-900'

But the option elements are styled by the browser and the class might not be applied. Also, the select element has a placeholder-gray-900 which is for the placeholder, not the options.

The issue of options not showing might be due to the background and text color being the same? But we set the option text to text-gray-900 (very dark) and the background of the select is white, so it should be visible.

However, the problem might be that the options are being rendered by the browser and the styles are not applied. We can try to remove the class from the option and see if the default styles work.

Alternatively, let's check the computed styles in the browser.

Since we cannot see the options, it might be that the option elements are not being rendered at all? But the error is about keys, so they are being rendered.

Let's focus on the key error first and then the styling.

We change the key in the SelectField to use the index.

Also, note that the option elements are inside a select and the select is being rendered. The options are there but not visible? Maybe the background of the dropdown is white and the text is white? Let's check the parent styles.

Alternatively, let's remove the className from the option and see if the default styles make it visible.

We can try to remove the className from the option and see if the options become visible.

But note: the error is in the console and the options are not showing, so we have two issues.

Let's fix the key error first and then check the styling.

We'll change the key to index and then check the styling.

If the options are still not visible, we can try to force the text color of the options by using style={{ color: 'black' }} for the option.

But note: the option element does not inherit styles from the parent in some browsers. We might need to use a custom dropdown or live with the default styles.

Since this is a form, we can use the default styles for the dropdown and remove the class from the option.

Let's remove the className from the option and see if the options become visible.

We'll do:

<option key={index} value={option.value} style={{ color: 'black' }}>
But note: the select element itself has a class of placeholder-gray-900 which sets the placeholder text color, but the options are not placeholders.

We can try to set the color of the select to a dark color and then the options should inherit? But the option elements are not children of the select in the DOM? Actually, they are, but the dropdown is a separate element.

We can try to set the color of the select to gray-900 and remove the option class.

Let's change the select element to have text-gray-900 and remove the className from the option.

We'll change:

<select ... className="w-full py-2 outline-none bg-white border-gray-300 border-b placeholder-gray-900 text-gray-900">

and

<option key={index} value={option.value}>
Then the options should be visible.

Let's summarize the changes:

In the SelectField component, change the key of the option to the index and remove the class from the option.

Also, add text-gray-900 to the select element to make the selected value dark.

Alternatively, we can leave the option without a class and rely on the select element's text color.

But note: the select element's text color sets the color of the selected option, but the dropdown options are styled by the operating system. So, we cannot style the dropdown options with CSS in a consistent way.

Therefore, we remove the class from the option and let the browser handle the styling of the dropdown.

Let's make these changes.

However, the error about the key is the main issue. We fix the key and then the styling.

We'll change the SelectField to:

{options.map((option, index) => (
<option key={index} value={option.value}>
{option.label}
</option>
))}

And remove the class from the option.

Also, change the select element to have text-gray-900 so that the selected value is dark.

Let's update the code accordingly.

We'll also remove the className from the option and add text-gray-900 to the select.

Let's see the updated SelectField component:

const SelectField = ({ label, name, value, onChange, options = [], required = false, className = '' }) => (
<div className={className}>
<label className="block text-xs font-medium text-gray-800 ">{label}</label>
<select name={name} value={value} onChange={onChange} required={required} className="w-full py-2 outline-none bg-white border-gray-300 border-b placeholder-gray-900 text-gray-900" >
<option value="" disabled>{Select ${label}}</option>
{options.map((option, index) => (
<option key={index} value={option.value}>
{option.label}
</option>
))}
</select>
</div>
);

Now, let's hope that the key error is gone and the options are visible.

If the options are still not visible, we might have to use a custom dropdown component or accept the default styles.

We'll commit these changes and test.

Note: The error message also says "Next.js version: 15.5.2 (Turbopack)" but that shouldn't affect the fix.

Let's write the code accordingly.

The issue is that your SelectField component is not properly handling the options prop when it's empty or not in the expected format. The options are coming from your API as field.value, but they might not be an array, or might be empty/null.

Here's the fix for your SelectField component:

javascript
// Reusable Select Field Component
const SelectField = ({ label, name, value, onChange, options = [], required = false, className = '' }) => {
    // Ensure options is always an array and has valid items
    const validOptions = Array.isArray(options) 
        ? options.filter(option => option && option.value !== undefined && option.label !== undefined)
        : [];

    return (
        <div className={className}>
            <label className="block text-xs font-medium text-gray-800 ">{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full py-2 outline-none bg-white border-gray-300 border-b placeholder-gray-900 text-gray-900"
            >
                <option value="" disabled>{`Select ${label}`}</option>
                {validOptions.length > 0 ? (
                    validOptions.map((option, index) => (
                        <option 
                            key={`${option.value}-${index}`} 
                            value={option.value}
                            className="text-gray-900"
                        >
                            {option.label}
                        </option>
                    ))
                ) : (
                    <option value="" disabled className="text-gray-500">
                        No options available
                    </option>
                )}
            </select>
        </div>
    );
};
The key changes:

Added validation for the options array to ensure it's actually an array and contains valid objects with value and label properties.

Added fallback UI when there are no valid options, showing "No options available" instead of trying to map over an empty or invalid array.

Improved key prop by combining option.value with index to ensure uniqueness even if values are duplicated.

Added proper styling for the disabled fallback option.

Also, update your DynamicField component to handle the case where select options might be invalid:

javascript
// Field renderer based on field configuration from API
const DynamicField = ({ field, value, onChange, className = '' }) => {
    const commonProps = {
        label: field.label,
        name: field.fieldKey,
        value: value || '',
        onChange: onChange,
        required: true,
        className: className
    };

    switch (field.type) {
        case 'select':
            // Ensure options is an array
            const selectOptions = Array.isArray(field.value) ? field.value : [];
            return <SelectField {...commonProps} options={selectOptions} />;
        case 'date':
            return <InputField {...commonProps} type="date" />;
        case 'number':
            return <InputField {...commonProps} type="number" />;
        case 'email':
            return <InputField {...commonProps} type="email" />;
        case 'tel':
            return <InputField {...commonProps} type="tel" />;
        default:
            return <InputField {...commonProps} type="text" />;
    }
};
For the white/not showing options issue, add this CSS to your global CSS file or a style tag:

css
/* Fix for white select options */
select option {
    background-color: white;
    color: #1f2937; /* gray-900 */
}

select:focus option {
    background-color: white;
    color: #1f2937;
}
Or add inline styles to your SelectField:

javascript
<select
    name={name}
    value={value}
    onChange={onChange}
    required={required}
    className="w-full py-2 outline-none bg-white border-gray-300 border-b placeholder-gray-900 text-gray-900"
    style={{
        color: '#1f2937' /* gray-900 */
    }}
>
    {/* ... options ... */}
</select>
Debugging steps to check what's happening with your API data:

Add a console log in your DynamicField to see what the actual field data looks like:

javascript
console.log('Field data:', field.type, field.fieldKey, 'Options:', field.value);
Check if the API is returning the expected structure for select fields. It should be:

json
{
  "type": "select",
  "fieldKey": "some_key",
  "label": "Some Label",
  "value": [
    {"value": "option1", "label": "Option 1"},
    {"value": "option2", "label": "Option 2"}
  ]
}
The main issues were:

The options prop wasn't being validated before mapping

No fallback UI for empty/invalid options

Potential styling issues with white text on white background

Non-unique keys when option values might be duplicated

These fixes should resolve both the React key warning and the options not showing issue.


