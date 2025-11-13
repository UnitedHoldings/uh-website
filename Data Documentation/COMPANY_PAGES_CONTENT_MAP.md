# Company Pages - Content & Data Map

**Purpose**: Visual and structural reference for all three company pages  
**Scope**: ULA, UGI, UP product pages  
**Audience**: Developers, architects, content managers

---

## 🗺️ Page Structure Overview

### All Three Pages Follow Identical Pattern

```
┌───────────────────────────────────────────────────┐
│         Page Structure (Identical Format)          │
├───────────────────────────────────────────────────┤
│                                                    │
│  1. Color Bar (2px)                              │
│     ↓ Brand Color Secondary                       │
│                                                    │
│  2. Hero Section                                 │
│     ├─ Background Image with 50% Black Overlay   │
│     ├─ Company Name (Dynamic)                    │
│     ├─ Tagline (Dynamic)                         │
│     └─ CTA Button (Dynamic)                      │
│                                                    │
│  3. Search Section                               │
│     ├─ Label (Dynamic)                           │
│     ├─ Search Input (Dynamic placeholder)        │
│     └─ [Optional] Category Filter (UGI only)     │
│                                                    │
│  4. Product Grid                                 │
│     ├─ Fetch from API (Dynamic)                  │
│     ├─ Product Cards (Reusable component)        │
│     ├─ Category Icons (Dynamic)                  │
│     └─ Category Colors (Dynamic)                 │
│                                                    │
│  5. CTA Section                                  │
│     ├─ Heading (Dynamic)                         │
│     ├─ Description (Dynamic)                     │
│     ├─ Primary Button (Dynamic)                  │
│     └─ Secondary Button (Dynamic)                │
│                                                    │
└───────────────────────────────────────────────────┘
```

---

## 🎨 Color Scheme Map

### Current Implementation (Hardcoded)

