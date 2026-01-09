# Technical Specification Document

# Home Sweet Loan App

**Version**: 1.0  
**Date**: 10 January 2026  
**Author**: Technical Team  
**Status**: Draft

---

## 1. System Architecture

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Web Browser (Chrome, Firefox, etc)        │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │           Single Page Application (SPA)          │  │ │
│  │  │  ┌────────────────────────────────────────────┐  │  │ │
│  │  │  │  HTML5 + CSS3 + JavaScript ES6+            │  │  │ │
│  │  │  │  - Navigation Component                    │  │  │ │
│  │  │  │  - Setup Module                            │  │  │ │
│  │  │  │  - Budgeting Module                        │  │  │ │
│  │  │  │  - Spending Module                         │  │  │ │
│  │  │  │  - Summary Module                          │  │  │ │
│  │  │  │  - Chart.js for Visualizations             │  │  │ │
│  │  │  └────────────────────────────────────────────┘  │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Storage Layer                           │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Browser LocalStorage API                  │ │
│  │  - setup: {...}                                        │ │
│  │  - budgets: {...}                                      │ │
│  │  - spending: [...]                                     │ │
│  │  - assets: {...}                                       │ │
│  │  - userPreferences: {...}                              │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Component Architecture

```
App
├── Navigation
│   ├── Sidebar
│   ├── Logo
│   └── UserInfo
│
├── Pages
│   ├── SetupPage
│   │   ├── SetupCard (reusable)
│   │   ├── SetupList
│   │   └── SetupForm
│   │
│   ├── BudgetingPage
│   │   ├── MonthSelector
│   │   ├── BudgetSection (income, savings, expenses)
│   │   ├── BudgetList
│   │   └── BudgetSummary
│   │
│   ├── SummaryPage
│   │   ├── DateInfo
│   │   ├── MonthFilter
│   │   ├── SummaryCards
│   │   ├── SummaryTable
│   │   └── Charts (StackedBar, Pie)
│   │
│   ├── SpendingPage
│   │   ├── SpendingForm
│   │   ├── SpendingTable
│   │   └── SpendingRow
│   │
│   ├── ReportPage (Phase 2)
│   └── AssetsPage (Phase 2)
│
└── Utilities
    ├── StorageManager
    ├── Calculator
    ├── Formatter
    ├── Validator
    └── DateHelper
```

---

## 2. Data Models

### 2.1 Setup Configuration

```typescript
interface SetupConfig {
  accountSummary: string[]; // ["BCA", "Gopay", "Permata"]
  incomeSources: string[]; // ["Monthly Salary", "Bonus"]
  needs: string[]; // ["Home Rent", "Course"]
  wants: string[]; // ["Shopping", "Entertainment"]
  savings: string[]; // ["General Savings", "Emergency Funds"]
  accountAssets: string[]; // ["General Savings", "Bibit"]
  paydayDate: number; // 1-31
}
```

### 2.2 Budget Data

```typescript
interface BudgetData {
  [yearMonth: string]: {
    // "2026-01"
    income: {
      [source: string]: number; // "Monthly Salary": 6430000
    };
    savings: {
      [category: string]: number; // "General Savings": 500000
    };
    expenses: {
      [category: string]: number; // "Home Rent": 1700000
    };
  };
}
```

### 2.3 Spending Data

```typescript
interface SpendingEntry {
  id: string; // UUID
  date: string; // "2026-01-05" (ISO date)
  description: string; // "Gasoline"
  category: string; // "Transportation"
  amount: number; // 100000
  checked: boolean; // false
  createdAt: string; // ISO timestamp
  updatedAt?: string; // ISO timestamp
}

type SpendingData = SpendingEntry[];
```

### 2.4 Assets Data (Phase 2)

