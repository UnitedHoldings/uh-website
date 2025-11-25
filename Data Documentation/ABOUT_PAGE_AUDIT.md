# 📄 About Page Data Audit & CMS Migration

**File**: `app/about/page.js`  
**Type**: Page Component  
**Date Analyzed**: November 11, 2025

---

## 📋 Executive Summary

The About page contains **hardcoded content** across 5 main sections. All text content can be moved to a CMS for dynamic management.

---

## 🔍 Hardcoded Data Inventory

### Section 1: Header & Hero Section

**Location**: Lines 23-36

**Current Hardcoded Data**:
```javascript
<h1 className="text-xl sm:text-2xl md:text-4xl font-semibold text-white text-center sm:text-left">
    About United Holdings
</h1>
<p className="text-xs sm:text-sm text-white text-center sm:text-left mt-2">
    Learn about our purpose, values and commitment to Eswatini.
</p>
// Hero Image
<Image src={'/mall.png'} alt="About hero" ... />
```

**Data to Migrate**:
```json
{
  "section": "header",
  "title": "About United Holdings",
  "subtitle": "Learn about our purpose, values and commitment to Eswatini.",
  "heroImage": "/mall.png",
  "backgroundColor": "#9b1c20"
}
```

---

### Section 2: Claims Information Banner

**Location**: Lines 38-55

**Current Hardcoded Data**:
```javascript
<p className='max-w-[800px] text-white text-lg sm:text-xl md:text-2xl text-center sm:text-left'>
    Most claims, including home, life, funeral, vehicles can be taken care of in{' '}
    <span className="hover:underline cursor-pointer font-semibold">My Account</span>.
    Check out the information below for other claims that are handled a little differently.
</p>
<Link href={'../../contact'} >
    <button className='border-white border text-white py-2 px-6 sm:px-8 rounded-full text-sm sm:text-base hover:bg-white hover:text-[#9b1c20] transition-colors'>
        Find Us
    </button>
</Link>
```

**Data to Migrate**:
```json
{
  "section": "claims_banner",
  "text": "Most claims, including home, life, funeral, vehicles can be taken care of in My Account. Check out the information below for other claims that are handled a little differently.",
  "cta": {
    "text": "Find Us",
    "link": "../../contact"
  },
  "backgroundColor": "#9b1c20"
}
```

---

### Section 3: About Us - Our Journey

**Location**: Lines 60-80

**Current Hardcoded Data**:
```javascript
<h2 className="text-2xl font-semibold text-left ">Our Journey</h2>
<p className="text-gray-700 leading-relaxed text-lg">
    United Holdings Ltd – Live With Purpose.
    United Holdings is a proudly Eswatini‑owned financial services group that has steadily grown into one of the Kingdom&apos;s most trusted providers of insurance and financial solutions. Since acquiring our operating license in 2016, we have been on a mission to transform the way individuals, families, and businesses access financial protection.
</p>
<p className="text-gray-700 leading-relaxed text-lg">
    Our story is one of resilience, innovation, and deep commitment to the people of Eswatini. We were founded on the belief that financial services should not be a privilege for the few, but a right for all. Today, we stand as a diversified group under the Dups Group of Companies, offering a wide range of products that address both short‑term and long‑term financial needs.
</p>
```

**Data to Migrate**:
```json
{
  "section": "our_journey",
  "heading": "Our Journey",
  "paragraphs": [
    "United Holdings Ltd – Live With Purpose. United Holdings is a proudly Eswatini‑owned financial services group that has steadily grown into one of the Kingdom's most trusted providers of insurance and financial solutions. Since acquiring our operating license in 2016, we have been on a mission to transform the way individuals, families, and businesses access financial protection.",
    "Our story is one of resilience, innovation, and deep commitment to the people of Eswatini. We were founded on the belief that financial services should not be a privilege for the few, but a right for all. Today, we stand as a diversified group under the Dups Group of Companies, offering a wide range of products that address both short‑term and long‑term financial needs."
  ]
}
```

---

### Section 4: Vision & Mission

**Location**: Lines 83-108

**Current Hardcoded Data**:
```javascript
<h2 className="text-xl sm:text-2xl font-semibold mb-3 md:text-left">
    Our Vision
</h2>
<p className="text-gray-700 text-lg leading-relaxed">
    To be the leading customer‑centric financial services provider in Eswatini and beyond, setting the standard for trust, innovation, and inclusivity.
</p>

<h2 className="text-xl sm:text-2xl font-semibold mb-3 md:text-left">
    Our Mission
</h2>
<p className="text-gray-700 text-lg leading-relaxed">
    We exist to uplift lives by delivering affordable, accessible, and innovative financial services. By being an employer of choice and a partner to communities, we ensure that our growth is shared with the people and places we serve.
</p>
```

