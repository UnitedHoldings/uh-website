🧭 Header Component Data Audit & CMS Migration
File: components/Header/index.jsx
Type: Client Component
Date Analyzed: November 11, 2025

📋 Executive Summary
The Header component contains hardcoded navigation structure with 8 main navigation items and 3 dropdown menus. All navigation content, links, and structure can be moved to a CMS for dynamic management.

🔍 Hardcoded Data Inventory
Section 1: Department Colors
Location: Lines 31-35

Current Hardcoded Data:

javascript
const DEPARTMENT_COLORS = {
    "Life Assurance": "#3d834d",
    "General & Business Insurance": "#286278",
    "Loans & Financing": "#f79620",
};
Data to Migrate:

json
{
  "department_colors": {
    "life_assurance": "#3d834d",
    "general_business_insurance": "#286278",
    "loans_financing": "#f79620"
  }
}
Section 2: Products Dropdown Data
Location: Lines 38-86

Current Hardcoded Data:

javascript
const productsDropdown = useMemo(() => [
    {
        category: 'Life Assurance',
        icon: PiHeart,
        link: '/united-life-assurance',
        color: DEPARTMENT_COLORS["Life Assurance"],
        items: [
            { name: 'Dignified Homelink Cover', link: '/products/dignified-homelink-cover', icon: PiUsers },
            { name: 'Dignified Tribute Cover', link: '/products/dignified-tribute-cover', icon: PiUser },
            // ... 5 more items
        ]
    },
    {
        category: 'General Personal Insurance',
        icon: PiShieldCheck,
        link: '/united-general-insurance',
        color: DEPARTMENT_COLORS["General & Business Insurance"],
        items: [
            { name: 'Motor Insurance', link: '/products/motor-insurance', icon: PiCar },
            // ... 3 more items
        ]
    },
    {
        category: 'General Business Insurance',
        icon: PiBriefcase,
        color: DEPARTMENT_COLORS["General & Business Insurance"],
        items: [
            { name: 'Multimark Policy', link: '/products/multimark-policy', icon: PiBuildingOffice },
            // ... 6 more items
        ]
    },
    {
        category: 'Loans & Financing',
        icon: PiMoney,
        color: DEPARTMENT_COLORS["Loans & Financing"],
        items: [
            { name: 'Micro Loans', link: 'https://uploans.united.co.sz/', icon: PiMoney },
            { name: 'Umlamleli Loan (Salary Advance)', link: 'https://uploans.united.co.sz/', icon: PiTrendUp },
        ]
    }
], []);
Data to Migrate:

json
{
  "products_dropdown": {
    "categories": [
      {
        "id": "life_assurance",
        "name": "Life Assurance",
        "icon": "PiHeart",
        "link": "/united-life-assurance",
        "color": "#3d834d",
        "products": [
          {
            "id": "dignified_homelink_cover",
            "name": "Dignified Homelink Cover",
            "link": "/products/dignified-homelink-cover",
            "icon": "PiUsers"
          },
          // ... 16 total products across categories
        ]
      }
    ]
  }
}
Section 3: About Dropdown Data
Location: Lines 89-107

Current Hardcoded Data:

javascript
const aboutDropdown = useMemo(() => [
    { 
        name: "Our Journey", 
        link: "/about", 
        icon: PiHouseIcon,
        description: "Our story and mission"
    },
    { 
        name: "Our Team", 
        link: "/about/our-team", 
        icon: PiUsersThree,
        description: "Meet our dedicated team"
    },
    {
        name: "Careers", 
        link: "/about/careers", 
        icon: PiUsersThree,
        description: "Join our team and make a difference"
    },
    {
        name: "Gallery",
        link: "/about/gallery",
        icon: PiImage,
        description: "Take a look at our work"
    }
], []);
Data to Migrate:

