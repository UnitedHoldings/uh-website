Agent Page Data Audit & CMS Migration
File: app/agent/page.js
Type: Page Component
Date Analyzed: November 11, 2025

📋 Executive Summary
The Agent page contains hardcoded content across 4 main sections with dynamic form functionality. All static text content can be moved to a CMS for dynamic management while preserving form logic.

🔍 Hardcoded Data Inventory
Section 1: Header Section
Location: Lines 157-167

Current Hardcoded Data:

javascript
<h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#9b1c20] mb-1 md:mb-2 font-outfit">
    Speak to an Officer
</h3>
<p className="text-gray-600 max-w-2xl text-base md:text-lg lg:text-xl">
    Connect with one of our officers to explore tailored solutions.
</p>
Data to Migrate:

json
{
  "section": "header",
  "title": "Speak to an Officer",
  "subtitle": "Connect with one of our officers to explore tailored solutions.",
  "titleColor": "#9b1c20"
}
Section 2: Video Section
Location: Lines 170-172

Current Hardcoded Data:

javascript
<VideoPlayer src="https://res.cloudinary.com/loooktrial/video/upload/v1760930701/Agent_wce4fn.mp4" />
Data to Migrate:

json
{
  "section": "video",
  "videoUrl": "https://res.cloudinary.com/loooktrial/video/upload/v1760930701/Agent_wce4fn.mp4",
  "altText": "Agent video presentation",
  "displayCondition": "desktop_only"
}
Section 3: Form Header
Location: Lines 192-197

Current Hardcoded Data:

javascript
<p className="font-bold text-[#9b1c20] text-xl sm:text-2xl md:text-2xl">
    Request a Callback
</p>
<p className='text-base md:text-lg text-[#9b1c20] font-light'>
    From Our Insurance Officers
</p>
Data to Migrate:

json
{
  "section": "form_header",
  "title": "Request a Callback",
  "subtitle": "From Our Insurance Officers",
  "titleColor": "#9b1c20"
}
Section 4: Form Fields & Labels
Location: Throughout form section

Current Hardcoded Data:

javascript
// Input placeholders
"First Name *"
"Last Name"
"Enter Mobile Number *"
"Select Reason *"

// Button text
"Send Callback"
"Sending..."

// Loading states
"Loading reasons..."
Data to Migrate:

json
{
  "section": "form_labels",
  "fields": {
    "firstName": {
      "placeholder": "First Name *",
      "required": true
    },
    "lastName": {
      "placeholder": "Last Name",
      "required": false
    },
    "mobileNumber": {
      "placeholder": "Enter Mobile Number *",
      "required": true
    },
    "reason": {
      "placeholder": "Select Reason *",
      "loadingText": "Loading reasons...",
      "required": true
    }
  },
  "button": {
    "defaultText": "Send Callback",
    "loadingText": "Sending...",
    "icon": "phone"
  }
}
Section 5: Contact Information
Location: Lines 278-301

Current Hardcoded Data:

javascript
<p className="font-bold text-gray-600 text-sm md:text-base mb-2">or Contact us:</p>
<a href="tel:8001010">800 1010</a>
<a href="mailto:info@unitedholdings.co.sz">info@united.co.sz</a>
Data to Migrate:

json
{
  "section": "contact_info",
  "title": "or Contact us:",
  "phone": {
    "display": "800 1010",
    "href": "tel:8001010"
  },
  "email": {
    "display": "info@united.co.sz",
    "href": "mailto:info@unitedholdings.co.sz"
  }
}
Section 6: Advertisement Image
Location: Lines 306-315

Current Hardcoded Data:

javascript
<Image
  src={'/ad.jpg'}
  alt="Advertisement"
  ...
/>
Data to Migrate:

json
{
  "section": "advertisement",
  "imageUrl": "/ad.jpg",
  "altText": "Advertisement",
  "aspectRatio": "16/9"
}
Section 7: Messages & Notifications
Location: Various message displays

Current Hardcoded Data:

javascript
// Validation messages
"Please fill in all required fields"

// Success/Error messages
"Callback request sent successfully! We will contact you shortly."
"Failed to send callback request. Please try again."

// API error message
"Note: Using fallback data."
Data to Migrate:

