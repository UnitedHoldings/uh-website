# WhyChooseUs Component - Comprehensive CMS Audit

**Component**: `components/WhyChooseUs.js`  
**Status**: API-Integrated (Partially) + Hardcoded Data  
**Lines of Code**: 950+  
**Data Sources**: 2 (Reasons hardcoded, Reviews from API)  
**Last Updated**: November 11, 2025

---

## 📋 Executive Summary

The `WhyChooseUs` component is a complex, feature-rich section displaying company benefits, customer testimonials, and statistics. It currently has a **mixed data approach**:

- ✅ **Reviews**: Fetched from `/api/home` endpoint (API-driven)
- ❌ **Reasons**: Hardcoded directly in component (3 cards)
- ❌ **Stats**: Hardcoded directly in component (4 stats)
- ❌ **Colors & Styling**: Hardcoded constants
- ❌ **UI Constants**: Hardcoded (AUTO_PLAY_INTERVAL, MAX_STARS, etc.)

**Total Hardcoded Items**: 21  
**Effort to Migrate**: 4-6 hours  
**Complexity Level**: Medium-High (carousel, animations, carousel logic)

---

## 📊 Data Inventory & Audit

### 1. **Reasons Data** (Lines 28-51)

**Current Implementation**:
```javascript
const reasonsData = [
  {
    title: "80+ Years of Trusted Service",
    content: "We're the right partner you can choose with over 70 years of doing business in the Kingdom of Eswatini. We're your trusted brand here to provide not just products and services, but rather the peace of mind to get on with the things in life that really matter to you.",
    icon: <FaShieldAlt className="text-white text-3xl" aria-label="Trusted Service" />,
    gradient: "from-[#9b1c20] to-[#c8232c]",
    accentColor: "#9b1c20"
  },
  {
    title: "Serving you with Integrity",
    content: "We don't do insurance for ourselves, we do it for your peace of mind. Our commitment to ethical practices and transparent dealings ensures you always get the best service possible.",
    icon: <FaHandshake className="text-white text-3xl" aria-label="Integrity" />,
    gradient: "from-[#7a1619] to-[#9b1c20]",
    accentColor: "#7a1619"
  },
  {
    title: "Swazi Insurance for the International Market",
    content: "With over 80 years of doing business in Eswatini, United Holdings is best suited and experienced to provide uniquely tailored solutions that understand both local needs and global standards.",
    icon: <FaGlobeAfrica className="text-white text-3xl" aria-label="International Market" />,
    gradient: "from-[#9b1c20] to-[#F9AF55]",
    accentColor: "#9b1c20"
  },
];
```

**Data Fields**:
| Field | Type | Status | Value |
|-------|------|--------|-------|
| title | String | ❌ Hardcoded | 80+ Years of Trusted Service |
| content | String | ❌ Hardcoded | Long-form text (120+ chars each) |
| icon | React Component | ❌ Hardcoded | FaShieldAlt, FaHandshake, FaGlobeAfrica |
| gradient | String | ❌ Hardcoded | Tailwind gradient classes |
| accentColor | String | ❌ Hardcoded | #9b1c20, #7a1619 |
| displayOrder | Implicit | ❌ Hardcoded | Array index (0, 1, 2) |

**Summary**: 3 reason cards with 5 hardcoded properties each = **15 hardcoded fields**

---

### 2. **Stats Data** (Lines 53-58)

**Current Implementation**:
```javascript
const statsData = [
  { value: "80+", label: "Years of Excellence", color: "text-white", sublabel: "Trusted Service" },
  { value: "50K+", label: "Happy Clients", color: "text-white", sublabel: "Satisfied Customers" },
  { value: "24/7", label: "Support", color: "text-white", sublabel: "Always Available" },
  { value: "98%", label: "Satisfaction", color: "text-white", sublabel: "Claim Approval Rate" }
];
```

**Data Fields**:
| Field | Type | Status | Value |
|-------|------|--------|-------|
| value | String | ❌ Hardcoded | 80+, 50K+, 24/7, 98% |
| label | String | ❌ Hardcoded | Years of Excellence, etc. |
| sublabel | String | ❌ Hardcoded | Trusted Service, etc. |
| color | String | ❌ Hardcoded | text-white (all) |

**Summary**: 4 stat cards with 4 hardcoded properties each = **16 hardcoded fields**

---

### 3. **UI Constants** (Lines 16-24)