json
{
  "about_dropdown": {
    "items": [
      {
        "id": "our_journey",
        "name": "Our Journey",
        "link": "/about",
        "icon": "PiHouseIcon",
        "description": "Our story and mission"
      },
      {
        "id": "our_team",
        "name": "Our Team",
        "link": "/about/our-team",
        "icon": "PiUsersThree",
        "description": "Meet our dedicated team"
      },
      {
        "id": "careers",
        "name": "Careers",
        "link": "/about/careers",
        "icon": "PiUsersThree",
        "description": "Join our team and make a difference"
      },
      {
        "id": "gallery",
        "name": "Gallery",
        "link": "/about/gallery",
        "icon": "PiImage",
        "description": "Take a look at our work"
      }
    ]
  }
}
Section 4: Resources Dropdown Data
Location: Lines 110-119

Current Hardcoded Data:

javascript
const resourcesDropdown = useMemo(() => [
    { 
        name: "Policies", 
        link: "/policies", 
        icon: PiFile,
        description: "Company policies and procedures"
    },
    { 
        name: "News Blog", 
        link: "/news", 
        icon: PiNewspaper,
        description: "Latest news and updates"
    },
], []);
Data to Migrate:

json
{
  "resources_dropdown": {
    "items": [
      {
        "id": "policies",
        "name": "Policies",
        "link": "/policies",
        "icon": "PiFile",
        "description": "Company policies and procedures"
      },
      {
        "id": "news_blog",
        "name": "News Blog",
        "link": "/news",
        "icon": "PiNewspaper",
        "description": "Latest news and updates"
      }
    ]
  }
}
Section 5: Main Navigation Items
Location: Lines 122-131

Current Hardcoded Data:

javascript
const mainNavItems = [
    { name: "HOME", link: "/" },
    { name: "ABOUT US", link: "/about", dropdown: aboutDropdown },
    { name: "PRODUCTS", dropdown: productsDropdown },
    { name: "UNITED LIFE ASSURANCE", link: "companies/ULA" },
    { name: "UNITED GENERAL INSURANCE", link: "companies/UGI" },
    { name: "UNITED PAY", link: "companies/UP" },
    { name: "RESOURCES", dropdown: resourcesDropdown },
    { name: "CONTACT US", link: "/contact" },
];
Data to Migrate:

json
{
  "main_navigation": {
    "items": [
      {
        "id": "home",
        "name": "HOME",
        "link": "/",
        "type": "link",
        "order": 1
      },
      {
        "id": "about_us",
        "name": "ABOUT US",
        "link": "/about",
        "type": "dropdown",
        "dropdown_ref": "about_dropdown",
        "order": 2
      },
      {
        "id": "products",
        "name": "PRODUCTS",
        "type": "dropdown",
        "dropdown_ref": "products_dropdown",
        "order": 3
      },
      {
        "id": "united_life_assurance",
        "name": "UNITED LIFE ASSURANCE",
        "link": "companies/ULA",
        "type": "link",
        "order": 4
      },
      {
        "id": "united_general_insurance",
        "name": "UNITED GENERAL INSURANCE",
        "link": "companies/UGI",
        "type": "link",
        "order": 5
      },
      {
        "id": "united_pay",
        "name": "UNITED PAY",
        "link": "companies/UP",
        "type": "link",
        "order": 6
      },
      {
        "id": "resources",
        "name": "RESOURCES",
        "type": "dropdown",
        "dropdown_ref": "resources_dropdown",
        "order": 7
      },
      {
        "id": "contact_us",
        "name": "CONTACT US",
        "link": "/contact",
        "type": "link",
        "order": 8
      }
    ]
  }
}
📊 Data Summary
Section	Type	Fields	Records
Department Colors	Key-Value	3 pairs	3
Products Dropdown	Nested Categories	4 categories, 18 products	22
About Dropdown	Menu Items	4 items	4
Resources Dropdown	Menu Items	2 items	2
Main Navigation	Navigation Items	8 items	8
TOTAL	-	39 data fields	39 items
🗄️ CMS Entity: HeaderNavigation
typescript
interface CMSHeaderNavigation {
  id: string
  slug: string = "header-navigation"
  
  // Department Colors
  departmentColors: {
    life_assurance: string
    general_business_insurance: string
    loans_financing: string
  }
  