```typescript
interface AssetEntry {
  id: string; // UUID
  type: "liquid" | "non-liquid";
  description: string; // "Tabungan BCA"
  value: number; // 5000000
  account: string; // "General Savings"
  createdAt: string;
  updatedAt: string;
}

interface AssetsData {
  target: number; // 100000000
  lastUpdate: string; // "2026-01-06"
  liquidAssets: AssetEntry[];
  nonLiquidAssets: AssetEntry[];
}
```

### 2.5 User Preferences

```typescript
interface UserPreferences {
  theme: "light" | "dark";
  currency: string; // "IDR"
  dateFormat: string; // "DD/MM/YYYY"
  lastVisitedPage: string; // "summary"
  language: string; // "id"
}
```

---

## 3. API Specifications (LocalStorage)

### 3.1 Storage Manager

```javascript
class StorageManager {
  constructor() {
    this.prefix = "homeSweetLoan_";
  }

  // Generic methods
  set(key, value) {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(this.prefix + key, serialized);
      return true;
    } catch (error) {
      console.error("Storage error:", error);
      return false;
    }
  }

  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(this.prefix + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("Storage error:", error);
      return defaultValue;
    }
  }

  remove(key) {
    localStorage.removeItem(this.prefix + key);
  }

  clear() {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(this.prefix))
      .forEach((key) => localStorage.removeItem(key));
  }

  // Specific methods
  getSetup() {
    return this.get("setup", {
      accountSummary: [],
      incomeSources: [],
      needs: [],
      wants: [],
      savings: [],
      accountAssets: [],
      paydayDate: 5,
    });
  }

  setSetup(setup) {
    return this.set("setup", setup);
  }

  getBudgets() {
    return this.get("budgets", {});
  }

  setBudgets(budgets) {
    return this.set("budgets", budgets);
  }

  getBudget(yearMonth) {
    const budgets = this.getBudgets();
    return (
      budgets[yearMonth] || {
        income: {},
        savings: {},
        expenses: {},
      }
    );
  }

  setBudget(yearMonth, budget) {
    const budgets = this.getBudgets();
    budgets[yearMonth] = budget;
    return this.setBudgets(budgets);
  }

  getSpending() {
    return this.get("spending", []);
  }

  setSpending(spending) {
    return this.set("spending", spending);
  }

  addSpending(entry) {
    const spending = this.getSpending();
    spending.push(entry);
    return this.setSpending(spending);
  }

  updateSpending(id, updates) {
    const spending = this.getSpending();
    const index = spending.findIndex((s) => s.id === id);
    if (index !== -1) {
      spending[index] = {
        ...spending[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      return this.setSpending(spending);
    }
    return false;
  }

  deleteSpending(id) {
    const spending = this.getSpending();
    const filtered = spending.filter((s) => s.id !== id);
    return this.setSpending(filtered);
  }
}
```

---

## 4. Business Logic

### 4.1 Budget Calculator

```javascript
class BudgetCalculator {
  /**
   * Calculate total income
   * @param {Object} income - Income object { "Monthly Salary": 6430000 }
   * @returns {number} Total income
   */
  static calculateTotalIncome(income) {
    return Object.values(income).reduce((sum, amount) => sum + amount, 0);
  }

  /**
   * Calculate total savings
   * @param {Object} savings - Savings object
   * @returns {number} Total savings
   */
  static calculateTotalSavings(savings) {
    return Object.values(savings).reduce((sum, amount) => sum + amount, 0);
  }

  /**
   * Calculate total expenses
   * @param {Object} expenses - Expenses object
   * @returns {number} Total expenses
   */
  static calculateTotalExpenses(expenses) {
    return Object.values(expenses).reduce((sum, amount) => sum + amount, 0);
  }

  /**
   * Calculate allocated percentage
   * @param {number} totalIncome
   * @param {number} totalSavings
   * @param {number} totalExpenses
   * @returns {number} Percentage (0-100+)
   */
  static calculateAllocatedPercentage(
    totalIncome,
    totalSavings,
    totalExpenses
  ) {
    if (totalIncome === 0) return 0;
    return ((totalSavings + totalExpenses) / totalIncome) * 100;
  }

  /**
   * Calculate non-allocated amount
   * @param {number} totalIncome
   * @param {number} totalSavings
   * @param {number} totalExpenses
   * @returns {number} Non-allocated amount
   */
  static calculateNonAllocated(totalIncome, totalSavings, totalExpenses) {
    return totalIncome - totalSavings - totalExpenses;
  }

  /**
   * Calculate budget summary
   * @param {Object} budget - Budget object
   * @returns {Object} Summary
   */
  static calculateBudgetSummary(budget) {
    const totalIncome = this.calculateTotalIncome(budget.income);
    const totalSavings = this.calculateTotalSavings(budget.savings);
    const totalExpenses = this.calculateTotalExpenses(budget.expenses);
    const allocatedPercentage = this.calculateAllocatedPercentage(
      totalIncome,
      totalSavings,
      totalExpenses
    );
    const nonAllocated = this.calculateNonAllocated(
      totalIncome,
      totalSavings,
      totalExpenses
    );

    return {
      totalIncome,
      totalSavings,
      totalExpenses,
      allocatedPercentage,
      nonAllocated,
      isOverBudget: allocatedPercentage > 100,
    };
  }
}
```