**Current Implementation**:
```javascript
const AUTO_PLAY_INTERVAL = 6000;
const MAX_STARS = 5;

const colors = {
  primary: '#9b1c20',
  primaryLight: '#c8232c',
  primaryDark: '#7a1619',
  accent: '#F9AF55',
  accentLight: '#fbc374',
  darkBg: '#1a1a1a',
  lightBg: '#f8f9fa'
};
```

**Data Fields**:
| Field | Type | Status | Value |
|-------|------|--------|-------|
| AUTO_PLAY_INTERVAL | Number | ❌ Hardcoded | 6000 |
| MAX_STARS | Number | ❌ Hardcoded | 5 |
| colors.* | Object | ❌ Hardcoded | 7 color values |

**Summary**: 9 configuration values hardcoded

---

### 4. **Reviews Data** (Lines 900+)

**Current Implementation**: Fetched from `/api/home`

```javascript
useEffect(() => {
  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/home');
      const data = await response.json();
      if (data.success && data.data && data.data.reviews) {
        setReviews(data.data.reviews);
        setReasonsData(data.data.reasons);  // ← Note: This overwrites hardcoded reasonsData!
      }
    } catch (err) {
      setError(err.message);
    }
  };
  fetchReviews();
}, []);
```

**Expected API Response Structure**:
```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "_id": "unique-id",
        "name": "John Doe",
        "role": "Business Owner",
        "company": "ABC Corp",
        "content": "Review text...",
        "rating": 5
      }
    ],
    "reasons": [
      {
        "id": 1,
        "title": "Reason title",
        "content": "Reason content",
        "icon": "IconName",
        "gradient": "gradient-class",
        "accentColor": "#color"
      }
    ]
  }
}
```

**Status**: ✅ API exists, but component ignores API and uses hardcoded `reasonsData` initially, then tries to overwrite with API data

---

## 🗂️ CMS Entity Design

### CMSReasonCard Entity

**Purpose**: Store "Why Choose Us" reason cards  
**Scope**: 3-5 cards typically  
**Update Frequency**: 2-3 times per year

**TypeScript Interface**:
```typescript
interface CMSReasonCard {
  id: string;
  displayOrder: number;
  title: string;
  content: string;
  iconName: string; // "shield" | "handshake" | "globe"
  gradientStart: string;
  gradientEnd: string;
  accentColor: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
```

### CMSStatCard Entity

**Purpose**: Store company statistics/metrics  
**Scope**: 3-6 stats typically  
**Update Frequency**: Quarterly or as metrics change

**TypeScript Interface**:
```typescript
interface CMSStatCard {
  id: string;
  displayOrder: number;
  value: string; // "80+" | "50K+" | "24/7" | "98%"
  label: string;
  sublabel: string;
  color: string; // Tailwind color class or hex
  type: "number" | "percent" | "text"; // For formatting
  targetNumber?: number; // For animation calculation
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
```

### CMSWhyChooseUsConfig Entity

**Purpose**: Store component-level configuration  
**Scope**: Single record  
**Update Frequency**: Rarely

**TypeScript Interface**:
```typescript
interface CMSWhyChooseUsConfig {
  id: string;
  sectionTitle: string;
  sectionDescription: string;
  autoPlayInterval: number; // milliseconds
  maxStars: number; // for review ratings
  reviewsPerPage: number;
  statsAnimationDuration: number; // milliseconds
  showCTA: boolean;
  ctaText: string;
  ctaAction: string;
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    accent: string;
    accentLight: string;
    darkBg: string;
    lightBg: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
```

---

## 🗄️ Database Schema (PostgreSQL)

### Table: cms_reason_cards

```sql
CREATE TABLE cms_reason_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_order INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  icon_name VARCHAR(50) NOT NULL,
  gradient_start VARCHAR(50) NOT NULL,
  gradient_end VARCHAR(50) NOT NULL,
  accent_color VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID NOT NULL,
  updated_by UUID NOT NULL,
  
  CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users(id),
  CONSTRAINT fk_updated_by FOREIGN KEY (updated_by) REFERENCES users(id)
);

CREATE INDEX idx_reason_cards_display_order ON cms_reason_cards(display_order);
CREATE INDEX idx_reason_cards_active ON cms_reason_cards(is_active);
```

### Table: cms_stat_cards

