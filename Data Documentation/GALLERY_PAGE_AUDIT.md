GALLERY_PAGE_AUDIT.md

markdown
# 📄 Gallery Page Data Audit & CMS Migration

**File**: `app/gallery/page.js`  
**Type**: Page Component  
**Date Analyzed**: November 11, 2025

---

## 📋 Executive Summary

The Gallery page contains **hardcoded gallery data** with albums, images, and metadata. The page features album browsing, filtering by category and company, and a lightbox viewer. All gallery content should be managed through a CMS.

---

## 🔍 Hardcoded Data Inventory

### Section 1: Hero Section

**Location**: Lines 217-232

**Current Hardcoded Data**:
```javascript
<div className="text-center">
  <IoImagesOutline className="text-6xl mx-auto mb-4" />
  <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
  <p className="text-xl md:text-2xl max-w-2xl mx-auto">
    Capturing moments that define the United Group journey
  </p>
</div>
Data to Migrate:

json
{
  "section": "hero",
  "title": "Our Gallery",
  "subtitle": "Capturing moments that define the United Group journey",
  "icon": "IoImagesOutline",
  "background": "gradient-to-r from-[#9b1c20] via-[#3d834d] to-[#f79620]"
}
Section 2: Gallery Albums Data
Location: Lines 9-167 (Gallery data array)

Current Hardcoded Data Structure:

javascript
const galleryData = [
  {
    id: 1,
    category: "events",
    company: "UGI",
    title: "Annual Awards Ceremony 2024",
    description: "Celebrating outstanding performance and dedication...",
    date: "2024-01-20",
    location: "Manzini HQ",
    images: [
      {
        id: 1,
        src: "/images/gallery/awards-1.jpg",
        alt: "Team receiving awards",
        featured: true
      },
      // ... more images
    ]
  },
  // ... 7 more album objects
];
Data to Migrate (Gallery Album Entity):

json
{
  "section": "gallery_albums",
  "albums": [
    {
      "id": "uuid",
      "category": "events",
      "company": "UGI",
      "title": "Annual Awards Ceremony 2024",
      "description": "Celebrating outstanding performance and dedication...",
      "date": "2024-01-20",
      "location": "Manzini HQ",
      "images": [
        {
          "id": "uuid",
          "src": "/images/gallery/awards-1.jpg",
          "alt": "Team receiving awards",
          "caption": "Team receiving awards at annual ceremony",
          "featured": true,
          "order": 1,
          "metadata": {
            "width": 1200,
            "height": 800,
            "fileSize": "2.4MB",
            "uploadedAt": "2024-01-21T10:00:00Z"
          }
        }
      ],
      "status": "published",
      "featured": true,
      "slug": "annual-awards-ceremony-2024"
    }
  ]
}
Section 3: Company Information
Location: Lines 170-182

Current Hardcoded Data:

javascript
const COMPANY_INFO = {
  UGI: {
    name: "United General Insurance",
    color: "#9b1c20",
    bgColor: "bg-[#9b1c20]"
  },
  ULA: {
    name: "United Life Assurance", 
    color: "#3d834d",
    bgColor: "bg-[#3d834d]"
  },
  UP: {
    name: "United Pay",
    color: "#f79620",
    bgColor: "bg-[#f79620]"
  }
};
Data to Migrate:

json
{
  "section": "company_info",
  "companies": [
    {
      "code": "UGI",
      "name": "United General Insurance",
      "color": "#9b1c20",
      "galleryDescription": "Insurance events and office locations"
    },
    {
      "code": "ULA",
      "name": "United Life Assurance",
      "color": "#3d834d",
      "galleryDescription": "Life assurance community events"
    },
    {
      "code": "UP", 
      "name": "United Pay",
      "color": "#f79620",
      "galleryDescription": "Financial services and team activities"
    }
  ]
}
Section 4: Category Configuration
Location: Lines 185-194

Current Hardcoded Data:

javascript
const CATEGORY_ICONS = {
  events: IoCalendarOutline,
  offices: IoBusinessOutline,
  team: IoPeopleOutline,
  community: IoHeartOutline
};
Data to Migrate (Category Configuration):

json
{
  "section": "category_config",
  "categories": [
    {
      "slug": "events",
      "name": "Events",
      "icon": "IoCalendarOutline",
      "description": "Company events and ceremonies"
    },
    {
      "slug": "offices",
      "name": "Offices", 
      "icon": "IoBusinessOutline",
      "description": "Office locations and facilities"
    },
    {
      "slug": "team",
      "name": "Team",
      "icon": "IoPeopleOutline", 
      "description": "Team activities and building"
    },
    {
      "slug": "community",
      "name": "Community",
      "icon": "IoHeartOutline",
      "description": "Community outreach programs"
    }
  ]
}
Section 5: Filter Options
Location: Lines 240-241 (Derived from data)

Current Implementation:

javascript
const categories = ["all", ...new Set(galleryData.map(album => album.category))];
const companies = ["all", ...new Set(galleryData.map(album => album.company))];
Data to Migrate (Filter Configuration):

json
{
  "section": "filter_config",
  "filters": {
    "categories": ["events", "offices", "team", "community"],
    "companies": ["UGI", "ULA", "UP"],
    "defaultCategory": "all",
    "defaultCompany": "all"
  }
}
📊 Data Summary
Section	Type	Fields	Records
Hero	Text + Icon	2 text, 1 icon	1
Gallery Albums	Structured Data	9 fields × 8 albums	8
Album Images	Image Data	6 fields × 24 images	24
Company Info	Reference Data	4 fields × 3	3
Categories	Configuration	4 fields × 4	4
Filter Options	Configuration	2 arrays	1
TOTAL	-	187 data points	41 data items
🗄️ CMS Entities
Entity 1: GalleryPage
typescript
interface CMSGalleryPage {
  id: string
  slug: string = "gallery"
  
  // Hero Section
  heroTitle: string
  heroSubtitle: string
  heroIcon: string
  heroBackground: string
  
  // Filter Configuration
  defaultCategory: string
  defaultCompany: string
  
  // Metadata
  createdAt: ISO8601
  updatedAt: ISO8601
  publishedAt?: ISO8601
  status: 'draft' | 'published'
}
Entity 2: GalleryAlbum
typescript
interface CMSGalleryAlbum {
  id: string
  slug: string
  
  // Album Info
  title: string
  description: string
  category: string
  company: string
  location: string
  date: ISO8601
  
  // Images
  images: {
    id: string
    src: string
    alt: string
    caption?: string
    featured: boolean
    order: number
    metadata: {
      width: number
      height: number
      fileSize: string
      uploadedAt: ISO8601
    }
  }[]
  
  // Status
  status: 'draft' | 'published' | 'archived'
  featured: boolean
  
  // Metadata
  createdAt: ISO8601
  updatedAt: ISO8601
  publishedAt?: ISO8601
}
Entity 3: GalleryCategory
typescript
interface CMSGalleryCategory {
  id: string
  slug: string
  name: string
  icon: string
  description: string
  order: number
  active: boolean
}
Entity 4: Company (Extended)
typescript
interface CMSCompany {
  id: string
  code: string
  name: string
  color: string
  galleryDescription?: string
  galleryActive: boolean
  galleryOrder: number
}
🔌 API Endpoints Needed
text
// Gallery Page Content
GET  /api/cms/pages/gallery              // Get gallery page data
PUT  /api/cms/pages/gallery              // Update gallery page (admin)

// Albums Management
GET  /api/cms/gallery/albums             // Get all published albums
GET  /api/cms/gallery/albums/{id}        // Get single album
POST /api/cms/gallery/albums             // Create album (admin)
PUT  /api/cms/gallery/albums/{id}        // Update album (admin)
DELETE /api/cms/gallery/albums/{id}      // Delete album (admin)

// Categories
GET  /api/cms/gallery/categories         // Get all categories
GET  /api/cms/gallery/categories/{slug}  // Get category by slug

// Images
POST /api/cms/gallery/albums/{id}/images // Upload images (admin)
PUT  /api/cms/gallery/images/{id}        // Update image (admin)
DELETE /api/cms/gallery/images/{id}      // Delete image (admin)

// Favorites (User-specific)
GET  /api/cms/gallery/favorites          // Get user favorites
POST /api/cms/gallery/favorites/{id}     // Toggle favorite
🛠️ Migration Implementation
Current Implementation
javascript
// app/gallery/page.js - CURRENT
export default function GalleryPage() {
  const [galleryData, setGalleryData] = useState(initialGalleryData); // Hardcoded
  // ... component logic
}
After Migration
javascript
'use client'
import { useEffect, useState } from 'react'

export default function GalleryPage() {
  const [pageData, setPageData] = useState(null)
  const [albums, setAlbums] = useState([])
  const [categories, setCategories] = useState([])
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch all data in parallel
    Promise.all([
      fetch('/api/cms/pages/gallery').then(r => r.json()),
      fetch('/api/cms/gallery/albums?status=published').then(r => r.json()),
      fetch('/api/cms/gallery/categories').then(r => r.json()),
      fetch('/api/cms/companies').then(r => r.json())
    ])
    .then(([pageRes, albumsRes, categoriesRes, companiesRes]) => {
      setPageData(pageRes.data)
      setAlbums(albumsRes.data)
      setCategories(categoriesRes.data)
      setCompanies(companiesRes.data)
    })
    .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading gallery...</div>
  if (!pageData) return <div>Gallery page not found</div>

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Dynamic */}
      <div className="relative h-96 bg-gradient-to-r from-[#9b1c20] via-[#3d834d] to-[#f79620]">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="text-center">
            <IoImagesOutline className="text-6xl mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {pageData.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              {pageData.heroSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Rest of component using dynamic albums data */}
      {/* Filtering and album display logic remains similar but uses API data */}
    </div>
  )
}