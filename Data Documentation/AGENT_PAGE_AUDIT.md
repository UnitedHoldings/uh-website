# Agent Component - Comprehensive CMS Audit

**Component**: `components/Agent.js`  
**Status**: Partially API-Integrated (Email API + Hardcoded Data)  
**Lines of Code**: 280+  
**Data Sources**: 2 (Email API + Hardcoded contact/routing data)  
**Last Updated**: November 11, 2025

---

## 📋 Executive Summary

The `Agent` component is a contact form section with callback request functionality. It currently has a **mixed data approach**:

- ✅ **Email API**: Posts to `https://website.api.united.co.sz/api/send-email` (works)
- ❌ **Callback Reasons**: Hardcoded dropdown options (5 options)
- ❌ **Email Routing**: Hardcoded email mapping by reason
- ❌ **Contact Information**: Hardcoded phone, email, departments
- ❌ **Quick Links**: Hardcoded navigation links
- ❌ **Configuration**: Hardcoded layout, styles, messages

**Total Hardcoded Items**: 28  
**Effort to Migrate**: 3-5 hours  
**Complexity Level**: Medium (form handling, email routing, contact directory)

---

## 📊 Data Inventory & Audit

### 1. **Callback Reasons/Options** (Lines 79-85)

**Current Implementation**:
```javascript
<option value="">Select Reason *</option>
<option value="Get A Quote">Get A Quote</option>
<option value="File A Claim">File A Claim</option>
<option value="Ask Questions">Ask Questions</option>
<option value="Account Statement">Account Statement</option>
<option value="Other">Other</option>
```

**Data Fields**:
| Field | Type | Status | Value |
|-------|------|--------|-------|
| value | String | ❌ Hardcoded | Get A Quote, File A Claim, etc. |
| label | String | ❌ Hardcoded | Display text |
| displayOrder | Implicit | ❌ Hardcoded | Array order (1-5) |

**Summary**: 5 reason options with 2 hardcoded properties each = **10 hardcoded fields**

---

### 2. **Email Routing Map** (Lines 17-25)

**Current Implementation**:
```javascript
const getEmailByReason = (reason) => {
  const emailMap = {
    'Get A Quote': 'info@united.co.sz',
    'File A Claim': 'info@united.co.sz',
    'Ask Questions': 'info@united.co.sz',
    'Account Statement': 'info@united.co.sz',
    'Other': 'info@united.co.sz',
  };
  return emailMap[reason] || 'callcenter@united.co.sz';
};
```

**Data Fields**:
| Field | Type | Status | Value |
|-------|------|--------|-------|
| reason | String | ❌ Hardcoded | Get A Quote, File A Claim, etc. |
| email | String | ❌ Hardcoded | info@united.co.sz (all map to this) |
| defaultEmail | String | ❌ Hardcoded | callcenter@united.co.sz |

**Summary**: Email mapping for 5 reasons = **5 hardcoded mappings** + 1 default

---

### 3. **Contact Information** (Lines 206-235)

**Current Implementation**:
```javascript
// Primary Contact
<a href="tel:8001010">800 1010</a>
<a href="mailto:info@united.co.sz">info@united.co.sz</a>

// Department Emails
<span>callcenter@united.co.sz</span>
<span>upay@united.co.sz</span>
<span>ugi@united.co.sz</span>
<span>ula@united.co.sz</span>
```

**Data Fields**:
| Field | Type | Status | Value |
|-------|------|--------|-------|
| mainPhoneNumber | String | ❌ Hardcoded | 8001010 |
| mainEmail | String | ❌ Hardcoded | info@united.co.sz |
| callCenterEmail | String | ❌ Hardcoded | callcenter@united.co.sz |
| upayEmail | String | ❌ Hardcoded | upay@united.co.sz |
| ugiEmail | String | ❌ Hardcoded | ugi@united.co.sz |
| ulaEmail | String | ❌ Hardcoded | ula@united.co.sz |

**Summary**: 6 contact data points hardcoded = **6 hardcoded fields**

---

