# Product Requirements Document (PRD)

# Danaku App

**Version**: 1.0  
**Last Updated**: 10 January 2026  
**Document Owner**: Product Team  
**Status**: Draft

---

## 1. Executive Summary

### 1.1 Product Overview

Danaku App adalah aplikasi manajemen keuangan pribadi yang membantu pengguna untuk mengatur budget bulanan, melacak pengeluaran, memantau aset, dan mendapatkan insight keuangan melalui dashboard dan laporan yang interaktif.

### 1.2 Product Vision

Menjadi aplikasi keuangan pribadi terpercaya yang membantu setiap orang mencapai kebebasan finansial melalui perencanaan budget yang terstruktur dan tracking yang konsisten.

### 1.3 Target Audience

- **Primary**: Young professionals (25-40 tahun) yang ingin mengelola keuangan pribadi dengan lebih baik
- **Secondary**: Keluarga muda yang ingin tracking budget rumah tangga
- **Tertiary**: Freelancer/entrepreneur yang perlu memisahkan keuangan personal dan bisnis

### 1.4 Success Metrics

- **User Engagement**: 80% user aktif melakukan input spending minimal 3x per minggu
- **Retention**: 60% user masih aktif setelah 3 bulan
- **Completion Rate**: 70% user menyelesaikan setup awal
- **User Satisfaction**: NPS score > 50

---

## 2. Problem Statement

### 2.1 Current Pain Points

1. **Kesulitan Tracking Pengeluaran**: Banyak orang tidak tahu kemana uang mereka pergi setiap bulan
2. **Budget Planning yang Tidak Terstruktur**: Tidak ada sistem yang jelas untuk alokasi budget
3. **Lack of Visibility**: Sulit melihat progress keuangan dan pencapaian target
4. **Manual & Time-Consuming**: Excel spreadsheet memakan waktu dan prone to error
5. **No Insights**: Tidak ada analisis atau rekomendasi berdasarkan pola spending

### 2.2 User Stories

#### As a User, I want to...

- Setup kategori keuangan saya sendiri, sehingga sesuai dengan kebutuhan personal
- Membuat budget bulanan dengan mudah, sehingga saya tahu berapa yang bisa dibelanjakan
- Input pengeluaran dengan cepat, sehingga tidak lupa mencatat
- Melihat summary keuangan dalam satu dashboard, sehingga saya tahu kondisi keuangan saya
- Mendapatkan laporan bulanan, sehingga saya bisa evaluasi dan improve
- Track aset saya, sehingga saya tahu net worth dan progress menuju target

---

## 3. Product Requirements

### 3.1 Functional Requirements

#### FR-001: Setup & Configuration

**Priority**: P0 (Must Have)  
**Description**: User dapat mengkonfigurasi data master aplikasi

**Acceptance Criteria**:

- [ ] User dapat menambah/edit/hapus account summary (min 1, max 20)
- [ ] User dapat menambah/edit/hapus income sources (min 1, max 10)
- [ ] User dapat menambah/edit/hapus needs categories (min 1, max 30)
- [ ] User dapat menambah/edit/hapus wants categories (min 1, max 30)
- [ ] User dapat menambah/edit/hapus savings categories (min 1, max 10)
- [ ] User dapat menambah/edit/hapus account assets (min 1, max 20)
- [ ] User dapat set payday date (1-31)
- [ ] Data tersimpan dan persist setelah refresh
- [ ] Validasi: tidak boleh ada duplicate names dalam satu kategori

**User Flow**:

```
1. User membuka Setup page
2. User klik "Add" button pada kategori yang ingin ditambahkan
3. User input nama item
4. User klik "Save"
5. Item muncul di list
6. User dapat edit dengan klik item
7. User dapat delete dengan klik icon delete
```

---

#### FR-002: Monthly Budgeting

**Priority**: P0 (Must Have)  
**Description**: User dapat membuat dan mengelola budget bulanan

**Acceptance Criteria**:

- [ ] User dapat memilih bulan (January - December)
- [ ] User dapat input amount untuk setiap income source
- [ ] User dapat input amount untuk setiap savings item
- [ ] User dapat input amount untuk setiap expense item (needs + wants)
- [ ] System menghitung total income otomatis
- [ ] System menghitung total savings otomatis
- [ ] System menghitung total expenses otomatis
- [ ] System menghitung allocated percentage = (savings + expenses) / income \* 100%
- [ ] System menghitung non-allocated = income - (savings + expenses)
- [ ] Progress bar menunjukkan allocated percentage
- [ ] Data tersimpan per bulan
- [ ] User dapat copy budget dari bulan sebelumnya

**Calculations**:

```javascript
totalIncome = sum(all income sources)
totalSavings = sum(all savings items)
totalExpenses = sum(all expense items)
allocatedPercentage = ((totalSavings + totalExpenses) / totalIncome) * 100
nonAllocated = totalIncome - totalSavings - totalExpenses
```