  // Main Navigation Structure
  mainNavigation: {
    items: Array<{
      id: string
      name: string
      link?: string
      type: 'link' | 'dropdown'
      dropdown_ref?: string
      order: number
      is_active: boolean
    }>
  }
  
  // Dropdown Contents
  dropdowns: {
    about: Array<{
      id: string
      name: string
      link: string
      icon: string
      description: string
      order: number
    }>
    resources: Array<{
      id: string
      name: string
      link: string
      icon: string
      description: string
      order: number
    }>
    products: Array<{
      id: string
      name: string
      icon: string
      link?: string
      color: string
      order: number
      products: Array<{
        id: string
        name: string
        link: string
        icon: string
        order: number
        is_external: boolean
      }>
    }>
  }
  
  // Metadata
  createdAt: ISO8601
  updatedAt: ISO8601
  publishedAt?: ISO8601
  status: 'draft' | 'published'
}
🔌 API Endpoints Needed
text
GET  /api/cms/navigation/header              // Get header navigation data
PUT  /api/cms/navigation/header              // Update header (admin)
GET  /api/cms/navigation/header/products     // Get products dropdown only
PUT  /api/cms/navigation/header/products/{id} // Update product category (admin)
🛠️ Migration Implementation
Current Implementation
javascript
// components/Header/index.jsx - CURRENT
export default function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    
    // Hardcoded dropdown data
    const productsDropdown = useMemo(() => [...], []);
    const aboutDropdown = useMemo(() => [...], []);
    const resourcesDropdown = useMemo(() => [...], []);
    
    const mainNavItems = [ ... ];
    
    return (
        <div className="w-full sticky top-0 z-40 bg-white shadow-sm">
            <DesktopHeader mainNavItems={mainNavItems} />
            <MobileHeader onMenuClick={toggleDrawer} />
            <MobileDrawer ... />
        </div>
    );
}
After Migration
javascript
"use client"
import React, { useState, useEffect } from 'react';
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';
import { MobileDrawer } from './MobileDrawer';

// Icon mapping
const iconMap = {
    PiHeart, PiShieldCheck, PiBriefcase, PiMoney, PiUsers, PiUser, 
    PiCalendar, PiCar, PiHouse, PiScales, PiWarningCircle, PiBuildingOffice,
    PiFileText, PiLock, PiTrendUp, PiHouseIcon, PiUsersThree, PiImage, 
    PiFile, PiNewspaper
};

export default function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);
    const [navigationData, setNavigationData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/cms/navigation/header')
            .then(r => r.json())
            .then(({ data }) => setNavigationData(data))
            .finally(() => setLoading(false));
    }, []);

    // Transform CMS data to component format
    const transformNavigationData = (data) => {
        if (!data) return { mainNavItems: [] };

        const transformDropdownItem = (item) => ({
            ...item,
            icon: iconMap[item.icon]
        });

        const productsDropdown = data.dropdowns.products.map(category => ({
            ...category,
            icon: iconMap[category.icon],
            items: category.products.map(product => transformDropdownItem(product))
        }));

        const aboutDropdown = data.dropdowns.about.map(transformDropdownItem);
        const resourcesDropdown = data.dropdowns.resources.map(transformDropdownItem);

        const mainNavItems = data.mainNavigation.items.map(item => {
            const baseItem = { name: item.name, link: item.link };
            
            if (item.type === 'dropdown') {
                return {
                    ...baseItem,
                    dropdown: item.dropdown_ref === 'products_dropdown' ? productsDropdown :
                             item.dropdown_ref === 'about_dropdown' ? aboutDropdown :
                             item.dropdown_ref === 'resources_dropdown' ? resourcesDropdown : []
                };
            }
            
            return baseItem;
        });

        return { mainNavItems, departmentColors: data.departmentColors };
    };

    if (loading) {
        return (
            <div className="w-full sticky top-0 z-40 bg-white shadow-sm h-16">
                {/* Loading skeleton */}
            </div>
        );
    }

    const { mainNavItems, departmentColors } = transformNavigationData(navigationData);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
        setMobileActiveDropdown(null);
    };

    const toggleMobileDropdown = (item) => {
        setMobileActiveDropdown(mobileActiveDropdown === item ? null : item);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
        setMobileActiveDropdown(null);
    };

    return (
        <div className="w-full sticky top-0 z-40 bg-white shadow-sm">
            <DesktopHeader 
                mainNavItems={mainNavItems} 
                departmentColors={departmentColors} 
            />
            <MobileHeader onMenuClick={toggleDrawer} />
            <MobileDrawer
                isOpen={isDrawerOpen}
                onClose={closeDrawer}
                mainNavItems={mainNavItems}
                mobileActiveDropdown={mobileActiveDropdown}
                onToggleDropdown={toggleMobileDropdown}
                departmentColors={departmentColors}
            />
        </div>
    );
}
📋 Implementation Checklist
Phase 1: API Development
Create /api/cms/navigation/header endpoint