### 4. **Quick Links** (Lines 196-210)

**Current Implementation**:
```javascript
<Link href="/claims">
  <li>File a Claim</li>
</Link>
<li>
  <span>Track a Claim</span>
</li>
<li>
  <span>Get Proof of Insurance</span>
</li>
<li>
  <span>Make Payment</span>
</li>
```

**Data Fields**:
| Field | Type | Status | Value |
|-------|------|--------|-------|
| label | String | ❌ Hardcoded | File a Claim, Track a Claim, etc. |
| href | String | ❌ Hardcoded | /claims (only for first item) |
| icon | Component | ❌ Hardcoded | SlDoc, SlTarget, SlInfo, SlLink |
| isExternal | Implicit | ❌ Hardcoded | Some are routes, some disabled |

**Summary**: 4 quick links with 3+ properties each = **12+ hardcoded fields**

---

### 5. **UI Constants & Configuration** (Lines 1-15)

**Current Implementation**:
```javascript
// No explicit constants, but hardcoded:
- Video URL: "https://res.cloudinary.com/loooktrial/video/upload/v1760930701/Agent_wce4fn.mp4"
- Image URL: "/ad.jpg"
- Phone Icon: SlPhone
- Email Icon: SlEnvolope
- Various styles and messages
```

**Hardcoded Text**:
- Section Title: "Speak to an Officer"
- Section Description: "Connect with one of our officers to explore tailored solutions."
- Form Title: "Request a Callback"
- Form Subtitle: "From Our Insurance Officers"
- Success Message: "Callback request sent successfully! We will contact you shortly."
- Error Message: "Failed to send callback request. Please try again."
- Email Notification: "Your request will be sent to: {email}"
- Department Header: "Contact Specific Departments"

**Summary**: 8+ text strings + 2 media URLs = **10+ hardcoded strings**

---

## 🗂️ CMS Entity Design

### CMSCallbackReason Entity

**Purpose**: Store callback request reasons  
**Scope**: 5-10 reasons typically  
**Update Frequency**: 2-3 times per year

**TypeScript Interface**:
```typescript
interface CMSCallbackReason {
  id: string;
  displayOrder: number;
  label: string;
  value: string;
  description?: string;
  targetDepartment: string; // 'call_center' | 'general' | 'upay' | 'ugi' | 'ula'
  targetEmail: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
```

### CMSContactInfo Entity

**Purpose**: Store company contact information and department details  
**Scope**: Single record with 6+ departments  
**Update Frequency**: As needed (quarterly reviews)

**TypeScript Interface**:
```typescript
interface CMSContactInfo {
  id: string;
  primaryPhone: string;
  primaryEmail: string;
  mainVideoUrl: string;
  mainImageUrl: string;
  departments: Array<{
    id: string;
    name: string;
    email: string;
    phone?: string;
    description?: string;
  }>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
```

### CMSQuickLink Entity

**Purpose**: Store quick action links  
**Scope**: 3-6 links typically  
**Update Frequency**: Rarely (only when features change)

**TypeScript Interface**:
```typescript
interface CMSQuickLink {
  id: string;
  displayOrder: number;
  label: string;
  href: string;
  iconName: string; // 'file' | 'target' | 'info' | 'link'
  isExternal: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
```

### CMSAgentConfig Entity

**Purpose**: Store component-level configuration  
**Scope**: Single record  
**Update Frequency**: Rarely

**TypeScript Interface**:
```typescript
interface CMSAgentConfig {
  id: string;
  sectionTitle: string;
  sectionDescription: string;
  formTitle: string;
  formSubtitle: string;
  successMessage: string;
  errorMessage: string;
  emailNotificationText: string;
  departmentHeaderText: string;
  submitButtonText: string;
  loadingButtonText: string;
  mainVideoUrl: string;
  mainImageUrl: string;
  showVideoOnDesktop: boolean;
  showVideo: boolean;
  videoHeight: string; // "h-[300px]" etc.
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
```

---

## 🗄️ Database Schema (PostgreSQL)

### Table: cms_callback_reasons

