# Company Product Pages - Audit & Analysis

**Files Analyzed**:
- `app/united-life-assurance/page.js` (ULA)
- `app/united-general-insurance/page.js` (UGI)
- `app/united-pay/page.js` (UP)

**Total Lines**: 550+ lines (combined)  
**Status**: 100% Hardcoded  
**Complexity**: High (Similar structure, company-specific variations)  
**Effort**: 6-7 hours total (2-2.5 hours per page)

---

## 📊 Executive Summary

These three pages follow an identical architectural pattern but with company-specific branding, text, and metadata. Each page:
- Fetches products from an API (dynamic ✓)
- Has company-specific colors, names, text (hardcoded ❌)
- Implements product search/filtering (dynamic logic)
- Shows product cards with benefits and stats (template-driven)
- Includes CTA sections with company-specific messaging (hardcoded ❌)

**Total Hardcoded Items**: 75+
- Company Branding: 15 items (colors, names, text)
- Page Text/Messaging: 30 items (headings, descriptions, CTAs)
- UI/Analytics: 20 items (tracking, copy)
- Metadata: 10 items (page titles, descriptions)

---

## 🔍 Detailed Analysis by Component

### COMPONENT 1: United Life Assurance (ULA)

**File**: `app/united-life-assurance/page.js`  
**Lines**: 560+  
**Status**: Mixed (API for products + hardcoded company data)

#### Hardcoded Items Inventory

| Item | Type | Location | Count | Value(s) |
|------|------|----------|-------|----------|
| Brand Color | Constant | Line 21-26 | 1 | #3d834d (Green) |
| Department Colors Map | Object | Line 21-26 | 3 | 3 company colors |
| Category Icons | Object | Line 29-35 | 5 | PiUser, PiUsers, etc |
| Category Colors | Object | Line 37-42 | 5 | Tailwind classes |
| Main Heading | JSX | Line 270-272 | 1 | "United Life Assurance" |
| Sub Heading | JSX | Line 273-275 | 1 | "Comprehensive life assurance..." |
| View Products CTA | JSX | Line 280-283 | 1 | "View Products" |
| Search Label | JSX | Line 296 | 1 | "Get Protected Today!" |
| Placeholder Text | JSX | Line 308 | 1 | "Search life assurance products..." |
| Button Text | JSX | Line 326 | 1 | "Get Covered Today" |
| Button Link Text | JSX | Line 333 | 1 | "Find a Branch" |
| CTA Heading | JSX | Line 320 | 1 | "Ready to Secure Your Family's Future?" |
| CTA Description | JSX | Line 323 | 1 | "Join thousands of satisfied families..." |
| No Products Message | JSX | Line 318-319 | 1 | "No products found" |
| Brand Color (Hover) | Inline | Lines 287, 312, 331 | 3 | #3d834d references |
| Analytics Events | Function | Lines 281, 327 | 3 | trackEvent calls with company-specific data |
| Hero Background | Inline CSS | Line 252 | 1 | "/Life.jpg" |
| Header Color Bar | Inline | Line 247 | 1 | #2f6b3d |

**Total ULA Hardcoded Items**: 25

#### Key Observations

1. **Brand Color**: #3d834d (Green) appears 8+ times across component
2. **Button Colors**: All buttons use #3d834d with hover state #2f6b3d
3. **Tracking**: Event names include 'ula_' prefix (ula_product_cta_clicked, ula_banner_cta_clicked, ula_request_callback_clicked)
4. **Icons & Colors**: Category icons and colors hardcoded in objects (5 product categories)
5. **Text**: All company-specific messaging hardcoded in JSX

---

### COMPONENT 2: United General Insurance (UGI)

**File**: `app/united-general-insurance/page.js`  
**Lines**: 560+  
**Status**: Mixed (API for products + hardcoded company data)

#### Hardcoded Items Inventory

| Item | Type | Location | Count | Value(s) |
|------|------|----------|-------|----------|
| Brand Color | Constant | Line 21-26 | 1 | #286278 (Blue) |
| Department Colors Map | Object | Line 21-26 | 3 | 3 company colors |
| Category Icons | Object | Line 29-44 | 12 | Legal, Motor, Personal, Home, etc |
| Category Colors | Object | Line 46-58 | 12 | Tailwind classes |
| Main Heading | JSX | Line 320 | 1 | "United General Insurance" |
| Sub Heading | JSX | Line 323 | 1 | "Comprehensive short-term insurance..." |
| View Products CTA | JSX | Line 329 | 1 | "View Products" |
| Search Label | JSX | Line 346 | 1 | "What do you want to cover?" |
| Placeholder Text | JSX | Line 360 | 1 | "Search insurance products..." |
| Filter Dropdown | JSX | Line 364 | 1 | "All Products" option |
| Button Text | JSX | Line 390 | 1 | "Get Free Quote" |
| Button Link Text | JSX | Line 397 | 1 | "Find a Branch" |
| CTA Heading | JSX | Line 383 | 1 | "Ready to Get Protected?" |
| CTA Description | JSX | Line 386 | 1 | "Join thousands of satisfied customers..." |
| No Products Message | JSX | Line 377-378 | 1 | "No products found" |
| Brand Color (Hover) | Inline | Lines 320, 360, 390 | 3 | #286278 references |
| Brand Color Secondary | Inline | Line 316 | 1 | #204f61 |
| Analytics Events | Function | Lines 330, 391 | 3 | trackEvent calls with 'ugi_' prefix |
| Hero Background | Inline CSS | Line 299 | 1 | "/car.jpg" |
| Header Color Bar | Inline | Line 295 | 1 | #204f61 |

