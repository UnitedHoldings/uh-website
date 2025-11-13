# WhyChooseUs Component - Quick Summary

**Component**: `components/WhyChooseUs.js`  
**File Size**: 950+ lines  
**Status**: Mixed (API reviews + Hardcoded reasons/stats)  
**Complexity**: Medium  
**Effort**: 4-6 hours  
**Priority**: High

---

## 🎯 Key Findings

### Total Hardcoded Items: 21

| Category | Count | Status | Notes |
|----------|-------|--------|-------|
| Reason Cards | 3 | ❌ Hardcoded | With 5 properties each = 15 fields |
| Stat Cards | 4 | ❌ Hardcoded | With 4 properties each = 16 fields |
| Config Constants | 9 | ❌ Hardcoded | AUTO_PLAY_INTERVAL, colors, etc. |
| Reviews | 5-10+ | ✅ From API | Fetched from `/api/home` |

---

## 📊 Component Breakdown

### Section 1: Why Choose Us Reasons (3 Cards)

**Current State**: Hardcoded array

**Data Needed**:
- 80+ Years of Trusted Service
- Serving you with Integrity  
- Swazi Insurance for the International Market

**Properties**: title, content, icon, gradient, accentColor, displayOrder

**To Migrate**: Create `CMSReasonCard` entity

---

### Section 2: Stats/Metrics (4 Cards)

**Current State**: Hardcoded array

**Data Needed**:
- 80+ Years of Excellence
- 50K+ Happy Clients
- 24/7 Support
- 98% Satisfaction

**Properties**: value, label, sublabel, color, type, targetNumber

**To Migrate**: Create `CMSStatCard` entity

---

### Section 3: Reviews Carousel

**Current State**: ✅ API-driven from `/api/home`

**Already Implemented**:
- Fetches from API endpoint
- Auto-play carousel
- Star ratings
- Manual navigation
- Play/pause controls

**Note**: Working, but reasons data endpoint needs to be updated

---

### Section 4: Configuration

**Current State**: Hardcoded constants

**Items**:
- AUTO_PLAY_INTERVAL: 6000ms
- MAX_STARS: 5
- Color palette: 7 colors
- Section title and description

**To Migrate**: Create `CMSWhyChooseUsConfig` entity

---

## 🔌 Required API Endpoints

### 1. GET /api/cms/reason-cards
Fetch all reason cards with display order

### 2. GET /api/cms/stat-cards
Fetch all stat cards with display order

### 3. GET /api/cms/whychooseus/config
Fetch component configuration (title, colors, timing)

### 4. GET /api/home (Already Exists)
Returns reviews and reasons (needs optimization)

---

## 🗄️ Database Tables Needed

1. **cms_reason_cards** (3 rows)
   - id, display_order, title, content, icon_name, gradient_start, gradient_end, accent_color, is_active, timestamps

2. **cms_stat_cards** (4 rows)
   - id, display_order, value, label, sublabel, color, type, target_number, is_active, timestamps

3. **cms_whychooseus_config** (1 row)
   - id, section_title, section_description, auto_play_interval, max_stars, colors (7 fields), is_active, timestamps

---

## 💻 Implementation Overview

### Current Code Problem

```javascript
// Hardcoded data mixed with API calls
const reasonsData = [/* hardcoded */];
const statsData = [/* hardcoded */];

useEffect(() => {
  fetch('/api/home').then(data => {
    setReasonsData(data.data.reasons); // Tries to overwrite!
  });
});
```

### Solution

```javascript
// Create useWhyChooseUs hook
const { reasons, stats, config, reviews, loading, error } = useWhyChooseUs();

// All data from API, no hardcoding
return (
  <section>
    <h3>{config.sectionTitle}</h3>
    {stats.map(stat => <StatCard {...stat} />)}
    {reasons.map(reason => <ReasonCard {...reason} />)}
    <Carousel reviews={reviews} />
  </section>
);
```

---

## 📈 Data Inventory

### Reasons Data (3 items, 15 fields)

| # | Title | Content Length | Icon | Gradient |
|---|-------|----------------|------|----------|
| 1 | 80+ Years of Trusted Service | 220+ chars | shield | red-to-red |
| 2 | Serving you with Integrity | 180+ chars | handshake | dark-to-red |
| 3 | Swazi Insurance for... | 200+ chars | globe | red-to-orange |