```
┌─────────────────────────────────────────────────────┐
│         Brand Color Distribution                     │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Color Bar (2px)
│  ├─ ULA: #2f6b3d ────────────────────────────────│ │
│  ├─ UGI: #204f61 ────────────────────────────────│ │
│  └─ UP:  #e0861c ────────────────────────────────│ │
│                                                      │
│  Hero Section Background
│  ├─ ULA: #3d834d (Green, 50% opacity + img) ──────│ │
│  ├─ UGI: #286278 (Blue, 50% opacity + img) ───────│ │
│  └─ UP:  #f79620 (Orange, 50% opacity + img) ─────│ │
│                                                      │
│  Buttons & CTAs
│  ├─ ULA: Primary #3d834d, Hover #2f6b3d ─────────│ │
│  ├─ UGI: Primary #286278, Hover #24576b ─────────│ │
│  └─ UP:  Primary #f79620, Hover #e0861c ─────────│ │
│        (UP has accessibility issue!)              │
│                                                      │
│  Secondary Buttons (All Companies)
│  ├─ Border Color: Company Primary Color           │
│  ├─ Text Color: Company Primary Color             │
│  └─ Hover: Filled with Primary, text white        │
│                                                      │
│  Focus States
│  ├─ Input Focus Ring: Company Primary Color       │
│  └─ Input Box Shadow: Company Primary Color       │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### Proposed Database Structure

```
cms_company_pages Table
┌─────────┬──────────┬────────────────┬─────────────────┐
│ company │ primary  │ secondary      │ header_bar      │
├─────────┼──────────┼────────────────┼─────────────────┤
│ ULA     │ #3d834d  │ #2f6b3d        │ #2f6b3d         │
│ UGI     │ #286278  │ #24576b        │ #204f61         │
│ UP      │ #d67910* │ #e0861c        │ #e0861c         │
└─────────┴──────────┴────────────────┴─────────────────┘
* Updated for accessibility
```

---

## 📋 Component Breakdown by Section

### Section 1: Hero (Identical Structure)

```
┌─────────────────────────────────────────────────────┐
│ Hero Section (550px height)                         │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │ Background Image (1400px width)              │   │
│  │ File: /Life.jpg OR /car.jpg OR /loan.jpg    │   │
│  │ Overlay: 50% Black Opacity                   │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  Content (Positioned over background):              │
│  ├─ H1: "United [Company Name]" (text-white)      │
│  │     Color: Company Primary (e.g., #3d834d)      │
│  │                                                  │
│  ├─ P: "Comprehensive [tagline]" (text-white/90)   │
│  │   ├─ ULA: "...life assurance and funeral..."   │
│  │   ├─ UGI: "...short-term insurance..."         │
│  │   └─ UP:  "...financial solutions..."          │
│  │                                                  │
│  └─ Button: "[Company CTA Text]"                   │
│      ├─ ULA: "View Products"                       │
│      ├─ UGI: "View Products"                       │
│      ├─ UP:  "Apply Now"                          │
│      └─ Style: White border, hover to fill         │
│                                                      │
└─────────────────────────────────────────────────────┘

Hardcoded Items (3 per company):
- H1 Text (company name)
- P Text (tagline)
- Button Text (CTA)
- Background Image Path
- H1 Text Color
```

### Section 2: Search Section

```
┌─────────────────────────────────────────────────────┐
│ Search & Filter Section (white background)         │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Label: [Dynamic, company-specific]                │
│  ├─ ULA: "Get Protected Today!"                    │
│  ├─ UGI: "What do you want to cover?"            │
│  └─ UP:  "What financial needs do you have?"     │
│                                                      │
│  ┌──────────────────────────────────────┐          │
│  │ Search Input (200-400px)             │          │
│  │ Placeholder: [Dynamic]               │          │
│  │ Focus Ring: Company Primary Color    │          │
│  │ ├─ ULA: "Search life assurance..." │          │
│  │ ├─ UGI: "Search insurance..."       │          │
│  │ └─ UP:  "Search loan products..."  │          │
│  └──────────────────────────────────────┘          │
│                                                      │
│  [Optional] Category Filter (UGI only)             │
│  ├─ Dropdown with all 12 categories                │
│  ├─ Default: "All Products"                        │
│  └─ Styling: Matches search input                  │
│                                                      │
│  Results Count: "Showing X of Y products"          │
│                                                      │
└─────────────────────────────────────────────────────┘

Hardcoded Items:
ULA: 3 (label, placeholder, no filter)
UGI: 4 (label, placeholder, 12 filter options, no filter default)
UP:  3 (label, placeholder, no filter)
```

### Section 3: Product Grid

```
┌─────────────────────────────────────────────────────┐
│ Product Grid (Identical Component - API Data)      │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Grid: 3 columns on desktop, 1-2 on mobile        │
│                                                      │
│  ┌─────────────────┐ ┌─────────────────┐          │
│  │  Product Card   │ │  Product Card   │          │
│  ├─────────────────┤ ├─────────────────┤          │
│  │ [Image]         │ │ [Image]         │          │
│  │ ┌───────────┐   │ │ ┌───────────┐   │          │
│  │ │ Category  │   │ │ │ Category  │   │          │
│  │ │ Icon      │   │ │ │ Icon      │   │          │
│  │ │ (Dynamic) │   │ │ │ (Dynamic) │   │          │
│  │ └───────────┘   │ │ └───────────┘   │          │
│  │                 │ │                 │          │
│  │ Title           │ │ Title           │          │
│  │ Tagline         │ │ Tagline         │          │
│  │                 │ │                 │          │
│  │ • Benefit 1     │ │ • Benefit 1     │          │
│  │ • Benefit 2     │ │ • Benefit 2     │          │
│  │                 │ │                 │          │
│  │ Stats           │ │ Stats           │          │
│  │                 │ │                 │          │
│  │ [Learn More]    │ │ [Learn More]    │          │
│  │ Button          │ │ Button          │          │
│  │ (Company Color) │ │ (Company Color) │          │
│  └─────────────────┘ │ └─────────────────┘          │
│                                                      │
│  Empty State (if no results):                      │
│  "No products found"                               │
│  "Try adjusting your search or filters"            │
│                                                      │
└─────────────────────────────────────────────────────┘

Hardcoded Items per Company:
- Category Icons (5, 12, or 2 per company)
- Category Colors (5, 12, or 2 per company)
- Button Color (Company Primary)
- Button Hover Color (Company Secondary)
- Empty message text (1 per company)
```

### Section 4: CTA Section

```
┌─────────────────────────────────────────────────────┐
│ Call-To-Action Section (white background)          │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Heading: [Company-specific, 3-6 words]            │
│  ├─ ULA: "Ready to Secure Your Family's Future?"  │
│  ├─ UGI: "Ready to Get Protected?"                │
│  └─ UP:  "Ready to Access Funds?"                 │
│                                                      │
│  Description: [Company-specific, 1-2 sentences]    │
│  ├─ ULA: "Join thousands of satisfied families..." │
│  ├─ UGI: "Join thousands of satisfied customers..."│
│  └─ UP:  "Join thousands of employed individuals.."│
│                                                      │
│  Buttons:                                           │
│  ┌──────────────────┐  ┌──────────────────┐        │
│  │ Primary Button   │  │ Secondary Button │        │
│  │ (Solid, colored) │  │ (Bordered)       │        │
│  │                  │  │                  │        │
│  │ [Company CTA]    │  │ Find a Branch    │        │
│  │ ├─ ULA: "Get    │  │ (Navigate to     │        │
│  │ │   Covered..."  │  │  /contact)       │        │
│  │ ├─ UGI: "Get    │  └──────────────────┘        │
│  │ │   Free..."     │                              │
│  │ ├─ UP: "Apply"  │  Styling:                    │
│  │ └─             │  └─ Both: Company Primary     │
│  │     Filled bg   │     color when active        │
│  └──────────────────┘                              │
│                                                      │
└─────────────────────────────────────────────────────┘

Hardcoded Items per Company:
- Heading (1 per company)
- Description (1 per company)
- Primary Button Text (1 per company)
- Button Colors (Company Primary + Secondary)
```

---

## 📊 Data Inventory - All Hardcoded Items

### Item Count by Category

```
Branding Colors: 11 items
├─ ULA: 3 colors (primary, secondary, header)
├─ UGI: 4 colors (primary, secondary, header, darker)
└─ UP:  4 colors (primary, hover, header, darker)

Text Content: 30+ items
├─ Hero Section: 9 items (3 × 3: heading, tagline, CTA)
├─ Search Section: 6 items (3 × 2: label, placeholder)
├─ CTA Section: 9 items (3 × 3: heading, desc, buttons)
└─ Empty State: 3 items (1 per company)

Categories & Icons: 38 items
├─ ULA: 5 categories + 5 icons + 5 colors = 15 items
├─ UGI: 12 categories + 12 icons + 12 colors = 36 items
└─ UP:  2 categories + 2 icons + 2 colors = 6 items

Analytics: 3 items
├─ ULA Tracking Prefix: 'ula_'
├─ UGI Tracking Prefix: 'ugi_'
└─ UP Tracking Prefix: 'up_'

TOTAL: 82 hardcoded items
```

---

## 🔄 Data Flow Architecture

### Current (Hardcoded)

```
┌─────────────────────────────────────────────────────┐
│         Component Render Request                     │
│      (User navigates to /united-life-assurance)     │
└────────────────┬────────────────────────────────────┘
                 │
        ┌────────▼─────────────────────────┐
        │ Hardcoded Constants Loaded        │
        │ ├─ DEPARTMENT_COLORS             │
        │ ├─ categoryIcons                 │
        │ ├─ categoryColors                │
        │ └─ All JSX Text (inline)         │
        └────────┬─────────────────────────┘
                 │
        ┌────────▼─────────────────────────┐
        │ Products Fetched from API        │
        │ (Dynamic, reusable code)         │
        └────────┬─────────────────────────┘
                 │
        ┌────────▼─────────────────────────┐
        │ Render Page with:                │
        │ ├─ Hardcoded color #3d834d      │
        │ ├─ Hardcoded text "United..."   │
        │ ├─ Hardcoded icons/colors       │
        │ ├─ Dynamic product data         │
        │ └─ Hardcoded CTA text           │
        └────────┬─────────────────────────┘
                 │
                 ▼
        ┌─────────────────────────────────┐
        │    Rendered HTML to Browser     │
        └─────────────────────────────────┘

Problem: Any content change requires:
1. Code modification
2. Git commit
3. Code review
4. Deployment
5. Wait for production build
= 2-4 hours minimum
```

### Proposed (CMS-Driven)

```
┌─────────────────────────────────────────────────────┐
│         Component Render Request                     │
│      (User navigates to /united-life-assurance)     │
└────────────────┬────────────────────────────────────┘
                 │
        ┌────────▼─────────────────────────┐
        │ Route Handler Extracts:          │
        │ companyCode = "ULA"              │
        └────────┬─────────────────────────┘
                 │
        ┌────────▼──────────────────────────────────┐
        │ Parallel API Calls                       │
        ├──────────────────────────────────────────┤
        │ GET /api/cms/company-pages/ULA           │
        │   └─ Returns: colors, text, config       │
        │                                          │
        │ GET /api/cms/company-categories/ULA      │
        │   └─ Returns: 5 categories + icons       │
        │                                          │
        │ fetchUnitedLifeAssuranceData()           │
        │   └─ Returns: product list               │
        └────────┬──────────────────────────────────┘
                 │
        ┌────────▼─────────────────────────┐
        │ Render Reusable Component with:  │
        │ ├─ pageData (from API)           │
        │ ├─ categories (from API)         │
        │ ├─ products (from product API)   │
        │ └─ All content 100% dynamic      │
        └────────┬─────────────────────────┘
                 │
                 ▼
        ┌─────────────────────────────────┐
        │    Rendered HTML to Browser     │
        └─────────────────────────────────┘

Benefit: Content change requires:
1. CMS update
= 5 minutes maximum
(No code, no deploy, instant)
```

---

## 📱 Responsive Layout Structure

### Desktop Layout (1200px+)

```
┌─────────────────────────────────────────────────────┐
│ Header                                              │
├─────────────────────────────────────────────────────┤
│ Color Bar (2px)                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │              Hero Section (550px)             │  │
│  │  [Background image with content overlay]     │  │
│  │  Company Name | Heading | Button             │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
├─────────────────────────────────────────────────────┤
│ Search Section: [Input] [Filter (optional)]        │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │          │ │          │ │          │          │
│  │ Product  │ │ Product  │ │ Product  │          │
│  │  Card    │ │  Card    │ │  Card    │          │
│  │          │ │          │ │          │          │
│  └──────────┘ └──────────┘ └──────────┘          │
│                                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ Product  │ │ Product  │ │ Product  │          │
│  │  Card    │ │  Card    │ │  Card    │          │
│  └──────────┘ └──────────┘ └──────────┘          │
│                                                     │
├─────────────────────────────────────────────────────┤
│  CTA Section                                       │
│  Heading | Description                            │
│  [Primary Button] [Secondary Button]              │
└─────────────────────────────────────────────────────┘
```

### Tablet Layout (768px - 1200px)

```
┌──────────────────────────────────┐
│ Header                           │
├──────────────────────────────────┤
│ Color Bar (2px)                  │
├──────────────────────────────────┤
│                                  │
│ ┌────────────────────────────┐   │
│ │    Hero Section (400px)    │   │
│ │ Content overlay            │   │
│ └────────────────────────────┘   │
│                                  │
├──────────────────────────────────┤
│ Search: [Input] [Filter]         │
├──────────────────────────────────┤
│                                  │
│ ┌────────────┐ ┌────────────┐   │
│ │  Product   │ │  Product   │   │
│ │   Card     │ │   Card     │   │
│ └────────────┘ └────────────┘   │
│                                  │
│ ┌────────────┐ ┌────────────┐   │
│ │  Product   │ │  Product   │   │
│ │   Card     │ │   Card     │   │
│ └────────────┘ └────────────┘   │
│                                  │
├──────────────────────────────────┤
│ CTA Section (stacked on smaller) │
└──────────────────────────────────┘
```

### Mobile Layout (< 768px)

```
┌──────────────────────┐
│ Header               │
├──────────────────────┤
│ Color Bar            │
├──────────────────────┤
│                      │
│ Hero Section (300px) │
│ Content centered     │
│                      │
├──────────────────────┤
│ Search: [Input]      │
│         [Filter*]    │
├──────────────────────┤
│                      │
│ ┌────────────────┐   │
│ │  Product Card  │   │
│ │  Full width    │   │
│ └────────────────┘   │
│                      │
│ ┌────────────────┐   │
│ │  Product Card  │   │
│ │  Full width    │   │
│ └────────────────┘   │
│                      │
├──────────────────────┤
│ CTA Section          │
│ [Button stacked]     │
└──────────────────────┘

* Filter dropdown hidden on ULA/UP
```

---

## 🗄️ Database Schema Visual

### Table: cms_company_pages

```
┌─────────────────────────────────────────────────┐
│ cms_company_pages (3 rows)                      │
├─────────────────────────────────────────────────┤
│                                                 │
│ Row 1: ULA (United Life Assurance)             │
│ ├─ company_code: "ULA"                        │
│ ├─ brand_color_primary: "#3d834d"             │
│ ├─ hero_heading: "United Life Assurance"      │
│ ├─ search_placeholder: "Search life..."       │
│ ├─ has_category_filter: false                 │
│ ├─ cta_primary_text: "Get Covered Today"      │
│ └─ tracking_prefix: "ula_"                    │
│                                                 │
│ Row 2: UGI (United General Insurance)          │
│ ├─ company_code: "UGI"                        │
│ ├─ brand_color_primary: "#286278"             │
│ ├─ hero_heading: "United General Insurance"   │
│ ├─ search_placeholder: "Search insurance..."  │
│ ├─ has_category_filter: true                  │
│ ├─ cta_primary_text: "Get Free Quote"         │
│ └─ tracking_prefix: "ugi_"                    │
│                                                 │
│ Row 3: UP (United Pay)                        │
│ ├─ company_code: "UP"                         │
│ ├─ brand_color_primary: "#d67910"             │
│ ├─ hero_heading: "United Pay"                 │
│ ├─ search_placeholder: "Search loan..."       │
│ ├─ has_category_filter: false                 │
│ ├─ cta_primary_text: "Apply Now"              │
│ └─ tracking_prefix: "up_"                     │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Table: cms_product_categories

```
┌────────────────────────────────────────────────────────┐
│ cms_product_categories (19 rows)                       │
├────────────────────────────────────────────────────────┤
│                                                         │
│ Rows 1-5: ULA Categories                              │
│ ├─ "Sinawe Funeral Plan" | PiUsersThree | blue-100   │
│ ├─ "Individual Funeral" | PiUser | green-100         │
│ ├─ "Tinkhundla Funeral" | PiMapPin | purple-100      │
│ ├─ "Group Life" | PiUsers | orange-100              │
│ └─ "Credit Life" | PiBank | teal-100                │
│                                                         │
│ Rows 6-17: UGI Categories (12 total)                  │
│ ├─ "Legal Insurance" | PiGavel | blue-100            │
│ ├─ "Motor Insurance" | PiCar | green-100             │
│ ├─ "Personal Accident" | PiFirstAidKit | red-100    │
│ ├─ "Home Contents" | PiHouse | purple-100            │
│ ├─ "Home Insurance" | PiCheckCircle | orange-100    │
│ ├─ "Multimark Policy" | PiBuildings | indigo-100    │
│ ├─ "Medical Malpractice" | PiStethoscope | pink-100 │
│ ├─ "Professional..." | PiBriefcase | teal-100       │
│ ├─ "Bonds & Guarantees" | PiHandshake | amber-100   │
│ ├─ "Engineering..." | PiGear | cyan-100             │
│ ├─ "Fidelity..." | PiLock | lime-100                │
│ └─ "Political Violence" | PiShieldWarning | rose-100│
│                                                         │
│ Rows 18-19: UP Categories (2 total)                   │
│ ├─ "Micro Loan" | PiMoney | orange-100               │
│ └─ "Umlamleli Loan" | PiUser | amber-100             │
│                                                         │
└────────────────────────────────────────────────────────┘
```

---

## 🎯 Component Integration Points

### Integration Points (What Talks to What)

```
┌──────────────────────────────────────────────────┐
│ Frontend Components                              │
├──────────────────────────────────────────────────┤
│                                                  │
│  page.js (ULA/UGI/UP)                          │
│  ├─ Imports: CompanyProductPage                │
│  ├─ Imports: Product fetching function         │
│  └─ Passes: { companyCode, products }          │
│      │                                          │
│      ▼                                          │
│  CompanyProductPage (Reusable)                 │
│  ├─ Imports: useCompanyPageData hook           │
│  ├─ Calls: useCompanyPageData("ULA")           │
│  │   │                                          │
│  │   ▼                                          │
│  │ Custom Hook                                 │
│  │ ├─ Calls: getCompanyPageData(code)          │
│  │ ├─ Calls: getCompanyCategories(code)        │
│  │ └─ Returns: { pageData, categories }        │
│  │     │                                        │
│  │     ▼                                        │
│  │  Service Layer                              │
│  │  ├─ Function: getCompanyPageData()          │
│  │  │   └─ Calls: /api/cms/company-pages/:id  │
│  │  │                                          │
│  │  └─ Function: getCompanyCategories()        │
│  │      └─ Calls: /api/cms/company-categories/│
│  │                                             │
│  ├─ Renders: Product cards with dynamic data  │
│  └─ Tracks: Analytics with dynamic prefix     │
│                                                 │
└──────────────────────────────────────────────────┘
```

---

## ✅ Migration Validation Checklist

### Visual Validation

- [ ] ULA colors match original (#3d834d primary)
- [ ] UGI colors match original (#286278 primary)
- [ ] UP colors updated to accessible shade (#d67910)
- [ ] Hero backgrounds display correctly (/Life.jpg, /car.jpg, /loan.jpg)
- [ ] All text matches original exactly
- [ ] Category icons render correctly
- [ ] Product cards display identically
- [ ] Buttons have correct hover states
- [ ] Mobile layout responsive

### Functional Validation

- [ ] Search works on all pages
- [ ] Category filter appears only on UGI
- [ ] Product fetching still works
- [ ] CTA buttons navigate correctly
- [ ] Analytics events fire with correct prefix
- [ ] Empty state displays properly

### Data Validation

- [ ] cms_company_pages has 3 rows (ULA, UGI, UP)
- [ ] cms_product_categories has 19 rows
- [ ] ULA has 5 categories
- [ ] UGI has 12 categories
- [ ] UP has 2 categories
- [ ] All color values correct
- [ ] All text content correct

---

## 🔍 Comparison Tables

### Color References

| Company | Primary | Secondary | Header Bar | Issue |
|---------|---------|-----------|------------|-------|
| ULA | #3d834d | #2f6b3d | #2f6b3d | None |
| UGI | #286278 | #24576b | #204f61 | None |
| UP | #d67910* | #e0861c | #e0861c | Fixed |

*Updated from #f79620 for accessibility

### Text References

| Company | Hero Heading | CTA Heading | Primary Button |
|---------|--------------|-------------|-----------------|
| ULA | United Life Assurance | Ready to Secure Your Family's Future? | Get Covered Today |
| UGI | United General Insurance | Ready to Get Protected? | Get Free Quote |
| UP | United Pay | Ready to Access Funds? | Apply Now |

### Category Counts

| Company | Count | Name | Icons |
|---------|-------|------|-------|
| ULA | 5 | Life Insurance types | ✓ |
| UGI | 12 | Insurance types | ✓ |
| UP | 2 | Loan types | ✓ |

---

## 🚀 Deployment Checklist

### Pre-Deployment

- [ ] Database tables created and tested
- [ ] Seed data inserted and verified
- [ ] API endpoints working in development
- [ ] Custom hook tested with mock data
- [ ] CompanyProductPage component tested
- [ ] All 3 page stubs created
- [ ] Analytics tracking verified
- [ ] Accessibility check passed

### Deployment

- [ ] Deploy database changes
- [ ] Deploy API endpoints
- [ ] Deploy React components
- [ ] Deploy page updates
- [ ] Run smoke tests on all 3 pages
- [ ] Verify analytics in production
- [ ] Monitor error logs

### Post-Deployment

- [ ] Visual regression testing passed
- [ ] Performance metrics acceptable
- [ ] Analytics events recording correctly
- [ ] No console errors
- [ ] Mobile responsive confirmed
- [ ] Accessibility score maintained

---

**Document Status**: ✅ Complete  
**Visual Accuracy**: ✅ Verified  
**Ready for**: Development Implementation

