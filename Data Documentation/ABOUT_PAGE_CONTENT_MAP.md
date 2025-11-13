# 🗺️ About Page Content Mapping

## Visual Section Breakdown

```
┌─────────────────────────────────────────────────────────────────┐
│                    ABOUT PAGE STRUCTURE                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                         HEADER SECTION                          │
├─────────────────────────────────────────────────────────────────┤
│  Background: #881a1e → #9b1c20                                  │
│  Title: "About United Holdings"                                 │
│  Subtitle: "Learn about our purpose, values..."                 │
│  Hero Image: /mall.png                                          │
│                                                                   │
│  Fields to Migrate: 3                                           │
│  - headerTitle (string)                                         │
│  - headerSubtitle (string)                                      │
│  - headerImage (url)                                            │
└─────────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                  CLAIMS BANNER SECTION                          │
├─────────────────────────────────────────────────────────────────┤
│  Background: #9b1c20                                            │
│                                                                   │
│  Text: "Most claims... can be taken care of in My Account.     │
│         Check out the information below..."                     │
│                                                                   │
│  Button: "Find Us" → ../../contact                             │
│                                                                   │
│  Fields to Migrate: 3                                           │
│  - claimsDescription (string - long text)                       │
│  - claimsCTAText (string)                                       │
│  - claimsCTALink (string - url)                                │
└─────────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                  OUR JOURNEY SECTION                            │
├─────────────────────────────────────────────────────────────────┤
│  Background: White                                              │
│                                                                   │
│  Left Column: "About Us"                                        │
│  Right Column (2-col grid):                                     │
│                                                                   │
│  Paragraph 1: "United Holdings Ltd – Live With Purpose..."      │
│               "...Since acquiring our operating license in 2016" │
│                                                                   │
│  Paragraph 2: "Our story is one of resilience..."               │
│               "...offering a wide range of products..."          │
│                                                                   │
│  Fields to Migrate: 3                                           │
│  - journeyHeading (string)                                      │
│  - journeyParagraphs (string[]) - 2 items                       │
└─────────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│              VISION & MISSION SECTION                           │
├─────────────────────────────────────────────────────────────────┤
│  Background: White                                              │
│  2-Column Layout                                                │
│                                                                   │
│  Column 1:                      │  Column 2:                    │
│  ┌──────────────────────────────┐ ┌──────────────────────────┐ │
│  │ Our Vision                   │ │ Our Mission              │ │
│  │                              │ │                          │ │
│  │ "To be the leading customer‑ │ │ "We exist to uplift     │ │
│  │ centric financial services   │ │  lives by delivering... │ │
│  │ provider..."                 │ │  ...shared with people..." │
│  └──────────────────────────────┘ └──────────────────────────┘ │
│                                                                   │
│  Fields to Migrate: 4                                           │
│  - visionHeading (string)                                       │
│  - visionContent (string - long text)                           │
│  - missionHeading (string)                                      │
│  - missionContent (string - long text)                          │
└─────────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│           GROUP OF COMPANIES SECTION (3 CARDS)                  │
├─────────────────────────────────────────────────────────────────┤
│  Background: #9b1c20                                            │
│  Heading: "Our Group of Companies"                              │
│                                                                   │
│  3-Column Grid (responsive):                                    │
│                                                                   │
│  ┌────────────────────┐  ┌──────────────────────┐ ┌───────────┐│
│  │ Card 1             │  │ Card 2               │ │ Card 3    ││
│  ├────────────────────┤  ├──────────────────────┤ ├───────────┤│
│  │ Image: /life2.jpg  │  │ Image: /general.jpg  │ │ Image:    ││
│  │                    │  │                      │ │ /Pay.jpg  ││
│  │ Title:             │  │ Title:               │ │ Title:    ││
│  │ United Life        │  │ United General       │ │ United    ││
│  │ Assurance          │  │ Insurance            │ │ Pay       ││
│  │ Color: #3d834d     │  │ Color: #9b1c20       │ │ Color:    ││
│  │                    │  │                      │ │ #f79620   ││
│  │ Description:       │  │ Description:         │ │           ││
│  │ "Offering long‑    │  │ "Providing short-    │ │ "Delivering
│  │ term insurance..." │  │ term insurance..."   │ │ fast, rel ││
│  │                    │  │                      │ │ able..."  ││
│  │ Link:              │  │ Link:                │ │ Link:     ││
│  │ /united-life-      │  │ /united-general-     │ │ /united-  ││
│  │ assurance          │  │ insurance            │ │ pay       ││
│  │                    │  │                      │ │           ││
│  │ Button: "Learn     │  │ Button: "Learn       │ │ "Learn    ││
│  │ more →"            │  │ more →"              │ │ more →"   ││
│  └────────────────────┘  └──────────────────────┘ └───────────┘│
│                                                                   │
│  Footer: "Together, these subsidiaries make United Holdings..."  │
│                                                                   │
│  Fields to Migrate: 8                                           │
│  - groupHeading (string)                                        │
│  - groupDescription (string - long text)                        │
│  - companies[0]: {name, description, image, link, color}        │
│  - companies[1]: {name, description, image, link, color}        │
│  - companies[2]: {name, description, image, link, color}        │
└─────────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FINAL CTA SECTION                            │
├─────────────────────────────────────────────────────────────────┤
│  Background: #9b1c20                                            │
│                                                                   │
│  Heading: "Ready to Get Started?"                               │
│                                                                   │
│  Description: "Join thousands of satisfied clients who trust    │
│               United Holdings with their financial security."    │
│                                                                   │
│  Button: "Contact Us" → /contact                               │
│                                                                   │
│  Fields to Migrate: 4                                           │
│  - ctaHeading (string)                                          │
│  - ctaDescription (string - long text)                          │
│  - ctaCTAText (string)                                          │
│  - ctaCTALink (string - url)                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 Data Fields Summary

### Total: 17 Fields Across 6 Sections

```
HEADER SECTION:
├── headerTitle                (string)
├── headerSubtitle            (string)
└── headerImage               (url/path)