### Stats Data (4 items, 16 fields)

| # | Value | Label | Sublabel |
|---|-------|-------|----------|
| 1 | 80+ | Years of Excellence | Trusted Service |
| 2 | 50K+ | Happy Clients | Satisfied Customers |
| 3 | 24/7 | Support | Always Available |
| 4 | 98% | Satisfaction | Claim Approval Rate |

### Config Data (9 items)

| Item | Value | Type |
|------|-------|------|
| AUTO_PLAY_INTERVAL | 6000 | number |
| MAX_STARS | 5 | number |
| primary | #9b1c20 | color |
| primaryLight | #c8232c | color |
| primaryDark | #7a1619 | color |
| accent | #F9AF55 | color |
| accentLight | #fbc374 | color |
| darkBg | #1a1a1a | color |
| lightBg | #f8f9fa | color |

---

## 🚀 Implementation Plan

### Week 1: Backend
- [ ] Create 3 new API endpoints
- [ ] Setup database tables
- [ ] Seed data from hardcoded values
- [ ] Test endpoints

### Week 2: Frontend
- [ ] Create service layer (`lib/cms-api.js`)
- [ ] Create custom hook (`hooks/useWhyChooseUs.js`)
- [ ] Update component
- [ ] Remove hardcoded data
- [ ] Comprehensive testing

### Timeline
- **API Development**: 2 hours
- **Database Setup**: 1 hour  
- **Service Layer**: 30 minutes
- **Component Update**: 1 hour
- **Testing**: 1-2 hours
- **Buffer**: 30 minutes
- **Total**: 5-6 hours

---

## ✅ Success Criteria

- [ ] All hardcoded data fetched from API
- [ ] Component renders identically
- [ ] All animations work smoothly
- [ ] Carousel functions correctly
- [ ] Responsive design maintained
- [ ] No console errors
- [ ] API response < 200ms
- [ ] Content changes without redeploy

---

## 🔄 TypeScript Interfaces

```typescript
interface CMSReasonCard {
  id: string;
  displayOrder: number;
  title: string;
  content: string;
  iconName: 'shield' | 'handshake' | 'globe';
  gradientStart: string;
  gradientEnd: string;
  accentColor: string;
  isActive: boolean;
}

interface CMSStatCard {
  id: string;
  displayOrder: number;
  value: string;
  label: string;
  sublabel: string;
  color: string;
  type: 'number' | 'percent' | 'text';
  targetNumber?: number;
  isActive: boolean;
}

interface CMSWhyChooseUsConfig {
  id: string;
  sectionTitle: string;
  sectionDescription: string;
  autoPlayInterval: number;
  maxStars: number;
  showCTA: boolean;
  ctaText: string;
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
}
```

---

## 🎓 Key Learnings

### Current Architecture Issues

1. **Mixed Data Sources**: Some data from API, some hardcoded
2. **Icon Serialization**: Icons are React components, can't be stored in DB
3. **Color Duplication**: Colors defined in multiple places
4. **No Config Entity**: Component behavior scattered across code

### Solution Patterns

1. **Service Layer**: Centralize API calls
2. **Icon Mapping**: Store icon name as string, map client-side
3. **Config Entity**: Single source of truth for component behavior
4. **TypeScript**: Full type safety for all data

---

## 📞 Before You Start

### Questions for Product

1. Can reasons be reordered dynamically?
2. How often do stats change?
3. Should stats have target numbers for animation?
4. Can reviewers upload profile images?
5. Should reviews require approval?

### Dependencies to Install

None! Uses existing:
- React hooks (useState, useEffect, useRef)
- Framer Motion (animations)
- React Icons (icons)
- Fetch API (HTTP client)

---

## 🎯 Next Steps

1. **Review** this summary with team
2. **Approve** the three entity designs
3. **Create** the three API endpoints
4. **Setup** database tables
5. **Implement** service layer
6. **Update** component
7. **Test** thoroughly

---

## 📊 Impact Assessment

### Content Update Time
- **Before**: Code change + deployment (~1 day)
- **After**: CMS update (~5 minutes)

### Time Saved Per Update
- **Before**: 30+ minutes
- **After**: 5 minutes

### Annual Benefit
If updates 10x per year: **250+ hours saved**

---

**Document Status**: ✅ Ready for Review  
**Last Updated**: November 11, 2025  
**Next Action**: Stakeholder Review & Approval