**Total UGI Hardcoded Items**: 28

#### Key Observations

1. **Brand Color**: #286278 (Blue) appears 12+ times
2. **Secondary Color**: #204f61 (Darker blue) for accents
3. **Categories**: 12 product categories with hardcoded icons (more than ULA)
4. **Search Interface**: Includes both search AND category filter dropdown
5. **Tracking**: 'ugi_' prefixed events throughout

---

### COMPONENT 3: United Pay (UP)

**File**: `app/united-pay/page.js`  
**Lines**: 480+  
**Status**: Mixed (API for products + hardcoded company data)

#### Hardcoded Items Inventory

| Item | Type | Location | Count | Value(s) |
|------|------|----------|-------|----------|
| Brand Color | Constant | Line 21-26 | 1 | #f79620 (Orange) |
| Department Colors Map | Object | Line 21-26 | 3 | 3 company colors |
| Category Icons | Object | Line 29-32 | 2 | PiMoney, PiUser |
| Category Colors | Object | Line 34-37 | 2 | Tailwind classes |
| Main Heading | JSX | Line 202 | 1 | "United Pay" |
| Sub Heading | JSX | Line 205 | 1 | "Flexible financial solutions..." |
| Apply Now CTA | JSX | Line 211-215 | 1 | "Apply Now" button |
| Search Label | JSX | Line 226 | 1 | "What financial needs do you have?" |
| Placeholder Text | JSX | Line 237 | 1 | "Search loan products..." |
| Button Text | JSX | Line 256 | 1 | "Apply Now" |
| Button Link Text | JSX | Line 263 | 1 | "Find a Branch" |
| CTA Heading | JSX | Line 250 | 1 | "Ready to Access Funds?" |
| CTA Description | JSX | Line 253 | 1 | "Join thousands of employed individuals..." |
| No Products Message | JSX | Line 247 | 1 | "No loan products found" |
| External Link | JSX | Line 176 | 1 | "https://uploans.united.co.sz/" |
| Brand Color (Hover) | Inline | Lines 202, 237 | 2 | #f79620 references |
| Brand Color Secondary | Inline | Lines 177, 190 | 2 | #e0861c (hover state) |
| Analytics Events | Function | Lines 212, 257 | 3 | trackEvent calls with 'up_' prefix |
| Hero Background | Inline CSS | Line 189 | 1 | "/loan.jpg" |
| Header Color Bar | Inline | Line 186 | 1 | #e0861c |
| Button Hover Color | JSX | Line 177 | 1 | "hover:bg-[#2f6b3d]" (incorrect!) |

**Total UP Hardcoded Items**: 26

#### Key Observations