```sql
CREATE TABLE cms_callback_reasons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_order INTEGER NOT NULL,
  label VARCHAR(255) NOT NULL,
  value VARCHAR(255) NOT NULL,
  description TEXT,
  target_department VARCHAR(100) NOT NULL,
  target_email VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID NOT NULL,
  updated_by UUID NOT NULL,
  
  CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users(id),
  CONSTRAINT fk_updated_by FOREIGN KEY (updated_by) REFERENCES users(id),
  CONSTRAINT unique_value UNIQUE (value)
);

CREATE INDEX idx_callback_reasons_display_order ON cms_callback_reasons(display_order);
CREATE INDEX idx_callback_reasons_active ON cms_callback_reasons(is_active);
```

### Table: cms_contact_info

```sql
CREATE TABLE cms_contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  primary_phone VARCHAR(20) NOT NULL,
  primary_email VARCHAR(255) NOT NULL,
  main_video_url TEXT,
  main_image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID NOT NULL,
  updated_by UUID NOT NULL,
  
  CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users(id),
  CONSTRAINT fk_updated_by FOREIGN KEY (updated_by) REFERENCES users(id)
);

CREATE INDEX idx_contact_info_active ON cms_contact_info(is_active);
```

### Table: cms_contact_departments

```sql
CREATE TABLE cms_contact_departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_info_id UUID NOT NULL,
  department_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  description TEXT,
  display_order INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_contact_info FOREIGN KEY (contact_info_id) REFERENCES cms_contact_info(id) ON DELETE CASCADE
);

CREATE INDEX idx_departments_contact ON cms_contact_departments(contact_info_id);
CREATE INDEX idx_departments_active ON cms_contact_departments(is_active);
```

### Table: cms_quick_links

```sql
CREATE TABLE cms_quick_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_order INTEGER NOT NULL,
  label VARCHAR(255) NOT NULL,
  href VARCHAR(500) NOT NULL,
  icon_name VARCHAR(50) NOT NULL,
  is_external BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID NOT NULL,
  updated_by UUID NOT NULL,
  
  CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users(id),
  CONSTRAINT fk_updated_by FOREIGN KEY (updated_by) REFERENCES users(id)
);

CREATE INDEX idx_quick_links_display_order ON cms_quick_links(display_order);
CREATE INDEX idx_quick_links_active ON cms_quick_links(is_active);
```

### Table: cms_agent_config

```sql
CREATE TABLE cms_agent_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_title VARCHAR(255) NOT NULL,
  section_description TEXT NOT NULL,
  form_title VARCHAR(255) NOT NULL,
  form_subtitle VARCHAR(255) NOT NULL,
  success_message TEXT NOT NULL,
  error_message TEXT NOT NULL,
  email_notification_text TEXT NOT NULL,
  department_header_text VARCHAR(255) NOT NULL,
  submit_button_text VARCHAR(100) NOT NULL,
  loading_button_text VARCHAR(100) NOT NULL,
  main_video_url TEXT,
  main_image_url TEXT,
  show_video_on_desktop BOOLEAN DEFAULT true,
  show_video BOOLEAN DEFAULT true,
  video_height VARCHAR(50) DEFAULT 'h-[700px]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID NOT NULL,
  updated_by UUID NOT NULL,
  
  CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users(id),
  CONSTRAINT fk_updated_by FOREIGN KEY (updated_by) REFERENCES users(id)
);
```

---

## 🔌 API Endpoints Needed

### 1. **GET /api/cms/callback-reasons**

**Purpose**: Fetch all callback request reasons  
**Status**: ❌ Not implemented

**Request**:
```bash
GET /api/cms/callback-reasons?active=true&sort=displayOrder
```

