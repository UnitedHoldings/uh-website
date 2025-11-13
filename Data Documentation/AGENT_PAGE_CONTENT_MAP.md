# Agent Component - Visual Content Map

**Component**: `components/Agent.js`  
**Status**: Form-based contact interface  
**Complexity**: Medium (form handling + contact directory)  
**Visual Sections**: 6 major sections with multiple subsections

---

## 🎨 Component Structure Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Agent Component                      │
│                   (bg: white / transparent)                 │
└─────────────────────────────────────────────────────────────┘
         │
         ├─── Section Header (py-4, mb-6)
         │     ├── Title: "Speak to an Officer"
         │     │   Color: #9b1c20 (Brand Red)
         │     │   Size: xl-3xl font-bold
         │     │
         │     └── Description: Long-form text
         │         Color: gray-600
         │         Size: base-xl
         │
         ├─── Video Section (Desktop only)
         │     └── Height: 300px-700px (responsive)
         │         Video: Agent promotional video
         │         Provider: Cloudinary
         │
         ├─── Form Container (Overlay on video or full-width)
         │     ├─── Form Header
         │     │     ├── Title: "Request a Callback"
         │     │     └── Subtitle: "From Our Insurance Officers"
         │     │
         │     ├─── Form Fields (Responsive)
         │     │     ├── First Name (required)
         │     │     ├── Last Name (optional)
         │     │     ├── Mobile Number (required)
         │     │     └── Reason Select (required)
         │     │
         │     ├─── Email Routing Info (conditional)
         │     │     └── "Your request will be sent to: {email}"
         │     │
         │     ├─── Submit Button
         │     │     ├── Icon: Phone
         │     │     └── Text: "Send Callback" / "Sending..."
         │     │
         │     ├─── Message Display (conditional)
         │     │     ├── Success: Green text
         │     │     └── Error: Yellow text
         │     │
         │     ├─── Quick Links Section
         │     │     ├── Title: "Quick Links"
         │     │     └── 4 action links
         │     │
         │     ├─── Contact Information
         │     │     ├── Primary Phone: 8001010
         │     │     └── Primary Email: info@united.co.sz
         │     │
         │     └─── Department Directory
         │           ├── Title: "Contact Specific Departments"
         │           ├── Call Center: callcenter@united.co.sz
         │           ├── United Pay: upay@united.co.sz
         │           ├── Insurance: ugi@united.co.sz
         │           └── ULA: ula@united.co.sz
         │
         └─── Image Section (Desktop)
               └── Advertisement image: /ad.jpg
```

---

## 📐 Detailed Section Layout

### Section 1: Header

```
┌─────────────────────────────────────────────────────┐
│  Speak to an Officer                                │
│  ─────────────────────────────────────────────────  │
│                                                     │
│  Connect with one of our officers to explore       │
│  tailored solutions.                               │
│                                                     │
└─────────────────────────────────────────────────────┘

Colors:
  Title:  #9b1c20 (primary red)
  Text:   #4b5563 (gray-600)

Spacing:
  margin-bottom: 24-32px
  padding: responsive (16px to 0)

Typography:
  Title:       xl-3xl font-bold
  Description: base-xl text-gray-600
```

---

### Section 2: Video Section

```
Desktop Only (hidden on mobile/tablet):
┌──────────────────────────────────────────────┐
│                                              │
│      [Video Player - Agent Promotion]       │
│      300px (sm) → 500px (md) → 700px (lg)  │
│                                              │
└──────────────────────────────────────────────┘

Layout:
- Desktop: h-[700px]
- Mobile: h-[300px]
- Tablet: h-[400px] to h-[500px]
- Source: Cloudinary video
- Provider: Cloudinary

Display:
- Desktop: lg:block hidden
- Mobile: None
- Video: Responsive height
```

---

### Section 3: Form Container

```
Layout Positioning:
Desktop:
  - Position: absolute
  - Top: 55% (overlaid on video)
  - Transform: centered
  
Mobile/Tablet:
  - Position: static (normal flow)
  - Full width
  - Above or after video

