# MVP (Minimum Viable Product) Specification

# Home Sweet Loan App

**Version**: 1.0  
**Date**: 10 January 2026  
**Status**: Planning Phase

---

## 🎯 MVP Goal

Meluncurkan aplikasi manajemen keuangan pribadi yang **functional, simple, dan valuable** dalam waktu **3 bulan** dengan fokus pada **core features** yang paling dibutuhkan user.

---

## 📊 MVP Scope

### ✅ IN SCOPE (Must Have)

#### 1. Setup & Configuration

**Why**: Foundation untuk semua fitur lainnya  
**User Value**: Personalisasi sesuai kebutuhan masing-masing user

**Features**:

- ✅ Setup account summary (BCA, Gopay, Permata, etc)
- ✅ Setup income sources (Monthly Salary, Bonus, etc)
- ✅ Setup expense categories:
  - Needs (Home Rent, Course, Utilities, etc)
  - Wants (Shopping, Entertainment, etc)
  - Savings (General Savings, Emergency Funds, etc)
- ✅ Setup account assets
- ✅ Set payday date (1-31)
- ✅ CRUD operations untuk semua setup items

**Technical**:

- LocalStorage untuk persistence
- Simple form validation
- No authentication (single user)

---

#### 2. Monthly Budgeting

**Why**: Core feature untuk planning keuangan  
**User Value**: Tahu berapa yang bisa dibelanjakan setiap bulan

**Features**:

- ✅ Select month (January - December)
- ✅ Input budget untuk income sources
- ✅ Input budget untuk savings
- ✅ Input budget untuk expenses (needs + wants)
- ✅ Auto-calculate:
  - Total income
  - Total savings
  - Total expenses
  - Allocated percentage
  - Non-allocated amount
- ✅ Visual progress bar untuk allocated percentage
- ✅ Save budget per month

**Technical**:

- Data structure: `budgets[year-month]`
- Real-time calculations
- LocalStorage persistence

---

#### 3. Spending Tracker

**Why**: Track actual pengeluaran vs budget  
**User Value**: Awareness kemana uang pergi

**Features**:

- ✅ Add spending entry:
  - Date picker
  - Description (text input)
  - Category (dropdown dari budgeting list)
  - Amount (number input)
- ✅ List all spending entries in table
- ✅ Checkbox untuk mark as done
- ✅ Edit spending entry
- ✅ Delete spending entry
- ✅ Sort by date (newest first)
- ✅ Show total spending

**Technical**:

- Data structure: `spending[]` array
- UUID untuk unique ID
- LocalStorage persistence
- Simple table with inline editing

---

#### 4. Summary Dashboard

**Why**: Quick overview kondisi keuangan  
**User Value**: Lihat big picture dalam satu halaman

**Features**:

- ✅ Display current date
- ✅ Countdown "next payday in X days"
- ✅ Filter by month
- ✅ Show summary cards:
  - Top 3 accounts
  - Needs total
  - Wants total
  - Savings total
  - Total income
  - Non-allocated
  - Usage percentage
- ✅ Table with:
  - Account (dropdown)
  - Expense list
  - Main category
  - Allocation
  - Percentage
- ✅ Basic charts:
  - Stacked bar chart (budget distribution)
  - Pie chart (category breakdown)

**Technical**:

- Chart.js for visualizations
- Aggregate data from budgeting
- Responsive layout

---

#### 5. Data Persistence

**Why**: User tidak mau input ulang setiap kali  
**User Value**: Data tersimpan dan reliable

**Features**:

- ✅ Auto-save to LocalStorage
- ✅ Load data on app start
- ✅ Handle LocalStorage errors gracefully
- ✅ Data validation before save

**Technical**:

- LocalStorage API
- JSON serialization
- Error handling
- Max 10MB storage

---

### ❌ OUT OF SCOPE (Phase 2+)

#### Features NOT in MVP:

- ❌ User authentication & multi-user
- ❌ Cloud database & sync
- ❌ Report & Analytics page (simplified version in Summary)
- ❌ Assets Management (separate feature)
- ❌ Export to Excel/PDF
- ❌ Import from Excel
- ❌ Recurring transactions
- ❌ Budget templates
- ❌ Financial goals
- ❌ Notifications & reminders
- ❌ Mobile app
- ❌ Bank integration
- ❌ Email reports
- ❌ Advanced filtering & search
- ❌ Data backup to cloud
- ❌ Multi-currency support
- ❌ Collaboration features
- ❌ AI-powered insights

---

## 🎨 MVP Design Principles

### 1. Simplicity First