**Validation**:

- Amount harus >= 0
- Warning jika allocated percentage > 100%
- Error jika income = 0 tapi ada expenses

---

#### FR-003: Summary Dashboard

**Priority**: P0 (Must Have)  
**Description**: User dapat melihat ringkasan keuangan bulanan

**Acceptance Criteria**:

- [ ] Menampilkan tanggal hari ini
- [ ] Menampilkan countdown "next payday is in X days"
- [ ] User dapat filter berdasarkan bulan
- [ ] Menampilkan summary per account (top 3 accounts)
- [ ] Menampilkan total per kategori (Needs, Wants, Savings)
- [ ] Menampilkan total income, non-allocated, usage percentage
- [ ] Tabel menampilkan semua expense items dengan:
  - Account (dropdown)
  - Expense List (dari budgeting)
  - Main Category (Needs/Wants/Savings)
  - Allocation (amount dari budgeting)
  - Percentage (allocation / total income \* 100%)
- [ ] Stacked bar chart menampilkan distribusi budget per kategori
- [ ] Pie chart menampilkan breakdown per kategori
- [ ] Charts update otomatis saat data berubah

**Chart Specifications**:

**Stacked Bar Chart**:

- X-axis: Categories (Needs, Wants, Savings)
- Y-axis: Amount (Rupiah)
- Stacked by: Individual expense items
- Colors: Category-based color scheme

**Pie Chart**:

- Segments: Needs, Wants, Savings
- Labels: Category name + percentage
- Colors: Needs (Orange), Wants (Pink), Savings (Green)

---

#### FR-004: Spending Tracker

**Priority**: P0 (Must Have)  
**Description**: User dapat mencatat dan mengelola pengeluaran harian

**Acceptance Criteria**:

- [ ] User dapat menambah spending dengan:
  - Date (date picker, default today)
  - Description (text, required, max 200 chars)
  - Category (dropdown dari budgeting list, required)
  - Amount (number, required, > 0)
- [ ] User dapat melihat list semua spending dalam tabel
- [ ] User dapat checkbox spending untuk mark as done
- [ ] User dapat edit spending
- [ ] User dapat delete spending
- [ ] Tabel dapat di-sort berdasarkan date (default: newest first)
- [ ] Tabel dapat di-filter berdasarkan:
  - Date range
  - Category
  - Checked/unchecked status
- [ ] Total spending ditampilkan di bottom
- [ ] Data tersimpan dengan timestamp

**Table Columns**:

1. Checkbox (✓)
2. Date
3. Description
4. Category
5. Amount (formatted as Rupiah)
6. Actions (Edit, Delete icons)

**Validation**:

- Date tidak boleh future date
- Description tidak boleh kosong
- Category harus dari list yang sudah di-setup
- Amount harus > 0

---

#### FR-005: Report & Analytics

**Priority**: P1 (Should Have)  
**Description**: User dapat melihat laporan keuangan bulanan dengan analisis

**Acceptance Criteria**:

- [ ] User dapat filter berdasarkan year dan month
- [ ] Menampilkan 4 metric cards:
  - Total Income (dari budgeting)
  - Budgeted Expenses (dari budgeting)
  - Total Spending (dari spending tracker)
  - Monthly Savings (income - total spending)
- [ ] Tabel perbandingan menampilkan:
  - Expense List (dari budgeting)
  - Allocation (budget amount)
  - Realization (actual spending dari tracker)
  - Budget Usage Progress (visual progress bar)
  - Percentage Usage (realization / allocation \* 100%)
- [ ] Progress bar berwarna:
  - Green: 0-80%
  - Yellow: 81-100%
  - Red: >100%
- [ ] Highlight items yang over budget
- [ ] Export report ke PDF (Phase 2)

**Calculations**:

```javascript
totalIncome = sum(budget income)
budgetedExpenses = sum(budget expenses)
totalSpending = sum(actual spending)
monthlySavings = totalIncome - totalSpending

// Per category
realization = sum(spending where category = X)
allocation = budget amount for category X
percentageUsage = (realization / allocation) * 100
```

**Color Coding**:

