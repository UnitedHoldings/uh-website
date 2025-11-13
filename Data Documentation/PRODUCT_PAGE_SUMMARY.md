# Product Page - Quick Summary

**Components**: `app/products/[slug]/page.js` + `components/RenderForm.js`  
**File Size**: 600+ lines (page) + 350+ lines (form)  
**Status**: Mixed (Product API + Hardcoded company/form data)  
**Complexity**: High  
**Effort**: 8-9 hours  
**Priority**: Very High

---

## 🎯 Key Findings

### Total Hardcoded Items: 120+

| Category | Count | Status | Notes |
|----------|-------|--------|-------|
| Company Colors | 3 | ❌ Hardcoded | Color mapping object |
| Company Names | 3 | ❌ Hardcoded | Name mapping object |
| Company-Specific Text | 15 | ❌ Hardcoded | 5 text strings per company |
| Form Fields | 42+ | ❌ Hardcoded | Across 7 categories |
| Select Options | 43+ | ❌ Hardcoded | Dropdown choices |
| Disclaimers | 2 | ❌ Hardcoded | UP vs other version |
| Product-to-Category Logic | 7 | ❌ Hardcoded | Keyword matching |

---

## 📊 Component Breakdown

### Section 1: Company Branding

**Current State**: Hardcoded objects

**Data**:
- UGI: #286278 (Blue), "United General Insurance"
- ULA: #3d834d (Green), "United Life Assurance"
- UP: #f79620 (Orange), "United Pay"

**Problem**: Can't add new companies without code changes

**To Migrate**: Create `CMSCompany` entity

---

### Section 2: Company-Specific Text

**Current State**: Hardcoded switch statement

**Text Per Company** (5 items each):
- Main heading
- Action text
- Success message
- Form title
- Submit button text

**To Migrate**: Store in company entity

---

### Section 3: Product Categories & Forms

**Current State**: Hardcoded switch statement in RenderForm

**Categories** (7 total):
- Life Insurance (5 form fields)
- Motor Insurance (6 form fields)
- Home Insurance (6 form fields)
- Legal Insurance (4 form fields)
- Personal Accident (4 form fields)
- Business Insurance (7 form fields)
- Loans (6 form fields)

**Problem**: Adding new categories or fields requires code change

**To Migrate**: Create `CMSProductCategory` + `CMSFormField` entities

---

### Section 4: Form Field Definitions

**Current State**: Hardcoded input/select definitions

**Examples**:
- Text inputs with labels
- Date inputs
- Number inputs
- Select dropdowns with options
- 43+ hardcoded option values

**To Migrate**: Store field definitions and options in database

---

### Section 5: Disclaimer Text

**Current State**: Hardcoded conditional text

**Versions**:
- UP Disclaimer (145 chars)
- Other Disclaimer (280 chars)

**To Migrate**: Store in company entity

---

## 🔌 Required API Endpoints

### 1. GET /api/cms/companies
Fetch all company configurations with branding and text

### 2. GET /api/cms/companies/:code
Fetch single company by code (UGI/ULA/UP)

### 3. GET /api/cms/product-categories
Fetch all product categories with form field definitions

### 4. GET /api/cms/product-categories/:key
Fetch single category with all form fields and options

---

## 🗄️ Database Tables Needed

1. **cms_companies** (3 rows)
   - id, code, name, brand_color, main_heading, success_message, form_title, submit_button_text, disclaimer, is_active, timestamps

2. **cms_product_categories** (7 rows)
   - id, category_key, category_name, description, keywords[], is_active, timestamps

3. **cms_form_fields** (42+ rows)
   - id, category_id, field_key, label, type, is_required, display_order, validation rules, timestamps

4. **cms_select_options** (43+ rows)
   - id, field_id, value, label, display_order, is_active

---

## 💻 Implementation Overview

### Current Code Problem

```javascript
// Hardcoded company colors
const COMPANY_COLORS = {
  'UGI': '#286278',
  'ULA': '#3d834d',
  'UP': '#f79620',
};

// Hardcoded text per company
const getCompanySpecificText = () => {
  switch (company) {
    case 'UP':
      return {
        mainHeading: 'Get hassle-free financing for all your needs',
        successMessage: 'Application submitted successfully!',
        // ... more hardcoded
      };
    // ...
  }
};

// Hardcoded form fields per category
switch (productCategory) {
  case 'life':
    productFields = (
      <InputField label="Date of Birth" />
      <SelectField label="Gender" options={['Male', 'Female']} />
      // ...
    );
    break;
  // ... 6 more cases with hardcoded fields
}
```

### Solution

```javascript
// From API
const { company, category } = useProductPageData(product);

// Dynamic color
<div style={{ backgroundColor: company.brandColor }} />

// Dynamic text
<p>{company.mainHeading}</p>

// Dynamic form fields from category.formFields
{category.formFields.map(field => (
  field.type === 'select' 
    ? <SelectField {...field} options={field.selectOptions} />
    : <InputField {...field} />
))}
```

---

## 📈 Data Inventory

### Company Data (3 companies, 5 data points each)