- Clean, minimal UI
- No overwhelming options
- Progressive disclosure
- Clear call-to-actions

### 2. Fast & Responsive

- Instant feedback
- No loading spinners (local data)
- Smooth transitions
- 60fps animations

### 3. Mobile-Friendly

- Responsive design
- Touch-friendly buttons (min 44px)
- Works on 320px width
- No horizontal scroll

### 4. Accessible

- Keyboard navigation
- Clear labels
- Good contrast ratios
- Screen reader friendly

---

## 🏗️ MVP Technical Architecture

### Frontend Stack

```
HTML5
├── Semantic markup
├── Accessibility features
└── SEO meta tags

CSS3
├── CSS Variables for theming
├── Flexbox & Grid layouts
├── Media queries for responsive
└── Smooth animations

JavaScript (Vanilla ES6+)
├── Modular code structure
├── Event-driven architecture
├── LocalStorage API
└── Chart.js for visualizations
```

### File Structure

```
home-sweet-loan-app/
├── index.html              # Main HTML file
├── styles.css              # All styles
├── app.js                  # Main application logic
├── utils/
│   ├── storage.js         # LocalStorage utilities
│   ├── calculations.js    # Budget calculations
│   ├── formatters.js      # Number/date formatters
│   └── validators.js      # Input validation
├── components/
│   ├── navigation.js      # Sidebar navigation
│   ├── setup.js          # Setup page logic
│   ├── budgeting.js      # Budgeting page logic
│   ├── spending.js       # Spending page logic
│   └── summary.js        # Summary page logic
└── assets/
    ├── icons/            # SVG icons
    └── fonts/            # Web fonts
```

### Data Models (LocalStorage)

```javascript
// Setup Configuration
{
  "setup": {
    "accountSummary": ["BCA", "Gopay", "Permata"],
    "incomeSources": ["Monthly Salary", "Bonus"],
    "needs": ["Home Rent", "Course", "Utilities"],
    "wants": ["Shopping", "Entertainment"],
    "savings": ["General Savings", "Emergency Funds"],
    "accountAssets": ["General Savings", "Bibit"],
    "paydayDate": 5
  }
}

// Budget Data
{
  "budgets": {
    "2026-01": {
      "income": {
        "Monthly Salary": 6430000,
        "Bonus": 0
      },
      "savings": {
        "General Savings": 500000,
        "Emergency Funds": 300000
      },
      "expenses": {
        "Home Rent": 1700000,
        "Course": 150000,
        "Shopping": 200000
      }
    }
  }
}

// Spending Data
{
  "spending": [
    {
      "id": "uuid-1",
      "date": "2026-01-05",
      "description": "Gasoline",
      "category": "Transportation",
      "amount": 100000,
      "checked": false,
      "createdAt": "2026-01-05T10:30:00Z"
    }
  ]
}
```

---

## 🚀 MVP Development Timeline

### Week 1-2: Foundation

- [ ] Project setup & structure
- [ ] Design system & CSS variables
- [ ] Navigation component
- [ ] LocalStorage utilities
- [ ] Basic routing/page switching

### Week 3-4: Setup Page

- [ ] Setup UI components
- [ ] CRUD operations for all categories
- [ ] Form validation
- [ ] Data persistence
- [ ] Testing & bug fixes

### Week 5-6: Budgeting Page

- [ ] Budgeting UI
- [ ] Month selector
- [ ] Input forms for income/savings/expenses
- [ ] Calculation logic
- [ ] Progress bar & summary
- [ ] Testing & bug fixes

### Week 7-8: Spending Tracker

- [ ] Spending form UI
- [ ] Table component
- [ ] CRUD operations
- [ ] Checkbox functionality
- [ ] Sorting & filtering
- [ ] Testing & bug fixes

### Week 9-10: Summary Dashboard

- [ ] Dashboard layout
- [ ] Summary cards
- [ ] Data aggregation logic
- [ ] Chart.js integration
- [ ] Stacked bar chart
- [ ] Pie chart
- [ ] Testing & bug fixes

### Week 11-12: Polish & Launch

- [ ] Responsive design refinement
- [ ] Cross-browser testing
- [ ] Performance optimization
- [ ] Bug fixes
- [ ] Documentation
- [ ] Beta testing
- [ ] Launch preparation

---

## 📏 MVP Success Criteria

### Quantitative Metrics

| Metric                    | Target | Measurement                                |
| ------------------------- | ------ | ------------------------------------------ |
| Setup Completion Rate     | 70%    | % of users who complete all setup steps    |
| Active Users (Week 1)     | 50     | Number of users who use app in first week  |
| Spending Entries per User | 5/week | Average spending entries per user per week |
| Session Duration          | >5 min | Average time spent in app per session      |
| Page Load Time            | <2 sec | Time to interactive                        |
| Bug Reports               | <10    | Critical bugs reported in first month      |