### 4.2 Spending Aggregator

```javascript
class SpendingAggregator {
  /**
   * Get spending for specific month
   * @param {Array} spending - All spending entries
   * @param {string} yearMonth - "2026-01"
   * @returns {Array} Filtered spending
   */
  static getSpendingByMonth(spending, yearMonth) {
    return spending.filter((entry) => entry.date.startsWith(yearMonth));
  }

  /**
   * Calculate total spending
   * @param {Array} spending - Spending entries
   * @returns {number} Total amount
   */
  static calculateTotal(spending) {
    return spending.reduce((sum, entry) => sum + entry.amount, 0);
  }

  /**
   * Group spending by category
   * @param {Array} spending - Spending entries
   * @returns {Object} { "Transportation": 500000, ... }
   */
  static groupByCategory(spending) {
    return spending.reduce((acc, entry) => {
      acc[entry.category] = (acc[entry.category] || 0) + entry.amount;
      return acc;
    }, {});
  }

  /**
   * Calculate spending vs budget
   * @param {Array} spending - Spending entries
   * @param {Object} budget - Budget object
   * @returns {Array} Comparison data
   */
  static compareWithBudget(spending, budget) {
    const spendingByCategory = this.groupByCategory(spending);
    const allCategories = new Set([
      ...Object.keys(budget.expenses),
      ...Object.keys(spendingByCategory),
    ]);

    return Array.from(allCategories).map((category) => {
      const allocation = budget.expenses[category] || 0;
      const realization = spendingByCategory[category] || 0;
      const percentage = allocation > 0 ? (realization / allocation) * 100 : 0;

      return {
        category,
        allocation,
        realization,
        percentage,
        difference: allocation - realization,
        status: percentage > 100 ? "over" : percentage > 80 ? "warning" : "ok",
      };
    });
  }
}
```

### 4.3 Date Helper

```javascript
class DateHelper {
  /**
   * Get current date in YYYY-MM-DD format
   * @returns {string}
   */
  static getCurrentDate() {
    return new Date().toISOString().split("T")[0];
  }

  /**
   * Get current year-month in YYYY-MM format
   * @returns {string}
   */
  static getCurrentYearMonth() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  }

  /**
   * Calculate days until next payday
   * @param {number} paydayDate - Day of month (1-31)
   * @returns {number} Days remaining
   */
  static daysUntilPayday(paydayDate) {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    let nextPayday;
    if (currentDay < paydayDate) {
      // Payday is this month
      nextPayday = new Date(currentYear, currentMonth, paydayDate);
    } else {
      // Payday is next month
      nextPayday = new Date(currentYear, currentMonth + 1, paydayDate);
    }

    const diffTime = nextPayday - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  /**
   * Format date to readable string
   * @param {string} dateString - ISO date string
   * @param {string} locale - Locale (default: 'id-ID')
   * @returns {string} Formatted date
   */
  static formatDate(dateString, locale = "id-ID") {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  /**
   * Get month name
   * @param {number} monthIndex - 0-11
   * @param {string} locale - Locale
   * @returns {string} Month name
   */
  static getMonthName(monthIndex, locale = "id-ID") {
    const date = new Date(2000, monthIndex, 1);
    return date.toLocaleDateString(locale, { month: "long" });
  }
}
```

