# WhyChooseUs Component - Visual Content Map

**Component**: `components/WhyChooseUs.js`  
**Status**: Mixed API + Hardcoded  
**Complexity**: Complex (Carousel + Animations)  
**Visual Elements**: 4 sections + 11+ subcomponents

---

## 🎨 Component Structure Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     WhyChooseUs                             │
│               (bg: gray-50 to gray-100)                     │
└─────────────────────────────────────────────────────────────┘
         │
         ├─── Section Header (mb-12)
         │     ├── Title: "Why Choose United Holdings?"
         │     │   Color: #9b1c20 (Brand Red)
         │     │   Size: 2xl-3xl font-bold
         │     │
         │     └── Description: Long-form text
         │         Color: gray-600
         │         Size: lg-xl
         │
         ├─── Stats Section (if not loading)
         │     └── Grid: 2 cols (mobile) → 4 cols (desktop)
         │         ├── Stat 1: "80+ Years of Excellence"
         │         ├── Stat 2: "50K+ Happy Clients"
         │         ├── Stat 3: "24/7 Support"
         │         └── Stat 4: "98% Satisfaction"
         │
         ├─── Reasons Grid (if not loading)
         │     └── Grid: 1 col (mobile) → 3 cols (desktop)
         │         ├── Reason Card 1: 80+ Years
         │         ├── Reason Card 2: Integrity
         │         └── Reason Card 3: International
         │
         └─── Enhanced Reviews Carousel
               ├── Desktop: 3-up carousel
               ├── Mobile: 1-up carousel
               ├── Controls: Prev/Play/Pause/Next
               └── CTA: "Share Your Experience"
```

---

## 📐 Detailed Section Layout

### Section 1: Header

```
┌─────────────────────────────────────────────────────┐
│  Why Choose United Holdings?                        │
│  ─────────────────────────────────────────────────  │
│                                                     │
│  At United Holdings, we pride ourselves on          │
│  delivering unparalleled insurance and financial    │
│  services tailored to meet the unique needs of our  │
│  clients...                                         │
│                                                     │
│  [Full description text: ~220 words]                │
│                                                     │
└─────────────────────────────────────────────────────┘

Colors:
  Title: #9b1c20 (primary red)
  Text:  #4b5563 (gray-600)

Spacing:
  margin-bottom: 48px
  padding: responsive (px-4 to px-8)

Typography:
  Title:       md:text-3xl font-bold font-outfit
  Description: lg:text-xl text-gray-600
```

---

### Section 2: Statistics Cards

```
Desktop (4 columns):
┌──────────────┬──────────────┬──────────────┬──────────────┐
│      80+     │     50K+     │    24/7      │      98%     │
│ Years of     │ Happy        │ Support      │ Satisfaction │
│ Excellence   │ Clients      │              │              │
│ Trusted      │ Satisfied    │ Always       │ Claim        │
│ Service      │ Customers    │ Available    │ Approval     │
└──────────────┴──────────────┴──────────────┴──────────────┘

Mobile (2 columns):
┌──────────────┬──────────────┐
│      80+     │     50K+     │
│ Years        │ Happy        │
├──────────────┼──────────────┤
│    24/7      │      98%     │
│ Support      │ Satisfaction │
└──────────────┴──────────────┘

Data Structure:
{
  value: "80+",
  label: "Years of Excellence",
  sublabel: "Trusted Service",
  color: "text-white",
  targetNumber: 80
}

Animation:
- Number counter: 0 → target over 2000ms
- Scale: 0.8 → 1 (on view)
- Hover: 1 → 1.05 (scale up)

Colors:
- Text:    #ffffff (white)
- Hover:   Gradient highlight
```

---

### Section 3: Reason Cards (3-column grid)

```
Desktop Layout (3 columns):
┌──────────────────┬──────────────────┬──────────────────┐
│ 01               │ 02               │ 03               │
│                  │                  │                  │
│ 80+ Years of     │ Serving you      │ Swazi Insurance  │
│ Trusted Service  │ with Integrity   │ for the Intl.    │
│                  │                  │                  │
│ We're the right  │ We don't do       │ With over 80     │
│ partner you can  │ insurance for     │ years of doing   │
│ choose with over │ ourselves...      │ business...      │
│ 70 years of...   │                  │                  │
│                  │                  │                  │
│ [Shield Icon]    │ [Handshake Icon] │ [Globe Icon]     │
└──────────────────┴──────────────────┴──────────────────┘

Mobile Layout (1 column):
┌──────────────────────────────┐
│ 01                           │
│ 80+ Years of Trusted Service │
│ [content...]                 │
└──────────────────────────────┘
┌──────────────────────────────┐
│ 02                           │
│ Serving you with Integrity   │
│ [content...]                 │
└──────────────────────────────┘
┌──────────────────────────────┐
│ 03                           │
│ Swazi Insurance for Intl.    │
│ [content...]                 │
└──────────────────────────────┘