### Qualitative Metrics

| Metric             | Target | Measurement                               |
| ------------------ | ------ | ----------------------------------------- |
| User Satisfaction  | 4/5    | Post-usage survey rating                  |
| Feature Usefulness | 4/5    | Survey: "How useful is this feature?"     |
| Ease of Use        | 4/5    | Survey: "How easy is this to use?"        |
| Would Recommend    | 70%    | % of users who would recommend to friends |

### Must-Pass Criteria

- ✅ All core features working without critical bugs
- ✅ Data persists correctly in LocalStorage
- ✅ Works on Chrome, Firefox, Safari, Edge (latest versions)
- ✅ Responsive on mobile (320px+), tablet, desktop
- ✅ No data loss during normal usage
- ✅ Calculations are accurate (verified with test cases)

---

## 🧪 MVP Testing Strategy

### Manual Testing Checklist

#### Setup Page

- [ ] Can add new items to all categories
- [ ] Can edit existing items
- [ ] Can delete items
- [ ] Cannot add duplicate items
- [ ] Payday date accepts 1-31 only
- [ ] Data persists after refresh

#### Budgeting Page

- [ ] Can switch between months
- [ ] Can input amounts for all categories
- [ ] Calculations are correct
- [ ] Progress bar updates correctly
- [ ] Warning shown when over 100%
- [ ] Data persists per month

#### Spending Tracker

- [ ] Can add new spending entry
- [ ] Can edit spending entry
- [ ] Can delete spending entry
- [ ] Can check/uncheck entries
- [ ] Table sorts correctly
- [ ] Total calculates correctly
- [ ] Data persists after refresh

#### Summary Dashboard

- [ ] Date displays correctly
- [ ] Payday countdown is accurate
- [ ] Month filter works
- [ ] All cards show correct data
- [ ] Table populates correctly
- [ ] Charts render correctly
- [ ] Charts update when data changes

### Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Device Testing

- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Mobile (320x568)

### Performance Testing

- [ ] Page load < 2 seconds
- [ ] Smooth scrolling (60fps)
- [ ] Chart rendering < 1 second
- [ ] No memory leaks
- [ ] Works with 1000+ spending entries

---

## 🎯 MVP User Journey

### First-Time User Flow

```
1. User opens app
   ↓
2. Sees Setup page (default)
   ↓
3. Adds accounts (BCA, Gopay)
   ↓
4. Adds income sources (Monthly Salary)
   ↓
5. Adds expense categories (Home Rent, Food, etc)
   ↓
6. Sets payday date (5th)
   ↓
7. Navigates to Budgeting page
   ↓
8. Selects current month (January)
   ↓
9. Inputs income amount (Rp 6,430,000)
   ↓
10. Inputs savings amounts
   ↓
11. Inputs expense budgets
   ↓
12. Sees allocated percentage (85%)
   ↓
13. Navigates to Spending page
   ↓
14. Adds first spending entry
   ↓
15. Navigates to Summary page
   ↓
16. Sees dashboard with charts
   ↓
17. ✅ User understands their financial situation
```

### Returning User Flow

```
1. User opens app
   ↓
2. Sees Summary page (remembers last page)
   ↓
3. Checks current month summary
   ↓
4. Clicks "Add Spending" quick action
   ↓
5. Inputs spending (Lunch - Rp 50,000)
   ↓
6. Sees updated summary
   ↓
7. Checks if over budget
   ↓
8. ✅ User stays on track with budget
```

---

## 💰 MVP Cost Estimate

### Development Costs

- **Developer Time**: 12 weeks × 40 hours = 480 hours
- **Rate**: Rp 100,000/hour (example)
- **Total**: Rp 48,000,000

### Infrastructure Costs (MVP = $0)

