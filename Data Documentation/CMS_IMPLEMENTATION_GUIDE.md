# CMS Integration Implementation Guide

**Quick Reference for Developers**

---

## 📌 Quick Summary

This guide shows you **exactly where** hardcoded data lives in your project and **how to convert it** to use the CMS API.

---

## 🎯 File-by-File Guide

### 1. **ProductsData.js** → Products API

**Current Location**: `components/ProductsData.js`

**Current Code**:
```javascript
const ProductsData = [
  {
    name: 'Life Assurance',
    tagline: 'Long-term protection...',
    // ... 50+ lines per product
  },
  // ... 25 products
]
export default ProductsData
```

**What it contains**:
- 25+ hardcoded product objects
- Each with benefits, coverage, exclusions, FAQs
- Related products cross-references
- Icons mapped via `iconMap`

**Migration**:
```javascript
// BEFORE
import ProductsData from '@/components/ProductsData'
const products = ProductsData

// AFTER
const fetchProducts = async () => {
  const response = await fetch('/api/cms/products?published=true')
  const { data } = await response.json()
  return data
}

// In your component
useEffect(() => {
  fetchProducts().then(setProducts)
}, [])
```

**API Response Example**:
```json
{
  "success": true,
  "data": [
    {
      "id": "prod-001",
      "slug": "life-assurance",
      "name": "Life Assurance",
      "tagline": "Long-term protection...",
      "company": "ula",
      "category": "life",
      "heroImage": "/images/life.jpg",
      "overview": "...",
      "stats": ["Claims approved in 2 hours", "..."],
      "benefits": [
        {
          "id": "ben-001",
          "text": "Financial security for family",
          "iconKey": "heart",
          "order": 1
        }
      ],
      "coverage": [...],
      "exclusions": [...],
      "faqs": [...]
    }
  ]
}
```

---

### 2. **WhyChooseUs.js** → Reviews & Reasons API

**Current Location**: `components/WhyChooseUs.js`

**Current Code**:
```javascript
useEffect(() => {
  const fetchReviews = async () => {
    const response = await fetch('/api/home')
    const data = await response.json()
    if (data.success && data.data && data.data.reviews) {
      setReviews(data.data.reviews)
      setReasonsData(data.data.reasons)
    }
  }
  fetchReviews()
}, [])
```

**What it fetches**:
- Customer reviews with ratings
- Why choose us reasons
- Statistics data

**Better Migration**:
```javascript
// Split into separate API calls for clarity
useEffect(() => {
  Promise.all([
    fetch('/api/cms/reviews?featured=true&status=approved'),
    fetch('/api/cms/reasons')
  ])
  .then(([revRes, reasonRes]) => Promise.all([revRes.json(), reasonRes.json()]))
  .then(([reviews, reasons]) => {
    setReviews(reviews.data)
    setReasonsData(reasons.data)
  })
}, [])
```

---

### 3. **Hero.js** → Hero Slides API

**Current Location**: `components/Hero.js`

**Current Code**:
```javascript
const fetchSlidesData = async () => {
  try {
    const response = await fetch(API_URL)
    // ... transform data
  }
}
```

**Migration**:
```javascript
const fetchSlides = async () => {
  const response = await fetch('/api/cms/slides?published=true&status=published')
  const { data } = await response.json()
  return data.sort((a, b) => a.order - b.order)
}
```

---

### 4. **ProductsPage** (`app/products/[slug]/page.js`) → Dynamic Routes

**Current Code**:
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

**Better Approach**:
```javascript
// Fetch from API
const fetchCompanyConfig = async (companyCode) => {
  const response = await fetch(`/api/cms/companies?code=${companyCode}`)
  return response.json()
}

// Or cache in configuration
const fetchConfig = async () => {
  const response = await fetch('/api/cms/config?category=colors')
  return response.json()
}
```

---

### 5. **Team Page** (`app/about/our-team/page.js`) → Team API

**Current Code**:
```javascript
const fetchTeamData = async () => {
  const response = await fetch(EXTERNAL_API)
  // ... transform data
}
```

**Migration**:
```javascript
const fetchTeam = async () => {
  const response = await fetch('/api/cms/team?status=active')
  const { data } = await response.json()
  return data.sort((a, b) => a.sequence - b.sequence)
}
```

---

### 6. **BranchMap.js** → Branches API

**Current Code**:
```javascript
const filteredBranches = branches.filter(...)
const getBranchStats = () => { ... }
```

**Migration**:
```javascript
const fetchBranches = async (city = null) => {
  const url = city 
    ? `/api/cms/branches?city=${city}`
    : '/api/cms/branches'
  const response = await fetch(url)
  return response.json()
}
```

---

### 7. **RenderForm.js** → Form Configuration API

**Current Code**:
```javascript
const getProductCategory = () => {
  if (productName.includes('funeral')) return 'life'
  if (productName.includes('motor')) return 'motor'
  // ... manual category detection
}
```

**Better Approach**:
```javascript
// Get form fields from API based on product
const fetchFormConfig = async (productSlug) => {
  const response = await fetch(`/api/cms/forms?product=${productSlug}`)
  return response.json()
}

// Use dynamic field rendering
const renderFormFields = (fields) => {
  return fields
    .sort((a, b) => a.order - b.order)
    .map(field => (
      <FormField key={field.id} config={field} />
    ))
}
```

