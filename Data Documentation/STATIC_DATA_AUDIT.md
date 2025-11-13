# Static/Hardcoded Data Audit & CMS Structure

**Date**: November 11, 2025  
**Project**: United Holdings Website  
**Objective**: Identify all static/hardcoded data and create API/CMS structure

---

## 📋 Executive Summary

This document audits all hardcoded and static data across the United Holdings project and provides a structured CMS schema for managing this content dynamically through an API.

---

## 🔍 PART 1: STATIC DATA INVENTORY

### 1. **Products Data** (`ProductsData.js`)
**Location**: `components/ProductsData.js`  
**Type**: Central product database  
**Records**: 25+ products  

**Current Structure**:
```javascript
{
  name: string
  tagline: string
  heroImage: string
  overview: string (long text)
  stats: string[]
  benefits: {
    text: string
    icon: ReactComponent
  }[]
  coverage: {
    title: string
    content: string
  }[]
  exclusions: {
    title: string
    content: string
  }[]
  eligibility: string[]
  howToApply: string[]
  paymentMethods: string[]
  faqs: {
    title: string
    content: string
  }[]
  related: {
    name: string
    image: string
    link: string
  }[]
  trust: string
}
```

**Products Identified**:
- Life Assurance
- Home Insurance
- Motor Insurance (Comprehensive, Third Party, Third Party Fire & Theft)
- Legal Insurance
- Micro Loans
- Dignified Family Support Cover
- Personal Accident Insurance
- Political Violence & Terrorism Insurance
- Engineering Policies & Guarantees
- Multimark Policy
- Medical Malpractice Insurance
- Professional Indemnity Insurance
- Fidelity Guarantee Insurance
- Dignified Tribute Cover
- Funeral Assurance (Individual & Group)
- Umlamleli Loan
- Shesha Loans
- Contractor's All Risk
- Business Interruption / Corporate Extensions

---

### 2. **Product Data Fetching** (`*_ProductsData.js`)
**Locations**:
- `components/UGI_ProductsData.js` - United General Insurance
- `components/ULA_ProductsData.js` - United Life Assurance
- `components/UP_ProductData.js` - United Pay

**Type**: API Integration functions  
**Current Approach**: Fetches from external API and transforms

**Transformation Structure**:
```javascript
const transformedData = data.data.map(product => {
  const benefits = product.benefits?.map(benefit => ({
    text: benefit,
    icon: iconMap[benefit]
  }))
  const coverage = product.coverage?.map(item => ({...}))
  const exclusions = product.exclusions?.map(item => ({...}))
  const faqs = product.faqs?.map(faq => ({...}))
  const related = product.related?.map(relatedItem => ({...}))
  return { ...product, benefits, coverage, exclusions, faqs, related }
})
```

---

### 3. **Reviews & Testimonials** (`WhyChooseUs.js`)
**Location**: `components/WhyChooseUs.js`  
**Type**: Customer reviews and reasons data  
**Fetch Source**: `/api/home` endpoint

**Expected Structure**:
```javascript
{
  reviews: {
    name: string
    position: string
    company: string
    rating: number (1-5)
    text: string
    image: string
  }[]
  reasons: {
    title: string
    content: string
    icon: string
    gradient: string
    accentColor: string
  }[]
}
```

---

### 4. **Website Hero/Slides** (`Hero.js`)
**Location**: `components/Hero.js`  
**Type**: Homepage hero slides  
**Fetch Source**: API (via `fetchSlidesData`)

**Expected Structure**:
```javascript
{
  slides: {
    id: string
    title: string
    subtitle: string
    backgroundImage: string
    callToAction: string
    ctaLink: string
    department: string
    order: number
  }[]
}
```

---

### 5. **Team Data** (`about/our-team/page.js`)
**Location**: `app/about/our-team/page.js`  
**Type**: Leadership team information  
**Fetch Source**: External API

**Expected Structure**:
```javascript
{
  team: {
    id: string
    name: string
    position: string
    department: string
    bio: string
    image: string
    email: string
    phone: string
    sequence: number
  }[]
}
```

---