Form Structure:
┌────────────────────────────────────────┬─────────────────┐
│  REQUEST A CALLBACK FORM               │   IMAGE SECTION │
│  From Our Insurance Officers           │   (Desktop only)│
│                                        │                 │
│  [First Name *] [Last Name]           │   [/ad.jpg]    │
│                                        │   500x1000 px  │
│  [Mobile Number *] [Reason *]         │                 │
│                                        │                 │
│  Your request will be sent to: email   │                 │
│                                        │                 │
│  [Send Callback Button]                │                 │
│                                        │                 │
│  [Success/Error Message]               │                 │
│                                        │                 │
│  QUICK LINKS                           │                 │
│  - File a Claim                        │                 │
│  - Track a Claim                       │                 │
│  - Get Proof of Insurance              │                 │
│  - Make Payment                        │                 │
│                                        │                 │
│  CONTACT INFORMATION                   │                 │
│  📞 800 1010                           │                 │
│  ✉️ info@united.co.sz                 │                 │
│                                        │                 │
│  DEPARTMENTS                           │                 │
│  Call Center: callcenter@...           │                 │
│  United Pay: upay@...                  │                 │
│  Insurance: ugi@...                    │                 │
│  ULA: ula@...                          │                 │
└────────────────────────────────────────┴─────────────────┘

Container Styles:
- Background:      white
- Border:          rounded-xl (mobile), rounded-3xl (desktop)
- Padding:         12-32px (responsive)
- Flex:            column (mobile), row (desktop)
- Max-width:       1200px-1400px
```

---

### Section 3A: Form Title

```
┌────────────────────────────────┐
│ REQUEST A CALLBACK             │
│ ────────────────────────────── │
│ From Our Insurance Officers    │
└────────────────────────────────┘

Styling:
- Title Font:    bold text-xl-2xl
- Title Color:   #9b1c20 (primary red)
- Subtitle:      light text-base-lg
- Subtitle Color: #9b1c20
- Gap:           8px
```

---

### Section 3B: Form Fields

```
Mobile (1 column):
┌──────────────────────────────────┐
│ [First Name *]                   │
├──────────────────────────────────┤
│ [Last Name]                      │
├──────────────────────────────────┤
│ [Mobile Number *]                │
├──────────────────────────────────┤
│ [Select Reason *]                │
├──────────────────────────────────┤
│ Your request will be sent to:    │
│ info@united.co.sz                │
├──────────────────────────────────┤
│ [Send Callback] (Full width)     │
└──────────────────────────────────┘

Tablet/Desktop (2-3 columns):
┌─────────────────────┬─────────────────────┐
│ [First Name *]      │ [Last Name]        │
├─────────────────────┴─────────────────────┤
│ [Mobile Number *]   │ [Select Reason *]  │
├────────────────────────────────────────────┤
│ Your request will be sent to: info@...    │
├────────────────────────────────────────────┤
│ [Send Callback]     (Inline button)       │
└────────────────────────────────────────────┘