- **Hosting**: Free (GitHub Pages / Netlify)
- **Domain**: Rp 150,000/year
- **SSL**: Free (Let's Encrypt)
- **Total**: Rp 150,000

### Tools & Services (MVP = Free Tier)

- **Code Editor**: Free (VS Code)
- **Version Control**: Free (GitHub)
- **Design**: Free (Figma free tier)
- **Analytics**: Free (Google Analytics)
- **Total**: Rp 0

### **Total MVP Cost**: ~Rp 48,150,000 (development only)

---

## 🚧 MVP Limitations & Trade-offs

### Known Limitations

1. **Single User Only**

   - No authentication
   - No multi-device sync
   - Data stored locally only

2. **LocalStorage Constraints**

   - Max ~10MB storage
   - Data can be cleared by user
   - No backup/restore

3. **No Real-time Collaboration**

   - Cannot share with family members
   - No multi-user budgeting

4. **Limited Analytics**

   - Basic charts only
   - No trend analysis
   - No predictions

5. **Manual Data Entry**
   - No bank integration
   - No automatic categorization
   - No receipt scanning

### Acceptable Trade-offs

| Trade-off         | Reason                           | Future Solution                   |
| ----------------- | -------------------------------- | --------------------------------- |
| No cloud sync     | Reduce complexity & cost         | Add in Phase 2 with database      |
| No authentication | Faster MVP launch                | Add in Phase 2 with NextAuth      |
| LocalStorage only | Simple & fast                    | Migrate to PostgreSQL in Phase 2  |
| Basic charts      | Focus on core features           | Add advanced analytics in Phase 3 |
| Manual entry      | Avoid API integration complexity | Add bank integration in Phase 3   |

---

## 📋 MVP Launch Checklist

### Pre-Launch (Week 11-12)

#### Technical

- [ ] All features working
- [ ] No critical bugs
- [ ] Cross-browser tested
- [ ] Mobile responsive
- [ ] Performance optimized
- [ ] Code documented
- [ ] Error handling implemented
- [ ] LocalStorage error handling

#### Content

- [ ] README.md complete
- [ ] User guide written
- [ ] FAQ prepared
- [ ] Privacy policy (if needed)
- [ ] Terms of service (if needed)

#### Marketing

- [ ] Landing page ready
- [ ] Demo video created
- [ ] Screenshots prepared
- [ ] Social media posts drafted
- [ ] Beta tester list ready

### Launch Day

- [ ] Deploy to production
- [ ] Test production build
- [ ] Announce on social media
- [ ] Send to beta testers
- [ ] Monitor for errors
- [ ] Respond to feedback

### Post-Launch (Week 1-4)

- [ ] Collect user feedback
- [ ] Fix critical bugs
- [ ] Monitor usage metrics
- [ ] Conduct user interviews
- [ ] Plan Phase 2 features
- [ ] Iterate based on feedback

---

## 🎓 MVP Learning Goals

### Technical Learning

- [ ] Master vanilla JavaScript ES6+
- [ ] Understand LocalStorage API
- [ ] Learn Chart.js library
- [ ] Practice responsive design
- [ ] Improve code organization

### Product Learning

- [ ] Validate problem-solution fit
- [ ] Understand user behavior
- [ ] Learn from user feedback
- [ ] Identify most valuable features
- [ ] Discover pain points

### Business Learning

- [ ] User acquisition strategies
- [ ] Retention tactics
- [ ] Monetization opportunities
- [ ] Competition analysis
- [ ] Market positioning

---

## 🔄 Post-MVP Roadmap

### Phase 2 (Month 4-6): Enhanced Features

- User authentication
- Cloud database (PostgreSQL)
- Report & Analytics page
- Assets Management
- Export to Excel/PDF
- Recurring transactions

### Phase 3 (Month 7-9): Scale & Mobile

- Mobile app (React Native)
- Multi-device sync
- Financial goals
- Notifications
- Budget templates
- Advanced filtering

### Phase 4 (Month 10-12): Premium Features

- Bank integration
- AI-powered insights
- Collaboration features
- Multi-currency
- Investment tracking
- Tax planning tools

---

## ✅ MVP Definition of Done

An MVP is considered **DONE** when:

1. ✅ All core features are implemented and working
2. ✅ No critical bugs (P0/P1)
3. ✅ Tested on all major browsers
4. ✅ Responsive on mobile, tablet, desktop
5. ✅ Data persists correctly
6. ✅ Calculations are accurate
7. ✅ User can complete full journey (setup → budget → spend → summary)
8. ✅ Documentation is complete
9. ✅ Deployed to production
10. ✅ At least 10 beta users have tested successfully

---

## 📞 MVP Support Plan

### User Support Channels

- **Email**: support@homesweetloan.com
- **GitHub Issues**: For bug reports
- **FAQ**: Self-service documentation
- **Response Time**: <24 hours

### Monitoring

- Google Analytics for usage tracking
- Console errors monitoring
- User feedback form
- Weekly metrics review

---

**MVP Status**: Planning Phase  
**Target Launch Date**: April 2026  
**Next Review**: Weekly sprint reviews

---

**Remember**: MVP is about learning fast, not building perfect. Ship early, get feedback, iterate! 🚀