### 6. **Configuration Data**

#### 6.1 Company Colors & Names
**Location**: `app/products/[slug]/page.js`

```javascript
const COMPANY_COLORS = {
  'ugi': '#FF6B35',
  'ula': '#004E89',
  'up': '#7209B7'
}

const COMPANY_NAMES = {
  'ugi': 'United General Insurance',
  'ula': 'United Life Assurance',
  'up': 'United Pay'
}
```

#### 6.2 Department Colors
**Locations**: `Header.js`, `Hero.js`

```javascript
const DEPARTMENT_COLORS = {
  'sales': '#FF6B35',
  'support': '#004E89',
  'operations': '#7209B7',
  'finance': '#F77F00'
}
```

#### 6.3 Storage Keys
**Location**: `EmailGateClean.jsx`

```javascript
const STORAGE_KEYS = {
  AUTH: 'uh_beta_auth_v1',
  ONBOARDING: 'uh_onboarding_completed_v1',
  SESSION: 'uh_session'
}
```

---

### 7. **Branches Data** (`BranchMap.js`)
**Location**: `components/BranchMap.js`  
**Type**: Physical branch locations  
**Fetch Source**: External API

**Expected Structure**:
```javascript
{
  branches: {
    id: string
    name: string
    city: string
    address: string
    phone: string
    email: string
    coordinates: {
      lat: number
      lng: number
    }
    hours: {
      monday: string
      tuesday: string
      // ... etc
    }
    manager: string
    services: string[]
  }[]
}
```

---

### 8. **Email Configurations**
**Locations**: `Agent.js`, `CallBackForm.js`

```javascript
const emailMap = {
  'general': 'info@united.co.sz',
  'sales': 'sales@united.co.sz',
  'support': 'support@united.co.sz',
  'claims': 'claims@united.co.sz'
}
```

---

### 9. **Form Field Mappings** (`RenderForm.js`)
**Location**: `components/RenderForm.js`  
**Type**: Dynamic form configuration  

**Current Logic**:
```javascript
const getProductCategory = () => {
  if (productName.includes('funeral')) return 'life'
  if (productName.includes('motor')) return 'motor'
  if (productName.includes('home')) return 'home'
  if (productName.includes('legal')) return 'legal'
  if (productName.includes('personal accident')) return 'personal-accident'
  // ... etc
}
```

**Form Fields by Category**:
- Life products: name, email, phone, amount, beneficiary, dob
- Motor: vehicle details, driver info, coverage type
- Home: property details, coverage amount
- Loans: employment details, income, repayment period

---

## 📐 PART 2: CMS API DATA STRUCTURES

### Core Entities

#### 1. **Product Entity**
```typescript
interface CMSProduct {
  id: string                        // UUID
  slug: string                      // URL-friendly name
  name: string
  tagline: string
  company: 'ugi' | 'ula' | 'up'   // Company code
  category: string                  // life, motor, home, loans, etc.
  
  // Content
  heroImage: string                 // URL or asset ID
  overview: string                  // Long-form description
  
  // Metadata
  stats: string[]                   // Key statistics
  trust: string                     // Trust statement
  
  // Details (arrays)
  benefits: {
    id: string
    text: string
    iconKey: string                 // Reference to icon set
    order: number
  }[]
  
  coverage: {
    id: string
    title: string
    content: string
    order: number
  }[]
  
  exclusions: {
    id: string
    title: string
    content: string
    order: number
  }[]
  
  eligibility: {
    id: string
    requirement: string
    order: number
  }[]
  
  howToApply: {
    id: string
    step: string
    description?: string
    order: number
  }[]
  
  paymentMethods: string[]          // ['debit_order', 'bank_transfer', 'mobile_money']
  
  faqs: {
    id: string
    question: string
    answer: string
    order: number
  }[]
  
  related: {
    id: string
    productId: string               // Reference to another product
    displayName?: string
    order: number
  }[]
  
  // Metadata
  createdAt: ISO8601 string
  updatedAt: ISO8601 string
  publishedAt?: ISO8601 string
  status: 'draft' | 'published' | 'archived'
  seoTitle?: string
  seoDescription?: string
}
```