```sql
CREATE TABLE cms_stat_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_order INTEGER NOT NULL,
  value VARCHAR(50) NOT NULL,
  label VARCHAR(255) NOT NULL,
  sublabel VARCHAR(255),
  color VARCHAR(50) NOT NULL,
  type VARCHAR(20) NOT NULL, -- 'number', 'percent', 'text'
  target_number INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID NOT NULL,
  updated_by UUID NOT NULL,
  
  CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users(id),
  CONSTRAINT fk_updated_by FOREIGN KEY (updated_by) REFERENCES users(id)
);

CREATE INDEX idx_stat_cards_display_order ON cms_stat_cards(display_order);
CREATE INDEX idx_stat_cards_active ON cms_stat_cards(is_active);
```

### Table: cms_whychooseus_config

```sql
CREATE TABLE cms_whychooseus_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_title VARCHAR(255) NOT NULL,
  section_description TEXT NOT NULL,
  auto_play_interval INTEGER NOT NULL DEFAULT 6000,
  max_stars INTEGER NOT NULL DEFAULT 5,
  reviews_per_page INTEGER DEFAULT 3,
  stats_animation_duration INTEGER DEFAULT 2000,
  show_cta BOOLEAN DEFAULT true,
  cta_text VARCHAR(255) NOT NULL,
  cta_action VARCHAR(255),
  colors_primary VARCHAR(50) NOT NULL,
  colors_primary_light VARCHAR(50) NOT NULL,
  colors_primary_dark VARCHAR(50) NOT NULL,
  colors_accent VARCHAR(50) NOT NULL,
  colors_accent_light VARCHAR(50) NOT NULL,
  colors_dark_bg VARCHAR(50) NOT NULL,
  colors_light_bg VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID NOT NULL,
  updated_by UUID NOT NULL,
  
  CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users(id),
  CONSTRAINT fk_updated_by FOREIGN KEY (updated_by) REFERENCES users(id)
);
```

---

## 🔌 API Endpoints Needed

### 1. **GET /api/cms/reason-cards**

**Purpose**: Fetch all reason cards  
**Status**: ❌ Not implemented

**Request**:
```bash
GET /api/cms/reason-cards?active=true&sort=displayOrder
```

**Response**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid-1",
        "displayOrder": 1,
        "title": "80+ Years of Trusted Service",
        "content": "We're the right partner...",
        "iconName": "shield",
        "gradientStart": "#9b1c20",
        "gradientEnd": "#c8232c",
        "accentColor": "#9b1c20",
        "isActive": true
      }
    ],
    "total": 3,
    "cached": false
  },
  "timestamp": "2025-11-11T10:30:00Z"
}
```

---

### 2. **GET /api/cms/stat-cards**

**Purpose**: Fetch all stat cards  
**Status**: ❌ Not implemented

**Request**:
```bash
GET /api/cms/stat-cards?active=true&sort=displayOrder
```

**Response**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid-1",
        "displayOrder": 1,
        "value": "80+",
        "label": "Years of Excellence",
        "sublabel": "Trusted Service",
        "color": "text-white",
        "type": "number",
        "targetNumber": 80,
        "isActive": true
      }
    ],
    "total": 4,
    "cached": true
  },
  "timestamp": "2025-11-11T10:30:00Z"
}
```

---

### 3. **GET /api/cms/whychooseus/config**

**Purpose**: Fetch component configuration  
**Status**: ❌ Not implemented

**Request**:
```bash
GET /api/cms/whychooseus/config
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "sectionTitle": "Why Choose United Holdings?",
    "sectionDescription": "At United Holdings, we pride ourselves...",
    "autoPlayInterval": 6000,
    "maxStars": 5,
    "reviewsPerPage": 3,
    "statsAnimationDuration": 2000,
    "showCTA": true,
    "ctaText": "Share Your Experience",
    "ctaAction": "/contact",
    "colors": {
      "primary": "#9b1c20",
      "primaryLight": "#c8232c",
      "primaryDark": "#7a1619",
      "accent": "#F9AF55",
      "accentLight": "#fbc374",
      "darkBg": "#1a1a1a",
      "lightBg": "#f8f9fa"
    }
  },
  "timestamp": "2025-11-11T10:30:00Z"
}
```

---

### 4. **GET /api/home** (Already Exists)

**Purpose**: Fetch reviews and reasons data  
**Status**: ✅ Implemented

**Current Issues**:
- API returns `reasons` but component doesn't use it
- Reviews structure needs validation
- No caching strategy

---

## 💻 Migration Code Examples

### Before: Current Implementation