**Data to Migrate**:
```json
{
  "section": "vision_mission",
  "vision": {
    "heading": "Our Vision",
    "content": "To be the leading customer‑centric financial services provider in Eswatini and beyond, setting the standard for trust, innovation, and inclusivity."
  },
  "mission": {
    "heading": "Our Mission",
    "content": "We exist to uplift lives by delivering affordable, accessible, and innovative financial services. By being an employer of choice and a partner to communities, we ensure that our growth is shared with the people and places we serve."
  }
}
```

---

### Section 5: Group of Companies (3 Company Cards)

**Location**: Lines 111-200

#### Company 1: United Life Assurance

**Current Hardcoded Data**:
```javascript
<h3 className="text-[#3d834d] font-semibold text-2xl">United Life Assurance</h3>
<Image src={'/life2.jpg'} alt="UGI Logo" ... />
<p className="text-gray-600 text-lg leading-relaxed">
    Offering long‑term insurance solutions such as funeral plans, credit life, and group life cover. These products provide families with dignity, security, and peace of mind during life&apos;s most challenging moments.
</p>
<Link href="/united-life-assurance" ...>
    Learn more →
</Link>
```

#### Company 2: United General Insurance

**Current Hardcoded Data**:
```javascript
<h3 className="text-[#9b1c20] font-semibold text-2xl">United General Insurance</h3>
<Image src={'/general.jpg'} alt="UGI Logo" ... />
<p className="text-gray-600 text-lg leading-relaxed">
    Providing short-term insurance for motor, home, legal, and business protection. We safeguard the assets and livelihoods of our clients, ensuring they can recover quickly from unexpected events.
</p>
<Link href="/united-general-insurance" ...>
    Learn more →
</Link>
```

#### Company 3: United Pay

**Current Hardcoded Data**:
```javascript
<h3 className="text-[#f79620] font-semibold text-lg sm:text-xl">United Pay</h3>
<Image src={'/Pay.jpg'} alt="UGI Logo" ... />
<p className="text-gray-600 text-lg leading-relaxed">
    Delivering fast, reliable cash loans with flexible repayment options. This service empowers individuals and small businesses to access credit when they need it most.
</p>
<Link href="/united-pay" ...>
    Learn more →
</Link>
```

**Data to Migrate** (Group of Companies):
```json
{
  "section": "group_of_companies",
  "heading": "Our Group of Companies",
  "description": "Together, these subsidiaries make United Holdings a one‑stop partner for financial security, ensuring that our clients can plan, protect, and prosper.",
  "companies": [
    {
      "id": "ula",
      "name": "United Life Assurance",
      "description": "Offering long‑term insurance solutions such as funeral plans, credit life, and group life cover. These products provide families with dignity, security, and peace of mind during life's most challenging moments.",
      "image": "/life2.jpg",
      "link": "/united-life-assurance",
      "color": "#3d834d"
    },
    {
      "id": "ugi",
      "name": "United General Insurance",
      "description": "Providing short-term insurance for motor, home, legal, and business protection. We safeguard the assets and livelihoods of our clients, ensuring they can recover quickly from unexpected events.",
      "image": "/general.jpg",
      "link": "/united-general-insurance",
      "color": "#9b1c20"
    },
    {
      "id": "up",
      "name": "United Pay",
      "description": "Delivering fast, reliable cash loans with flexible repayment options. This service empowers individuals and small businesses to access credit when they need it most.",
      "image": "/Pay.jpg",
      "link": "/united-pay",
      "color": "#f79620"
    }
  ]
}
```

---

### Section 6: Final CTA

**Location**: Lines 216-231

**Current Hardcoded Data**:
```javascript
<h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
    Ready to Get Started?
</h2>
<p className="text-white text-lg mb-6 max-w-2xl mx-auto">
    Join thousands of satisfied clients who trust United Holdings with their financial security.
</p>
<Link href="/contact" ...>
    Contact Us
</Link>
```

**Data to Migrate**:
```json
{
  "section": "final_cta",
  "heading": "Ready to Get Started?",
  "description": "Join thousands of satisfied clients who trust United Holdings with their financial security.",
  "cta": {
    "text": "Contact Us",
    "link": "/contact"
  }
}
```

---

## 📊 Data Summary