- 0-80%: Green (#10b981)
- 81-100%: Yellow (#f59e0b)
- > 100%: Red (#ef4444)

---

#### FR-006: Assets Management

**Priority**: P1 (Should Have)  
**Description**: User dapat mengelola dan tracking aset liquid & non-liquid

**Acceptance Criteria**:

- [ ] User dapat set target aset (amount)
- [ ] System menampilkan last update date
- [ ] System menghitung progress = (total assets / target) \* 100%
- [ ] User dapat menambah liquid assets dengan:
  - Description (text, required)
  - Value (number, required, >= 0)
  - Account (dropdown dari account assets, required)
- [ ] User dapat menambah non-liquid assets dengan:
  - Description (text, required)
  - Value (number, required, >= 0)
  - Account (dropdown atau text, required)
- [ ] User dapat edit/delete assets
- [ ] System menghitung total liquid assets otomatis
- [ ] System menghitung total non-liquid assets otomatis
- [ ] System menghitung total assets value = liquid + non-liquid
- [ ] Breakdown per account ditampilkan
- [ ] Yearly summary table menampilkan:
  - Month (January - December)
  - Total Income (dari budgeting)
  - Savings (dari budgeting savings)
  - Expenses (dari spending tracker)
- [ ] Bar chart menampilkan trend tahunan

**Calculations**:

```javascript
totalLiquidAssets = sum(all liquid assets values)
totalNonLiquidAssets = sum(all non-liquid assets values)
totalAssetsValue = totalLiquidAssets + totalNonLiquidAssets
progress = (totalAssetsValue / target) * 100

// Per account breakdown
accountTotal = sum(assets where account = X)
accountPercentage = (accountTotal / totalAssetsValue) * 100
```

---

### 3.2 Non-Functional Requirements

#### NFR-001: Performance

- Page load time < 2 seconds
- Smooth animations (60fps)
- Chart rendering < 1 second
- Support up to 10,000 spending entries without performance degradation

#### NFR-002: Usability

- Intuitive navigation (max 3 clicks to any feature)
- Mobile responsive (works on 320px - 1920px)
- Accessible (WCAG 2.1 Level AA)
- Support keyboard navigation
- Clear error messages

#### NFR-003: Reliability

- 99.9% uptime (for cloud version)
- Data backup daily
- Auto-save every 5 seconds
- Graceful error handling
- Data recovery mechanism

#### NFR-004: Security

- Data encryption at rest and in transit
- Secure authentication (OAuth 2.0)
- Input validation & sanitization
- XSS & CSRF protection
- Rate limiting

#### NFR-005: Scalability

- Support 100,000+ users (cloud version)
- Horizontal scaling capability
- Database optimization
- CDN for static assets
- Caching strategy

#### NFR-006: Maintainability

- Clean code architecture
- Comprehensive documentation
- Unit test coverage > 80%
- Integration tests for critical flows
- Automated deployment pipeline

---

## 4. User Interface Requirements

### 4.1 Navigation

- **Sidebar Navigation**: Always visible on desktop, collapsible on mobile
- **Active State**: Clear indication of current page
- **Quick Actions**: Floating action button for quick spending input

### 4.2 Layout

- **Desktop**: Sidebar (250px) + Main Content (fluid)
- **Tablet**: Collapsible sidebar + Main Content
- **Mobile**: Bottom navigation + Main Content

### 4.3 Components Style Guide

#### Colors

- Primary: Purple gradient (#667eea → #764ba2)
- Needs: Orange (#f59e0b)
- Wants: Pink (#ec4899)
- Savings: Green (#10b981)
- Income: Blue (#3b82f6)

#### Typography

- Headings: Inter Bold (24px, 20px, 18px, 16px)
- Body: Inter Regular (14px)
- Small: Inter Regular (12px)

#### Spacing

- Base unit: 8px
- Small: 8px
- Medium: 16px
- Large: 24px
- XLarge: 32px

#### Shadows

- Small: 0 1px 3px rgba(0,0,0,0.1)
- Medium: 0 4px 6px rgba(0,0,0,0.1)
- Large: 0 10px 15px rgba(0,0,0,0.1)

#### Border Radius

- Small: 4px
- Medium: 8px
- Large: 12px
- XLarge: 16px

---

## 5. Data Requirements

### 5.1 Data Storage

- **Local Storage**: For MVP (max 10MB)
- **Database**: PostgreSQL for cloud version
- **Backup**: Daily automated backups
- **Retention**: Unlimited (user can delete manually)

### 5.2 Data Privacy

- User data is private and not shared
- No third-party analytics without consent
- GDPR compliant
- Right to export data
- Right to delete account

### 5.3 Data Migration

- Import from Excel (Phase 2)
- Export to Excel/CSV
- Export to PDF reports
- Backup/Restore functionality

---

## 6. Integration Requirements

### 6.1 Phase 1 (MVP)

- No external integrations
- Standalone application

### 6.2 Phase 2

- **Bank Integration**: Open Banking API (optional)
- **Email**: Transactional emails (SendGrid/Mailgun)
- **Cloud Storage**: Google Drive / Dropbox backup

### 6.3 Phase 3

- **Payment Gateway**: For premium features
- **Analytics**: Google Analytics / Mixpanel
- **Push Notifications**: Firebase Cloud Messaging

---

## 7. Constraints & Assumptions

### 7.1 Constraints

- Budget: Self-funded (minimize costs)
- Timeline: 3 months for MVP
- Team: 1-2 developers
- No mobile app in Phase 1 (web only)

### 7.2 Assumptions

- Users have basic financial literacy
- Users have access to internet
- Users use modern browsers (Chrome, Firefox, Safari, Edge)
- Users are willing to manually input data

### 7.3 Dependencies

- Chart.js library for visualizations
- Modern browser support (ES6+)
- LocalStorage availability

---

## 8. Release Plan

### 8.1 Phase 1 - MVP (Month 1-3)

**Goal**: Launch basic functional app

**Features**:

- ✅ Setup & Configuration
- ✅ Monthly Budgeting
- ✅ Spending Tracker
- ✅ Summary Dashboard
- ✅ LocalStorage persistence

**Success Criteria**:

- 50 beta users
- 70% completion rate for setup
- Average 5 spending entries per week per user

---

### 8.2 Phase 2 - Enhanced (Month 4-6)

**Goal**: Add analytics and asset management

**Features**:

- ✅ Report & Analytics
- ✅ Assets Management
- ✅ Export to Excel/PDF
- ✅ Recurring transactions
- ✅ Budget templates

**Success Criteria**:

- 500 active users
- 60% retention after 3 months
- NPS > 40

---

### 8.3 Phase 3 - Scale (Month 7-12)

**Goal**: Multi-user support and mobile app

**Features**:

- 🔲 User authentication
- 🔲 Cloud database
- 🔲 Multi-device sync
- 🔲 Mobile app (React Native)
- 🔲 Bank integration
- 🔲 Financial goals
- 🔲 Notifications

**Success Criteria**:

- 5,000 active users
- 70% retention after 3 months
- NPS > 50
- <1% error rate

---

## 9. Risk Assessment

### 9.1 Technical Risks

| Risk                            | Impact | Probability | Mitigation                                       |
| ------------------------------- | ------ | ----------- | ------------------------------------------------ |
| Browser compatibility issues    | Medium | Medium      | Test on major browsers, use polyfills            |
| LocalStorage limitations        | High   | Low         | Implement data cleanup, migrate to DB in Phase 2 |
| Performance with large datasets | Medium | Medium      | Implement pagination, lazy loading               |
| Data loss                       | High   | Low         | Auto-save, backup mechanism                      |

### 9.2 Business Risks

| Risk                           | Impact | Probability | Mitigation                                  |
| ------------------------------ | ------ | ----------- | ------------------------------------------- |
| Low user adoption              | High   | Medium      | Marketing, user feedback, iterate quickly   |
| Competition from existing apps | Medium | High        | Focus on unique value prop, better UX       |
| User retention                 | High   | Medium      | Gamification, notifications, value delivery |
| Monetization challenges        | Medium | Low         | Freemium model, premium features            |

---

## 10. Success Metrics & KPIs

### 10.1 Acquisition Metrics

- **Sign-ups**: Target 100 users in Month 1
- **Activation Rate**: 70% complete setup
- **Time to First Value**: <5 minutes

### 10.2 Engagement Metrics

- **DAU/MAU Ratio**: >30%
- **Session Duration**: >5 minutes average
- **Feature Usage**:
  - Spending input: 80% of users
  - Budget creation: 90% of users
  - Report viewing: 60% of users

### 10.3 Retention Metrics

- **Day 1 Retention**: >60%
- **Week 1 Retention**: >50%
- **Month 1 Retention**: >40%
- **Month 3 Retention**: >30%

### 10.4 Satisfaction Metrics

- **NPS Score**: >50
- **CSAT Score**: >4.0/5.0
- **Bug Reports**: <5 per 100 users
- **Support Tickets**: <10 per 100 users

---

## 11. Appendix

### 11.1 Glossary

- **Allocated Money**: Total budget yang sudah dialokasikan (savings + expenses)
- **Non-allocated**: Sisa uang yang belum dialokasikan
- **Liquid Assets**: Aset yang mudah dicairkan (cash, savings, stocks)
- **Non-Liquid Assets**: Aset yang sulit dicairkan (property, vehicle)
- **Realization**: Actual spending yang terjadi
- **Allocation**: Budget yang direncanakan

### 11.2 References

- Inspiration: "Danaku" Movie
- Excel Template: User's personal finance spreadsheet
- Similar Apps: YNAB, Mint, PocketGuard, Goodbudget

### 11.3 Change Log

| Version | Date       | Author       | Changes     |
| ------- | ---------- | ------------ | ----------- |
| 1.0     | 2026-01-10 | Product Team | Initial PRD |

---

**Document Status**: Draft  
**Next Review Date**: 2026-01-17  
**Approval Required From**: Product Owner, Tech Lead, Design Lead