### 4.4 Formatter

```javascript
class Formatter {
  /**
   * Format number as Rupiah currency
   * @param {number} amount
   * @returns {string} Formatted currency
   */
  static formatCurrency(amount) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  /**
   * Format number as percentage
   * @param {number} value
   * @param {number} decimals
   * @returns {string} Formatted percentage
   */
  static formatPercentage(value, decimals = 2) {
    return `${value.toFixed(decimals)}%`;
  }

  /**
   * Parse currency string to number
   * @param {string} currencyString - "Rp 1.000.000"
   * @returns {number}
   */
  static parseCurrency(currencyString) {
    return (
      parseFloat(currencyString.replace(/[^0-9,-]/g, "").replace(",", ".")) || 0
    );
  }

  /**
   * Shorten large numbers
   * @param {number} num
   * @returns {string} "1.5M", "500K"
   */
  static shortenNumber(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + "B";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  }
}
```

### 4.5 Validator

```javascript
class Validator {
  /**
   * Validate required field
   * @param {any} value
   * @returns {boolean}
   */
  static required(value) {
    return value !== null && value !== undefined && value !== "";
  }

  /**
   * Validate number
   * @param {any} value
   * @returns {boolean}
   */
  static isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  /**
   * Validate positive number
   * @param {number} value
   * @returns {boolean}
   */
  static isPositive(value) {
    return this.isNumber(value) && parseFloat(value) > 0;
  }

  /**
   * Validate non-negative number
   * @param {number} value
   * @returns {boolean}
   */
  static isNonNegative(value) {
    return this.isNumber(value) && parseFloat(value) >= 0;
  }

  /**
   * Validate date format (YYYY-MM-DD)
   * @param {string} dateString
   * @returns {boolean}
   */
  static isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  }

  /**
   * Validate payday date (1-31)
   * @param {number} day
   * @returns {boolean}
   */
  static isValidPaydayDate(day) {
    return this.isNumber(day) && day >= 1 && day <= 31;
  }

  /**
   * Validate string length
   * @param {string} value
   * @param {number} min
   * @param {number} max
   * @returns {boolean}
   */
  static isValidLength(value, min = 0, max = Infinity) {
    const length = value ? value.length : 0;
    return length >= min && length <= max;
  }

  /**
   * Validate unique value in array
   * @param {string} value
   * @param {Array} array
   * @returns {boolean}
   */
  static isUnique(value, array) {
    return !array.includes(value);
  }
}
```

---

## 5. UI Components

### 5.1 Button Component

```html
<!-- Primary Button -->
<button class="btn btn-primary">Save</button>

<!-- Secondary Button -->
<button class="btn btn-secondary">Cancel</button>

<!-- Icon Button -->
<button class="btn-icon">
  <svg>...</svg>
</button>

<!-- Danger Button -->
<button class="btn btn-danger">Delete</button>
```

```css
.btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: #e5e7eb;
  color: #374151;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-icon:hover {
  background: #f3f4f6;
}
```

### 5.2 Input Component

```html
<!-- Text Input -->
<div class="form-group">
  <label for="description">Description</label>
  <input
    type="text"
    id="description"
    class="input-field"
    placeholder="Enter description"
  />
</div>

<!-- Number Input -->
<div class="form-group">
  <label for="amount">Amount</label>
  <input type="number" id="amount" class="input-field" placeholder="0" />
</div>

<!-- Select Input -->
<div class="form-group">
  <label for="category">Category</label>
  <select id="category" class="select-field">
    <option value="">Select category</option>
    <option value="food">Food</option>
  </select>
</div>

<!-- Date Input -->
<div class="form-group">
  <label for="date">Date</label>
  <input type="date" id="date" class="input-field" />
</div>
```