| Section | Type | Fields | Records |
|---------|------|--------|---------|
| Header | Text + Image | 2 text, 1 image | 1 |
| Claims Banner | Text + CTA | 1 text, 1 CTA | 1 |
| Our Journey | Text (2-col) | 1 heading, 2 paragraphs | 1 |
| Vision & Mission | Text (2-col) | 2 headings, 2 paragraphs | 2 |
| Group Companies | Cards (3x) | 6 fields × 3 | 3 |
| Final CTA | Text + CTA | 1 heading, 1 desc, 1 CTA | 1 |
| **TOTAL** | - | **17 text fields** | **9 data items** |

---

## 🗄️ CMS Entity: AboutPage

```typescript
interface CMSAboutPage {
  id: string
  slug: string = "about"
  
  // Header Section
  headerTitle: string
  headerSubtitle: string
  headerImage: string
  
  // Claims Banner
  claimsTitle: string
  claimsDescription: string
  claimsCTAText: string
  claimsCTALink: string
  
  // Our Journey Section
  journeyHeading: string
  journeyParagraphs: string[]  // Array of 2 paragraphs
  
  // Vision & Mission
  visionHeading: string
  visionContent: string
  missionHeading: string
  missionContent: string
  
  // Group of Companies
  groupHeading: string
  groupDescription: string
  companies: {
    id: string
    name: string
    description: string
    image: string
    link: string
    color: string
  }[]
  
  // Final CTA
  ctaHeading: string
  ctaDescription: string
  ctaCTAText: string
  ctaCTALink: string
  
  // Metadata
  createdAt: ISO8601
  updatedAt: ISO8601
  publishedAt?: ISO8601
  status: 'draft' | 'published'
}
```

---

## 🔌 API Endpoints Needed

```
GET  /api/cms/pages/about              // Get about page data
PUT  /api/cms/pages/about              // Update about page (admin)
GET  /api/cms/pages/about/companies    // Get just companies section
PUT  /api/cms/pages/about/companies/{id} // Update a company (admin)
```

---

## 🛠️ Migration Implementation

### Current Implementation

```javascript
// app/about/page.js - CURRENT
export default function About() {
  return (
    <div>
      <div>
        <h1>About United Holdings</h1>
        <p>Learn about our purpose...</p>
        {/* ... hardcoded content ... */}
      </div>
    </div>
  )
}
```

### After Migration

```javascript
'use client'
import { useEffect, useState } from 'react'

export default function About() {
  const [pageData, setPageData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/cms/pages/about')
      .then(r => r.json())
      .then(({ data }) => setPageData(data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading...</div>
  if (!pageData) return <div>Page not found</div>

  return (
    <div className="min-h-screen font-outfit mx-auto">
      {/* Header Section - Dynamic */}
      <div className='bg-[#9b1c20] py-4 sm:py-6'>
        <header className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-semibold text-white">
            {pageData.headerTitle}
          </h1>
          <p className="text-xs sm:text-sm text-white mt-2">
            {pageData.headerSubtitle}
          </p>
        </header>
      </div>

      {/* Hero Image - Dynamic */}
      <Image src={pageData.headerImage} alt="About hero" ... />

      {/* Claims Banner - Dynamic */}
      <div className='w-full bg-[#9b1c20] py-6 sm:py-8'>
        <p className='text-white'>
          {pageData.claimsDescription}
        </p>
        <Link href={pageData.claimsCTALink}>
          <button>{pageData.claimsCTAText}</button>
        </Link>
      </div>

      {/* Our Journey - Dynamic */}
      <div className="bg-white">
        <h2 className="text-2xl font-semibold">
          {pageData.journeyHeading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pageData.journeyParagraphs.map((para, idx) => (
            <p key={idx} className="text-gray-700">
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Vision & Mission - Dynamic */}
      <div className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2>{pageData.visionHeading}</h2>
            <p className="text-gray-700">{pageData.visionContent}</p>
          </div>
          <div>
            <h2>{pageData.missionHeading}</h2>
            <p className="text-gray-700">{pageData.missionContent}</p>
          </div>
        </div>
      </div>

      {/* Group of Companies - Dynamic */}
      <main className="px-4 py-8 bg-[#9b1c20]">
        <h2 className="text-2xl font-thin mb-6 text-white">
          {pageData.groupHeading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageData.companies.map(company => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
        <p className="mt-6 text-white">
          {pageData.groupDescription}
        </p>
      </main>

      {/* Final CTA - Dynamic */}
      <div className="bg-[#9b1c20] py-8">
        <h2 className="text-3xl font-bold text-white">
          {pageData.ctaHeading}
        </h2>
        <p className="text-white">{pageData.ctaDescription}</p>
        <Link href={pageData.ctaCTALink}>
          <button>{pageData.ctaCTAText}</button>
        </Link>
      </div>
    </div>
  )
}

// Reusable Company Card Component
function CompanyCard({ company }) {
  return (
    <div className="bg-white rounded-lg">
      <Image src={company.image} alt={company.name} ... />
      <h3 style={{ color: company.color }}>
        {company.name}
      </h3>
      <p className="text-gray-600">{company.description}</p>
      <Link href={company.link}>Learn more →</Link>
    </div>
  )
}
```