**Response**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid-1",
        "displayOrder": 1,
        "label": "Get A Quote",
        "value": "Get A Quote",
        "description": "Request a quote for our products",
        "targetDepartment": "general",
        "targetEmail": "info@united.co.sz",
        "isActive": true
      }
    ],
    "total": 5,
    "cached": false
  },
  "timestamp": "2025-11-11T10:30:00Z"
}
```

---

### 2. **GET /api/cms/contact-info**

**Purpose**: Fetch contact information and departments  
**Status**: ❌ Not implemented

**Request**:
```bash
GET /api/cms/contact-info
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "primaryPhone": "8001010",
    "primaryEmail": "info@united.co.sz",
    "mainVideoUrl": "https://res.cloudinary.com/loooktrial/video/upload/v1760930701/Agent_wce4fn.mp4",
    "mainImageUrl": "/ad.jpg",
    "departments": [
      {
        "id": "uuid-1",
        "name": "Call Center",
        "email": "callcenter@united.co.sz",
        "phone": "8001010",
        "description": "General inquiries"
      },
      {
        "id": "uuid-2",
        "name": "United Pay",
        "email": "upay@united.co.sz"
      },
      {
        "id": "uuid-3",
        "name": "Insurance",
        "email": "ugi@united.co.sz"
      },
      {
        "id": "uuid-4",
        "name": "ULA",
        "email": "ula@united.co.sz"
      }
    ],
    "isActive": true
  },
  "timestamp": "2025-11-11T10:30:00Z"
}
```

---

### 3. **GET /api/cms/quick-links**

**Purpose**: Fetch quick action links  
**Status**: ❌ Not implemented

**Request**:
```bash
GET /api/cms/quick-links?active=true&sort=displayOrder
```

**Response**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid-1",
        "displayOrder": 1,
        "label": "File a Claim",
        "href": "/claims",
        "iconName": "file",
        "isExternal": false,
        "isActive": true
      },
      {
        "id": "uuid-2",
        "displayOrder": 2,
        "label": "Track a Claim",
        "href": "/claims/track",
        "iconName": "target",
        "isExternal": false,
        "isActive": true
      }
    ],
    "total": 4,
    "cached": false
  },
  "timestamp": "2025-11-11T10:30:00Z"
}
```

---

### 4. **GET /api/cms/agent/config**

**Purpose**: Fetch component configuration  
**Status**: ❌ Not implemented

**Request**:
```bash
GET /api/cms/agent/config
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "sectionTitle": "Speak to an Officer",
    "sectionDescription": "Connect with one of our officers to explore tailored solutions.",
    "formTitle": "Request a Callback",
    "formSubtitle": "From Our Insurance Officers",
    "successMessage": "Callback request sent successfully! We will contact you shortly.",
    "errorMessage": "Failed to send callback request. Please try again.",
    "emailNotificationText": "Your request will be sent to: {email}",
    "departmentHeaderText": "Contact Specific Departments",
    "submitButtonText": "Send Callback",
    "loadingButtonText": "Sending...",
    "mainVideoUrl": "https://res.cloudinary.com/loooktrial/video/upload/v1760930701/Agent_wce4fn.mp4",
    "mainImageUrl": "/ad.jpg",
    "showVideoOnDesktop": true,
    "showVideo": true,
    "videoHeight": "h-[700px]"
  },
  "timestamp": "2025-11-11T10:30:00Z"
}
```

---

### 5. **POST /api/cms/callbacks** (New Endpoint)

**Purpose**: Submit callback request (replaces current email API)  
**Status**: ❌ Not implemented

**Request**:
```bash
POST /api/cms/callbacks
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "mobileNumber": "26876543210",
  "reason": "Get A Quote"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Callback request submitted successfully",
  "data": {
    "id": "uuid",
    "email": "info@united.co.sz",
    "submittedAt": "2025-11-11T10:30:00Z"
  }
}
```

---

## 💻 Migration Code Examples

### Before: Current Implementation