```javascript
// WhyChooseUs.js - Current approach

const reasonsData = [
  {
    title: "80+ Years of Trusted Service",
    content: "We're the right partner...",
    icon: <FaShieldAlt className="text-white text-3xl" />,
    gradient: "from-[#9b1c20] to-[#c8232c]",
    accentColor: "#9b1c20"
  },
  // ... more items hardcoded
];

const statsData = [
  { value: "80+", label: "Years of Excellence", color: "text-white", sublabel: "Trusted Service" },
  // ... more items hardcoded
];

const WhyChooseUs = () => {
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    fetch('/api/home').then(/* ... */).catch(/* ... */);
  }, []);
  
  return (
    <section>
      {/* Reviews use API data ✅ */}
      <EnhancedReviewsCarousel reviews={reviews} />
      
      {/* Reasons use hardcoded data ❌ */}
      {reasonsData.map(reason => <ReasonCard {...reason} />)}
      
      {/* Stats use hardcoded data ❌ */}
      {statsData.map(stat => <StatCard {...stat} />)}
    </section>
  );
};
```

---

### After: API-Driven Implementation

**Step 1: Create API Service Layer** (`lib/cms-api.js`)

```javascript
// lib/cms-api.js

export const cmsAPI = {
  async getWhyChooseUsData() {
    try {
      // Fetch all required data in parallel
      const [reasonsRes, statsRes, configRes] = await Promise.all([
        fetch('/api/cms/reason-cards?active=true&sort=displayOrder'),
        fetch('/api/cms/stat-cards?active=true&sort=displayOrder'),
        fetch('/api/cms/whychooseus/config')
      ]);

      if (!reasonsRes.ok || !statsRes.ok || !configRes.ok) {
        throw new Error('Failed to fetch WhyChooseUs data');
      }

      const [reasonsData, statsData, configData] = await Promise.all([
        reasonsRes.json(),
        statsRes.json(),
        configRes.json()
      ]);

      return {
        reasons: reasonsData.data.items,
        stats: statsData.data.items,
        config: configData.data,
        success: true
      };
    } catch (error) {
      console.error('CMS API Error:', error);
      throw error;
    }
  },

  async getReviews() {
    try {
      const response = await fetch('/api/home');
      const data = await response.json();
      return data.data?.reviews || [];
    } catch (error) {
      console.error('Reviews API Error:', error);
      return [];
    }
  }
};
```

**Step 2: Create Custom Hook** (`hooks/useWhyChooseUs.js`)

```javascript
// hooks/useWhyChooseUs.js

import { useState, useEffect } from 'react';
import { cmsAPI } from '@/lib/cms-api';

export function useWhyChooseUs() {
  const [data, setData] = useState({
    reasons: [],
    stats: [],
    config: null,
    reviews: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [whyChooseUsData, reviews] = await Promise.all([
          cmsAPI.getWhyChooseUsData(),
          cmsAPI.getReviews()
        ]);

        setData({
          reasons: whyChooseUsData.reasons,
          stats: whyChooseUsData.stats,
          config: whyChooseUsData.config,
          reviews: reviews
        });
        setError(null);
      } catch (err) {
        setError(err.message);
        setData({
          reasons: [],
          stats: [],
          config: null,
          reviews: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { ...data, loading, error };
}
```

**Step 3: Update Component**

```javascript
// components/WhyChooseUs.js - Updated

'use client';

import { useWhyChooseUs } from '@/hooks/useWhyChooseUs';
import { trackEvent } from '@/lib/posthog';

const WhyChooseUs = () => {
  const { reasons, stats, config, reviews, loading, error } = useWhyChooseUs();

  if (error) {
    return (
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-red-600 text-lg">Error loading content: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header from config */}
        {config && (
          <motion.div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-[#9b1c20]">
              {config.sectionTitle}
            </h3>
            <p className="text-gray-600 max-w-5xl text-lg lg:text-xl mt-4">
              {config.sectionDescription}
            </p>
          </motion.div>
        )}

        {/* Stats from API */}
        {!loading && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <StatCard key={stat.id} {...stat} index={index} />
            ))}
          </div>
        )}

        {/* Reasons from API */}
        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 mb-8 gap-4 lg:gap-8">
            {reasons.map((reason, index) => (
              <ReasonCard key={reason.id} {...reason} index={index} />
            ))}
          </div>
        )}

        {/* Reviews */}
        <EnhancedReviewsCarousel reviews={reviews} loading={loading} />
      </div>
    </section>
  );
};

export default WhyChooseUs;
```

---

## 🔄 Data Migration Path

