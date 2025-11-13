# Product Page - Comprehensive CMS Audit

**Components**: `app/products/[slug]/page.js` + `components/RenderForm.js`  
**Status**: Mixed (API-fetched products + Hardcoded company data & form fields)  
**Lines of Code**: 600+ (page) + 350+ (form)  
**Data Sources**: Multiple (Product data + Company colors/names + Form configurations)  
**Last Updated**: November 11, 2025

---

## 📋 Executive Summary

The product page is a complex, dynamic product detail page with multiple components. It currently has a **mixed data approach**:

- ✅ **Products**: Fetched from 3 separate functions (UGI, ULA, UP)
- ❌ **Company Colors**: Hardcoded object mapping (3 colors)
- ❌ **Company Names**: Hardcoded object mapping (3 names)
- ❌ **Company-Specific Text**: Hardcoded switch statement (3 sets of text)
- ❌ **Form Fields**: Hardcoded per product category (7+ categories)
- ❌ **Section Content**: Partially hardcoded (benefits, coverage, eligibility, FAQs)
- ❌ **Disclaimers**: Hardcoded switch statement for 2 versions

**Total Hardcoded Items**: 45+  
**Effort to Migrate**: 6-8 hours  
**Complexity Level**: High (dynamic routing, form generation, company logic)

---

## 📊 Data Inventory & Audit

### 1. **Company Color Mapping** (Lines 22-26)

**Current Implementation**:
```javascript
const COMPANY_COLORS = {
  'UGI': '#286278', // Blue for United General Insurance
  'ULA': '#3d834d', // Green for United Life Assurance
  'UP': '#f79620',  // Orange for United Pay
};
```

**Data Fields**:
| Field | Type | Status | Value |
|-------|------|--------|-------|
| UGI color | String | ❌ Hardcoded | #286278 |
| ULA color | String | ❌ Hardcoded | #3d834d |
| UP color | String | ❌ Hardcoded | #f79620 |

**Usage Locations**:
- Header background (line 133)
- Hero section overlay (line 156)
- Quote form background (line 198)
- Stats badges (line 243)
- Product name text color throughout

**Summary**: 3 company colors hardcoded

---

### 2. **Company Names Mapping** (Lines 28-32)

**Current Implementation**:
```javascript
const COMPANY_NAMES = {
  'UGI': 'United General Insurance',
  'ULA': 'United Life Assurance',
  'UP': 'United Pay'
};
```

**Data Fields**:
| Field | Type | Status | Value |
|-------|------|--------|-------|
| UGI name | String | ❌ Hardcoded | United General Insurance |
| ULA name | String | ❌ Hardcoded | United Life Assurance |
| UP name | String | ❌ Hardcoded | United Pay |

**Usage Locations**:
- Header company badge (line 144)
- All text references to company

**Summary**: 3 company names hardcoded

---

### 3. **Company-Specific Text** (Lines 256-291)

**Current Implementation**:
```javascript
const getCompanySpecificText = () => {
  switch (company) {
    case 'UP':
      return {
        mainHeading: 'Get hassle-free financing for all your needs',
        actionText: 'Apply Now',
        successMessage: 'Application submitted successfully! We\'ll contact you soon.',
        formTitle: 'Please complete the details for your loan application',
        submitButtonText: 'Request Loan Quote'
      };
    case 'ULA':
      return {
        mainHeading: 'Get peace of mind with life assurance protection',
        actionText: 'Get Covered Today',
        successMessage: 'Quote request submitted successfully! We\'ll contact you soon.',
        formTitle: 'Please complete the details for your life assurance quote',
        submitButtonText: 'Request Quote'
      };
    default: // UGI
      return {
        mainHeading: 'Get hassle-free cover for all your insurance needs',
        actionText: 'Sign Me Up Today',
        successMessage: 'Quote request submitted successfully! We\'ll contact you soon.',
        formTitle: 'Please complete the details for your insurance quote',
        submitButtonText: 'Request Quote'
      };
  }
};
```

**Data Fields**:
| Field | Type | Status | Count |
|-------|------|--------|-------|
| Main heading | String | ❌ Hardcoded | 3 (one per company) |
| Action text | String | ❌ Hardcoded | 3 |
| Success message | String | ❌ Hardcoded | 3 |
| Form title | String | ❌ Hardcoded | 3 |
| Submit button text | String | ❌ Hardcoded | 3 |