---

#### 2. **Company Entity**
```typescript
interface CMSCompany {
  id: string
  code: 'ugi' | 'ula' | 'up'       // Unique identifier
  name: string                      // Full name
  description: string
  brandColor: string                // Hex color
  primaryColor: string
  accentColor: string
  logo: string                      // Asset ID/URL
  website: string
  email: string
  phone: string
  address: string
  
  // Relations
  products: string[]                // Product IDs
  
  createdAt: ISO8601 string
  updatedAt: ISO8601 string
}
```

---

#### 3. **Review Entity**
```typescript
interface CMSReview {
  id: string
  authorName: string
  authorPosition: string            // e.g., "Sales Manager"
  authorCompany: string             // Customer company
  rating: number                    // 1-5 stars
  title?: string                    // Review headline
  text: string                      // Review content
  authorImage: string               // Asset ID/URL
  
  featured: boolean                 // Show in carousel
  order: number
  
  createdAt: ISO8601 string
  publishedAt: ISO8601 string
  status: 'pending' | 'approved' | 'rejected'
}
```

---

#### 4. **Reason Entity**
```typescript
interface CMSReason {
  id: string
  title: string
  content: string
  description?: string
  iconKey: string                   // Reference to icon library
  gradient: string                  // CSS gradient class or value
  accentColor: string              // Accent color hex
  order: number
  
  category?: string                 // Group multiple reasons
  
  createdAt: ISO8601 string
  updatedAt: ISO8601 string
  publishedAt: ISO8601 string
}
```

---

#### 5. **Hero Slide Entity**
```typescript
interface CMSHeroSlide {
  id: string
  title: string
  subtitle?: string
  description?: string
  backgroundImage: string           // Asset ID/URL
  callToActionText?: string
  callToActionLink?: string
  department?: string               // Associated department
  
  order: number
  duration?: number                 // Display duration in ms
  
  createdAt: ISO8601 string
  updatedAt: ISO8601 string
  publishedAt: ISO8601 string
  status: 'draft' | 'published'
}
```

---

#### 6. **Team Member Entity**
```typescript
interface CMSTeamMember {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  position: string                  // Job title
  department: string                // Department/division
  bio: string
  profileImage: string              // Asset ID/URL
  
  reportingTo?: string              // Manager ID reference
  sequence: number                  // Display order
  
  socialLinks?: {
    linkedin?: string
    twitter?: string
  }
  
  createdAt: ISO8601 string
  updatedAt: ISO8601 string
  publishedAt: ISO8601 string
  status: 'active' | 'inactive'
}
```

---

#### 7. **Branch Entity**
```typescript
interface CMSBranch {
  id: string
  code: string                      // Branch code
  name: string
  city: string
  address: string
  phone: string
  email: string
  
  // Location
  coordinates: {
    latitude: number
    longitude: number
  }
  
  // Operating hours
  hours: {
    monday: { open: string, close: string }
    tuesday: { open: string, close: string }
    wednesday: { open: string, close: string }
    thursday: { open: string, close: string }
    friday: { open: string, close: string }
    saturday: { open: string, close: string }
    sunday: { open: string, close: string }
  }
  
  manager?: string                  // Team member ID
  staff: string[]                   // Team member IDs
  services: string[]                // Services available
  
  createdAt: ISO8601 string
  updatedAt: ISO8601 string
  status: 'active' | 'inactive'
}
```

---

#### 8. **Configuration Entity**
```typescript
interface CMSConfiguration {
  id: string
  key: string                       // config_key
  category: string                  // 'colors', 'email', 'system', etc.
  type: 'string' | 'number' | 'boolean' | 'json'
  value: string | number | boolean | object
  description?: string
  editable: boolean
  
  updatedAt: ISO8601 string
  updatedBy: string                 // User ID
}

// Examples:
// { key: 'company_colors.ugi', value: '#FF6B35' }
// { key: 'email_sales', value: 'sales@united.co.sz' }
// { key: 'storage_key_auth', value: 'uh_beta_auth_v1' }
```