Implement GET endpoint for header data

Implement PUT endpoint for admin updates

Add database table navigation with header schema

Phase 2: Data Migration
Export current navigation structure

Create database records with proper relationships

Validate all links and icons

Create admin interface for navigation management

Phase 3: Frontend Update
Update Header component to use API data

Add loading state and error handling

Update DesktopHeader and MobileHeader to receive colors

Test all dropdown functionality

Verify external link handling

Phase 4: Testing
Test desktop navigation with all dropdowns

Test mobile navigation and drawer

Test external links (United Pay loans)

Test navigation ordering

Verify icon rendering

🎯 Benefits of Migration
Current Issues
❌ Navigation changes require code deployment

❌ Hard to add/remove products

❌ No way to A/B test navigation structure

❌ Difficult to manage seasonal navigation items

After Migration
✅ Update navigation without code changes

✅ Easy product catalog management

✅ A/B test different navigation structures

✅ Seasonal/holiday navigation items

✅ Better analytics on navigation usage

📊 Database Schema
sql
CREATE TABLE navigation (
  id UUID PRIMARY KEY,
  slug VARCHAR(255) UNIQUE,
  
  -- Department Colors
  department_colors JSONB,
  
  -- Main Navigation
  main_navigation JSONB,
  
  -- Dropdowns
  dropdowns JSONB,
  
  -- Metadata
  status VARCHAR(20) DEFAULT 'published',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP
);

-- Alternative normalized approach for complex navigation:
CREATE TABLE navigation_items (
  id UUID PRIMARY KEY,
  navigation_id UUID REFERENCES navigation(id),
  name VARCHAR(255),
  link VARCHAR(500),
  type VARCHAR(50), -- 'link', 'dropdown'
  dropdown_type VARCHAR(50), -- 'products', 'about', 'resources'
  order_index INTEGER,
  is_active BOOLEAN DEFAULT true,
  parent_id UUID REFERENCES navigation_items(id),
  
  -- Dropdown specific
  icon VARCHAR(100),
  description TEXT,
  color VARCHAR(7),
  is_external BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
🔒 Security Notes
Admin endpoints require authentication

Validate all URLs to prevent XSS

Sanitize navigation item names

Implement rate limiting on public endpoint

Cache navigation data (24-hour TTL recommended)

📈 Performance Considerations
Current
Static navigation loads instantly

No additional network requests

Fast client-side navigation

After Migration
One API call on initial load

~100-200ms additional load time

Can be optimized with:

Service Worker caching

LocalStorage persistence

Prefetching on hover

Recommendation
Use Client-Side Caching:

javascript
// components/Header/index.jsx
const CACHE_KEY = 'header-navigation-v1';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

useEffect(() => {
    // Check cache first
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) {
            setNavigationData(data);
            setLoading(false);
            return;
        }
    }
    
    // Fetch fresh data
    fetch('/api/cms/navigation/header')
        .then(r => r.json())
        .then(({ data }) => {
            setNavigationData(data);
            // Cache the response
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                data,
                timestamp: Date.now()
            }));
        })
        .finally(() => setLoading(false));
}, []);