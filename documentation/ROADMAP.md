# 🗺️ Product Roadmap

# Home Sweet Loan App

**Version**: 1.0  
**Last Updated**: 10 January 2026  
**Timeline**: 12 months (3 phases)

---

## 🎯 Vision

Menjadi aplikasi manajemen keuangan pribadi terpercaya yang membantu setiap orang mencapai kebebasan finansial melalui budgeting yang terstruktur dan tracking yang konsisten.

---

## 📅 Timeline Overview

```
┌─────────────────────────────────────────────────────────────┐
│  Phase 1: MVP (Month 1-3)                                   │
│  ✅ Core features, LocalStorage, Single user                │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 2: Enhanced (Month 4-6)                              │
│  ✅ Database, Auth, Reports, Assets, Export                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 3: Scale (Month 7-12)                                │
│  🔲 Mobile app, Advanced features, AI insights              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Phase 1: MVP (Month 1-3)

### Goal

Launch functional app dengan core features untuk single user

### Target Launch

**April 2026**

### Features

#### ✅ Setup & Configuration

- [ ] Account summary management (CRUD)
- [ ] Income sources setup
- [ ] Expense categories (Needs, Wants, Savings)
- [ ] Account assets setup
- [ ] Payday date configuration
- [ ] Data validation
- [ ] LocalStorage persistence

**Timeline**: Week 1-2

---

#### ✅ Monthly Budgeting

- [ ] Month selector (January - December)
- [ ] Income input form
- [ ] Savings allocation form
- [ ] Expenses allocation form
- [ ] Real-time calculations:
  - Total income
  - Total savings
  - Total expenses
  - Allocated percentage
  - Non-allocated amount
- [ ] Progress bar visualization
- [ ] Budget validation (warning if >100%)
- [ ] Save budget per month

**Timeline**: Week 3-4

---

#### ✅ Spending Tracker

- [ ] Add spending form:
  - Date picker
  - Description input
  - Category dropdown
  - Amount input
- [ ] Spending list table
- [ ] Checkbox for mark as done
- [ ] Edit spending
- [ ] Delete spending
- [ ] Sort by date
- [ ] Total calculation
- [ ] Data persistence

**Timeline**: Week 5-6

---

#### ✅ Summary Dashboard

- [ ] Current date display
- [ ] Next payday countdown
- [ ] Month filter
- [ ] Summary cards:
  - Top 3 accounts
  - Needs total
  - Wants total
  - Savings total
  - Total income
  - Non-allocated
  - Usage percentage
- [ ] Detail table with:
  - Account dropdown
  - Expense list
  - Main category
  - Allocation
  - Percentage
- [ ] Stacked bar chart (budget distribution)
- [ ] Pie chart (category breakdown)

**Timeline**: Week 7-9

---

#### ✅ Polish & Testing

- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Cross-browser testing
- [ ] Performance optimization
- [ ] Bug fixes
- [ ] User testing with 10 beta users
- [ ] Documentation updates
- [ ] Deployment to Vercel

**Timeline**: Week 10-12

---

### Success Metrics (Phase 1)

| Metric             | Target | Measurement             |
| ------------------ | ------ | ----------------------- |
| Beta Users         | 50     | Sign-ups in first month |
| Setup Completion   | 70%    | % who complete setup    |
| Daily Active Users | 30%    | DAU/MAU ratio           |
| Spending Entries   | 5/week | Avg per user            |
| Bug Reports        | <10    | Critical bugs           |
| User Satisfaction  | 4/5    | Post-usage survey       |

---

## 🌟 Phase 2: Enhanced (Month 4-6)

### Goal

Add database, authentication, and advanced features

### Target Launch

**July 2026**

### Features

#### ✅ Authentication & Multi-user

- [ ] User registration
- [ ] Email/password login
- [ ] JWT authentication
- [ ] Password reset
- [ ] Email verification
- [ ] User profile management
- [ ] Session management

**Timeline**: Week 13-14

---

#### ✅ Database Integration

- [ ] PostgreSQL setup
- [ ] Prisma schema
- [ ] Data migration from LocalStorage
- [ ] API endpoints (NestJS):
  - Setup CRUD
  - Budgets CRUD
  - Spending CRUD
  - User management
- [ ] Data validation (Zod + Class-validator)
- [ ] Error handling
- [ ] API documentation (Swagger)

**Timeline**: Week 15-17

---

#### ✅ Report & Analytics

- [ ] Monthly report page
- [ ] Year & month filters
- [ ] Report cards:
  - Total income
  - Budgeted expenses
  - Total spending
  - Monthly savings
- [ ] Budget vs Actual table:
  - Expense list
  - Allocation
  - Realization
  - Progress bar
  - Percentage usage
- [ ] Color-coded status (green, yellow, red)
- [ ] Over budget highlights
- [ ] Trend analysis

**Timeline**: Week 18-19

---

#### ✅ Assets Management

- [ ] Assets page
- [ ] Set target amount
- [ ] Liquid assets:
  - Add/edit/delete
  - Description, value, account
  - Total calculation
  - Breakdown per account
- [ ] Non-liquid assets:
  - Add/edit/delete
  - Description, value, account
  - Total calculation
- [ ] Total assets value
- [ ] Progress to target
- [ ] Yearly summary table
- [ ] Bar chart visualization

**Timeline**: Week 20-21

---

#### ✅ Export & Import

- [ ] Export to Excel
- [ ] Export to PDF
- [ ] Export to CSV
- [ ] Import from Excel
- [ ] Data backup
- [ ] Data restore

**Timeline**: Week 22-23

---

#### ✅ Recurring Transactions

- [ ] Setup recurring income
- [ ] Setup recurring expenses
- [ ] Auto-create transactions
- [ ] Edit/delete recurring items
- [ ] Notification for recurring items

**Timeline**: Week 24

---

### Success Metrics (Phase 2)

| Metric               | Target | Measurement                   |
| -------------------- | ------ | ----------------------------- |
| Active Users         | 500    | Monthly active users          |
| Retention (3 months) | 60%    | % still active after 3 months |
| NPS Score            | >40    | Net Promoter Score            |
| API Uptime           | 99.9%  | Service availability          |
| Avg Response Time    | <200ms | API response time             |

---

## 🚀 Phase 3: Scale (Month 7-12)

### Goal

Mobile app, advanced features, and AI-powered insights

### Target Launch

**January 2027**

### Features

#### 🔲 Mobile Application

- [ ] React Native setup
- [ ] iOS app
- [ ] Android app
- [ ] Push notifications
- [ ] Offline mode
- [ ] Biometric authentication
- [ ] App store deployment

**Timeline**: Month 7-9

---

#### 🔲 Advanced Features

**Financial Goals**

- [ ] Set financial goals
- [ ] Track progress
- [ ] Goal categories (emergency fund, down payment, etc)
- [ ] Goal timeline
- [ ] Recommendations

**Timeline**: Month 10

**Budget Templates**

- [ ] Pre-made templates (50/30/20, etc)
- [ ] Custom templates
- [ ] Share templates
- [ ] Template marketplace

**Timeline**: Month 10

**Collaboration**

- [ ] Share budget with family
- [ ] Joint accounts
- [ ] Permission management
- [ ] Activity log
- [ ] Comments & notes

**Timeline**: Month 11

---

#### 🔲 AI-Powered Insights

- [ ] Spending pattern analysis
- [ ] Budget recommendations
- [ ] Anomaly detection
- [ ] Predictive analytics
- [ ] Personalized tips
- [ ] Smart categorization

**Timeline**: Month 11-12

---

#### 🔲 Notifications & Reminders

- [ ] Email notifications
- [ ] Push notifications
- [ ] Budget alerts
- [ ] Payday reminders
- [ ] Goal milestones
- [ ] Custom reminders

**Timeline**: Month 12

---

#### 🔲 Advanced Analytics

- [ ] Custom date ranges
- [ ] Comparison reports
- [ ] Trend analysis
- [ ] Category insights
- [ ] Spending heatmap
- [ ] Export custom reports

**Timeline**: Month 12

---

### Success Metrics (Phase 3)

| Metric               | Target | Measurement          |
| -------------------- | ------ | -------------------- |
| Active Users         | 5,000  | Monthly active users |
| Mobile Downloads     | 2,000  | App store downloads  |
| Retention (3 months) | 70%    | % still active       |
| NPS Score            | >50    | Net Promoter Score   |
| Daily Active Users   | 40%    | DAU/MAU ratio        |
| Premium Conversion   | 10%    | % paid users         |

---

## 💰 Monetization Strategy

### Phase 1-2: Free

- All features free
- Focus on user acquisition
- Gather feedback

### Phase 3: Freemium Model

**Free Tier**:

- ✅ All basic features
- ✅ Up to 500 spending entries/month
- ✅ 1 year data retention
- ✅ Basic reports

**Premium Tier** (Rp 49,000/month):

- ✅ Unlimited spending entries
- ✅ Unlimited data retention
- ✅ Advanced analytics
- ✅ AI-powered insights
- ✅ Priority support
- ✅ Export to all formats
- ✅ Collaboration features
- ✅ Custom templates

**Family Plan** (Rp 99,000/month):

- ✅ All Premium features
- ✅ Up to 5 users
- ✅ Shared budgets
- ✅ Family dashboard

---

## 🎯 Key Milestones

| Milestone              | Date     | Status         |
| ---------------------- | -------- | -------------- |
| Documentation Complete | Jan 2026 | ✅ Done        |
| Development Start      | Jan 2026 | 🔄 In Progress |
| MVP Launch             | Apr 2026 | ⏳ Planned     |
| 100 Users              | May 2026 | ⏳ Planned     |
| Phase 2 Launch         | Jul 2026 | ⏳ Planned     |
| 1,000 Users            | Sep 2026 | ⏳ Planned     |
| Mobile App Beta        | Oct 2026 | ⏳ Planned     |
| Phase 3 Launch         | Jan 2027 | ⏳ Planned     |
| 5,000 Users            | Mar 2027 | ⏳ Planned     |
| Premium Launch         | Apr 2027 | ⏳ Planned     |

---

## 🔄 Continuous Improvements

### Every Sprint (2 weeks)

- Bug fixes
- Performance optimization
- User feedback implementation
- Security updates
- Documentation updates

### Every Month

- Feature releases
- User surveys
- Analytics review
- A/B testing
- Blog posts / tutorials

### Every Quarter

- Major feature releases
- User interviews
- Competitor analysis
- Roadmap review
- Team retrospective

---

## 📊 Feature Priority Matrix

### High Priority (Must Have)

- ✅ Setup & Configuration
- ✅ Monthly Budgeting
- ✅ Spending Tracker
- ✅ Summary Dashboard
- ✅ Authentication
- ✅ Database Integration

### Medium Priority (Should Have)

- ✅ Report & Analytics
- ✅ Assets Management
- ✅ Export/Import
- ✅ Recurring Transactions
- 🔲 Mobile App
- 🔲 Financial Goals

### Low Priority (Nice to Have)

- 🔲 Budget Templates
- 🔲 Collaboration
- 🔲 AI Insights
- 🔲 Advanced Analytics
- 🔲 Custom Themes
- 🔲 Integrations

---

## 🚫 Not on Roadmap

Features explicitly NOT planned:

- ❌ Bank integration (manual input only)
- ❌ Cryptocurrency tracking
- ❌ Stock portfolio management
- ❌ Tax filing
- ❌ Loan calculator
- ❌ Insurance management
- ❌ Bill payment
- ❌ Peer-to-peer transfers

**Reason**: Focus on core budgeting & spending tracking. These features may be considered in Phase 4+ based on user demand.

---

## 🔮 Future Considerations (Phase 4+)

Ideas for future exploration:

- 🤔 Investment tracking
- 🤔 Debt payoff planner
- 🤔 Retirement calculator
- 🤔 Financial education content
- 🤔 Community features
- 🤔 Gamification
- 🤔 Rewards program
- 🤔 Marketplace for financial products

---

## 📝 Feedback & Iteration

### How We Prioritize Features

1. **User Feedback** (40%)

   - User surveys
   - Feature requests
   - Support tickets

2. **Data & Analytics** (30%)

   - Usage metrics
   - Engagement data
   - Drop-off points

3. **Business Goals** (20%)

   - Revenue potential
   - Market differentiation
   - Competitive advantage

4. **Technical Feasibility** (10%)
   - Development effort
   - Technical debt
   - Infrastructure cost

### Feedback Channels

- 📧 Email: feedback@homesweetloan.com
- 💬 In-app feedback form
- 🐛 GitHub Issues
- 📊 User surveys (quarterly)
- 🎤 User interviews (monthly)

---

## 🎓 Learning & Experimentation

### A/B Testing Ideas

- Different color schemes
- Onboarding flows
- Dashboard layouts
- Notification strategies
- Pricing models

### Experiments

- Gamification elements
- Social features
- Educational content
- Referral programs
- Partnership opportunities

---

## ✅ Roadmap Review Process

### Monthly Review

- Review progress vs timeline
- Adjust priorities based on feedback
- Update success metrics
- Communicate changes to team

### Quarterly Review

- Major roadmap updates
- Phase planning
- Resource allocation
- Stakeholder alignment

---

**Roadmap Status**: Active  
**Next Review**: February 2026  
**Owner**: Product Team

---

_"Plans are nothing; planning is everything." - Dwight D. Eisenhower_

**Let's build something amazing! 🚀**