**Summary**: 15 text strings hardcoded (5 per company)

---

### 4. **Form Field Configurations** (RenderForm.js, Lines 45-200)

**Current Implementation**:
```javascript
const getProductCategory = () => {
  // Determines product type and returns appropriate form fields
  // Cases: life, motor, home, legal, personal-accident, business, loan, general
};

switch (productCategory) {
  case 'life': // 5 fields: DOB, Gender, Coverage, Type, Dependents
  case 'motor': // 6 fields: Type, Make, Model, Year, Reg#, Value
  case 'home': // 6 fields: Address, Status, Type, Value, Coverage, etc.
  case 'legal': // 4 fields: Matter type, Costs, Urgency, Description
  case 'personal-accident': // 4 fields: DOB, Occupation, Coverage, Type
  case 'business': // 7 fields: Name, Reg#, Type, Employees, Revenue, Address
  case 'loan': // 6 fields: Amount, Purpose, Employment, Income, Employer, Dept
  // ... more
}
```

**Data Fields Summary**:
| Category | Form Fields | Hardcoded Fields | Total |
|----------|------------|-----------------|-------|
| Life | 5 | 10 (select options) | 15 |
| Motor | 6 | 5 (select options) | 11 |
| Home | 6 | 6 (select options) | 12 |
| Legal | 4 | 5 (select options) | 9 |
| Personal Accident | 4 | 4 (select options) | 8 |
| Business | 7 | 6 (select options) | 13 |
| Loan | 6 | 7 (select options) | 13 |
| **Total** | **~42** | **~43 select options** | **~85** |

**Example - Life Insurance Form Fields**:
```javascript
<InputField label="Date of Birth" name="dob" type="date" />
<SelectField label="Gender" options={['Male', 'Female']} />
<InputField label="Coverage Amount (SZL)" />
<SelectField label="Coverage Type" options={['Individual', 'Family', 'Group']} />
<InputField label="Number of Dependents" />
```

**Summary**: 7 product categories with 42+ hardcoded form fields and 43+ select option values

---

### 5. **Disclaimer Text** (Lines 321-338)

**Current Implementation**:
```javascript
const disclaimer = company === 'UP'
  ? `We value your privacy and are committed to safeguarding...` // 145 chars
  : `We value your privacy and are committed to safeguarding...` // 280 chars
```

**Data Fields**:
| Field | Type | Status | Length |
|-------|------|--------|--------|
| UP Disclaimer | String | ❌ Hardcoded | 145 chars |
| Other Disclaimer | String | ❌ Hardcoded | 280 chars |

**Summary**: 2 disclaimer versions hardcoded

---

## 🗂️ CMS Entity Design

### CMSCompany Entity

**Purpose**: Store company branding and configurations  
**Scope**: 3-4 companies typically  
**Update Frequency**: Rarely (color changes once per year)

**TypeScript Interface**:
```typescript
interface CMSCompany {
  id: string;
  code: 'UGI' | 'ULA' | 'UP'; // Unique identifier
  name: string;
  brandColor: string; // hex color
  logo?: string; // URL to logo
  tagline?: string;
  mainHeading: string;
  actionText: string;
  successMessage: string;
  formTitle: string;
  submitButtonText: string;
  disclaimer: string;
  contactEmail: string;
  contactPhone: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
```

### CMSProductCategory Entity

**Purpose**: Store product category configurations and form fields  
**Scope**: 7-10 categories typically  
**Update Frequency**: Quarterly or as products change

**TypeScript Interface**:
```typescript
interface CMSProductCategory {
  id: string;
  displayOrder: number;
  categoryName: string;
  categoryKey: string; // 'life', 'motor', 'home', etc.
  description: string;
  keywords: string[]; // For product matching
  formFields: CMSFormField[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

interface CMSFormField {
  id: string;
  fieldKey: string; // 'dob', 'vehicleType', etc.
  label: string;
  type: 'text' | 'number' | 'date' | 'email' | 'tel' | 'select' | 'textarea';
  required: boolean;
  placeholder?: string;
  helpText?: string;
  displayOrder: number;
  selectOptions?: CMSSelectOption[];
  validation?: {
    minValue?: number;
    maxValue?: number;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
}

interface CMSSelectOption {
  id: string;
  value: string;
  label: string;
  displayOrder: number;
}
```