```javascript
// components/Agent.js - Current approach

function Agent() {
  const [reason, setReason] = useState('');
  
  // Hardcoded email mapping
  const getEmailByReason = (reason) => {
    const emailMap = {
      'Get A Quote': 'info@united.co.sz',
      'File A Claim': 'info@united.co.sz',
      'Ask Questions': 'info@united.co.sz',
      'Account Statement': 'info@united.co.sz',
      'Other': 'info@united.co.sz',
    };
    return emailMap[reason] || 'callcenter@united.co.sz';
  };

  return (
    <select value={reason} onChange={(e) => setReason(e.target.value)}>
      <option value="">Select Reason *</option>
      <option value="Get A Quote">Get A Quote</option>
      <option value="File A Claim">File A Claim</option>
      {/* More hardcoded options */}
    </select>
  );
}
```

---

### After: API-Driven Implementation

**Step 1: Create API Service Layer** (`lib/cms-agent-api.js`)

```javascript
// lib/cms-agent-api.js

export const agentAPI = {
  async getCallbackReasons() {
    try {
      const response = await fetch('/api/cms/callback-reasons?active=true&sort=displayOrder');
      if (!response.ok) throw new Error('Failed to fetch reasons');
      const data = await response.json();
      return data.data?.items || [];
    } catch (error) {
      console.error('Error fetching callback reasons:', error);
      return [];
    }
  },

  async getContactInfo() {
    try {
      const response = await fetch('/api/cms/contact-info');
      if (!response.ok) throw new Error('Failed to fetch contact info');
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching contact info:', error);
      return null;
    }
  },

  async getQuickLinks() {
    try {
      const response = await fetch('/api/cms/quick-links?active=true&sort=displayOrder');
      if (!response.ok) throw new Error('Failed to fetch quick links');
      const data = await response.json();
      return data.data?.items || [];
    } catch (error) {
      console.error('Error fetching quick links:', error);
      return [];
    }
  },

  async getAgentConfig() {
    try {
      const response = await fetch('/api/cms/agent/config');
      if (!response.ok) throw new Error('Failed to fetch config');
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching agent config:', error);
      return null;
    }
  },

  async submitCallback(callbackData) {
    try {
      const response = await fetch('/api/cms/callbacks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(callbackData)
      });
      if (!response.ok) throw new Error('Failed to submit callback');
      return await response.json();
    } catch (error) {
      console.error('Error submitting callback:', error);
      throw error;
    }
  }
};
```

**Step 2: Create Custom Hook** (`hooks/useAgentData.js`)

```javascript
// hooks/useAgentData.js

import { useState, useEffect } from 'react';
import { agentAPI } from '@/lib/cms-agent-api';

export function useAgentData() {
  const [data, setData] = useState({
    reasons: [],
    contactInfo: null,
    quickLinks: [],
    config: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [reasons, contactInfo, quickLinks, config] = await Promise.all([
          agentAPI.getCallbackReasons(),
          agentAPI.getContactInfo(),
          agentAPI.getQuickLinks(),
          agentAPI.getAgentConfig()
        ]);

        setData({
          reasons,
          contactInfo,
          quickLinks,
          config
        });
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { ...data, loading, error };
}
```

**Step 3: Update Component**