1. **Brand Color**: #f79620 (Orange) - **WCAG Accessibility Issue** (contrast fails on white)
2. **Secondary Color**: #e0861c (Darker orange) for hover/accents
3. **Button Bug**: Line 177 has incorrect hover color (#2f6b3d = ULA green instead of UP orange)
4. **External Link**: Unique external URL to loan platform
5. **Categories**: Only 2 product categories (simplest of the three)

---

## 🗄️ Database Schema Design

All three pages can share a unified schema with company variations. This design supports:
- Multiple companies with unique branding
- Product categories per company (different for ULA, UGI, UP)
- Category icons and colors
- Dynamic product pages
- CMS-driven management

### Database Tables

#### 1. cms_company_pages

```sql
CREATE TABLE cms_company_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_code VARCHAR(10) NOT NULL UNIQUE,
  company_name VARCHAR(255) NOT NULL,
  page_title VARCHAR(255) NOT NULL,
  page_description TEXT,
  
  -- Branding
  brand_color_primary VARCHAR(7) NOT NULL,      -- #286278, #3d834d, #f79620
  brand_color_secondary VARCHAR(7),              -- Hover/accent color
  brand_color_header_bar VARCHAR(7),             -- Top bar color
  
  -- Hero Section
  hero_heading VARCHAR(255) NOT NULL,
  hero_subheading TEXT NOT NULL,
  hero_background_image VARCHAR(255),            -- /Life.jpg, /car.jpg, /loan.jpg
  hero_cta_text VARCHAR(100),                    -- "View Products", "Apply Now"
  hero_cta_action VARCHAR(50),                   -- "scroll", "external-link"
  hero_cta_url VARCHAR(255),                     -- External link if needed
  
  -- Search Section
  search_section_label VARCHAR(255),             -- "Get Protected Today!", etc
  search_placeholder VARCHAR(255),               -- Search input placeholder
  has_category_filter BOOLEAN DEFAULT true,      -- ULA: false, UGI: true, UP: false
  
  -- CTA Section
  cta_heading VARCHAR(255),
  cta_description TEXT,
  cta_primary_text VARCHAR(100),                 -- "Get Covered Today", etc
  cta_secondary_text VARCHAR(100),               -- "Find a Branch"
  cta_primary_action VARCHAR(50),                -- "scroll", "apply"
  cta_secondary_action VARCHAR(50),              -- "navigate"
  cta_secondary_url VARCHAR(255),                -- "/contact" or external
  
  -- Product-Specific Text
  no_products_message VARCHAR(255),
  no_products_description TEXT,
  results_count_text VARCHAR(255),               -- "Showing X of Y products"
  
  -- Analytics
  tracking_prefix VARCHAR(10),                   -- "ula_", "ugi_", "up_"
  
  -- Meta
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(255),
  updated_by VARCHAR(255)
);
```

#### 2. cms_product_categories (Per Company)

```sql
CREATE TABLE cms_product_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_code VARCHAR(10) NOT NULL REFERENCES cms_company_pages(company_code),
  category_name VARCHAR(255) NOT NULL,
  category_icon VARCHAR(50) NOT NULL,            -- "PiUser", "PiCar", etc
  category_color_class VARCHAR(50) NOT NULL,     -- "bg-blue-100 text-[#9b1c20]"
  display_order INT DEFAULT 0,
  
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(company_code, category_name)
);
```

#### 3. cms_product_icons

```sql
CREATE TABLE cms_product_icons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon_key VARCHAR(100) NOT NULL UNIQUE,        -- "PiUser", "PiCar", "PiHouse"
  icon_library VARCHAR(50) DEFAULT 'react-icons/pi',
  description VARCHAR(255),
  
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📝 Data Inventory - All Three Companies

### Company Branding Data

```sql
-- cms_company_pages seed data
INSERT INTO cms_company_pages (
  company_code, company_name, page_title, brand_color_primary, 
  brand_color_secondary, brand_color_header_bar,
  hero_heading, hero_subheading, hero_background_image,
  search_section_label, search_placeholder, has_category_filter,
  cta_heading, cta_description,
  cta_primary_text, cta_secondary_text,
  no_products_message, tracking_prefix
) VALUES
-- United Life Assurance (ULA)
(
  'ULA', 'United Life Assurance', 'Life Insurance & Funeral Cover',
  '#3d834d', '#2f6b3d', '#2f6b3d',
  'United Life Assurance',
  'Comprehensive life assurance and funeral cover for families and businesses across Eswatini',
  '/Life.jpg',
  'Get Protected Today!',
  'Search life assurance products...',
  false,
  'Ready to Secure Your Family''s Future?',
  'Join thousands of satisfied families who trust United Life Assurance for their protection needs.',
  'Get Covered Today',
  'Find a Branch',
  'No products found',
  'ula_'
),
-- United General Insurance (UGI)
(
  'UGI', 'United General Insurance', 'Short-Term Insurance Solutions',
  '#286278', '#24576b', '#204f61',
  'United General Insurance',
  'Comprehensive short-term insurance solutions for individuals and businesses across Eswatini',
  '/car.jpg',
  'What do you want to cover?',
  'Search insurance products...',
  true,
  'Ready to Get Protected?',
  'Join thousands of satisfied customers who trust United General Insurance for their protection needs.',
  'Get Free Quote',
  'Find a Branch',
  'No products found',
  'ugi_'
),
-- United Pay (UP)
(
  'UP', 'United Pay', 'Flexible Financial Solutions',
  '#f79620', '#e0861c', '#e0861c',
  'United Pay',
  'Flexible financial solutions and micro loans for employed individuals across Eswatini',
  '/loan.jpg',
  'What financial needs do you have?',
  'Search loan products...',
  false,
  'Ready to Access Funds?',
  'Join thousands of employed individuals who trust United Pay for their financial needs.',
  'Apply Now',
  'Find a Branch',
  'No loan products found',
  'up_'
);
```

### Product Categories Data

```sql
-- cms_product_categories seed data for ULA (5 categories)
INSERT INTO cms_product_categories VALUES
('ula-1', 'ULA', 'Sinawe Funeral Plan', 'PiUsersThree', 'bg-blue-100 text-[#9b1c20]', 0),
('ula-2', 'ULA', 'Individual Funeral Plan', 'PiUser', 'bg-green-100 text-green-600', 1),
('ula-3', 'ULA', 'Tinkhundla Funeral Cover', 'PiMapPin', 'bg-purple-100 text-[#9b1c20]', 2),
('ula-4', 'ULA', 'Group Life', 'PiUsers', 'bg-orange-100 text-orange-600', 3),
('ula-5', 'ULA', 'Credit Life', 'PiBank', 'bg-teal-100 text-teal-600', 4);

-- cms_product_categories seed data for UGI (12 categories)
INSERT INTO cms_product_categories VALUES
('ugi-1', 'UGI', 'Legal Insurance', 'PiGavel', 'bg-blue-100 text-[#9b1c20]', 0),
('ugi-2', 'UGI', 'Motor Insurance', 'PiCar', 'bg-green-100 text-green-600', 1),
('ugi-3', 'UGI', 'Personal Accident Insurance', 'PiFirstAidKit', 'bg-red-100 text-red-600', 2),
('ugi-4', 'UGI', 'Home Contents Insurance', 'PiHouse', 'bg-purple-100 text-[#9b1c20]', 3),
('ugi-5', 'UGI', 'Home Insurance', 'PiCheckCircle', 'bg-orange-100 text-orange-600', 4),
('ugi-6', 'UGI', 'Multimark Policy', 'PiBuildings', 'bg-indigo-100 text-indigo-600', 5),
('ugi-7', 'UGI', 'Medical Malpractice', 'PiStethoscope', 'bg-pink-100 text-pink-600', 6),
('ugi-8', 'UGI', 'Professional Indemnity', 'PiBriefcase', 'bg-teal-100 text-teal-600', 7),
('ugi-9', 'UGI', 'Bonds and Guarantees', 'PiHandshake', 'bg-amber-100 text-amber-600', 8),
('ugi-10', 'UGI', 'Engineering Policies', 'PiGear', 'bg-cyan-100 text-cyan-600', 9),
('ugi-11', 'UGI', 'Fidelity Guarantee', 'PiLock', 'bg-lime-100 text-lime-600', 10),
('ugi-12', 'UGI', 'Political Violence and Terrorism', 'PiShieldWarning', 'bg-rose-100 text-rose-600', 11);

-- cms_product_categories seed data for UP (2 categories)
INSERT INTO cms_product_categories VALUES
('up-1', 'UP', 'Micro Loan', 'PiMoney', 'bg-orange-100 text-orange-600', 0),
('up-2', 'UP', 'Umlamleli Loan', 'PiUser', 'bg-amber-100 text-amber-600', 1);
```

---

## 🔄 Before/After Code Examples

### BEFORE: Hardcoded (Current State)

```typescript
// app/united-life-assurance/page.js (ULA)
const DEPARTMENT_COLORS = {
  'Life Assurance': '#3d834d',
  'General Insurance': '#286278',
  'United Pay': '#f79620',
};

export default function UnitedLifeAssurance() {
  return (
    <div className="min-h-screen bg-gray-100 font-outfit">
      <div className='bg-[#2f6b3d] h-2 w-full' />
      <div className='relative bg-[#3d834d] py-16 md:py-24'>
        {/* Hardcoded hero background */}
        <div style={{ backgroundImage: 'url("/Life.jpg")' }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        {/* Hardcoded heading */}
        <h1 className="text-4xl text-[#3d834d]">
          United Life Assurance
        </h1>
        
        {/* Hardcoded subheading */}
        <p className="text-white/90">
          Comprehensive life assurance and funeral cover for families and businesses across Eswatini
        </p>
        
        {/* Hardcoded CTA */}
        <button className="border-2 border-white text-white hover:text-[#3d834d]">
          View Products
        </button>
      </div>
      
      {/* Hardcoded search label */}
      <p className='text-[#3d834d] text-2xl'>Get Protected Today!</p>
      
      {/* Hardcoded button */}
      <button className="bg-[#3d834d] hover:bg-[#2f6b3d]">
        Get Covered Today
      </button>
    </div>
  );
}
```

### AFTER: CMS-Driven (Proposed)

#### Step 1: Create Service Layer

```typescript
// lib/cms-company-pages-api.ts
export async function getCompanyPageData(companyCode: string) {
  const response = await fetch(
    `/api/cms/company-pages/${companyCode}`,
    { cache: 'revalidate', next: { revalidate: 3600 } }
  );
  
  if (!response.ok) throw new Error('Failed to fetch company page data');
  return response.json();
}

export async function getCompanyCategories(companyCode: string) {
  const response = await fetch(
    `/api/cms/company-categories/${companyCode}`,
    { cache: 'revalidate', next: { revalidate: 3600 } }
  );
  
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
}
```

#### Step 2: Create Custom Hook

```typescript
// hooks/useCompanyPageData.ts
import { useState, useEffect } from 'react';
import { getCompanyPageData, getCompanyCategories } from '@/lib/cms-company-pages-api';

interface UseCompanyPageDataReturn {
  pageData: any;
  categories: any[];
  loading: boolean;
  error: string | null;
}

export function useCompanyPageData(companyCode: string): UseCompanyPageDataReturn {
  const [pageData, setPageData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [page, cats] = await Promise.all([
          getCompanyPageData(companyCode),
          getCompanyCategories(companyCode),
        ]);
        
        setPageData(page);
        setCategories(cats);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [companyCode]);

  return { pageData, categories, loading, error };
}
```

#### Step 3: Create Reusable Company Page Component

```typescript
// components/CompanyProductPage.tsx
'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCompanyPageData } from '@/hooks/useCompanyPageData';
import { trackEvent, trackPageDuration } from '@/lib/posthog';

interface CompanyProductPageProps {
  companyCode: string;
  products: any[];
  loading: boolean;
}

export function CompanyProductPage({ 
  companyCode, 
  products, 
  loading: productsLoading 
}: CompanyProductPageProps) {
  const { pageData, categories, loading: pageLoading, error } = useCompanyPageData(companyCode);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const productsSectionRef = useRef(null);

  // Track page duration
  useEffect(() => {
    if (pageData?.tracking_prefix) {
      const stopTracking = trackPageDuration(`${pageData.tracking_prefix}page`);
      return () => stopTracking();
    }
  }, [pageData]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.name === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, products]);

  if (pageLoading || productsLoading) {
    return <div>Loading...</div>; // Render skeleton
  }

  if (error || !pageData) {
    return <div>Error loading page data</div>;
  }

  const scrollToProducts = () => {
    productsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-gray-100 font-outfit">
      {/* Dynamic Header */}
      <div style={{ backgroundColor: pageData.brand_color_secondary }} className='h-2 w-full' />
      <div 
        className='relative py-16 md:py-24 min-h-[500px] flex items-center'
        style={{ backgroundColor: pageData.brand_color_primary }}
      >
        {/* Dynamic Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${pageData.hero_background_image}")` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        {/* Dynamic Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left text-white flex-1">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
                  style={{ color: pageData.brand_color_primary }}>
                {pageData.hero_heading}
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-8 max-w-2xl leading-relaxed">
                {pageData.hero_subheading}
              </p>
              
              {/* Dynamic CTA */}
              <button
                onClick={() => {
                  trackEvent(`${pageData.tracking_prefix}banner_cta_clicked`, {
                    cta_text: pageData.hero_cta_text,
                    location: `${pageData.tracking_prefix}hero_banner`,
                  });
                  scrollToProducts();
                }}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold transition-colors text-lg text-center"
                style={{ 
                  ':hover': { backgroundColor: 'white', color: pageData.brand_color_primary }
                }}
              >
                {pageData.hero_cta_text}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Search Section */}
      <section className="py-8 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <p style={{ color: pageData.brand_color_primary }} className="text-2xl font-semibold mb-4">
            {pageData.search_section_label}
          </p>
          
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 w-full lg:max-w-md">
              <input
                type="text"
                placeholder={pageData.search_placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                style={{ 
                  '--tw-ring-color': pageData.brand_color_primary 
                } as React.CSSProperties}
              />
            </div>
            
            {/* Conditional Category Filter */}
            {pageData.has_category_filter && (
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg"
              >
                <option value="All">All {pageData.company_name} Products</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.category_name}>
                    {cat.category_name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </section>

      {/* Dynamic Products Grid - Renders same for all companies */}
      <section ref={productsSectionRef} className="py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {pageData.no_products_message}
              </h3>
              <p className="text-gray-500">
                {pageData.no_products_description}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  companyCode={companyCode}
                  category={categories.find(c => c.category_name === product.name)}
                  brandColor={pageData.brand_color_primary}
                  trackingPrefix={pageData.tracking_prefix}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Dynamic CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {pageData.cta_heading}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {pageData.cta_description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Primary CTA */}
            <button
              onClick={() => {
                trackEvent(`${pageData.tracking_prefix}cta_clicked`, {
                  button_text: pageData.cta_primary_text,
                  location: `${pageData.tracking_prefix}cta_section`,
                });
                if (pageData.cta_primary_action === 'scroll') {
                  scrollToProducts();
                }
              }}
              className="text-white px-8 py-4 rounded-full font-semibold transition-colors text-lg"
              style={{ backgroundColor: pageData.brand_color_primary }}
            >
              {pageData.cta_primary_text}
            </button>

            {/* Secondary CTA */}
            <Link
              href={pageData.cta_secondary_url || '/contact'}
              className="border-2 px-8 py-4 rounded-full font-semibold transition-colors text-lg"
              style={{ 
                borderColor: pageData.brand_color_primary,
                color: pageData.brand_color_primary
              }}
              onClick={() => trackEvent(`${pageData.tracking_prefix}cta_clicked`, {
                button_text: pageData.cta_secondary_text,
                location: `${pageData.tracking_prefix}cta_section`,
              })}
            >
              {pageData.cta_secondary_text}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
```

#### Step 4: Update Individual Company Pages

```typescript
// app/united-life-assurance/page.js (NEW VERSION)
'use client';
import { CompanyProductPage } from '@/components/CompanyProductPage';
import { fetchUnitedLifeAssuranceData } from '@/components/ULA_ProductsData';
import { useState, useEffect } from 'react';

export default function UnitedLifeAssurance() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchUnitedLifeAssuranceData();
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return <CompanyProductPage companyCode="ULA" products={products} loading={loading} />;
}

// app/united-general-insurance/page.js (NEW VERSION)
'use client';
import { CompanyProductPage } from '@/components/CompanyProductPage';
import { fetchUnitedGeneralInsuranceData } from '@/components/UGI_ProductsData';
import { useState, useEffect } from 'react';

export default function UnitedGeneralInsurance() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchUnitedGeneralInsuranceData();
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return <CompanyProductPage companyCode="UGI" products={products} loading={loading} />;
}

// app/united-pay/page.js (NEW VERSION)
'use client';
import { CompanyProductPage } from '@/components/CompanyProductPage';
import { fetchUnitedPayData } from '@/components/UP_ProductData';
import { useState, useEffect } from 'react';

export default function UnitedPay() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchUnitedPayData();
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return <CompanyProductPage companyCode="UP" products={products} loading={loading} />;
}
```

---

## 🛠️ API Endpoints Required

### 1. GET /api/cms/company-pages/:companyCode

**Purpose**: Fetch complete company page configuration

**Request**:
```http
GET /api/cms/company-pages/ULA
```

**Response**:
```json
{
  "id": "uuid-123",
  "company_code": "ULA",
  "company_name": "United Life Assurance",
  "page_title": "Life Insurance & Funeral Cover",
  "brand_color_primary": "#3d834d",
  "brand_color_secondary": "#2f6b3d",
  "brand_color_header_bar": "#2f6b3d",
  "hero_heading": "United Life Assurance",
  "hero_subheading": "Comprehensive life assurance and funeral cover...",
  "hero_background_image": "/Life.jpg",
  "hero_cta_text": "View Products",
  "search_section_label": "Get Protected Today!",
  "search_placeholder": "Search life assurance products...",
  "has_category_filter": false,
  "cta_heading": "Ready to Secure Your Family's Future?",
  "cta_description": "Join thousands of satisfied families...",
  "cta_primary_text": "Get Covered Today",
  "cta_secondary_text": "Find a Branch",
  "tracking_prefix": "ula_",
  "is_active": true
}
```

### 2. GET /api/cms/company-categories/:companyCode

**Purpose**: Fetch all product categories for a company

**Request**:
```http
GET /api/cms/company-categories/UGI
```

**Response**:
```json
{
  "categories": [
    {
      "id": "uuid-456",
      "company_code": "UGI",
      "category_name": "Legal Insurance",
      "category_icon": "PiGavel",
      "category_color_class": "bg-blue-100 text-[#9b1c20]",
      "display_order": 0
    },
    {
      "id": "uuid-457",
      "company_code": "UGI",
      "category_name": "Motor Insurance",
      "category_icon": "PiCar",
      "category_color_class": "bg-green-100 text-green-600",
      "display_order": 1
    }
    // ... more categories
  ]
}
```

---

## 📊 Comparison Table - Current vs Proposed

| Aspect | Current (Hardcoded) | Proposed (CMS) |
|--------|---------------------|----------------|
| **Lines of Code** | 560+ per page × 3 = 1,680+ | ~400 per page + 1 reusable component |
| **Hardcoded Items** | 75+ | 0 |
| **Color Changes** | Requires code edit + redeploy | CMS update (5 minutes) |
| **Text Changes** | Requires code edit + redeploy | CMS update (5 minutes) |
| **Add New Company** | Duplicate entire page file | Add 1 CMS record |
| **Product Categories** | Hardcoded objects × 3 | 1 shared database table |
| **Icon/Color Mapping** | 3 separate objects | 1 reusable component |
| **Tracking Events** | Hardcoded prefixes | Dynamic from CMS |
| **Update Timeline** | 2-4 hours (code + deploy) | 10 minutes (CMS) |

---

## ⏱️ Implementation Timeline

### Phase 1: Database Setup (1.5 hours)
- [ ] Create 3 database tables (cms_company_pages, cms_product_categories, cms_product_icons)
- [ ] Add constraints and relationships
- [ ] Create indexes on company_code

### Phase 2: API Endpoints (2 hours)
- [ ] Create GET /api/cms/company-pages/:companyCode
- [ ] Create GET /api/cms/company-categories/:companyCode
- [ ] Add caching (revalidate 3600s)
- [ ] Test with Postman

### Phase 3: Frontend Refactoring (2.5 hours)
- [ ] Create service layer (lib/cms-company-pages-api.ts)
- [ ] Create custom hook (hooks/useCompanyPageData.ts)
- [ ] Create reusable component (CompanyProductPage.tsx)
- [ ] Update 3 individual page files
- [ ] Test all pages

### Phase 4: Data Migration & Testing (1 hour)
- [ ] Populate cms_company_pages with existing data
- [ ] Populate cms_product_categories with existing data
- [ ] Verify all 3 pages render correctly
- [ ] End-to-end testing

**Total Effort**: 6-7 hours

---

## ✅ Success Criteria

### Functionality
- [ ] All 3 company pages render correctly
- [ ] Colors match original design
- [ ] All text displays properly
- [ ] Search/filter functionality works
- [ ] Product cards display correctly
- [ ] CTA buttons function properly
- [ ] External links work (UP loan link)
- [ ] Category filter works for UGI only

### Code Quality
- [ ] Reusable component handles all variations
- [ ] No hardcoded colors in components
- [ ] No hardcoded text in components
- [ ] TypeScript types correct
- [ ] Error handling complete
- [ ] Loading states working
- [ ] No console errors/warnings

### Performance
- [ ] API caching enabled
- [ ] Page load time < 2s
- [ ] No unnecessary re-renders
- [ ] Images optimized
- [ ] Responsive on all devices

### Analytics
- [ ] Event tracking works
- [ ] Company-specific prefixes used
- [ ] All CTA clicks tracked
- [ ] Banner clicks tracked

---

## 🔧 Accessibility Considerations

### Critical Issues Found

1. **UP Orange (#f79620)**
   - Current contrast ratio: 3.65:1
   - Required for WCAG AA: 4.5:1
   - **Action**: Use darker shade #d67910 or add background contrast

2. **Text on Background Images**
   - All pages have text over background images with black overlay
   - Overlay opacity: 50% (good)
   - **Status**: ✓ Acceptable

3. **Color Alone Not Conveying Information**
   - Category colors are purely decorative
   - **Status**: ✓ Good (icon + color)

### Recommended Fixes

```typescript
// In cms_company_pages update:
// For UP: Change brand_color_primary to accessible shade
UPDATE cms_company_pages 
SET brand_color_primary = '#d67910'  -- Darker orange
WHERE company_code = 'UP';
```

---

## 📋 Database Seed Script

```sql
-- Complete seed script for all 3 companies
BEGIN TRANSACTION;

-- Insert company pages
INSERT INTO cms_company_pages (
  company_code, company_name, page_title, page_description,
  brand_color_primary, brand_color_secondary, brand_color_header_bar,
  hero_heading, hero_subheading, hero_background_image,
  hero_cta_text, search_section_label, search_placeholder,
  has_category_filter, cta_heading, cta_description,
  cta_primary_text, cta_secondary_text, cta_primary_action,
  cta_secondary_action, cta_secondary_url,
  no_products_message, no_products_description,
  tracking_prefix, is_active
) VALUES
('ULA', 'United Life Assurance', 'Life Insurance & Funeral Cover', 
 'Comprehensive life assurance and funeral cover solutions',
 '#3d834d', '#2f6b3d', '#2f6b3d',
 'United Life Assurance', 'Comprehensive life assurance and funeral cover for families and businesses across Eswatini',
 '/Life.jpg', 'View Products', 'Get Protected Today!', 'Search life assurance products...',
 false, 'Ready to Secure Your Family''s Future?', 'Join thousands of satisfied families who trust United Life Assurance for their protection needs.',
 'Get Covered Today', 'Find a Branch', 'scroll', 'navigate', '/contact',
 'No products found', 'Try adjusting your search or filters',
 'ula_', true),

('UGI', 'United General Insurance', 'Short-Term Insurance Solutions',
 'Comprehensive short-term insurance solutions for protection',
 '#286278', '#24576b', '#204f61',
 'United General Insurance', 'Comprehensive short-term insurance solutions for individuals and businesses across Eswatini',
 '/car.jpg', 'View Products', 'What do you want to cover?', 'Search insurance products...',
 true, 'Ready to Get Protected?', 'Join thousands of satisfied customers who trust United General Insurance for their protection needs.',
 'Get Free Quote', 'Find a Branch', 'scroll', 'navigate', '/contact',
 'No products found', 'Try adjusting your search or filters',
 'ugi_', true),

('UP', 'United Pay', 'Flexible Financial Solutions',
 'Flexible financial solutions and micro loans',
 '#d67910', '#e0861c', '#e0861c',  -- Note: Updated to accessible color
 'United Pay', 'Flexible financial solutions and micro loans for employed individuals across Eswatini',
 '/loan.jpg', 'Apply Now', 'What financial needs do you have?', 'Search loan products...',
 false, 'Ready to Access Funds?', 'Join thousands of employed individuals who trust United Pay for their financial needs.',
 'Apply Now', 'Find a Branch', 'scroll', 'navigate', '/contact',
 'No loan products found', 'Try adjusting your search or filters',
 'up_', true);

-- Insert product categories for ULA
INSERT INTO cms_product_categories (company_code, category_name, category_icon, category_color_class, display_order) VALUES
('ULA', 'Sinawe Funeral Plan', 'PiUsersThree', 'bg-blue-100 text-[#9b1c20]', 0),
('ULA', 'Individual Funeral Plan', 'PiUser', 'bg-green-100 text-green-600', 1),
('ULA', 'Tinkhundla Funeral Cover', 'PiMapPin', 'bg-purple-100 text-[#9b1c20]', 2),
('ULA', 'Group Life', 'PiUsers', 'bg-orange-100 text-orange-600', 3),
('ULA', 'Credit Life', 'PiBank', 'bg-teal-100 text-teal-600', 4);

-- Insert product categories for UGI (12 total)
INSERT INTO cms_product_categories (company_code, category_name, category_icon, category_color_class, display_order) VALUES
('UGI', 'Legal Insurance', 'PiGavel', 'bg-blue-100 text-[#9b1c20]', 0),
('UGI', 'Motor Insurance', 'PiCar', 'bg-green-100 text-green-600', 1),
('UGI', 'Personal Accident Insurance', 'PiFirstAidKit', 'bg-red-100 text-red-600', 2),
('UGI', 'Home Contents Insurance', 'PiHouse', 'bg-purple-100 text-[#9b1c20]', 3),
('UGI', 'Home Insurance', 'PiCheckCircle', 'bg-orange-100 text-orange-600', 4),
('UGI', 'Multimark Policy', 'PiBuildings', 'bg-indigo-100 text-indigo-600', 5),
('UGI', 'Medical Malpractice', 'PiStethoscope', 'bg-pink-100 text-pink-600', 6),
('UGI', 'Professional Indemnity', 'PiBriefcase', 'bg-teal-100 text-teal-600', 7),
('UGI', 'Bonds and Guarantees', 'PiHandshake', 'bg-amber-100 text-amber-600', 8),
('UGI', 'Engineering Policies', 'PiGear', 'bg-cyan-100 text-cyan-600', 9),
('UGI', 'Fidelity Guarantee', 'PiLock', 'bg-lime-100 text-lime-600', 10),
('UGI', 'Political Violence and Terrorism', 'PiShieldWarning', 'bg-rose-100 text-rose-600', 11);

-- Insert product categories for UP (2 total)
INSERT INTO cms_product_categories (company_code, category_name, category_icon, category_color_class, display_order) VALUES
('UP', 'Micro Loan', 'PiMoney', 'bg-orange-100 text-orange-600', 0),
('UP', 'Umlamleli Loan', 'PiUser', 'bg-amber-100 text-amber-600', 1);

COMMIT;
```

---

## 🎯 Key Benefits

### Immediate Benefits
1. **Zero code changes** to deploy new company content
2. **5-minute updates** instead of hours of development
3. **Reusable component** reduces duplication by 1,200+ lines
4. **Single source of truth** for company branding
5. **Accessibility improvements** (fixed UP color issue)

### Long-term Benefits
1. **Scalability**: Add new companies with single CMS entry
2. **Maintainability**: One component handles all variations
3. **Content Control**: Marketing team controls content without dev involvement
4. **Analytics**: Company prefixes managed centrally
5. **A/B Testing**: Easy to test different CTA text/colors

---

## 📝 Questions for Product Team

1. Should category filters be company-specific? (Currently UGI only)
2. Are there plans to add more companies in the future?
3. Should hero background images be configurable per company?
4. Should external links (like UP loan site) be stored in CMS?
5. Should there be a feature flag to gradually roll out to each page?

---

**Document Status**: ✅ Ready for Review  
**Recommended Next Step**: Validate schema design with database architect  
**Expected Implementation Start**: After approval of design