---

## 🗄️ Database Schema (PostgreSQL)

### Table: cms_companies

```sql
CREATE TABLE cms_companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(10) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  brand_color VARCHAR(7) NOT NULL,
  logo_url TEXT,
  tagline VARCHAR(500),
  main_heading VARCHAR(500) NOT NULL,
  action_text VARCHAR(100) NOT NULL,
  success_message TEXT NOT NULL,
  form_title TEXT NOT NULL,
  submit_button_text VARCHAR(100) NOT NULL,
  disclaimer TEXT NOT NULL,
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID NOT NULL,
  updated_by UUID NOT NULL,
  
  CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users(id),
  CONSTRAINT fk_updated_by FOREIGN KEY (updated_by) REFERENCES users(id)
);

CREATE INDEX idx_companies_code ON cms_companies(code);
CREATE INDEX idx_companies_active ON cms_companies(is_active);
```

### Table: cms_product_categories

```sql
CREATE TABLE cms_product_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_order INTEGER NOT NULL,
  category_name VARCHAR(255) NOT NULL,
  category_key VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  keywords TEXT[], -- PostgreSQL array type
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID NOT NULL,
  updated_by UUID NOT NULL,
  
  CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users(id),
  CONSTRAINT fk_updated_by FOREIGN KEY (updated_by) REFERENCES users(id)
);

CREATE INDEX idx_categories_key ON cms_product_categories(category_key);
CREATE INDEX idx_categories_active ON cms_product_categories(is_active);
```

### Table: cms_form_fields

```sql
CREATE TABLE cms_form_fields (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL,
  field_key VARCHAR(100) NOT NULL,
  label VARCHAR(255) NOT NULL,
  type VARCHAR(20) NOT NULL, -- text, number, date, email, tel, select, textarea
  is_required BOOLEAN DEFAULT true,
  placeholder VARCHAR(255),
  help_text TEXT,
  display_order INTEGER NOT NULL,
  min_value INTEGER,
  max_value INTEGER,
  pattern VARCHAR(255),
  min_length INTEGER,
  max_length INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID NOT NULL,
  updated_by UUID NOT NULL,
  
  CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES cms_product_categories(id) ON DELETE CASCADE,
  CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users(id),
  CONSTRAINT fk_updated_by FOREIGN KEY (updated_by) REFERENCES users(id)
);

CREATE INDEX idx_form_fields_category ON cms_form_fields(category_id);
CREATE INDEX idx_form_fields_key ON cms_form_fields(field_key);
CREATE INDEX idx_form_fields_active ON cms_form_fields(is_active);
```

### Table: cms_select_options

```sql
CREATE TABLE cms_select_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  field_id UUID NOT NULL,
  value VARCHAR(100) NOT NULL,
  label VARCHAR(255) NOT NULL,
  display_order INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_field FOREIGN KEY (field_id) REFERENCES cms_form_fields(id) ON DELETE CASCADE,
  CONSTRAINT unique_field_value UNIQUE (field_id, value)
);

CREATE INDEX idx_select_options_field ON cms_select_options(field_id);
CREATE INDEX idx_select_options_active ON cms_select_options(is_active);
```

---

## 🔌 API Endpoints Needed

### 1. **GET /api/cms/companies**

**Purpose**: Fetch all companies with their configurations  
**Status**: ❌ Not implemented

**Request**:
```bash
GET /api/cms/companies?active=true
```