```javascript
// components/Agent.js - Updated

'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { SlDoc, SlEnvolope, SlInfo, SlLink, SlPhone, SlTarget } from 'react-icons/sl';
import VideoPlayer from './VideoPlayer';
import { useAgentData } from '@/hooks/useAgentData';
import { agentAPI } from '@/lib/cms-agent-api';

const iconMap = {
  'file': SlDoc,
  'target': SlTarget,
  'info': SlInfo,
  'link': SlLink,
  'phone': SlPhone,
  'envelope': SlEnvolope
};

function Agent() {
  const { reasons, contactInfo, quickLinks, config, loading, error } = useAgentData();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Get email from reason object
  const getEmailByReason = (reasonValue) => {
    const selectedReason = reasons.find(r => r.value === reasonValue);
    return selectedReason?.targetEmail || contactInfo?.primaryEmail || 'info@united.co.sz';
  };

  const handleSendCallback = async (e) => {
    e.preventDefault();

    if (!firstName || !mobileNumber || !reason) {
      setMessage('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      await agentAPI.submitCallback({
        firstName,
        lastName,
        mobileNumber,
        reason
      });

      setMessage(config?.successMessage || 'Callback request sent successfully!');
      setFirstName('');
      setLastName('');
      setMobileNumber('');
      setReason('');
    } catch (error) {
      setMessage(config?.errorMessage || 'Failed to send callback request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="py-4 relative">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-0 w-full">
          <div className="text-red-600 text-lg">Error loading form: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 relative">
      {/* Header Section - from config */}
      {config && (
        <div className="flex flex-col gap-2 mb-6 md:mb-8 max-w-[1400px] mx-auto px-4 lg:px-0 w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex flex-col gap-3 md:gap-4">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#9b1c20] mb-1 md:mb-2 font-outfit">
                {config.sectionTitle}
              </h3>
              <p className="text-gray-600 max-w-2xl text-base md:text-lg lg:text-xl">
                {config.sectionDescription}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Video Section - from config */}
      {config?.showVideoOnDesktop && (
        <div className={`${config.videoHeight} sm:h-[400px] md:h-[500px] lg:block hidden`}>
          <VideoPlayer src={config.mainVideoUrl} />
        </div>
      )}

      {/* Main Form Container */}
      <div className="font-outfit max-w-[1400px] px-2 mx-auto lg:px-0 w-full">
        <div className="mx-auto rounded-2xl">
          <div className="bg-white w-full max-w-[1200px] xxl:max-w-[1400px] mx-auto 
                         lg:absolute lg:top-[55%] lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 
                         p-3 sm:p-4 md:p-6 rounded-xl lg:rounded-3xl 
                         flex flex-col lg:flex-row justify-between gap-4 sm:gap-6 md:gap-8">
            
            {/* Form Section */}
            <div className="space-y-4 sm:space-y-6 flex flex-col py-4 sm:py-6 lg:py-8 px-2 sm:px-4 md:px-6 lg:px-8 w-full">
              {/* Title - from config */}
              {config && (
                <div className="flex flex-col gap-2">
                  <p className="font-bold text-[#9b1c20] text-xl sm:text-2xl md:text-2xl">
                    {config.formTitle}
                  </p>
                  <p className='text-base md:text-lg text-[#9b1c20] font-light'>
                    {config.formSubtitle}
                  </p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSendCallback} className="w-full">
                {/* Name Fields */}
                <div className="flex flex-col sm:flex-row gap-3 mb-3 w-full">
                  <input
                    type="text"
                    placeholder="First Name *"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border-[#9b1c20]/20 p-3 sm:p-4 px-4 rounded-full border text-sm sm:text-base w-full text-[#9b1c20] focus:outline-none focus:ring-2 focus:ring-[#9b1c20]/30"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border-[#9b1c20]/20 p-3 sm:p-4 px-4 rounded-full border text-sm sm:text-base w-full text-[#9b1c20] focus:outline-none focus:ring-2 focus:ring-[#9b1c20]/30"
                  />
                </div>

                {/* Contact Fields */}
                <div className="flex flex-col sm:flex-row gap-3 mb-4 w-full">
                  <input
                    type="tel"
                    placeholder="Enter Mobile Number *"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="border-[#9b1c20]/20 p-3 sm:p-4 px-4 rounded-full border text-sm sm:text-base w-full text-[#9b1c20] focus:outline-none focus:ring-2 focus:ring-[#9b1c20]/30"
                    required
                  />
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="border-[#9b1c20]/20 p-3 sm:p-4 px-4 rounded-full border text-sm sm:text-base w-full text-[#9b1c20] focus:outline-none focus:ring-2 focus:ring-[#9b1c20]/30 bg-white"
                    required
                  >
                    <option value="">Select Reason *</option>
                    {reasons.map(r => (
                      <option key={r.id} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                </div>

                {/* Email Routing Info */}
                {reason && (
                  <div className="text-xs text-gray-600 mb-2 p-2 bg-gray-50 rounded-lg">
                    {config?.emailNotificationText || 'Your request will be sent to:'} <strong>{getEmailByReason(reason)}</strong>
                  </div>
                )}
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || loading}
                  className="bg-[#9b1c20] space-x-2 text-white px-6 md:px-8 lg:px-16 py-3 sm:py-4 rounded-full w-full sm:w-auto flex items-center justify-center text-sm sm:text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#8a191d] transition-colors duration-200 min-h-[48px]"
                >
                  <SlPhone className="text-sm" />
                  <span className="whitespace-nowrap">
                    {isLoading ? (config?.loadingButtonText || 'Sending...') : (config?.submitButtonText || 'Send Callback')}
                  </span>
                </button>
              </form>

              {/* Message */}
              {message && (
                <div className={`text-sm font-semibold ${message.includes('successfully') ? 'text-green-600' : 'text-yellow-600'}`}>
                  {message}
                </div>
              )}

              {/* Quick Links - from API */}
              {!loading && quickLinks.length > 0 && (
                <div className="space-y-2">
                  <p className="font-bold text-gray-600 text-sm md:text-base mb-3">Quick Links</p>
                  <ul className="flex gap-3 flex-col lg:flex-row">
                    {quickLinks.map(link => {
                      const IconComponent = iconMap[link.iconName] || SlLink;
                      return (
                        <li key={link.id}>
                          {link.isExternal ? (
                            <a href={link.href} target="_blank" rel="noopener noreferrer"
                              className="font-semibold text-[#9b1c20] cursor-pointer hover:underline flex items-center space-x-2 text-sm md:text-base py-1">
                              <IconComponent className="flex-shrink-0" />
                              <span>{link.label}</span>
                            </a>
                          ) : (
                            <Link href={link.href}>
                              <span className="font-semibold text-[#9b1c20] cursor-pointer hover:underline flex items-center space-x-2 text-sm md:text-base py-1">
                                <IconComponent className="flex-shrink-0" />
                                <span>{link.label}</span>
                              </span>
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Contact Information - from API */}
              {contactInfo && (
                <div className="space-y-2">
                  <div className="flex flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-6">
                    <div className="flex flex-col lg:flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-6">
                      <div className="flex items-center gap-2">
                        <SlPhone className="text-sm md:text-base text-[#9b1c20] flex-shrink-0" />
                        <a href={`tel:${contactInfo.primaryPhone}`}
                          className="font-semibold text-sm md:text-base text-[#9b1c20] hover:underline transition hover:text-[#F7941D]">
                          {contactInfo.primaryPhone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <SlEnvolope className="text-sm md:text-base text-[#9b1c20] flex-shrink-0" />
                        <a href={`mailto:${contactInfo.primaryEmail}`}
                          className="font-semibold text-sm md:text-base text-[#9b1c20] hover:underline transition hover:text-[#F7941D]">
                          {contactInfo.primaryEmail}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Department Emails */}
                  {contactInfo.departments && contactInfo.departments.length > 0 && (
                    <div className="pt-4 border-t border-gray-200">
                      <p className="font-bold text-gray-600 text-sm md:text-base mb-2">
                        {config?.departmentHeaderText || 'Contact Specific Departments'}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {contactInfo.departments.map(dept => (
                          <div key={dept.id} className="flex items-center gap-1">
                            <span className="font-semibold text-[#9b1c20]">{dept.name}:</span>
                            <a href={`mailto:${dept.email}`} className="hover:underline">{dept.email}</a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Image Section - from config */}
            {config?.mainImageUrl && (
              <div className="w-full lg:w-auto lg:flex-1 md:min-w-[500px] lg:min-w-[700px]">
                <Image
                  src={config.mainImageUrl}
                  alt="Advertisement"
                  height={500}
                  width={1000}
                  className="w-full h-auto max-h-[300px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-[500px] xl:max-h-[600px] object-cover rounded-xl lg:rounded-2xl border shadow-sm"
                  priority={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agent;
```