### Phase 1: API Setup (1 hour)
- [ ] Create three new endpoints
- [ ] Add database tables
- [ ] Create seed data from hardcoded values
- [ ] Test endpoints with sample data

### Phase 2: Service Layer (30 mins)
- [ ] Create `lib/cms-api.js`
- [ ] Create `hooks/useWhyChooseUs.js`
- [ ] Add error handling
- [ ] Add loading states

### Phase 3: Component Update (1 hour)
- [ ] Replace hardcoded data with hook
- [ ] Update component render logic
- [ ] Test all features (carousel, animations)
- [ ] Verify responsive design

### Phase 4: Testing (1 hour)
- [ ] Unit tests for hook
- [ ] Component snapshot tests
- [ ] E2E carousel interaction tests
- [ ] API response validation

### Phase 5: Deployment (30 mins)
- [ ] Code review
- [ ] Staging deployment
- [ ] Production rollout with feature flag
- [ ] Monitor error logs

---

## 📋 Implementation Checklist

### Pre-Implementation
- [ ] Review all hardcoded data identified
- [ ] Get approval for CMS schema
- [ ] Allocate development time
- [ ] Schedule QA testing

### API Development
- [ ] Create `/api/cms/reason-cards` endpoint
- [ ] Create `/api/cms/stat-cards` endpoint
- [ ] Create `/api/cms/whychooseus/config` endpoint
- [ ] Add request validation (Zod/Joi)
- [ ] Add response caching
- [ ] Add error handling

### Database Setup
- [ ] Create three new tables
- [ ] Add foreign key constraints
- [ ] Create indexes
- [ ] Add sample data
- [ ] Document schema

### Frontend Changes
- [ ] Create service layer (`lib/cms-api.js`)
- [ ] Create custom hook (`hooks/useWhyChooseUs.js`)
- [ ] Update WhyChooseUs component
- [ ] Remove hardcoded constants
- [ ] Update imports/exports

### Testing
- [ ] Test API endpoints manually
- [ ] Test service layer with mock data
- [ ] Test component rendering
- [ ] Test carousel functionality
- [ ] Test animations
- [ ] Test error states
- [ ] Test loading states

### Documentation
- [ ] Update API documentation
- [ ] Create admin guide for content editing
- [ ] Create developer guide
- [ ] Document data relationships

---

## 📊 Icon Mapping for Database

Current hardcoded icons need mapping:

| Current Icon | Icon Component | Database Value | Font Awesome Icon |
|--------------|----------------|-----------------|-------------------|
| Shield | FaShieldAlt | "shield" | fa-shield-alt |
| Handshake | FaHandshake | "handshake" | fa-handshake |
| Globe | FaGlobeAfrica | "globe" | fa-globe-africa |

**Solution**: Store icon name as string in database, map to React component in frontend

```javascript
const iconMap = {
  'shield': FaShieldAlt,
  'handshake': FaHandshake,
  'globe': FaGlobeAfrica
};

const IconComponent = ({ iconName }) => {
  const Icon = iconMap[iconName];
  return Icon ? <Icon className="text-white text-3xl" /> : null;
};
```

---

## 🎨 Current Hardcoded Colors Reference

All colors should be moved to `cms_whychooseus_config`:

```javascript
const colors = {
  primary: '#9b1c20',           // Brand red
  primaryLight: '#c8232c',      // Lighter red
  primaryDark: '#7a1619',       // Darker red
  accent: '#F9AF55',            // Orange accent
  accentLight: '#fbc374',       // Light orange
  darkBg: '#1a1a1a',           // Dark background
  lightBg: '#f8f9fa'           // Light background
};
```

---

## 🚀 Performance Optimizations

### 1. **Caching Strategy**

```javascript
// Cache for 1 hour (ISR)
export const revalidate = 3600;

// Or use SWR for client-side caching
import useSWR from 'swr';

const { data, error } = useSWR(
  '/api/cms/whychooseus/config',
  fetcher,
  { revalidateOnFocus: false, dedupingInterval: 3600000 }
);
```

### 2. **Lazy Loading**

```javascript
import dynamic from 'next/dynamic';

const EnhancedReviewsCarousel = dynamic(
  () => import('@/components/EnhancedReviewsCarousel'),
  { loading: () => <StatsSkeleton /> }
);
```

### 3. **Image Optimization**

If avatar images are added for reviewers:
```javascript
import Image from 'next/image';

<Image
  src={review.avatarUrl}
  alt={review.name}
  width={56}
  height={56}
  className="rounded-2xl"
/>
```