**Response**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "code": "UGI",
        "name": "United General Insurance",
        "brandColor": "#286278",
        "mainHeading": "Get hassle-free cover for all your insurance needs",
        "actionText": "Sign Me Up Today",
        "successMessage": "Quote request submitted successfully!",
        "formTitle": "Please complete the details for your insurance quote",
        "submitButtonText": "Request Quote",
        "disclaimer": "We value your privacy..."
      }
    ],
    "total": 3
  }
}
```

---

### 2. **GET /api/cms/product-categories**

**Purpose**: Fetch all product categories with form field definitions  
**Status**: ❌ Not implemented

**Request**:
```bash
GET /api/cms/product-categories?active=true&include=fields
```

**Response**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "categoryName": "Life Insurance",
        "categoryKey": "life",
        "description": "Life assurance products",
        "keywords": ["funeral", "life", "credit life", "family"],
        "formFields": [
          {
            "id": "uuid",
            "fieldKey": "dob",
            "label": "Date of Birth",
            "type": "date",
            "required": true,
            "displayOrder": 1,
            "selectOptions": []
          },
          {
            "id": "uuid",
            "fieldKey": "gender",
            "label": "Gender",
            "type": "select",
            "required": true,
            "displayOrder": 2,
            "selectOptions": [
              { "value": "male", "label": "Male" },
              { "value": "female", "label": "Female" }
            ]
          }
        ]
      }
    ],
    "total": 7
  }
}
```

---

### 3. **GET /api/cms/companies/:code**

**Purpose**: Fetch single company configuration  
**Status**: ❌ Not implemented

**Response**: Single company object

---

## 💻 Migration Code Examples

### Before: Current Implementation

```javascript
// app/products/[slug]/page.js - Current approach

const COMPANY_COLORS = {
  'UGI': '#286278',
  'ULA': '#3d834d',
  'UP': '#f79620',
};

const COMPANY_NAMES = {
  'UGI': 'United General Insurance',
  'ULA': 'United Life Assurance',
  'UP': 'United Pay'
};

const getCompanySpecificText = () => {
  switch (company) {
    case 'UP':
      return {
        mainHeading: 'Get hassle-free financing...',
        successMessage: 'Application submitted...',
        // ... more hardcoded text
      };
    // ...
  }
};

// In component
<div style={{ backgroundColor: departmentColor }}>
  {companyName}
</div>
```

```javascript
// RenderForm.js - Current approach

const getProductCategory = () => {
  const productName = product.name.toLowerCase();
  if (productName.includes('funeral') || productName.includes('life')) {
    return 'life';
  }
  // ... more hardcoded logic
};

switch (productCategory) {
  case 'life':
    productFields = (
      <div className='grid...'>
        <InputField label="Date of Birth" />
        <SelectField label="Gender" options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' }
        ]} />
        // ... more hardcoded fields
      </div>
    );
    break;
  // ... more cases
}
```

---

### After: API-Driven Implementation

**Step 1: Create API Service Layer** (`lib/cms-product-api.js`)

```javascript
// lib/cms-product-api.js

export const productAPI = {
  async getCompanies() {
    try {
      const response = await fetch('/api/cms/companies?active=true');
      if (!response.ok) throw new Error('Failed to fetch companies');
      const data = await response.json();
      return data.data?.items || [];
    } catch (error) {
      console.error('Error fetching companies:', error);
      return [];
    }
  },

  async getCompanyByCode(code) {
    try {
      const response = await fetch(`/api/cms/companies/${code}`);
      if (!response.ok) throw new Error('Failed to fetch company');
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching company:', error);
      return null;
    }
  },

  async getProductCategories() {
    try {
      const response = await fetch('/api/cms/product-categories?active=true&include=fields');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      return data.data?.items || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  async getCategoryByKey(categoryKey) {
    try {
      const response = await fetch(`/api/cms/product-categories/${categoryKey}?include=fields`);
      if (!response.ok) throw new Error('Failed to fetch category');
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching category:', error);
      return null;
    }
  },

  // Determine category based on product name and keywords
  determineCategoryFromProduct(product, categories) {
    const productName = product.name.toLowerCase();
    
    for (const category of categories) {
      if (category.keywords && category.keywords.length > 0) {
        if (category.keywords.some(keyword => productName.includes(keyword.toLowerCase()))) {
          return category;
        }
      }
    }
    
    // Default to 'general' or first category
    return categories.find(c => c.categoryKey === 'general') || categories[0];
  }
};
```

**Step 2: Create Custom Hook** (`hooks/useProductPageData.js`)