| Company | Color | Name | Heading | Message | Form Title |
|---------|-------|------|---------|---------|-----------|
| UGI | #286278 | United General Insurance | Hassle-free cover | Quote submitted | Insurance quote |
| ULA | #3d834d | United Life Assurance | Peace of mind | Quote submitted | Life assurance |
| UP | #f79620 | United Pay | Hassle-free financing | Application submitted | Loan application |

### Categories (7 categories, ~6 fields each)

| # | Category | Fields | Example |
|---|----------|--------|---------|
| 1 | Life | 5 | DOB, Gender, Coverage, Type, Dependents |
| 2 | Motor | 6 | Type, Make, Model, Year, Reg#, Value |
| 3 | Home | 6 | Address, Status, Type, Value, Coverage |
| 4 | Legal | 4 | Matter, Costs, Urgency, Description |
| 5 | Personal Accident | 4 | DOB, Occupation, Coverage, Type |
| 6 | Business | 7 | Name, Reg#, Type, Employees, Revenue |
| 7 | Loan | 6 | Amount, Purpose, Employment, Income |

---

## 🚀 Implementation Plan

### Week 1-2: Backend
- [ ] Design and create 4 database tables
- [ ] Create 4 API endpoints
- [ ] Seed data from hardcoded values
- [ ] Test all endpoints thoroughly

### Week 2: Frontend
- [ ] Create service layer (`lib/cms-product-api.js`)
- [ ] Create custom hook (`hooks/useProductPageData.js`)
- [ ] Update product page component
- [ ] Update RenderForm component
- [ ] Remove all hardcoded logic
- [ ] Comprehensive testing

### Timeline
- **Database Setup**: 2 hours
- **API Development**: 2 hours
- **Service Layer**: 1.5 hours
- **Component Updates**: 1.5 hours
- **Testing**: 1.5 hours
- **Buffer**: 30 minutes
- **Total**: 8-9 hours

---

## ✅ Success Criteria

- [ ] All hardcoded colors from API
- [ ] All hardcoded text from API
- [ ] All form fields dynamic from API
- [ ] Form generation works for all categories
- [ ] Category detection works correctly
- [ ] Component looks identical
- [ ] Form submission works
- [ ] Responsive design maintained
- [ ] No console errors
- [ ] API response < 200ms

---

## 🔄 TypeScript Interfaces

```typescript
interface CMSCompany {
  id: string;
  code: 'UGI' | 'ULA' | 'UP';
  name: string;
  brandColor: string;
  mainHeading: string;
  actionText: string;
  successMessage: string;
  formTitle: string;
  submitButtonText: string;
  disclaimer: string;
  contactEmail?: string;
  contactPhone?: string;
  isActive: boolean;
}

interface CMSFormField {
  id: string;
  fieldKey: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'email' | 'tel' | 'select' | 'textarea';
  required: boolean;
  placeholder?: string;
  displayOrder: number;
  selectOptions?: {
    value: string;
    label: string;
    displayOrder: number;
  }[];
  validation?: {
    minValue?: number;
    maxValue?: number;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
}

interface CMSProductCategory {
  id: string;
  categoryKey: string;
  categoryName: string;
  description: string;
  keywords: string[];
  formFields: CMSFormField[];
  isActive: boolean;
}

interface ProductPageData {
  company: CMSCompany;
  category: CMSProductCategory;
  companies: Map<string, CMSCompany>;
  categories: CMSProductCategory[];
  loading: boolean;
  error: string | null;
}
```

---

## 🎓 Key Challenges

### Challenge 1: Product-to-Category Matching
**Current**: Hardcoded keyword matching  
**Solution**: Store keywords in database, use fuzzy matching

### Challenge 2: Adding New Companies/Categories
**Current**: Requires code change  
**Solution**: CMS-driven, zero-code changes

### Challenge 3: Form Field Validation
**Current**: Minimal, client-side only  
**Solution**: Validation rules in database, server-side validation

### Challenge 4: Form Field Dependencies
**Current**: Not supported  
**Solution**: Store dependency logic in database

---

## 📞 Before You Start

### Questions for Product

1. Should form fields be reorderable per company?
2. Should field visibility be conditional?
3. Should we support multi-language forms?
4. Should validation rules be company-specific?
5. Should field groups be available (organizing into sections)?

### Dependencies

None! Uses existing:
- React hooks (useState, useEffect, useMemo)
- Next.js dynamic routing
- Fetch API for HTTP calls

---

## 🎯 Next Steps

1. **Review** audit document with team
2. **Approve** database schema
3. **Create** 4 database tables
4. **Develop** 4 API endpoints
5. **Implement** service layer
6. **Update** components
7. **Test** thoroughly

---

## 📊 Impact Assessment

### Flexibility
- **Before**: Code change to add company
- **After**: 5-minute CMS update

### Maintainability
- **Before**: 7 hardcoded form categories
- **After**: 1 reusable form generator

### Scalability
- **Before**: Limited to 3 companies
- **After**: Unlimited companies and categories

### Time Saved
- **Per update**: 1-2 hours vs 5 minutes
- **Annual**: 100+ hours saved

---

**Document Status**: ✅ Ready for Review  
**Last Updated**: November 11, 2025  
**Next Action**: Technical Review & Approval