---

### 8. **Configuration Data** → Config API

**Current Locations**:
- `Header.js`: DEPARTMENT_COLORS
- `Hero.js`: SLIDE_DEPARTMENTS
- `EmailGateClean.jsx`: STORAGE_KEYS
- `Agent.js`: emailMap
- `productCompany.js`: company mappings

**Unified Migration**:
```javascript
// Create a config service
class ConfigService {
  private cache = {}

  async get(key) {
    if (this.cache[key]) return this.cache[key]
    
    const response = await fetch(`/api/cms/config/${key}`)
    const { data } = await response.json()
    this.cache[key] = data.value
    return data.value
  }

  async getByCategory(category) {
    const response = await fetch(
      `/api/cms/config?category=${category}`
    )
    return response.json()
  }
}

// Usage
const emailConfig = await ConfigService.get('email_sales')
const colors = await ConfigService.getByCategory('colors')
```

---

## 🔧 Implementation Checklist

### Step 1: Create API Service Layer
```javascript
// lib/cms-api.js
export const CMS_API = {
  products: {
    list: () => fetch('/api/cms/products'),
    bySlug: (slug) => fetch(`/api/cms/products?slug=${slug}`),
    byCompany: (code) => fetch(`/api/cms/products?company=${code}`)
  },
  reviews: {
    featured: () => fetch('/api/cms/reviews?featured=true&status=approved')
  },
  team: {
    list: () => fetch('/api/cms/team?status=active')
  },
  branches: {
    list: () => fetch('/api/cms/branches'),
    byCity: (city) => fetch(`/api/cms/branches?city=${city}`)
  },
  config: {
    get: (key) => fetch(`/api/cms/config/${key}`),
    byCategory: (cat) => fetch(`/api/cms/config?category=${cat}`)
  }
}
```

### Step 2: Create React Hook for Data Fetching
```javascript
// hooks/useCMS.js
export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    CMS_API.products.list()
      .then(r => r.json())
      .then(({ data }) => setProducts(data))
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { products, loading, error }
}
```

### Step 3: Replace Static Data
```javascript
// BEFORE
import ProductsData from '@/components/ProductsData'
const products = ProductsData

// AFTER
const { products, loading } = useProducts()
```

### Step 4: Update Components
```javascript
// components/ProductCard.jsx
export function ProductCard({ product }) {
  return (
    <div>
      <img src={product.heroImage} />
      <h2>{product.name}</h2>
      <p>{product.tagline}</p>
      {product.benefits.map(benefit => (
        <div key={benefit.id}>
          {getIcon(benefit.iconKey)}
          <span>{benefit.text}</span>
        </div>
      ))}
    </div>
  )
}
```

---

## 🚀 Deployment Strategy

### Option A: Parallel Running (Recommended)
1. Deploy API with all endpoints
2. Add feature flags to switch between static & API data
3. Gradually roll out to 10% → 25% → 50% → 100% of users
4. Monitor for errors
5. Remove static data files

### Option B: Big Bang Migration
1. Deploy API with all data
2. Update frontend simultaneously
3. Keep static files as fallback
4. Monitor closely

### Option C: Phased by Feature
1. Migrate Products → Use API
2. Migrate Reviews → Use API
3. Migrate Team → Use API
4. etc.

**Recommended**: Option A with gradual rollout

---

## 🧪 Testing Checklist

- [ ] API endpoints return correct data
- [ ] Error handling works (404, 500, timeout)
- [ ] Loading states display correctly
- [ ] Data caching improves performance
- [ ] SEO/metadata still works
- [ ] Mobile responsiveness unchanged
- [ ] Performance is equal or better
- [ ] No console errors

---

## 📊 Performance Considerations

### Caching Strategy
```javascript
// Cache products for 1 hour
const CACHE_TTL = 60 * 60 * 1000

const cachedFetch = async (url) => {
  const cached = localStorage.getItem(url)
  if (cached) {
    const { data, timestamp } = JSON.parse(cached)
    if (Date.now() - timestamp < CACHE_TTL) {
      return data
    }
  }

  const response = await fetch(url)
  const data = await response.json()
  localStorage.setItem(url, JSON.stringify({
    data,
    timestamp: Date.now()
  }))
  return data
}
```

### Database Optimization
- Add indexes on frequently queried fields
- Implement pagination for large lists
- Use field selection (only fetch needed fields)
- Consider materialized views for complex queries

---

## 🔒 Security Notes

- ✅ Always validate API responses
- ✅ Sanitize user input in forms
- ✅ Use HTTPS only
- ✅ Implement CSRF protection
- ✅ Add rate limiting to prevent abuse
- ✅ Use environment variables for API keys

---

## 📚 Additional Resources

- OpenAPI Specification (to be created)
- API Authentication Guide (to be created)
- Database Schema Documentation (provided in main audit)
- Admin CMS User Guide (to be created)

---

**Last Updated**: November 11, 2025  
**Status**: Ready for Implementation