```javascript
// hooks/useProductPageData.js

import { useState, useEffect, useMemo } from 'react';
import { productAPI } from '@/lib/cms-product-api';

export function useProductPageData(product) {
  const [companies, setCompanies] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [companiesData, categoriesData] = await Promise.all([
          productAPI.getCompanies(),
          productAPI.getProductCategories()
        ]);

        // Create a map of companies by code for O(1) lookup
        const companiesMap = {};
        companiesData.forEach(company => {
          companiesMap[company.code] = company;
        });

        setCompanies(companiesMap);
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Determine company based on product
  const company = useMemo(() => {
    if (!product) return null;
    
    // Check if product has explicit company field
    if (product.company && companies[product.company]) {
      return companies[product.company];
    }

    // Fallback: determine by product name
    const productName = product.name.toLowerCase();
    if (productName.includes('funeral') || productName.includes('life')) {
      return companies['ULA'] || null;
    } else if (productName.includes('loan') || productName.includes('micro')) {
      return companies['UP'] || null;
    }
    
    return companies['UGI'] || null;
  }, [product, companies]);

  // Determine category for form fields
  const category = useMemo(() => {
    if (!product || categories.length === 0) return null;
    return productAPI.determineCategoryFromProduct(product, categories);
  }, [product, categories]);

  return {
    companies,
    categories,
    company,
    category,
    loading,
    error
  };
}
```

**Step 3: Updated Product Page**

```javascript
// app/products/[slug]/page.js - Updated

'use client'

import { useProductPageData } from '@/hooks/useProductPageData';
// ... other imports

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Get CMS data
  const { company, category, companies, categories, loading: cmsLoading, error } = useProductPageData(product);

  // ... rest of component logic

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          Error loading configuration: {error}
        </div>
      </div>
    );
  }

  if (!product || !company) {
    return notFound();
  }

  // Use company data from API instead of hardcoded
  const departmentColor = company.brandColor;
  const companyName = company.name;
  const isLightColor = departmentColor === '#f79620';

  return (
    <div className="min-h-screen font-outfit mx-auto">
      {/* Company Header Bar */}
      <div className='h-8 w-full' style={{ backgroundColor: departmentColor }} />

      {/* Main Header */}
      <div className='py-4' style={{ backgroundColor: departmentColor }}>
        <header className="max-w-[1400px] mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
              {product.tagline}
            </h1>
            <div className="text-white text-sm sm:text-base bg-black/20 px-3 py-1 rounded-full">
              {companyName}
            </div>
          </div>
        </header>
      </div>

      {/* Quote Form Section */}
      <div className="w-full px-4 sm:px-6 md:px-8 flex flex-col rounded-xl sm:rounded-2xl mx-auto text-white py-6 sm:py-8"
        style={{ backgroundColor: departmentColor }}>
        <div className='space-y-3 sm:space-y-4 text-center sm:text-left'>
          <p className='text-2xl sm:text-3xl md:text-4xl font-semibold max-w-lg'>
            {company.mainHeading}
          </p>
          <p className='text-sm sm:text-base font-light max-w-md'>
            {product.tagline}
          </p>
        </div>

        {/* Form - pass category data */}
        <RenderForm
          product={product}
          category={category}
          company={company}
          // ... other props
        />

        {/* Disclaimer - from company data */}
        <div className={`text-xs mt-4 sm:mt-6 space-y-2 ${isLightColor ? 'text-gray-700' : 'text-gray-200'}`}>
          <p className={`font-bold text-lg sm:text-xl ${isLightColor ? 'text-gray-800' : 'text-gray-100'}`}>
            Disclaimer
          </p>
          <p className='text-justify'>{company.disclaimer}</p>
        </div>
      </div>

      {/* Rest of component... */}
    </div>
  );
}
```

**Step 4: Updated RenderForm Component**