---

## 📋 Implementation Checklist

### Phase 1: API Development
- [ ] Create `/api/cms/pages` endpoint
- [ ] Create `/api/cms/pages/about` endpoint
- [ ] Implement GET endpoint
- [ ] Implement PUT endpoint (admin)
- [ ] Add database table `pages` with about schema

### Phase 2: Data Migration
- [ ] Export current page content
- [ ] Create database records
- [ ] Validate data integrity
- [ ] Create admin form for editing

### Phase 3: Frontend Update
- [ ] Update about/page.js to use API
- [ ] Add loading state
- [ ] Add error handling
- [ ] Update TypeScript types
- [ ] Test all sections

### Phase 4: Testing
- [ ] Test data loading
- [ ] Test responsive design
- [ ] Test link functionality
- [ ] Test image loading
- [ ] Test admin updates

---

## 🎯 Benefits of Migration

### Current Issues
- ❌ Text changes require code deployment
- ❌ Hard to update company descriptions
- ❌ No audit trail for changes
- ❌ Difficult to A/B test content

### After Migration
- ✅ Update content without code changes
- ✅ Non-developers can manage content
- ✅ Version history & audit logs
- ✅ Easy to test variations
- ✅ Centralized content management

---

## 📊 Database Schema

```sql
CREATE TABLE pages (
  id UUID PRIMARY KEY,
  slug VARCHAR(255) UNIQUE,
  title VARCHAR(255),
  
  -- About page specific
  header_title VARCHAR(255),
  header_subtitle TEXT,
  header_image_url TEXT,
  
  claims_title VARCHAR(255),
  claims_description TEXT,
  claims_cta_text VARCHAR(100),
  claims_cta_link VARCHAR(255),
  
  journey_heading VARCHAR(255),
  journey_paragraphs JSONB,  -- Array of strings
  
  vision_heading VARCHAR(255),
  vision_content TEXT,
  mission_heading VARCHAR(255),
  mission_content TEXT,
  
  group_heading VARCHAR(255),
  group_description TEXT,
  companies JSONB,  -- Array of company objects
  
  cta_heading VARCHAR(255),
  cta_description TEXT,
  cta_text VARCHAR(100),
  cta_link VARCHAR(255),
  
  status VARCHAR(20) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP
);
```

---

## 🔒 Security Notes

- Admin endpoint should require authentication
- Sanitize all text content before storing
- Validate URLs before storing links
- Implement rate limiting on public endpoint
- Cache page data (1-hour TTL)

---

## 📈 Performance

### Current
- Page loads static content immediately
- No additional network requests
- Fast, no delays

### After Migration
- One API call on page load
- ~200ms additional load time
- Can be optimized with:
  - Data caching (localStorage)
  - SSG (Static Site Generation)
  - Incremental Static Regeneration

### Recommendation
Use **Incremental Static Regeneration (ISR)** with Next.js:

```javascript
// Regenerate page every 3600 seconds (1 hour)
export const revalidate = 3600

export default function About() {
  // Component code
}
```

This provides:
- ✅ Static fast loads
- ✅ Automatic updates hourly
- ✅ No runtime API calls

---

## 🎓 Learning from This Migration

### Concepts Covered
1. **Data Extraction**: Identify hardcoded content
2. **Entity Modeling**: Design data structure
3. **API Design**: Create endpoints
4. **Component Refactoring**: Use fetched data
5. **State Management**: Handle loading/errors
6. **Performance**: Optimize with caching/ISR

---

## 📞 Next Steps

1. **Review this audit** with team
2. **Design admin interface** for About page
3. **Create API endpoint** with sample data
4. **Update component** to use API
5. **Test thoroughly** across all sections
6. **Deploy with feature flag**

---

## 📎 Related Documents

- `STATIC_DATA_AUDIT.md` - Overall audit
- `CMS_IMPLEMENTATION_GUIDE.md` - Implementation patterns
- `ARCHITECTURE_REFERENCE.md` - System architecture

---

**Audit Complete**: November 11, 2025  
**Page Data Items**: 9 major items  
**Text Fields**: 17 fields  
**Hardcoded Content**: 100%  
**CMS Complexity**: Low-Medium  
**Migration Time**: 4-6 hours

✅ **Ready for CMS Migration**