---

#### 9. **Form Configuration Entity**
```typescript
interface CMSFormConfig {
  id: string
  name: string                      // e.g., "Life Insurance Quote"
  slug: string
  productId?: string                // Related product
  category: string                  // 'life', 'motor', 'home', 'loans'
  
  fields: {
    id: string
    name: string                    // Form field name
    label: string
    type: 'text' | 'email' | 'tel' | 'number' | 'select' | 'date' | 'textarea'
    required: boolean
    placeholder?: string
    validation?: string             // Regex pattern
    options?: { label: string, value: string }[]
    order: number
  }[]
  
  submissionEmail: string           // Where to send submissions
  successMessage: string
  
  createdAt: ISO8601 string
  updatedAt: ISO8601 string
  publishedAt: ISO8601 string
}
```

---

## 🏗️ PART 3: API ENDPOINTS STRUCTURE

### Base URL: `/api/cms`

#### Products
```
GET    /cms/products                    // List all products
GET    /cms/products/{id}               // Get single product
GET    /cms/products?slug={slug}        // Get by slug
GET    /cms/products?company={code}     // Filter by company
GET    /cms/products?category={cat}     // Filter by category
POST   /cms/products                    // Create (admin)
PUT    /cms/products/{id}               // Update (admin)
DELETE /cms/products/{id}               // Delete (admin)
```

#### Companies
```
GET    /cms/companies                   // List all
GET    /cms/companies/{id}              // Get single
GET    /cms/companies?code={code}       // Get by code
POST   /cms/companies                   // Create (admin)
PUT    /cms/companies/{id}              // Update (admin)
```

#### Reviews
```
GET    /cms/reviews                     // List all
GET    /cms/reviews?featured=true       // Featured only
GET    /cms/reviews?status=approved     // Approved only
POST   /cms/reviews                     // Create
PUT    /cms/reviews/{id}                // Update (admin)
DELETE /cms/reviews/{id}                // Delete (admin)
```

#### Team
```
GET    /cms/team                        // List all
GET    /cms/team/{id}                   // Get single
GET    /cms/team?department={dept}      // Filter by department
GET    /cms/team?status=active          // Active members only
POST   /cms/team                        // Create (admin)
PUT    /cms/team/{id}                   // Update (admin)
```

#### Branches
```
GET    /cms/branches                    // List all
GET    /cms/branches/{id}               // Get single
GET    /cms/branches?city={city}        // Filter by city
GET    /cms/branches/{id}/hours         // Get branch hours
POST   /cms/branches                    // Create (admin)
PUT    /cms/branches/{id}               // Update (admin)
```

#### Hero Slides
```
GET    /cms/slides                      // List all
GET    /cms/slides?published=true       // Published only
POST   /cms/slides                      // Create (admin)
PUT    /cms/slides/{id}                 // Update (admin)
DELETE /cms/slides/{id}                 // Delete (admin)
```

#### Reasons
```
GET    /cms/reasons                     // List all
GET    /cms/reasons?category={cat}      // Filter by category
POST   /cms/reasons                     // Create (admin)
PUT    /cms/reasons/{id}                // Update (admin)
```

#### Configuration
```
GET    /cms/config/{key}                // Get single config
GET    /cms/config?category={cat}       // Get by category
PUT    /cms/config/{key}                // Update (admin)
```

#### Forms
```
GET    /cms/forms                       // List all
GET    /cms/forms/{slug}                // Get by slug
GET    /cms/forms?category={cat}        // Filter by category
POST   /cms/forms                       // Create (admin)
PUT    /cms/forms/{id}                  // Update (admin)
```

#### Health Check
```
GET    /cms/health                      // Check API status
```

---

## 📋 PART 4: MIGRATION PATH

### Phase 1: Assessment (Current)
- ✅ Identify all hardcoded data
- ✅ Document current structure
- ✅ Design CMS schema

### Phase 2: API Development
- [ ] Build API endpoints
- [ ] Implement database schema
- [ ] Create admin CMS interface
- [ ] Add authentication/authorization