```javascript
// components/RenderForm.js - Updated

export default function RenderForm({ 
    product,
    category,
    company,
    formData, 
    handleInputChange,
    sendQuote,
    isSubmitting,
    companyText 
}) {
  // Use category data from API instead of switch statement
  let productFields = null;

  if (category && category.formFields && category.formFields.length > 0) {
    productFields = (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
        {category.formFields
          .filter(field => field.isActive)
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map(field => {
            if (field.type === 'select' && field.selectOptions && field.selectOptions.length > 0) {
              return (
                <SelectField
                  key={field.id}
                  label={field.label}
                  name={field.fieldKey}
                  value={formData[field.fieldKey] || ''}
                  onChange={handleInputChange}
                  options={field.selectOptions.map(opt => ({
                    value: opt.value,
                    label: opt.label
                  }))}
                  required={field.isRequired}
                />
              );
            } else {
              return (
                <InputField
                  key={field.id}
                  label={field.label}
                  name={field.fieldKey}
                  type={field.type}
                  value={formData[field.fieldKey] || ''}
                  onChange={handleInputChange}
                  required={field.isRequired}
                  placeholder={field.placeholder}
                  {...(field.validation && {
                    minLength: field.validation.minLength,
                    maxLength: field.validation.maxLength,
                    min: field.validation.minValue,
                    max: field.validation.maxValue,
                    pattern: field.validation.pattern
                  })}
                />
              );
            }
          })}
      </div>
    );
  } else {
    // Fallback to basic fields if category not found
    productFields = (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
        <InputField label="Coverage Amount (SZL)" name="coverageAmount" type="number" />
        <SelectField label="Coverage Type" name="coverageType" options={[
          { value: 'standard', label: 'Standard' },
          { value: 'premium', label: 'Premium' }
        ]} />
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); sendQuote(formData); }} className='gap-6 flex flex-col w-full'>
      {/* General Information Section */}
      <div className='flex w-full justify-center items-center gap-4'>
        <p className='font-semibold text-[#9b1c20] whitespace-nowrap'>General Information</p>
        <div className='h-[0.5px] w-full bg-gray-200' />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <InputField label="Full Name" name="name" value={formData.name || ''} onChange={handleInputChange} required />
        <InputField label="Email" name="email" type="email" value={formData.email || ''} onChange={handleInputChange} required />
        <InputField label="Phone Number" name="phone" type="tel" value={formData.phone || ''} onChange={handleInputChange} required />
      </div>

      {/* Product-Specific Information Section */}
      <div className='flex w-full justify-center items-center gap-4'>
        <p className='font-semibold text-[#9b1c20] whitespace-nowrap'>{product.name} Information</p>
        <div className='h-[0.5px] w-full bg-gray-200' />
      </div>
      {productFields}

      {/* Submit Button */}
      <div className='w-full flex justify-center sm:justify-start mt-4'>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-8 py-3 rounded-full font-semibold transition ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#9b1c20] text-white hover:opacity-90'
          }`}
        >
          {isSubmitting ? 'Submitting...' : company.submitButtonText}
        </button>
      </div>
    </form>
  );
}
```

---

## 🔄 Data Migration Path

### Phase 1: Database Setup (2 hours)
- [ ] Create 4 new database tables
- [ ] Design schema relationships
- [ ] Add seed data from hardcoded values
- [ ] Create database indexes

### Phase 2: API Development (2 hours)
- [ ] Create 4 new API endpoints
- [ ] Add request validation
- [ ] Add response caching
- [ ] Add error handling

### Phase 3: Service Layer & Hook (1.5 hours)
- [ ] Create `lib/cms-product-api.js`
- [ ] Create `hooks/useProductPageData.js`
- [ ] Add error handling
- [ ] Add loading states

### Phase 4: Component Updates (1.5 hours)
- [ ] Update product page component
- [ ] Update RenderForm component
- [ ] Remove hardcoded logic
- [ ] Update imports

### Phase 5: Testing (1.5 hours)
- [ ] Unit tests for hook
- [ ] Component integration tests
- [ ] Form generation tests
- [ ] API response validation

### Phase 6: Deployment (30 mins)
- [ ] Code review
- [ ] Staging deployment
- [ ] Production rollout
- [ ] Monitor errors

**Total Estimated Time**: 8-9 hours

---

## 📋 Implementation Checklist

### Pre-Implementation
- [ ] Review all hardcoded data identified
- [ ] Get approval for CMS schema
- [ ] Allocate development time (8-9 hours)
- [ ] Schedule QA testing
- [ ] Plan data migration strategy

### Database Setup
- [ ] Create `cms_companies` table
- [ ] Create `cms_product_categories` table
- [ ] Create `cms_form_fields` table
- [ ] Create `cms_select_options` table
- [ ] Add all indexes
- [ ] Seed with current data
- [ ] Document schema

### API Development
- [ ] Create `/api/cms/companies` endpoint
- [ ] Create `/api/cms/companies/:code` endpoint
- [ ] Create `/api/cms/product-categories` endpoint
- [ ] Create `/api/cms/product-categories/:key` endpoint
- [ ] Add validation (Zod/Joi)
- [ ] Add error handling
- [ ] Add response caching
- [ ] Test all endpoints

### Frontend Changes
- [ ] Create `lib/cms-product-api.js`
- [ ] Create `hooks/useProductPageData.js`
- [ ] Update product page
- [ ] Update RenderForm component
- [ ] Remove hardcoded constants
- [ ] Update imports
- [ ] Fix TypeScript types

### Testing
- [ ] Unit tests for hook
- [ ] Component snapshot tests
- [ ] Form generation tests
- [ ] Category detection tests
- [ ] API response validation
- [ ] Integration tests
- [ ] E2E form submission tests

### Documentation
- [ ] Update API documentation
- [ ] Create admin guide for managing companies
- [ ] Create admin guide for managing categories
- [ ] Create developer guide
- [ ] Document keyword matching logic
- [ ] Document data relationships

---

## ⚠️ Critical Issues & Considerations

### 1. **Product-to-Category Matching**

Current implementation uses hardcoded keyword matching:
```javascript
if (productName.includes('funeral') || productName.includes('life')) {
  return 'life';
}
```

**Problem**: Brittle, unmaintainable, prone to errors

**Solution**: Store keywords in database and use fuzzy matching

```javascript
// Database-driven approach
determineCategoryFromProduct(product, categories) {
  const productName = product.name.toLowerCase();
  
  for (const category of categories) {
    if (category.keywords && category.keywords.some(kw => 
      productName.includes(kw.toLowerCase()))) {
      return category;
    }
  }
  
  return categories.find(c => c.categoryKey === 'general');
}
```

---

### 2. **Company Color Accessibility**

Current colors might not meet WCAG contrast requirements:
- UGI Blue (#286278) on white: ⚠️ Check contrast
- ULA Green (#3d834d) on white: ⚠️ Check contrast
- UP Orange (#f79620) on white: ❌ Fails WCAG AA

**Solution**: Add secondary colors for text on colored backgrounds

```typescript
interface CMSCompany {
  brandColor: string;
  secondaryColor?: string; // For better contrast
  textColor: 'white' | 'black'; // Calculated contrast
  accentColor?: string;
}
```

---

### 3. **Form Field Validation**

Current implementation has minimal validation in RenderForm

**Solution**: Store validation rules in database

```typescript
interface CMSFormField {
  validation?: {
    minValue?: number;
    maxValue?: number;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    customValidator?: string; // JSON rule or regex
  };
}
```

---

## 📊 Data Statistics

**Hardcoded Company Data**:
- 3 company colors
- 3 company names
- 3 x 5 = 15 text strings (company-specific)
- 2 disclaimer versions

**Hardcoded Form Data**:
- 7 product categories
- 42+ form fields
- 43+ select option values
- 7 category-to-keyword mappings

**Total Hardcoded Items**: ~120+

---

## 🎯 Questions for Product Team

1. Should form fields be reorderable per company?
2. Should field visibility be conditional (show/hide based on other fields)?
3. Should validation rules be company-specific?
4. Should there be default values per field per company?
5. Should field groups be available (organizing fields into sections)?
6. Should we support field dependencies (field A visible only if field B has value X)?
7. Should multi-language support be planned?

---

## ✅ Conclusion

The product page component is highly complex with extensive hardcoded logic for form generation and company branding. The CMS migration would:

1. **Centralize** all company configurations
2. **Standardize** form field definitions
3. **Make dynamic** product-to-category matching
4. **Enable** non-technical product updates
5. **Support** future companies without code changes

**Estimated Timeline**: 8-9 hours for full implementation  
**Difficulty**: High (complex logic, multiple entities, form generation)  
**Priority**: Very High (core product feature, touches many pages)

---

**Document Created**: November 11, 2025  
**Status**: Production-Ready  
**Next Step**: Database schema review and API design approval