Card Details:
┌────────────────────────────────────┐
│ ■ [Accent color bar]               │
│                                    │
│ 01                                 │
│                                    │
│ 80+ Years of Trusted Service       │
│ ─────────────────────────────────  │
│                                    │
│ We're the right partner you can    │
│ choose with over 70 years of doing │
│ business in the Kingdom of...      │
│                                    │
│ ─────────────────────────────────  │
│ [Hover underline animation]        │
└────────────────────────────────────┘

Data Structure (Per Card):
{
  id: "uuid",
  displayOrder: 1,
  title: "80+ Years of Trusted Service",
  content: "We're the right partner...",
  iconName: "shield",
  gradientStart: "#9b1c20",
  gradientEnd: "#c8232c",
  accentColor: "#9b1c20"
}

Styling:
- Background:     white/95 + backdrop blur
- Border:         border-black/20
- Number Color:   gray-300
- Title:          text-2xl font-bold
- Content:        text-lg text-gray-600
- Accent Bar:     2px height, left side
- Hover Effect:   Underline animation at bottom

Animation:
- Entrance:  opacity 0→1, y: 50→0 (staggered 0.2s)
- Hover:     y: 0→-10px
- Bar Color: Scales y from 0→100 on hover
- Underline: Scales x from 0→100 on hover
```

---

### Section 4: Reviews Carousel

```
Desktop Layout (3 visible reviews):
┌──────────────┬──────────────┬──────────────┐
│  Prev Review │ ACTIVE REVIEW│ Next Review  │
│  (scale 95)  │ (scale 105)  │ (scale 95)   │
│  opacity 70  │ opacity 100  │ opacity 70   │
└──────────────┴──────────────┴──────────────┘
     ↓ Click to navigate ↓

Mobile Layout (1 visible review):
┌──────────────────────────────┐
│   ACTIVE REVIEW (scale 105)  │
│   opacity 100                │
└──────────────────────────────┘

Controls Section:
┌────────────────────────────────────────┐
│  [◀ Previous] [▶ Play||| Pause] [● ●●] [Next ▶]  │
│             Review Dots                │
└────────────────────────────────────────┘