### Phase 3: Data Migration
- [ ] Export existing data to CMS
- [ ] Create migration scripts
- [ ] Validate data integrity
- [ ] Set up caching strategy

### Phase 4: Frontend Integration
- [ ] Update components to use API
- [ ] Implement error handling
- [ ] Add loading states
- [ ] Update SEO handling

### Phase 5: Validation & Deployment
- [ ] Test all data flows
- [ ] Performance testing
- [ ] Backup & recovery planning
- [ ] Gradual rollout

---

## 📝 PART 5: IMPLEMENTATION CHECKLIST

### API Development
- [ ] Database schema creation
- [ ] RESTful endpoint implementation
- [ ] Query optimization
- [ ] Caching layer (Redis)
- [ ] Rate limiting
- [ ] Error handling & logging

### Admin Interface
- [ ] Product CRUD
- [ ] Company management
- [ ] Review moderation
- [ ] Team management
- [ ] Branch management
- [ ] Configuration editor
- [ ] Form builder

### Frontend Updates
- [ ] Replace ProductsData.js imports
- [ ] Update WhyChooseUs.js API calls
- [ ] Update Hero.js data fetching
- [ ] Update TeamMember page
- [ ] Update BranchMap.js
- [ ] Remove hardcoded configurations
- [ ] Add loading/error states

### Quality Assurance
- [ ] Unit tests for API integration
- [ ] E2E tests for critical flows
- [ ] Performance benchmarks
- [ ] Security audit
- [ ] Data validation tests

---

## 🔐 Security Considerations

1. **Authentication**: JWT tokens for admin access
2. **Authorization**: Role-based access control
3. **Data Validation**: Input sanitization on both client & server
4. **Rate Limiting**: Prevent abuse
5. **CORS**: Configure properly
6. **API Keys**: For external integrations
7. **Encryption**: For sensitive data
8. **Audit Logging**: Track all changes

---

## 📊 Database Schema Example (PostgreSQL)

```sql
-- Companies
CREATE TABLE companies (
  id UUID PRIMARY KEY,
  code VARCHAR(10) UNIQUE,
  name VARCHAR(255),
  description TEXT,
  brand_color VARCHAR(7),
  logo_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY,
  slug VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  tagline VARCHAR(500),
  company_id UUID REFERENCES companies(id),
  category VARCHAR(50),
  hero_image_url TEXT,
  overview TEXT,
  trust_statement TEXT,
  status VARCHAR(20) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP
);

-- Product Benefits
CREATE TABLE product_benefits (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  text VARCHAR(255),
  icon_key VARCHAR(50),
  "order" INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Product Coverage
CREATE TABLE product_coverage (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  title VARCHAR(255),
  content TEXT,
  "order" INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ... (Similar tables for exclusions, faqs, eligibility, etc.)

-- Reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY,
  author_name VARCHAR(255),
  author_position VARCHAR(255),
  author_company VARCHAR(255),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  text TEXT,
  author_image_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP
);

-- Team Members
CREATE TABLE team_members (
  id UUID PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  position VARCHAR(255),
  department VARCHAR(100),
  bio TEXT,
  profile_image_url TEXT,
  status VARCHAR(20) DEFAULT 'active',
  "sequence" INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Branches
CREATE TABLE branches (
  id UUID PRIMARY KEY,
  code VARCHAR(20) UNIQUE,
  name VARCHAR(255),
  city VARCHAR(100),
  address TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  manager_id UUID REFERENCES team_members(id),
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Configuration
CREATE TABLE configurations (
  id UUID PRIMARY KEY,
  key VARCHAR(255) UNIQUE,
  category VARCHAR(50),
  type VARCHAR(20),
  value TEXT,
  description TEXT,
  editable BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID
);
```

---

## 🎯 Next Steps

1. **Review this audit** with development team
2. **Prioritize endpoints** based on impact
3. **Create API specification** (OpenAPI/Swagger)
4. **Begin Phase 2 development**
5. **Plan data migration strategy**

---

**Document Version**: 1.0  
**Last Updated**: November 11, 2025  
**Status**: Ready for Review
