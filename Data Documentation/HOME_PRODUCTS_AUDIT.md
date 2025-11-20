Home Products Component Data Audit & CMS Migration
File: components/Products.js (or wherever the Products component is located)
Type: React Component
Date Analyzed: November 11, 2025

📋 Executive Summary
The Products component contains hardcoded product data for 10 insurance products across 3 companies. All product information, images, and metadata can be moved to a CMS for dynamic management.

🔍 Hardcoded Data Inventory
Section 1: Component Header
Location: Lines 233-242

Current Hardcoded Data:

javascript
<h3 className="text-2xl md:text-3xl font-bold text-[#9b1c20] mb-2 font-outfit">
    Featured Products
</h3>
<p className="text-gray-600 max-w-2xl text-lg lg:text-xl">
    Explore our range of innovative solutions from United General Insurance,
    United Life Assurance, and United Pay.
</p>
Data to Migrate:

json
{
  "section": "products_header",
  "heading": "Featured Products",
  "description": "Explore our range of innovative solutions from United General Insurance, United Life Assurance, and United Pay."
}
Section 2: Product Data Array
Location: Lines 17-96 (productData array)

Current Structure:

javascript
const productData = [
  {
    title: 'Family Funeral Plan',
    desc: 'Comprehensive funeral coverage for your entire family...',
    img: '/family.jpg',
    company: 'ULA',
    icon: <BsHeart className="text-2xl" />,
    stats: ['From E50/month', 'Family Coverage', 'Quick Payouts'],
    link: '/products/family-funeral-plan',
    color: '#3d834d',
    bgColor: '#3d834d'
  },
  // ... 9 more products
];
Data to Migrate (Product Schema):

json
{
  "section": "featured_products",
  "products": [
    {
      "id": "family-funeral-plan",
      "title": "Family Funeral Plan",
      "description": "Comprehensive funeral coverage for your entire family with quick claims processing and flexible payment terms. Protect your loved ones during difficult times.",
      "image": "/family.jpg",
      "company": "ULA",
      "icon": "BsHeart",
      "stats": ["From E50/month", "Family Coverage", "Quick Payouts"],
      "link": "/products/family-funeral-plan",
      "color": "#3d834d",
      "backgroundColor": "#3d834d",
      "order": 1,
      "status": "active"
    },
    {
      "id": "individual-funeral-plan",
      "title": "Individual Funeral Plan",
      "description": "Personalized funeral coverage with fast payouts and premium flexibility. Ensure your final journey is handled with dignity and care.",
      "image": "/individual-funeral.jpg",
      "company": "ULA",
      "icon": "BsPeople",
      "stats": ["From E30/month", "Personal Coverage", "Flexible Payments"],
      "link": "/products/individual-funeral-plan",
      "color": "#3d834d",
      "backgroundColor": "#3d834d",
      "order": 2,
      "status": "active"
    }
    // ... 8 more products
  ]
}
Section 3: Carousel Configuration
Location: Lines 225-250

Current Hardcoded Data:

javascript
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1400 },
    items: 3,
    partialVisibilityGutter: 20
  },
  desktop: {
    breakpoint: { max: 1400, min: 1024 },
    items: 3,
    partialVisibilityGutter: 20
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
    partialVisibilityGutter: 0
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
    partialVisibilityGutter: 30
  }
};
Data to Migrate:

json
{
  "section": "carousel_config",
  "autoPlay": true,
  "autoPlaySpeed": 5000,
  "responsive": {
    "superLargeDesktop": { "items": 3, "gutter": 20 },
    "desktop": { "items": 3, "gutter": 20 },
    "tablet": { "items": 2, "gutter": 0 },
    "mobile": { "items": 1, "gutter": 30 }
  }
}
📊 Data Summary
Section	Type	Fields	Records
Header	Text	1 heading, 1 description	1
Products	Cards (10x)	9 fields × 10 products	10
Carousel Config	Settings	6 configuration fields	1
TOTAL	-	92 data fields	12 data items
🗄️ CMS Entity: FeaturedProducts
typescript
interface CMSFeaturedProducts {
  id: string
  slug: string = "featured-products"
  
  // Header Section
  heading: string
  description: string
  
  // Products Array
  products: {
    id: string
    title: string
    description: string
    image: string
    company: 'ULA' | 'UGI' | 'UP'
    icon: string  // React Icon name
    stats: string[]  // Array of 3 stats
    link: string
    color: string
    backgroundColor: string
    order: number
    status: 'active' | 'inactive' | 'draft'
    featured: boolean
  }[]
  
  // Carousel Configuration
  carousel: {
    autoPlay: boolean
    autoPlaySpeed: number
    responsive: {
      superLargeDesktop: { items: number, gutter: number }
      desktop: { items: number, gutter: number }
      tablet: { items: number, gutter: number }
      mobile: { items: number, gutter: number }
    }
  }
  
  // Metadata
  createdAt: ISO8601
  updatedAt: ISO8601
  publishedAt?: ISO8601
  status: 'draft' | 'published'
}