Input Styling:
- Background:      white
- Border:          border-[#9b1c20]/20
- Border Radius:   rounded-full
- Padding:         12-16px
- Focus Ring:      ring-2 ring-[#9b1c20]/30
- Text Color:      #9b1c20
- Placeholder:     muted gray

Callback Reason Options:
- Select Reason * (placeholder)
- Get A Quote
- File A Claim
- Ask Questions
- Account Statement
- Other
```

---

### Section 3C: Email Routing Notification

```
┌─────────────────────────────────────────────────┐
│ Your request will be sent to:                   │
│ ▌ info@united.co.sz                            │
└─────────────────────────────────────────────────┘

Styling:
- Background:      gray-50
- Border:          rounded-lg
- Padding:         8px
- Text Size:       xs
- Text Color:      gray-600
- Email Bold:      font-semibold #9b1c20
- Display:         Only when reason selected
- Animation:       Fade in
```

---

### Section 3D: Submit Button

```
┌────────────────────────────────┐
│ 📞  Send Callback              │
└────────────────────────────────┘

States:
Idle:
  - Background: #9b1c20
  - Text: white
  - Hover: #8a191d (darker)
  - Cursor: pointer

Loading:
  - Background: #9b1c20
  - Text: white
  - Opacity: 50%
  - Cursor: not-allowed
  - Label: "Sending..."

Disabled:
  - Opacity: 50%
  - Cursor: not-allowed

Styling:
- Shape:          rounded-full
- Padding:        12-16px vertical, 24-64px horizontal
- Width:          Full (mobile), auto (desktop)
- Min-height:     48px (accessibility)
- Font:           bold, font-outfit
- Icon:           SlPhone (left side)
- Transition:     300ms ease
- Focus:          ring-2 ring-[#9b1c20]/30
```

---

### Section 3E: Message Display

```
┌─────────────────────────────────┐
│ ✓ Callback request sent         │
│   successfully! We will contact  │
│   you shortly.                  │
└─────────────────────────────────┘

Success Message:
- Color: #16a34a (green-600)
- Text: "Callback request sent successfully! We will contact you shortly."
- Display: After form submission success

Error Message:
- Color: #ca8a04 (yellow-600)
- Text: "Failed to send callback request. Please try again."
- Display: On error or validation failure

Styling:
- Text Size:       text-sm
- Font Weight:     font-semibold
- Display:         Conditional (message state)
- Animation:       Fade in
```

---

### Section 3F: Quick Links

```
Desktop Layout (Horizontal):
┌───────────────────────────────────────────────┐
│ QUICK LINKS                                   │
│ 📄 File a Claim   🎯 Track a Claim          │
│ ℹ️ Get Proof    🔗 Make Payment             │
└───────────────────────────────────────────────┘

Mobile Layout (Vertical):
┌───────────────────────────────┐
│ QUICK LINKS                   │
│ 📄 File a Claim              │
│ 🎯 Track a Claim             │
│ ℹ️ Get Proof of Insurance    │
│ 🔗 Make Payment              │
└───────────────────────────────┘

Header:
- Text: "Quick Links"
- Font: bold text-sm-base
- Color: gray-600
- Margin-bottom: 12px

Links:
┌─────────────────────────────────┐
│ 📄 File a Claim                 │
│    Font: semibold              │
│    Color: #9b1c20              │
│    Hover: underline            │
│    Icon: SlDoc                 │
└─────────────────────────────────┘

Current Status:
- File a Claim: ✅ Linked to /claims
- Track a Claim: ❌ Display-only (not linked)
- Get Proof: ❌ Display-only (not linked)
- Make Payment: ❌ Display-only (not linked)

To Migrate: Make all links functional via CMS
```

---

### Section 3G: Contact Information

```
┌──────────────────────────────────┐
│ 📞 800 1010                      │
│ ✉️ info@united.co.sz            │
└──────────────────────────────────┘

Styling:
- Icons: SlPhone, SlEnvolope
- Icon Color: #9b1c20
- Icon Size: text-sm-base
- Text: semibold, #9b1c20
- Hover: underline, text-[#F7941D]
- Link: <a href="tel:..."> / <a href="mailto:...">
- Spacing: flex gap-2 items-center
- Responsive: flex row (sm+), column (mobile)

Links:
- Phone: tel:8001010
- Email: mailto:info@united.co.sz

Animation:
- Hover: text-color transition to #F7941D
- Duration: instant
```

---

### Section 3H: Department Directory

```
┌──────────────────────────────────────────┐
│ CONTACT SPECIFIC DEPARTMENTS             │
│ ─────────────────────────────────────    │
│                                          │
│ Call Center: callcenter@united.co.sz     │
│ United Pay:  upay@united.co.sz           │
│ Insurance:   ugi@united.co.sz            │
│ ULA:         ula@united.co.sz            │
└──────────────────────────────────────────┘

Header:
- Text: "Contact Specific Departments"
- Font: bold text-sm-base
- Color: gray-600
- Border-top: 1px border-gray-200
- Padding-top: 16px
- Margin-bottom: 8px

Items (2-column grid on sm+, 1-column on mobile):
- Department Name: semibold #9b1c20
- Email: regular gray-700
- Text Size: xs
- Gap: 4px
- Alignment: flex items-center
- Department Email links: optional (could be made clickable)

To Migrate: Make emails clickable mailto links via CMS
```

---

### Section 4: Image Section

```
Desktop Only (lg: flex):
┌──────────────────────────┐
│                          │
│     [/ad.jpg]            │
│     500x1000px           │
│     Advertisement        │
│                          │
│  (Rounded corners)       │
└──────────────────────────┘

Mobile/Tablet:
┌──────────────────────────┐
│                          │
│     [/ad.jpg]            │
│     Full width           │
│     300-400px height     │
│                          │
└──────────────────────────┘

Image Styling:
- Source: /ad.jpg (static)
- Alt: "Advertisement"
- Width: 1000px (original)
- Height: 500px (original)
- Object-fit: cover
- Border: rounded-xl (mobile), rounded-2xl (desktop)
- Shadow: shadow-sm
- Max-height: 300px (sm) → 600px (xl)
- Responsive: w-full h-auto

To Migrate: Image URL from CMS config
```

---

## 🎨 Color Scheme Reference

### Primary Colors
```
Primary Red:      #9b1c20 (Brand main)
Darker Red:       #8a191d (Hover state)
Accent Orange:    #F7941D (Link hover)
Dark Gray:        #4b5563 (text-gray-600)
Light Gray:       #f8f9fa (backgrounds)
Lighter Gray:     #d1d5db (disabled)
```

### Application by Element

| Element | Primary | Secondary | Usage |
|---------|---------|-----------|-------|
| Section Title | #9b1c20 | - | h3 text |
| Form Title | #9b1c20 | - | Bold text |
| Inputs | #9b1c20 | - | Text, borders, focus |
| Button | #9b1c20 | #8a191d | Hover state |
| Links | #9b1c20 | #F7941D | Hover text |
| Icons | #9b1c20 | - | Accent color |
| Quick Links | #9b1c20 | #F7941D | Hover state |
| Contact Info | #9b1c20 | #F7941D | Hover state |
| Success Text | #16a34a | - | Green message |
| Error Text | #ca8a04 | - | Yellow message |

---

## 📱 Responsive Breakpoints

### Mobile (< 640px)
```
Header:
  - Title: text-xl
  - Description: text-base
  - Spacing: flex-col gap-3

Video:
  - Hidden (h-[300px] hidden)

Form:
  - Layout: flex-col (single column)
  - Fields: 1 per row
  - Padding: 12px
  - Border: rounded-xl

Quick Links:
  - Layout: flex-col
  - Each link full-width

Contact:
  - Layout: flex-col
  - Stacked vertically

Image:
  - Position: static (not overlay)
  - Width: 100%
  - Max-height: 300px
```

### Tablet (640px - 1024px)
```
Header:
  - Title: text-2xl
  - Flex: md:flex-row

Video:
  - Height: 400px (sm) → 500px (md)

Form:
  - Layout: flex-row (2 column for inputs)
  - Padding: 16-24px
  - Border: rounded-2xl

Quick Links:
  - Layout: flex-row (horizontal)

Contact:
  - Layout: flex-row (horizontal)

Image:
  - Position: lg:absolute (start overlaying)
```

### Desktop (> 1024px)
```
Header:
  - Title: text-3xl
  - Spacing: md:mb-8

Video:
  - Height: 700px
  - Block: lg:block hidden

Form:
  - Position: lg:absolute (overlaid)
  - Layout: lg:flex-row (side-by-side)
  - Transform: centered positioning
  - Padding: 32px

Quick Links:
  - Layout: lg:flex-row

Contact:
  - Layout: lg:flex-row

Image:
  - Position: lg:flex-1
  - Display: Shows on desktop
```

---

## 🔄 Data Update Flow

### Current Flow (Hardcoded)
```
┌──────────────────────┐
│   Hardcoded Data     │
│  (Agent.js file)     │
└────────┬─────────────┘
         │
         ├─ Component renders
         │
         └─ No API calls
           (except submit)
```

### Proposed Flow (API-Driven)
```
┌──────────────────────┐
│   useAgentData       │
│       Hook           │
└────────┬─────────────┘
         │
         ├─ Parallel Fetch:
         │  ├─ /api/cms/callback-reasons
         │  ├─ /api/cms/contact-info
         │  ├─ /api/cms/quick-links
         │  └─ /api/cms/agent/config
         │
         ├─ Loading = true
         │ (Show defaults/skeletons)
         │
         ├─ Data received
         │
         ├─ Loading = false
         │
         ▼
    Component renders with
    API data (smooth UX)
```

---

## 📋 Content Mapping Table

| Section | Current | API | Database | Update Freq |
|---------|---------|-----|----------|------------|
| Section Title | ❌ Hardcoded | ✅ Config | cms_agent_config | 6 months |
| Description | ❌ Hardcoded | ✅ Config | cms_agent_config | 6 months |
| Form Title | ❌ Hardcoded | ✅ Config | cms_agent_config | 6 months |
| Callback Reasons | ❌ Hardcoded | ✅ API | cms_callback_reasons | As needed |
| Email Routing | ❌ Hardcoded | ✅ API | cms_callback_reasons | As needed |
| Primary Phone | ❌ Hardcoded | ✅ API | cms_contact_info | Rarely |
| Primary Email | ❌ Hardcoded | ✅ API | cms_contact_info | Rarely |
| Departments | ❌ Hardcoded | ✅ API | cms_contact_departments | As needed |
| Quick Links | ❌ Hardcoded | ✅ API | cms_quick_links | Rarely |
| Form Messages | ❌ Hardcoded | ✅ Config | cms_agent_config | Rarely |
| Video URL | ❌ Hardcoded | ✅ Config | cms_agent_config | Yearly |
| Image URL | ❌ Hardcoded | ✅ Config | cms_agent_config | Yearly |

---

## 🧩 Component Dependencies

### Current Dependencies
```
Agent
  ├── VideoPlayer
  ├── React icons (SlPhone, SlEnvolope, etc.)
  ├── Next.js Image
  ├── Next.js Link
  └── State management (useState)

External:
  ├── react-icons/sl
  ├── next/image
  └── next/link
```

### After CMS Migration
```
Agent
  ├── useAgentData (custom hook)
  │   ├── agentAPI.getCallbackReasons()
  │   ├── agentAPI.getContactInfo()
  │   ├── agentAPI.getQuickLinks()
  │   ├── agentAPI.getAgentConfig()
  │   └── State management
  │
  ├── VideoPlayer
  ├── React icons (icon mapping)
  ├── Next.js Image
  └── Next.js Link
```

---

## ✅ QA Checklist

### Visual QA
- [ ] Header displays correctly
- [ ] Video shows on desktop only
- [ ] Form container positioned correctly
- [ ] Form fields responsive
- [ ] All icons render
- [ ] Colors match spec
- [ ] No text overflow
- [ ] Button states (idle, loading, disabled)
- [ ] Messages display correctly
- [ ] Quick links visible
- [ ] Contact info visible
- [ ] Departments listed
- [ ] Image displays

### Functional QA
- [ ] Form validation works
- [ ] All fields populate correctly
- [ ] Email routing correct
- [ ] Submit button works
- [ ] Loading state shows
- [ ] Success message appears
- [ ] Error handling works
- [ ] Phone link works (tel:)
- [ ] Email link works (mailto:)
- [ ] Quick links navigate
- [ ] Form clears after submit

### Responsive QA
- [ ] Mobile (320px+) works
- [ ] Tablet (768px+) works
- [ ] Desktop (1024px+) works
- [ ] Video hidden on mobile
- [ ] Form layout changes
- [ ] Image responsive
- [ ] Touch targets 48px+

### Performance QA
- [ ] API response < 200ms
- [ ] Form submit < 2s
- [ ] No layout shift
- [ ] Image optimized
- [ ] Cache strategy

### Accessibility QA
- [ ] ARIA labels present
- [ ] Keyboard navigation works
- [ ] Color contrast sufficient
- [ ] Focus indicators visible
- [ ] Required fields marked
- [ ] Error messages clear

---

## 🚀 Deployment Notes

### Feature Flag Implementation
```javascript
const USE_CMS_DATA = process.env.NEXT_PUBLIC_USE_CMS_DATA === 'true';

const data = USE_CMS_DATA 
  ? useAgentData() 
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

### Performance
- API response time < 200ms ✅
- Form load < 1s ✅
- No layout shift ✅
- Cache hit rate > 90% ✅

### User Experience
- Same visual appearance ✅
- Same functionality ✅
- Responsive design intact ✅
- No increase in errors ✅

### Operational
- Content update time: 1 day → 5 minutes ✅
- Non-technical staff can manage ✅
- Audit trail of changes ✅
- Easy rollback ✅

---

**Map Status**: ✅ Complete  
**Diagrams**: 8 detailed layouts  
**Tables**: 5 reference tables  
**Last Updated**: November 11, 2025  
**Ready for**: Development & QA Teams