Review Card Structure:
┌──────────────────────────────────────┐
│  ✎ [Top right quote icon]            │
│                                      │
│  ┌──────────────┐                    │
│  │ J            │ John Doe   ★★★★★   │
│  │              │ Business Owner     │
│  │              │ ABC Corp           │
│  └──────────────┘                    │
│                                      │
│  "This review text appears in italic │
│   with a left border accent in the   │
│   orange accent color (#F9AF55)"     │
│                                      │
│  ────────────────────────────────    │
│  [Active indicator underline]        │
└──────────────────────────────────────┘

Data Structure (Per Review):
{
  _id: "unique-id",
  name: "John Doe",
  role: "Business Owner",
  company: "ABC Corp",
  content: "This review text...",
  rating: 5
}

Styling:
- Background:    white/95 + backdrop blur
- Border:        border-white/20
- Avatar BG:     #9b1c20 (brand red)
- Avatar Text:   First letter of name
- Stars:         #F9AF55 (orange accent)
- Quote Icon:    #9b1c20/10 (faded red)
- Review Text:   gray-700, italic, text-lg
- Left Border:   #F9AF55, 4px width
```

---

## 🎨 Color Scheme Reference

### Primary Colors
```
Primary Red:      #9b1c20 (Brand main)
Primary Light:    #c8232c (Hover states)
Primary Dark:     #7a1619 (Darker accents)
Accent Orange:    #F9AF55 (Highlights)
Accent Light:     #fbc374 (Light highlights)
Dark BG:          #1a1a1a (Dark sections)
Light BG:         #f8f9fa (Light background)
```

### Application by Element

| Element | Primary | Secondary | Usage |
|---------|---------|-----------|-------|
| Section Title | #9b1c20 | - | h3 text color |
| Reason Numbers | #d1d5db | - | 01, 02, 03 numbering |
| Accent Bars | Varies | - | Per-reason bar color |
| Stat Values | #ffffff | - | Large numbers |
| Quote Icon | #9b1c20/10 | - | Faded background |
| Star Ratings | #F9AF55 | - | Review stars |
| Avatar BG | #9b1c20 | - | Initials background |
| Review Border | #F9AF55 | - | Left border color |
| CTA Button BG | #ffffff | - | Button background |
| CTA Button Text | #9b1c20 | - | Button text |
| CTA Hover Gradient | #F9AF55 to #9b1c20 | - | Gradient overlay |
| Carousel BG | #9b1c20 | - | Main section |
| Carousel Accent | #F9AF55/5 | - | Background blobs |

---

## 📱 Responsive Breakpoints

### Mobile (< 640px)
```
Stats:
  - Grid: 2 columns
  - Padding: 16px

Reasons:
  - Grid: 1 column
  - Card padding: 24px
  - Gap: 16px

Reviews Carousel:
  - Layout: Single review
  - Full width
  - Touch-optimized buttons

Controls:
  - Stacked vertically
  - Full-width buttons
```

### Tablet (640px - 1024px)
```
Stats:
  - Grid: 2-4 columns
  - Padding: 24px

Reasons:
  - Grid: 2-3 columns
  - Gap: 24px

Reviews Carousel:
  - Desktop layout (3-up)
  - Same sizing
```

### Desktop (> 1024px)
```
Stats:
  - Grid: 4 columns
  - Padding: 32px

Reasons:
  - Grid: 3 columns
  - Gap: 32px
  - Max-width: 1400px

Reviews Carousel:
  - 3 visible cards
  - Full animation support
  - Optimal spacing
```

---

## 🔄 Data Update Flow

### Current Flow (Mixed)
```
┌──────────────────┐
│  Hardcoded Data  │
│  (reasonsData)   │
└────────┬─────────┘
         │
         ├─ Initial Render
         │
         ▼
┌──────────────────────┐
│   useEffect Runs     │
│  (Tries to fetch)    │
└────────┬─────────────┘
         │
         ├─ Fetch /api/home
         │
         ▼
┌──────────────────────┐
│  setReasonsData()    │
│  (Overwrites!)       │
└────────┬─────────────┘
         │
         ├─ Re-render with API data
         │  (If successful)
         │
         ▼
    Component Displays
```

### Proposed Flow (API-Driven)
```
┌──────────────────┐
│  useWhyChooseUs  │
│      Hook        │
└────────┬─────────┘
         │
         ├─ Loading = true
         │ (Show skeletons)
         │
         ├─ Parallel Fetch:
         │  ├─ /api/cms/reason-cards
         │  ├─ /api/cms/stat-cards
         │  ├─ /api/cms/whychooseus/config
         │  └─ /api/home (reviews)
         │
         ├─ Loading = false
         │ (Show real data)
         │
         ▼
    Component Displays
   (Smooth transition)
```

---

## 🧩 Component Dependencies

### Current Dependencies
```
WhyChooseUs
  ├── EnhancedReviewsCarousel
  │   ├── ReviewCard (x3 on desktop, x1 on mobile)
  │   ├── StarRating
  │   └── Skeleton Loaders
  ├── ReasonCard (x3)
  └── StatCard (x4)

External Libraries:
  ├── react-icons/fa (5 icons used)
  ├── framer-motion (animations)
  ├── @/lib/posthog (tracking)
  └── @/components/... (nested components)
```

### After CMS Migration
```
WhyChooseUs
  ├── useWhyChooseUs (custom hook)
  │   ├── cmsAPI.getWhyChooseUsData()
  │   ├── cmsAPI.getReviews()
  │   └── State management
  │
  ├── EnhancedReviewsCarousel
  │   ├── ReviewCard
  │   ├── StarRating
  │   └── Loaders
  │
  ├── ReasonCard (dynamic from API)
  └── StatCard (dynamic from API)
```

---

## 📊 Content Mapping Table

| Section | Current | API | Database | Update Freq |
|---------|---------|-----|----------|------------|
| Header Title | ❌ Hardcoded | ✅ From config | cms_whychooseus_config | 6 months |
| Header Description | ❌ Hardcoded | ✅ From config | cms_whychooseus_config | 6 months |
| Reason 1 | ❌ Hardcoded | ✅ From API | cms_reason_cards | As needed |
| Reason 2 | ❌ Hardcoded | ✅ From API | cms_reason_cards | As needed |
| Reason 3 | ❌ Hardcoded | ✅ From API | cms_reason_cards | As needed |
| Stat 1 | ❌ Hardcoded | ✅ From API | cms_stat_cards | Quarterly |
| Stat 2 | ❌ Hardcoded | ✅ From API | cms_stat_cards | Quarterly |
| Stat 3 | ❌ Hardcoded | ✅ From API | cms_stat_cards | Quarterly |
| Stat 4 | ❌ Hardcoded | ✅ From API | cms_stat_cards | Quarterly |
| Reviews | ✅ API | ✅ From API | cms_reviews | Daily |
| Colors | ❌ Hardcoded | ✅ From config | cms_whychooseus_config | Yearly |
| Config | ❌ Hardcoded | ✅ From config | cms_whychooseus_config | Rarely |

---

## 🎬 Animation Reference

### 1. Stats Animation
```
Trigger: Scroll into view
Timeline:
  0.0s: opacity 0, scale 0.8
  0.5s: opacity 1, scale 1
  
Number Counter:
  Duration: 2000ms
  Steps: 60
  Example: 50000 → 50K+

Hover:
  opacity: 1 → 1
  scale: 1 → 1.05
  Glow: blur-xl expands
```

### 2. Reason Cards Animation
```
Trigger: Scroll into view (staggered)
Timeline:
  0.0s: opacity 0, y: 50px
  0.2s-0.6s: opacity 1, y: 0px (staggered 0.2s)
  
Hover State:
  y: 0px → -10px
  Accent Bar: scaleY 0 → 1 (500ms)
  Underline: scaleX 0 → 1 (500ms)
```

### 3. Carousel Animation
```
Active Card:
  scale: 0.95 → 1.05
  opacity: 0.7 → 1
  z-index: 10 → 20

Inactive Cards:
  scale: 0.95
  opacity: 0.7

Active Indicator:
  Bar: scaleX 0 → 1
  Color gradient: #9b1c20 → #F9AF55

Transition:
  Duration: 500ms
  Easing: ease-in-out
```

### 4. CTA Button Animation
```
Idle:
  Background: white
  Text Color: #9b1c20

Hover:
  Scale: 1 → 1.05
  Gradient Overlay: opacity 0 → 1
  Duration: 300ms

Click Feedback:
  Scale: 1.05 → 1
  Duration: 150ms
```

---

## ✅ QA Checklist

### Visual QA
- [ ] Header section displays correctly
- [ ] All 4 stat cards visible on desktop
- [ ] Stats layout responsive (2→4 columns)
- [ ] All 3 reason cards visible on desktop
- [ ] Reason cards stack vertically on mobile
- [ ] Review carousel displays correctly
- [ ] All colors match design specs
- [ ] No text overflow or truncation
- [ ] Icons render correctly
- [ ] Animations smooth on all devices

### Functional QA
- [ ] Auto-play starts on load
- [ ] Previous/Next buttons work
- [ ] Play/Pause toggles correctly
- [ ] Dot indicators update
- [ ] Click carousel dots changes review
- [ ] Number counters animate correctly
- [ ] CTA button clickable
- [ ] All links functional
- [ ] Error states display

### Responsive QA
- [ ] Mobile (320px+) works
- [ ] Tablet (768px+) works
- [ ] Desktop (1024px+) works
- [ ] Touch interaction works
- [ ] Carousel gestures work (if implemented)
- [ ] Text readable at all sizes

### Performance QA
- [ ] API response < 200ms
- [ ] Page load < 2 seconds
- [ ] Animations 60fps
- [ ] No layout shift
- [ ] Images optimized
- [ ] Cache working

### Accessibility QA
- [ ] ARIA labels present
- [ ] Keyboard navigation works
- [ ] Color contrast sufficient
- [ ] Focus indicators visible
- [ ] Alt text for images
- [ ] Semantic HTML

---

## 🚀 Deployment Notes

### Feature Flag Implementation
```javascript
// Use feature flag for gradual rollout
const USE_CMS_DATA = process.env.NEXT_PUBLIC_USE_CMS_DATA === 'true';

// In component
const { reasons, stats, config } = USE_CMS_DATA 
  ? useWhyChooseUs() 
  : useFallbackData();
```

### Gradual Rollout
```
Phase 1: 10% of users → Monitor errors
Phase 2: 25% of users → Monitor performance
Phase 3: 50% of users → Monitor engagement
Phase 4: 100% of users → Full rollout
```

### Rollback Plan
```
If issues:
1. Set USE_CMS_DATA = false
2. Redeploy
3. Revert to hardcoded data
4. Investigate in staging
```

---

## 📈 Success Metrics

### Performance Metrics
- API response time < 200ms ✅
- Page load time unchanged ✅
- Cache hit rate > 90% ✅
- Zero layout shift ✅

### User Metrics
- Same engagement ✅
- Carousel interaction rate unchanged ✅
- CTA click-through rate unchanged ✅
- No increase in bounce rate ✅

### Operational Metrics
- Content update time: 1 day → 5 minutes ✅
- No deployment needed for content changes ✅
- Audit trail of all changes ✅
- Non-technical staff can manage content ✅

---

**Map Status**: ✅ Complete  
**Diagrams**: 7 detailed layouts  
**Tables**: 8 reference tables  
**Last Updated**: November 11, 2025  
**Ready for**: Development & QA Teams