CLAIMS BANNER:
├── claimsDescription         (string - long)
├── claimsCTAText            (string)
└── claimsCTALink            (url)

OUR JOURNEY:
├── journeyHeading           (string)
└── journeyParagraphs        (string[] - 2 items)

VISION & MISSION:
├── visionHeading            (string)
├── visionContent            (string - long)
├── missionHeading           (string)
└── missionContent           (string - long)

GROUP OF COMPANIES:
├── groupHeading             (string)
├── groupDescription         (string - long)
└── companies[3]             (object[])
    ├── companies[0].name
    ├── companies[0].description
    ├── companies[0].image
    ├── companies[0].link
    ├── companies[0].color
    ├── companies[1].*
    └── companies[2].*

FINAL CTA:
├── ctaHeading               (string)
├── ctaDescription           (string - long)
├── ctaCTAText              (string)
└── ctaCTALink              (url)
```

---

## 🎨 Color Scheme Used

```
Primary Brand Red:    #9b1c20
Dark Red:             #881a1e

Company Colors:
├── ULA (Life):        #3d834d (Green)
├── UGI (General):     #9b1c20 (Red)
└── UP (Pay):          #f79620 (Orange)

Text:
├── White:             Text on #9b1c20 background
├── Gray-700:          Body text on white
└── Gray-600:          Secondary text
```

---

## 📱 Responsive Design

```
Mobile (< 640px):
- Sections stack vertically
- Single column layout
- Full-width cards
- Smaller fonts (sm:)

Tablet (640px - 1024px):
- 2-column layouts emerge
- Cards in 2-column grid
- Medium spacing

Desktop (> 1024px):
- Full 3-column company cards
- 2-column vision/mission
- Maximum width: 1400px
- Optimal spacing
```

---

## 🔄 Content Update Flow

```
Admin Updates Content
        │
        ▼
Admin Panel (UI)
        │
        ▼
PUT /api/cms/pages/about
        │
        ▼
Validate Data
        │
        ▼
Update Database
        │
        ▼
Clear Cache
        │
        ▼
Next page visit:
GET /api/cms/pages/about
        │
        ▼
Browser fetches new data
        │
        ▼
Page renders with updated content
```

---

## 📈 Migration Impact

### Current State
- 🔴 Hardcoded in component
- 🔴 200+ lines of JSX
- 🔴 Requires developer to update
- 🔴 Changes need deployment

### After Migration
- 🟢 Stored in database
- 🟢 Clean component (50 lines)
- 🟢 Non-technical staff can update
- 🟢 Changes live immediately (with cache invalidation)

---

## ✅ Quality Assurance Checklist

### Before Deployment
- [ ] All 17 fields data in database
- [ ] API endpoint returns correct data
- [ ] Images load properly
- [ ] Links work correctly
- [ ] Responsive design works
- [ ] Loading state displays
- [ ] Error handling works
- [ ] Cache invalidation works
- [ ] Admin can update content
- [ ] Version history preserved

### Performance Checks
- [ ] API response < 200ms
- [ ] Page load time unchanged
- [ ] Images optimized
- [ ] No layout shift (CLS)
- [ ] Caching working

---

## 🎯 Success Criteria

```
✅ Functionality
  - Page displays correctly
  - All sections render
  - Links navigate properly
  - Images load correctly

✅ Performance
  - Page loads in < 3s
  - API response < 200ms
  - Cached responses < 50ms

✅ Maintainability
  - Content editable via admin panel
  - No developer intervention needed
  - Clear audit trail
  - Version history available

✅ User Experience
  - Responsive on all devices
  - No layout shifts
  - Smooth transitions
  - Fast interactions
```

---

**Visual Mapping Complete**: November 11, 2025  
**Complexity Level**: Low  
**Readiness**: Ready for Development