---

## 🔄 Data Migration Path

### Phase 1: Backend Setup (1.5 hours)
- [ ] Create 5 new database tables
- [ ] Create 5 new API endpoints
- [ ] Seed data from current hardcoded values
- [ ] Test all endpoints

### Phase 2: Service Layer (30 mins)
- [ ] Create `lib/cms-agent-api.js`
- [ ] Create `hooks/useAgentData.js`
- [ ] Add error handling
- [ ] Add loading states

### Phase 3: Component Update (1 hour)
- [ ] Replace hardcoded data with hook
- [ ] Update form submission logic
- [ ] Update contact display
- [ ] Update quick links

### Phase 4: Testing (1 hour)
- [ ] Unit tests for hook
- [ ] Component integration tests
- [ ] Form submission tests
- [ ] API response validation

### Phase 5: Deployment (30 mins)
- [ ] Code review
- [ ] Staging deployment
- [ ] Production rollout
- [ ] Monitor error logs

---

## 📋 Implementation Checklist

### Pre-Implementation
- [ ] Review all hardcoded data identified
- [ ] Get approval for CMS schema
- [ ] Allocate development time
- [ ] Schedule QA testing
- [ ] Plan database migration

### API Development
- [ ] Create `/api/cms/callback-reasons` endpoint
- [ ] Create `/api/cms/contact-info` endpoint
- [ ] Create `/api/cms/quick-links` endpoint
- [ ] Create `/api/cms/agent/config` endpoint
- [ ] Create `/api/cms/callbacks` endpoint (new submission endpoint)
- [ ] Add validation
- [ ] Add error handling
- [ ] Add response caching