---

## 🧪 Test Coverage

### Unit Tests
```javascript
describe('useWhyChooseUs', () => {
  test('fetches and returns data correctly', async () => {
    const { result } = renderHook(() => useWhyChooseUs());
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.reasons).toHaveLength(3);
    expect(result.current.stats).toHaveLength(4);
  });

  test('handles API errors gracefully', async () => {
    mockFetch.mockRejectedValueOnce(new Error('API Error'));
    const { result } = renderHook(() => useWhyChooseUs());
    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });
  });
});
```

### Component Tests
```javascript
describe('WhyChooseUs Component', () => {
  test('renders all reason cards from API', async () => {
    const { findByText } = render(<WhyChooseUs />);
    expect(await findByText('80+ Years of Trusted Service')).toBeInTheDocument();
  });

  test('carousel navigation works correctly', async () => {
    const { getByLabelText } = render(<WhyChooseUs />);
    const nextButton = getByLabelText('Next review');
    fireEvent.click(nextButton);
    // assertions...
  });
});
```

---

## 📈 Success Metrics

### Immediate Benefits
- ✅ Non-developers can edit reasons and stats
- ✅ Content updates don't require deployment
- ✅ A/B testing different reason cards
- ✅ Dynamic stat updates without code changes

### Performance Impact
- Expected API response time: <100ms (with caching)
- Cache hit rate: >95%
- No performance regression with ISR strategy

### User Experience
- Same visual appearance
- Same animations and interactions
- Same responsive behavior
- Faster content deployment

---

## ⚠️ Migration Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| API downtime | Content not displayed | Fallback to hardcoded data with feature flag |
| Data mismatch | Incorrect display | Validation in both API and component |
| Performance degradation | Slower page load | ISR caching strategy |
| Icon mapping errors | Icons not showing | Comprehensive icon mapping table |
| Animation issues | UX degradation | Thorough testing before production |

---

## 📝 Current Issues & Observations

### 1. **Conflicting Data Sources**

The component has competing data sources for reasons:

```javascript
// Line 28-51: Hardcoded reasonsData
const reasonsData = [/* 3 items */];

// Line 895-903: API tries to overwrite with:
const [reasonsData, setReasonsData] = useState([]);
// ... 
setReasonsData(data.data.reasons);
```

**Current Behavior**: Component renders hardcoded reasons initially, then tries to overwrite with API data if available.

**Issue**: If API doesn't return `reasons`, hardcoded data is shown. This creates inconsistency.

**Solution**: Remove hardcoded data entirely, always use API.

---

### 2. **Unused statsData State**

```javascript
const statsRef = useRef(null);
const [isStatsVisible, setIsStatsVisible] = useState(false);
// ... but statsData is never set from state or API
```

**Issue**: Stats always use hardcoded data; no API integration exists.

**Solution**: Fetch stats from `/api/cms/stat-cards` endpoint.

---

### 3. **Icon Serialization**

Icons are React components, can't be stored in database directly:

```javascript
icon: <FaShieldAlt className="text-white text-3xl" /> // Can't serialize
```

**Solution**: Store icon name as string, map to component client-side.

---

## 🔗 Dependencies

### Current Dependencies Used
- `react` (useState, useEffect, useRef)
- `framer-motion` (animations)
- `react-icons/fa` (icons)
- `@/lib/posthog` (tracking)
- `next/image` (implied)

### Required for Migration
- API client (fetch or axios)
- Type definitions (TypeScript)
- Validation library (Zod)
- SWR or React Query (optional, for caching)

---

## 📞 Questions for Product Team

1. Should stats update dynamically or be set quarterly?
2. Should admins be able to reorder reason cards?
3. Should there be a "featured reason" concept?
4. What's the target number for "Happy Clients" animation?
5. Should reviews be moderated before displaying?
6. Should reason cards have images/media?

---

## ✅ Conclusion

The WhyChooseUs component is a well-designed, feature-rich section that would greatly benefit from CMS migration. The main challenges are:

1. **Complexity**: Multiple data types (reasons, stats, reviews, config)
2. **Animations**: Carousel and number counter animations must work perfectly
3. **Icons**: Need client-side mapping since they're React components

**Estimated Timeline**: 4-6 hours for full implementation and testing  
**Difficulty**: Medium (familiar patterns, but multiple entities)  
**Priority**: High (frequently updated content)

---

**Document Created**: November 11, 2025  
**Status**: Production-Ready  
**Next Step**: Create three API endpoints and update component hook