```css
.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.input-field,
.select-field {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.input-field:focus,
.select-field:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.input-field::placeholder {
  color: #9ca3af;
}
```

### 5.3 Card Component

```html
<div class="card">
  <div class="card-header">
    <h3>Title</h3>
    <button class="btn-icon">...</button>
  </div>
  <div class="card-body">Content goes here</div>
</div>
```

```css
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.card-body {
  padding: 20px;
}
```

---

## 6. Performance Optimization

### 6.1 Code Optimization

```javascript
// Debounce function for search/filter
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Memoization for expensive calculations
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};
```

### 6.2 Lazy Loading

```javascript
// Lazy load charts only when needed
async function loadChartLibrary() {
  if (!window.Chart) {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    document.head.appendChild(script);
    await new Promise((resolve) => (script.onload = resolve));
  }
  return window.Chart;
}
```

### 6.3 Virtual Scrolling (for large lists)

```javascript
// Simple virtual scrolling implementation
class VirtualScroll {
  constructor(container, items, rowHeight, renderRow) {
    this.container = container;
    this.items = items;
    this.rowHeight = rowHeight;
    this.renderRow = renderRow;
    this.visibleStart = 0;
    this.visibleEnd = 0;

    this.init();
  }

  init() {
    const containerHeight = this.container.clientHeight;
    const visibleRows = Math.ceil(containerHeight / this.rowHeight);
    const buffer = 5; // Extra rows for smooth scrolling

    this.container.addEventListener(
      "scroll",
      throttle(() => {
        this.update();
      }, 100)
    );

    this.update();
  }

  update() {
    const scrollTop = this.container.scrollTop;
    this.visibleStart = Math.floor(scrollTop / this.rowHeight);
    this.visibleEnd =
      this.visibleStart +
      Math.ceil(this.container.clientHeight / this.rowHeight) +
      5;

    this.render();
  }

  render() {
    const fragment = document.createDocumentFragment();
    for (
      let i = this.visibleStart;
      i < this.visibleEnd && i < this.items.length;
      i++
    ) {
      const row = this.renderRow(this.items[i], i);
      fragment.appendChild(row);
    }
    this.container.innerHTML = "";
    this.container.appendChild(fragment);
  }
}
```

---

## 7. Error Handling

### 7.1 Global Error Handler

```javascript
class ErrorHandler {
  static handle(error, context = "") {
    console.error(`Error in ${context}:`, error);

    // Log to analytics (if available)
    if (window.gtag) {
      gtag("event", "exception", {
        description: error.message,
        fatal: false,
      });
    }

    // Show user-friendly message
    this.showToast("error", this.getUserMessage(error));
  }

  static getUserMessage(error) {
    if (error.name === "QuotaExceededError") {
      return "Storage penuh. Silakan hapus data lama atau export data Anda.";
    }
    if (error.message.includes("JSON")) {
      return "Data corrupt. Silakan refresh halaman.";
    }
    return "Terjadi kesalahan. Silakan coba lagi.";
  }

  static showToast(type, message) {
    // Implementation of toast notification
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
    }, 100);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

// Global error listener
window.addEventListener("error", (event) => {
  ErrorHandler.handle(event.error, "Global");
});

window.addEventListener("unhandledrejection", (event) => {
  ErrorHandler.handle(event.reason, "Promise");
});
```

---

## 8. Testing

### 8.1 Unit Test Examples

