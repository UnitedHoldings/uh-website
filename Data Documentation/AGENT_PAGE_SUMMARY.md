# Agent Component - Quick Summary

**Component**: `components/Agent.js`  
**File Size**: 280+ lines  
**Status**: Mixed (Email API + Hardcoded form data)  
**Complexity**: Medium  
**Effort**: 3-5 hours  
**Priority**: High

---

## 🎯 Key Findings

### Total Hardcoded Items: 28

| Category | Count | Status | Notes |
|----------|-------|--------|-------|
| Callback Reasons | 5 | ❌ Hardcoded | 5 dropdown options |
| Email Routing Map | 6 | ❌ Hardcoded | Email → reason mapping |
| Contact Information | 6 | ❌ Hardcoded | Phone, email, departments |
| Quick Links | 4 | ❌ Hardcoded | Navigation actions |
| UI/Config | 1 | ✅ Partial | Some text hardcoded |

---

## 📊 Component Breakdown

### Section 1: Callback Request Form

**Current State**: Hardcoded dropdown with 5 options

**Callback Reasons**:
- Get A Quote
- File A Claim
- Ask Questions
- Account Statement
- Other

**Problem**: All routes to `info@united.co.sz` (no differentiation)

**To Migrate**: Create `CMSCallbackReason` entity with proper email routing

---

### Section 2: Email Routing

**Current State**: JavaScript function with hardcoded mapping

```javascript
const getEmailByReason = (reason) => {
  const emailMap = {
    'Get A Quote': 'info@united.co.sz',
    'File A Claim': 'info@united.co.sz',
    // ... more hardcoded
  };
}
```

**Problem**: All 5 reasons route to same email

**To Migrate**: Database-driven routing with department targeting

---

### Section 3: Contact Information

**Current State**: Hardcoded in JSX

**Items Hardcoded**:
- Primary Phone: 8001010
- Primary Email: info@united.co.sz
- Call Center: callcenter@united.co.sz
- United Pay: upay@united.co.sz
- Insurance: ugi@united.co.sz
- ULA: ula@united.co.sz

**To Migrate**: Create `CMSContactInfo` + `CMSContactDepartments` entities

---

### Section 4: Quick Links

**Current State**: Hardcoded JSX with 4 links

**Links**:
- File a Claim → /claims
- Track a Claim → (not linked)
- Get Proof of Insurance → (not linked)
- Make Payment → (not linked)

**Problem**: Only first link is functional; others are display-only

**To Migrate**: Create `CMSQuickLink` entity with proper href support

---

### Section 5: Configuration Text

**Current State**: Hardcoded strings

**Text Items**:
- Section title: "Speak to an Officer"
- Form title: "Request a Callback"
- Success message
- Error message
- Button text
- Headers and labels

**To Migrate**: Create `CMSAgentConfig` entity

---

## 🔌 Required API Endpoints

### 1. GET /api/cms/callback-reasons
Fetch all callback reason options

### 2. GET /api/cms/contact-info
Fetch phone, email, departments

### 3. GET /api/cms/quick-links
Fetch quick action links

### 4. GET /api/cms/agent/config
Fetch form configuration and text

### 5. POST /api/cms/callbacks
Submit new callback request

---

## 🗄️ Database Tables Needed

1. **cms_callback_reasons** (5 rows)
   - id, display_order, label, value, target_department, target_email, is_active, timestamps

2. **cms_contact_info** (1 row)
   - id, primary_phone, primary_email, main_video_url, main_image_url, is_active, timestamps

3. **cms_contact_departments** (4+ rows)
   - id, contact_info_id, department_name, email, phone, is_active, timestamps

4. **cms_quick_links** (4 rows)
   - id, display_order, label, href, icon_name, is_external, is_active, timestamps

5. **cms_agent_config** (1 row)
   - id, section_title, section_description, form_title, success_message, error_message, etc.

---

## 💻 Implementation Overview

### Current Code Problem

```javascript
// Hardcoded callback reasons
<option value="Get A Quote">Get A Quote</option>
<option value="File A Claim">File A Claim</option>

// Hardcoded email mapping
const emailMap = {
  'Get A Quote': 'info@united.co.sz',
  'File A Claim': 'info@united.co.sz',
};

// Hardcoded contact info
<a href="tel:8001010">800 1010</a>
<a href="mailto:info@united.co.sz">info@united.co.sz</a>
<span>callcenter@united.co.sz</span>
```

### Solution

```javascript
// From API
const { reasons, contactInfo, quickLinks, config } = useAgentData();

// Dynamic render
<select>
  {reasons.map(r => (
    <option key={r.id} value={r.value}>{r.label}</option>
  ))}
</select>

// Dynamic contact info
<a href={`tel:${contactInfo.primaryPhone}`}>
  {contactInfo.primaryPhone}
</a>

{contactInfo.departments.map(dept => (
  <div key={dept.id}>{dept.name}: {dept.email}</div>
))}
```

---

## 📈 Data Inventory

### Callback Reasons (5 items, 10 fields)