json
{
  "section": "messages",
  "validation": {
    "requiredFields": "Please fill in all required fields"
  },
  "api": {
    "success": "Callback request sent successfully! We will contact you shortly.",
    "error": "Failed to send callback request. Please try again.",
    "fallbackWarning": "Note: Using fallback data."
  }
}
📊 Data Summary
Section	Type	Fields	Records
Header	Text	2 text fields	1
Video	Media	1 video URL	1
Form Header	Text	2 text fields	1
Form Labels	Text	8 text fields	1
Contact Info	Text + Links	5 fields	1
Advertisement	Image	1 image	1
Messages	Text	4 messages	1
TOTAL	-	24 text fields	7 data items
🗄️ CMS Entity: AgentPage
typescript
interface CMSAgentPage {
  id: string
  slug: string = "agent"
  
  // Header Section
  headerTitle: string
  headerSubtitle: string
  
  // Video Section
  videoUrl: string
  videoAltText: string
  videoDisplayCondition: 'desktop_only' | 'all_devices'
  
  // Form Header
  formTitle: string
  formSubtitle: string
  
  // Form Labels & Placeholders
  formLabels: {
    firstName: {
      placeholder: string
      required: boolean
    }
    lastName: {
      placeholder: string
      required: boolean
    }
    mobileNumber: {
      placeholder: string
      required: boolean
    }
    reason: {
      placeholder: string
      loadingText: string
      required: boolean
    }
  }
  
  // Button Text
  buttonText: {
    default: string
    loading: string
  }
  
  // Contact Information
  contactTitle: string
  contactPhone: {
    display: string
    href: string
  }
  contactEmail: {
    display: string
    href: string
  }
  
  // Advertisement
  adImage: string
  adAltText: string
  
  // Messages
  messages: {
    validation: {
      requiredFields: string
    }
    api: {
      success: string
      error: string
      fallbackWarning: string
    }
  }
  