```javascript
// Test Budget Calculator
describe("BudgetCalculator", () => {
  test("should calculate total income correctly", () => {
    const income = {
      "Monthly Salary": 6430000,
      Bonus: 1000000,
    };
    expect(BudgetCalculator.calculateTotalIncome(income)).toBe(7430000);
  });

  test("should calculate allocated percentage correctly", () => {
    const totalIncome = 6430000;
    const totalSavings = 800000;
    const totalExpenses = 4500000;
    const result = BudgetCalculator.calculateAllocatedPercentage(
      totalIncome,
      totalSavings,
      totalExpenses
    );
    expect(result).toBeCloseTo(82.43, 2);
  });

  test("should return 0 when income is 0", () => {
    const result = BudgetCalculator.calculateAllocatedPercentage(0, 100, 200);
    expect(result).toBe(0);
  });
});

// Test Validator
describe("Validator", () => {
  test("should validate positive numbers", () => {
    expect(Validator.isPositive(100)).toBe(true);
    expect(Validator.isPositive(0)).toBe(false);
    expect(Validator.isPositive(-10)).toBe(false);
    expect(Validator.isPositive("abc")).toBe(false);
  });

  test("should validate date format", () => {
    expect(Validator.isValidDate("2026-01-10")).toBe(true);
    expect(Validator.isValidDate("10-01-2026")).toBe(false);
    expect(Validator.isValidDate("invalid")).toBe(false);
  });
});
```

### 8.2 Integration Test Examples

```javascript
// Test Storage Manager
describe("StorageManager Integration", () => {
  let storage;

  beforeEach(() => {
    storage = new StorageManager();
    localStorage.clear();
  });

  test("should save and retrieve setup data", () => {
    const setup = {
      accountSummary: ["BCA", "Gopay"],
      incomeSources: ["Salary"],
      paydayDate: 5,
    };

    storage.setSetup(setup);
    const retrieved = storage.getSetup();

    expect(retrieved).toEqual(setup);
  });

  test("should handle budget CRUD operations", () => {
    const budget = {
      income: { Salary: 6430000 },
      savings: { General: 500000 },
      expenses: { Rent: 1700000 },
    };

    storage.setBudget("2026-01", budget);
    const retrieved = storage.getBudget("2026-01");

    expect(retrieved).toEqual(budget);
  });
});
```

---

## 9. Security Considerations

### 9.1 Input Sanitization

```javascript
class Sanitizer {
  /**
   * Sanitize HTML to prevent XSS
   * @param {string} html
   * @returns {string}
   */
  static sanitizeHTML(html) {
    const div = document.createElement("div");
    div.textContent = html;
    return div.innerHTML;
  }

  /**
   * Sanitize user input
   * @param {string} input
   * @returns {string}
   */
  static sanitizeInput(input) {
    return input
      .trim()
      .replace(/[<>]/g, "") // Remove < and >
      .substring(0, 500); // Limit length
  }

  /**
   * Validate and sanitize number input
   * @param {any} input
   * @returns {number}
   */
  static sanitizeNumber(input) {
    const num = parseFloat(input);
    if (isNaN(num) || !isFinite(num)) return 0;
    return Math.max(0, Math.min(num, Number.MAX_SAFE_INTEGER));
  }
}
```

### 9.2 CSP (Content Security Policy)

```html
<meta
  http-equiv="Content-Security-Policy"
  content="
  default-src 'self';
  script-src 'self' https://cdn.jsdelivr.net;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data:;
  connect-src 'self';
"
/>
```

---

## 10. Deployment

### 10.1 Build Process

```bash
# Minify CSS
npx cssnano styles.css styles.min.css

# Minify JavaScript
npx terser app.js -o app.min.js --compress --mangle

# Optimize images
npx imagemin assets/images/* --out-dir=dist/images
```

### 10.2 Deployment Checklist

- [ ] Minify CSS and JavaScript
- [ ] Optimize images
- [ ] Enable GZIP compression
- [ ] Set cache headers
- [ ] Test on production environment
- [ ] Verify HTTPS
- [ ] Test all features
- [ ] Check mobile responsiveness
- [ ] Verify analytics tracking
- [ ] Update documentation

---

**Document Version**: 1.0  
**Last Updated**: 10 January 2026  
**Next Review**: Weekly during development