| # | Label | Value | Email | Department |
|---|-------|-------|-------|------------|
| 1 | Get A Quote | Get A Quote | info@united.co.sz | general |
| 2 | File A Claim | File A Claim | info@united.co.sz | claims |
| 3 | Ask Questions | Ask Questions | info@united.co.sz | support |
| 4 | Account Statement | Account Statement | info@united.co.sz | billing |
| 5 | Other | Other | callcenter@united.co.sz | general |

### Contact Info (6 items)

| Item | Current Value |
|------|---------------|
| Primary Phone | 8001010 |
| Primary Email | info@united.co.sz |
| Main Video | /video/Agent_wce4fn.mp4 |
| Main Image | /ad.jpg |

### Departments (4 items)

| Name | Email |
|------|-------|
| Call Center | callcenter@united.co.sz |
| United Pay | upay@united.co.sz |
| Insurance | ugi@united.co.sz |
| ULA | ula@united.co.sz |

### Quick Links (4 items)

| # | Label | URL | Icon | Functional |
|---|-------|-----|------|-----------|
| 1 | File a Claim | /claims | SlDoc | ✅ Yes |
| 2 | Track a Claim | N/A | SlTarget | ❌ No |
| 3 | Get Proof of Insurance | N/A | SlInfo | ❌ No |
| 4 | Make Payment | N/A | SlLink | ❌ No |

---

## 🚀 Implementation Plan

### Week 1: Backend
- [ ] Create 5 database tables
- [ ] Create 5 API endpoints
- [ ] Seed data
- [ ] Test endpoints

### Week 2: Frontend
- [ ] Create service layer
- [ ] Create custom hook
- [ ] Update component
- [ ] Remove hardcoded data
- [ ] Test thoroughly

### Timeline
- **Database Setup**: 1 hour
- **API Development**: 1.5 hours
- **Service Layer**: 30 minutes
- **Component Update**: 45 minutes
- **Testing**: 1 hour
- **Buffer**: 30 minutes
- **Total**: 4-5 hours

---

## ✅ Success Criteria

- [ ] All hardcoded reasons fetched from API
- [ ] Email routing from database
- [ ] Contact info dynamic
- [ ] Quick links properly configured
- [ ] Form submission working
- [ ] All text from config
- [ ] Responsive design maintained
- [ ] No console errors
- [ ] API response < 200ms

---

## 🔄 TypeScript Interfaces

```typescript
interface CMSCallbackReason {
  id: string;
  displayOrder: number;
  label: string;
  value: string;
  targetDepartment: string;
  targetEmail: string;
  isActive: boolean;
}

interface CMSContactDepartment {
  id: string;
  departmentName: string;
  email: string;
  phone?: string;
  description?: string;
}

interface CMSContactInfo {
  id: string;
  primaryPhone: string;
  primaryEmail: string;
  mainVideoUrl: string;
  mainImageUrl: string;
  departments: CMSContactDepartment[];
  isActive: boolean;
}

interface CMSQuickLink {
  id: string;
  displayOrder: number;
  label: string;
  href: string;
  iconName: 'file' | 'target' | 'info' | 'link';
  isExternal: boolean;
  isActive: boolean;
}

interface CMSAgentConfig {
  id: string;
  sectionTitle: string;
  sectionDescription: string;
  formTitle: string;
  formSubtitle: string;
  successMessage: string;
  errorMessage: string;
  emailNotificationText: string;
  departmentHeaderText: string;
  submitButtonText: string;
  loadingButtonText: string;
}
```

---

## 🎓 Key Learnings

### Current Architecture Issues

1. **Hardcoded Email Routing**: All reasons route to same email (not actually different)
2. **Non-Functional Links**: 3 of 4 quick links don't navigate anywhere
3. **Scattered Contact Info**: Same phone/email repeated in multiple places
4. **No Config Entity**: Form text hardcoded in component
5. **Icon Components**: Using React icons directly, not mappable to database

### Solution Patterns

1. **Email Routing**: Store in database with department targeting
2. **Quick Links**: Make all links functional via CMS
3. **Contact Directory**: Single source of truth for all contact data
4. **Config Entity**: All text/settings managed via CMS
5. **Icon Mapping**: Store icon name as string, map to component client-side

---

## 📞 Before You Start

### Questions for Product

1. Should different callback reasons route to different departments?
2. Should all 3 quick links be functional?
3. Should callback requests be tracked (CRM integration)?
4. Should phone number have format validation?
5. Should there be confirmation email to customer?
6. Should callback time be selectable?
7. Should form be pre-filled based on page context?

### Dependencies

None required! Uses existing:
- React hooks (useState, useEffect)
- Next.js Image/Link
- React Icons
- Fetch API

---

## 🎯 Next Steps

1. **Review** this summary with team
2. **Approve** the 5 entities
3. **Create** the 5 API endpoints
4. **Setup** database tables
5. **Implement** service layer
6. **Update** component
7. **Test** thoroughly

---

## 📊 Impact Assessment

### Content Update Time
- **Before**: Code change + deployment (~1 day)
- **After**: CMS update (~5 minutes)

### Time Saved
- Per update: 25+ minutes
- Annual (10 updates): 250+ hours

### User Experience
- Same visual appearance
- Same functionality
- Better data accuracy (no coding errors)

---

**Document Status**: ✅ Ready for Review  
**Last Updated**: November 11, 2025  
**Next Action**: Stakeholder Review & Approval