  // Metadata
  createdAt: ISO8601
  updatedAt: ISO8601
  publishedAt?: ISO8601
  status: 'draft' | 'published'
}
🔌 API Endpoints Needed
text
GET  /api/cms/pages/agent              // Get agent page data
PUT  /api/cms/pages/agent              // Update agent page (admin)
GET  /api/callback-reasons             // Existing - keep as is
🛠️ Migration Implementation
Current Implementation
javascript
// Current hardcoded implementation
function Agent() {
  return (
    <div>
      <h3>Speak to an Officer</h3>
      <p>Connect with one of our officers...</p>
      {/* ... more hardcoded content ... */}
    </div>
  )
}
After Migration
javascript
'use client';
import { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { SlDoc, SlEnvolope, SlInfo, SlLink, SlPhone, SlTarget } from 'react-icons/sl';
import VideoPlayer from './VideoPlayer';

function Agent() {
  const [pageData, setPageData] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // Existing form state (preserved)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [callbackReasons, setCallbackReasons] = useState([]);
  const [loadingReasons, setLoadingReasons] = useState(true);
  const [reasonsError, setReasonsError] = useState(null);

  // Fetch page content from CMS
  useEffect(() => {
    fetch('/api/cms/pages/agent')
      .then(r => r.json())
      .then(({ data }) => setPageData(data))
      .finally(() => setLoading(false))
  }, [])

  // Existing callback reasons fetch (preserved)
  useEffect(() => {
    // ... existing callback reasons logic ...
  }, []);

  // Existing form handlers (preserved)
  const handleSendCallback = async (e) => {
    // ... existing form submission logic ...
  };

  if (loading) return <div>Loading...</div>
  if (!pageData) return <div>Page not found</div>

  return (
    <div className="py-4 relative">
      {/* Header Section - Dynamic */}
      <div className="flex flex-col gap-2 mb-6 md:mb-8 max-w-[1400px] mx-auto px-4 lg:px-0 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex flex-col gap-3 md:gap-4">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#9b1c20] mb-1 md:mb-2 font-outfit">
              {pageData.headerTitle}
            </h3>
            <p className="text-gray-600 max-w-2xl text-base md:text-lg lg:text-xl">
              {pageData.headerSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Video Section - Dynamic */}
      {pageData.videoDisplayCondition !== 'desktop_only' && (
        <div className='h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px]'>
          <VideoPlayer src={pageData.videoUrl} alt={pageData.videoAltText} />
        </div>
      )}

      {/* Main Form Container */}
      <div className="font-outfit max-w-[1400px] px-2 mx-auto lg:px-0 w-full">
        <div className="mx-auto rounded-2xl">
          <div className="bg-white w-full max-w-[1200px] xxl:max-w-[1400px] mx-auto 
                         lg:absolute lg:top-[55%] lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 
                         p-3 sm:p-4 md:p-6 rounded-xl lg:rounded-3xl 
                         flex flex-col lg:flex-row justify-between gap-4 sm:gap-6 md:gap-8">

            {/* Form Section - Dynamic Labels */}
            <div className="space-y-4 sm:space-y-6 flex flex-col py-4 sm:py-6 lg:py-8 px-2 sm:px-4 md:px-6 lg:px-8 w-full">
              {/* Title - Dynamic */}
              <div className="flex flex-col gap-2">
                <p className="font-bold text-[#9b1c20] text-xl sm:text-2xl md:text-2xl">
                  {pageData.formTitle}
                </p>
                <p className='text-base md:text-lg text-[#9b1c20] font-light'>
                  {pageData.formSubtitle}
                </p>
              </div>

              {/* API Error Warning - Dynamic */}
              {reasonsError && (
                <div className="text-xs text-yellow-600 bg-yellow-50 p-2 rounded-lg border border-yellow-200">
                  <strong>Note:</strong> {pageData.messages.api.fallbackWarning} {reasonsError}
                </div>
              )}

              {/* Form - Dynamic Placeholders */}
              <form onSubmit={handleSendCallback} className="w-full">
                <div className="flex flex-col sm:flex-row gap-3 mb-3 w-full">
                  <input
                    type="text"
                    placeholder={pageData.formLabels.firstName.placeholder}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border-[#9b1c20]/20 p-3 sm:p-4 px-4 rounded-full border text-sm sm:text-base w-full text-[#9b1c20] focus:outline-none focus:ring-2 focus:ring-[#9b1c20]/30"
                    required={pageData.formLabels.firstName.required}
                  />
                  <input
                    type="text"
                    placeholder={pageData.formLabels.lastName.placeholder}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border-[#9b1c20]/20 p-3 sm:p-4 px-4 rounded-full border text-sm sm:text-base w-full text-[#9b1c20] focus:outline-none focus:ring-2 focus:ring-[#9b1c20]/30"
                    required={pageData.formLabels.lastName.required}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-4 w-full">
                  <input
                    type="tel"
                    placeholder={pageData.formLabels.mobileNumber.placeholder}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="border-[#9b1c20]/20 p-3 sm:p-4 px-4 rounded-full border text-sm sm:text-base w-full text-[#9b1c20] focus:outline-none focus:ring-2 focus:ring-[#9b1c20]/30"
                    required={pageData.formLabels.mobileNumber.required}
                  />
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="border-[#9b1c20]/20 p-3 sm:p-4 px-4 rounded-full border text-sm sm:text-base w-full text-[#9b1c20] focus:outline-none focus:ring-2 focus:ring-[#9b1c20]/30 bg-white"
                    required={pageData.formLabels.reason.required}
                    disabled={loadingReasons}
                  >
                    <option value="">
                      {loadingReasons ? pageData.formLabels.reason.loadingText : pageData.formLabels.reason.placeholder}
                    </option>
                    {callbackReasons.map((reasonItem) => (
                      <option key={reasonItem._id} value={reasonItem.label}>
                        {reasonItem.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || loadingReasons}
                  className="bg-[#9b1c20] space-x-2 text-white px-6 md:px-8 lg:px-16 py-3 sm:py-4 rounded-full w-full sm:w-auto flex items-center justify-center text-sm sm:text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#8a191d] transition-colors duration-200 min-h-[48px]"
                >
                  <SlPhone className="text-sm" />
                  <span className="whitespace-nowrap">
                    {isLoading ? pageData.buttonText.loading : pageData.buttonText.default}
                  </span>
                </button>
              </form>

              {/* Message - Dynamic */}
              {message && (
                <div className={`text-sm font-semibold ${message.includes('successfully') ? 'text-green-600' : 'text-yellow-600'}`}>
                  {message}
                </div>
              )}

              {/* Contact Information - Dynamic */}
              <div className="space-y-2">
                <div className="pt-4 border-t border-gray-200">
                  <p className="font-bold text-gray-600 text-sm md:text-base mb-2">
                    {pageData.contactTitle}
                  </p>
                  <div className="flex flex-col lg:flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-6">
                    <div className="flex items-center gap-2">
                      <SlPhone className="text-sm md:text-base text-[#9b1c20] flex-shrink-0" />
                      <a
                        href={pageData.contactPhone.href}
                        className="font-semibold text-sm md:text-base text-[#9b1c20] hover:underline transition hover:text-[#F7941D]"
                      >
                        {pageData.contactPhone.display}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <SlEnvolope className="text-sm md:text-base text-[#9b1c20] flex-shrink-0" />
                      <a
                        href={pageData.contactEmail.href}
                        className="font-semibold text-sm md:text-base text-[#9b1c20] hover:underline transition hover:text-[#F7941D]"
                      >
                        {pageData.contactEmail.display}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Section - Dynamic */}
            <div className="w-full lg:w-auto lg:flex-1 md:min-w-[500px] lg:min-w-[700px]">
              <Image
                src={pageData.adImage}
                alt={pageData.adAltText}
                height={500}
                width={1000}
                className="w-full h-auto max-h-[300px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-[500px] xl:max-h-[600px] object-cover rounded-xl lg:rounded-2xl border shadow-sm"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agent;
📋 Implementation Checklist
Phase 1: API Development
Create /api/cms/pages/agent endpoint

Implement GET endpoint

Implement PUT endpoint (admin)

Add database table pages with agent schema

Phase 2: Data Migration
Export current agent page content

Create database records

Validate data integrity

Create admin form for editing

Phase 3: Frontend Update
Update agent/page.js to use API

Preserve all form functionality

Add loading state for page data

Add error handling for page data

Test all dynamic content sections

Phase 4: Testing
Test form submission still works

Test dynamic content loading

Test responsive design

Test contact links functionality

Test admin updates

🎯 Benefits of Migration
Current Issues
❌ Form labels require code changes

❌ Contact information hardcoded

❌ Messages and notifications static

❌ Advertisement image fixed

After Migration
✅ Update form labels without deployment

✅ Modify contact info via CMS

✅ Customize user messages

✅ Change advertisement dynamically

✅ A/B test different form copy

📊 Database Schema Extension
sql
-- Extend existing pages table or create agent-specific table
ALTER TABLE pages ADD COLUMN IF NOT EXISTS agent_specific JSONB;

-- Or create separate table
CREATE TABLE page_agent (
  id UUID PRIMARY KEY,
  page_id UUID REFERENCES pages(id),
  
  -- Agent-specific fields
  header_title VARCHAR(255),
  header_subtitle TEXT,
  video_url TEXT,
  video_alt_text TEXT,
  video_display_condition VARCHAR(50),
  
  form_title VARCHAR(255),
  form_subtitle TEXT,
  form_labels JSONB,
  button_text JSONB,
  
  contact_title VARCHAR(255),
  contact_phone JSONB,
  contact_email JSONB,
  
  ad_image TEXT,
  ad_alt_text VARCHAR(255),
  
  messages JSONB,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
🔒 Security Notes
Preserve existing form validation

Maintain API security for callback reasons

Sanitize all CMS content before rendering

Validate dynamic URLs before rendering

Keep existing rate limiting

📈 Performance Considerations
Current
Static form with dynamic API calls

Fast initial load

One additional API call for reasons

After Migration
One additional API call for page content

~100-200ms additional load time

Can optimize with:

Static Generation (SSG)

Client-side caching

Background pre-fetching

Recommendation
Use Static Site Generation with client-side hydration for dynamic form:

javascript
// app/agent/page.js
export default function Agent({ initialPageData }) {
  const [pageData, setPageData] = useState(initialPageData);
  
  // Rest of component logic...
}

// Pre-fetch page data at build time
export async function getStaticProps() {
  const pageData = await fetchPageData('agent');
  return {
    props: { initialPageData: pageData },
    revalidate: 3600 // 1 hour
  };
}
🎓 Learning from This Migration
Key Differences from About Page
Preserved Functionality: Form logic remains intact

Mixed Content: Static text + dynamic API data

User Interaction: Form validation and submission

External Dependencies: Callback reasons API

Migration Strategy
Keep all existing state management

Replace only hardcoded strings

Maintain form functionality

Preserve API integrations