### Database Setup
- [ ] Create 5 new tables
- [ ] Add foreign key constraints
- [ ] Create indexes
- [ ] Add seed data from hardcoded values
- [ ] Document schema

### Frontend Changes
- [ ] Create service layer (`lib/cms-agent-api.js`)
- [ ] Create custom hook (`hooks/useAgentData.js`)
- [ ] Update Agent component
- [ ] Remove hardcoded data
- [ ] Create icon mapping for quick links

### Testing
- [ ] Test all API endpoints
- [ ] Test service layer
- [ ] Test form submission
- [ ] Test email routing
- [ ] Test responsive design
- [ ] Test error states
- [ ] Test loading states
- [ ] Test accessibility

### Documentation
- [ ] Update API documentation
- [ ] Create admin guide for managing callbacks
- [ ] Create developer guide
- [ ] Document data relationships
- [ ] Document email routing rules

---

## 🎯 Icon Mapping for Quick Links

| Current Icon | Component | Database Value | Usage |
|--------------|-----------|-----------------|-------|
| File | SlDoc | "file" | File a Claim |
| Target | SlTarget | "target" | Track a Claim |
| Info | SlInfo | "info" | Get Proof of Insurance |
| Link | SlLink | "link" | Make Payment |

---

## 📞 Questions for Product Team

1. Should callback reasons be department-specific?
2. Should all departments receive all callback requests?
3. Should we track callback response times?
4. Should there be validation for phone numbers (Eswatini format)?
5. Should quick links be context-aware (show different links on different pages)?
6. Should we send confirmation emails to customers?
7. Should there be callback scheduling (pick date/time)?
8. Should we integrate with CRM for tracking callbacks?

---

## ⚠️ Migration Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| API downtime | Form not working | Fallback to hardcoded data with feature flag |
| Email routing failure | Messages sent to wrong dept | Validation and testing of email mappings |
| Data mismatch | Inconsistent display | Comprehensive API response validation |
| Performance regression | Slower form load | Caching strategy for static data |

---

## ✅ Conclusion

The Agent component is a critical contact form that would benefit significantly from CMS migration. Key benefits:

1. **Non-technical staff can manage callback reasons**
2. **Email routing can be updated without code changes**
3. **Quick links can be dynamically managed**
4. **Contact information centralized and reusable**
5. **Form messages customizable per deployment**

**Estimated Timeline**: 3-5 hours for full implementation  
**Difficulty**: Medium (form handling, email routing)  
**Priority**: High (contact form is critical path)

---

**Document Created**: November 11, 2025  
**Status**: Production-Ready  
**Next Step**: Create 5 API endpoints and implement service layer
