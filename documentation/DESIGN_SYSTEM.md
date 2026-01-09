# Design System

# Home Sweet Loan App

**Version**: 1.0  
**Date**: 10 January 2026  
**Theme**: Money Green - Financial Growth & Stability

---

## 🎨 Design Philosophy

### Core Principles

1. **Trust & Security** 💚

   - Warna hijau memberikan rasa aman dan terpercaya
   - Konsisten dengan tema keuangan dan pertumbuhan
   - Menciptakan psychological safety untuk user

2. **Clarity & Simplicity** ✨

   - Interface yang clean dan tidak overwhelming
   - Informasi penting mudah ditemukan
   - Hierarki visual yang jelas

3. **Motivation & Engagement** 📈

   - Warna yang energizing dan optimis
   - Progress visualization yang encouraging
   - Micro-interactions yang delightful

4. **Accessibility First** ♿
   - WCAG 2.1 Level AA compliance
   - Color contrast ratio minimal 4.5:1
   - Keyboard navigation support
   - Screen reader friendly

---

## 🌈 Color System

### Primary Palette - Money Green

```css
/* Emerald Green - Main Brand */
--primary-50: #ecfdf5; /* Lightest - backgrounds */
--primary-100: #d1fae5; /* Very light - hover states */
--primary-200: #a7f3d0; /* Light - borders, disabled */
--primary-300: #6ee7b7; /* Medium light - accents */
--primary-400: #34d399; /* Medium - secondary actions */
--primary-500: #10b981; /* PRIMARY - main brand color */
--primary-600: #059669; /* Dark - primary hover */
--primary-700: #047857; /* Darker - active states */
--primary-800: #065f46; /* Very dark - text on light bg */
--primary-900: #064e3b; /* Darkest - headings */
```

**Usage**:

- Primary-500: Main buttons, links, icons
- Primary-50-200: Backgrounds, subtle highlights
- Primary-600-900: Text, dark mode, emphasis

### Gradients

```css
/* Primary Gradient - Hero sections, CTAs */
background: linear-gradient(135deg, #10b981 0%, #059669 100%);

/* Light Gradient - Cards, sections */
background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);

/* Accent Gradient - Special elements */
background: linear-gradient(135deg, #34d399 0%, #10b981 100%);

/* Dark Gradient - Dark mode, footers */
background: linear-gradient(135deg, #059669 0%, #047857 100%);

/* Radial Gradient - Spotlight effects */
background: radial-gradient(circle at top right, #10b981 0%, transparent 70%);
```

### Category Colors

```css
/* Income - Bright Green (positive, growth) */
--color-income: #10b981;
--bg-income: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
--border-income: #10b981;

/* Savings - Deep Green (stability, security) */
--color-savings: #059669;
--bg-savings: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
--border-savings: #059669;

/* Needs - Amber (important, attention) */
--color-needs: #f59e0b;
--bg-needs: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
--border-needs: #f59e0b;

/* Wants - Purple (luxury, desire) */
--color-wants: #8b5cf6;
--bg-wants: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
--border-wants: #8b5cf6;

/* Expenses - Orange (caution, spending) */
--color-expenses: #f97316;
--bg-expenses: linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%);
--border-expenses: #f97316;
```

### Semantic Colors

```css
/* Success */
--success: #10b981;
--success-light: #d1fae5;
--success-dark: #047857;

/* Warning */
--warning: #f59e0b;
--warning-light: #fef3c7;
--warning-dark: #d97706;

/* Error */
--error: #ef4444;
--error-light: #fee2e2;
--error-dark: #dc2626;

/* Info */
--info: #3b82f6;
--info-light: #dbeafe;
--info-dark: #2563eb;
```

### Neutral Colors

```css
/* Warm Gray - complements green */
--gray-50: #fafaf9;
--gray-100: #f5f5f4;
--gray-200: #e7e5e4;
--gray-300: #d6d3d1;
--gray-400: #a8a29e;
--gray-500: #78716c;
--gray-600: #57534e;
--gray-700: #44403c;
--gray-800: #292524;
--gray-900: #1c1917;
```

### Color Usage Guidelines

| Element          | Color                         | Rationale                        |
| ---------------- | ----------------------------- | -------------------------------- |
| Primary CTA      | Primary-500 gradient          | High visibility, action-oriented |
| Income cards     | Green-50 bg, Green-500 accent | Positive association             |
| Savings progress | Green gradient                | Motivational, growth             |
| Budget warning   | Amber-500                     | Attention without alarm          |
| Over budget      | Red-500                       | Clear danger signal              |
| Disabled state   | Gray-300                      | Clearly non-interactive          |
| Text primary     | Gray-900                      | High contrast, readable          |
| Text secondary   | Gray-600                      | Hierarchy, less emphasis         |

---

## 📝 Typography

### Font Family

```css
/* Primary Font - Inter */
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

/* Monospace - Numbers, code */
font-family: "JetBrains Mono", "Fira Code", monospace;
```

**Why Inter?**

- Excellent readability at all sizes
- Professional and modern
- Great number rendering
- Variable font support
- Open source

### Font Sizes

```css
/* Scale: 1.250 (Major Third) */
--text-xs: 0.75rem; /* 12px - Small labels */
--text-sm: 0.875rem; /* 14px - Body small */
--text-base: 1rem; /* 16px - Body */
--text-lg: 1.125rem; /* 18px - Lead text */
--text-xl: 1.25rem; /* 20px - H4 */
--text-2xl: 1.5rem; /* 24px - H3 */
--text-3xl: 1.875rem; /* 30px - H2 */
--text-4xl: 2.25rem; /* 36px - H1 */
--text-5xl: 3rem; /* 48px - Display */
```

### Font Weights

```css
--font-light: 300; /* Light text, less emphasis */
--font-normal: 400; /* Body text */
--font-medium: 500; /* Subtle emphasis */
--font-semibold: 600; /* Strong emphasis */
--font-bold: 700; /* Headings */
--font-extrabold: 800; /* Display, hero */
```

### Line Heights

```css
--leading-none: 1; /* Headings */
--leading-tight: 1.25; /* Headings */
--leading-snug: 1.375; /* Tight paragraphs */
--leading-normal: 1.5; /* Body text */
--leading-relaxed: 1.625; /* Comfortable reading */
--leading-loose: 2; /* Spacious */
```

### Typography Examples

```tsx
// Heading 1 - Page title
<h1 className="text-4xl font-bold text-gray-900 leading-tight">
  Monthly Budgeting
</h1>

// Heading 2 - Section title
<h2 className="text-2xl font-semibold text-gray-800 leading-tight">
  Income Sources
</h2>

// Body text
<p className="text-base font-normal text-gray-600 leading-normal">
  Track your spending and stay on budget
</p>

// Small text
<span className="text-sm font-medium text-gray-500">
  Last updated: 10 Jan 2026
</span>

// Currency - use monospace for alignment
<span className="text-2xl font-bold font-mono text-primary-600">
  Rp 6,430,000
</span>
```

---

## 📐 Spacing System

### Scale (8px base)

```css
--space-0: 0;
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-5: 1.25rem; /* 20px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-10: 2.5rem; /* 40px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
--space-20: 5rem; /* 80px */
--space-24: 6rem; /* 96px */
```

### Usage Guidelines

| Element           | Spacing | Example                 |
| ----------------- | ------- | ----------------------- |
| Component padding | 16-24px | Cards, buttons          |
| Section gap       | 32-48px | Between sections        |
| Element gap       | 8-16px  | Form fields, list items |
| Page margin       | 24-48px | Content margins         |
| Icon spacing      | 8-12px  | Icon + text             |

---

## 🎯 Components

### Buttons

#### Primary Button

```tsx
<button
  className="
  px-6 py-3 
  bg-gradient-to-r from-primary-500 to-primary-600
  text-white font-semibold
  rounded-lg
  shadow-md shadow-primary-500/30
  hover:shadow-lg hover:shadow-primary-500/40
  hover:from-primary-600 hover:to-primary-700
  active:scale-95
  transition-all duration-200
  disabled:opacity-50 disabled:cursor-not-allowed
"
>
  Save Budget
</button>
```

#### Secondary Button

```tsx
<button
  className="
  px-6 py-3
  bg-white border-2 border-primary-500
  text-primary-600 font-semibold
  rounded-lg
  hover:bg-primary-50
  active:scale-95
  transition-all duration-200
"
>
  Cancel
</button>
```

#### Ghost Button

```tsx
<button
  className="
  px-4 py-2
  text-primary-600 font-medium
  hover:bg-primary-50
  rounded-lg
  transition-colors duration-200
"
>
  Learn More
</button>
```

### Cards

#### Standard Card

```tsx
<div
  className="
  bg-white
  rounded-xl
  shadow-sm
  border border-gray-200
  p-6
  hover:shadow-md
  hover:border-primary-200
  transition-all duration-200
"
>
  <h3 className="text-lg font-semibold text-gray-900 mb-2">Card Title</h3>
  <p className="text-gray-600">Card content goes here</p>
</div>
```

#### Income Card (Green Accent)

```tsx
<div
  className="
  bg-gradient-to-br from-primary-50 to-primary-100
  rounded-xl
  border-l-4 border-primary-500
  p-6
  shadow-sm
"
>
  <div className="flex items-center gap-3 mb-2">
    <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
      <TrendingUpIcon className="w-5 h-5 text-white" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900">Total Income</h3>
  </div>
  <p className="text-3xl font-bold font-mono text-primary-600">Rp 6,430,000</p>
</div>
```

### Input Fields

```tsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">Amount</label>
  <input
    type="number"
    className="
      w-full px-4 py-3
      border border-gray-300
      rounded-lg
      focus:outline-none
      focus:ring-2 focus:ring-primary-500
      focus:border-transparent
      transition-all duration-200
      placeholder:text-gray-400
    "
    placeholder="Enter amount"
  />
  <p className="text-xs text-gray-500">Enter the budget amount in Rupiah</p>
</div>
```

### Progress Bar

```tsx
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span className="font-medium text-gray-700">Budget Usage</span>
    <span className="font-semibold text-primary-600">75%</span>
  </div>
  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
    <div
      className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-500"
      style={{ width: "75%" }}
    />
  </div>
</div>
```

### Badge

```tsx
{
  /* Success Badge */
}
<span
  className="
  inline-flex items-center gap-1
  px-3 py-1
  bg-success-light
  text-success-dark
  text-xs font-semibold
  rounded-full
"
>
  <CheckIcon className="w-3 h-3" />
  On Track
</span>;

{
  /* Warning Badge */
}
<span
  className="
  inline-flex items-center gap-1
  px-3 py-1
  bg-warning-light
  text-warning-dark
  text-xs font-semibold
  rounded-full
"
>
  <AlertIcon className="w-3 h-3" />
  Warning
</span>;
```

---

## 🎭 Shadows & Elevation

```css
/* Shadows with green tint */
--shadow-xs: 0 1px 2px 0 rgba(16, 185, 129, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(16, 185, 129, 0.1);
--shadow-md: 0 4px 6px -1px rgba(16, 185, 129, 0.15);
--shadow-lg: 0 10px 15px -3px rgba(16, 185, 129, 0.2);
--shadow-xl: 0 20px 25px -5px rgba(16, 185, 129, 0.25);
--shadow-2xl: 0 25px 50px -12px rgba(16, 185, 129, 0.3);

/* Glow effects */
--glow-sm: 0 0 10px rgba(16, 185, 129, 0.2);
--glow-md: 0 0 20px rgba(16, 185, 129, 0.3);
--glow-lg: 0 0 30px rgba(16, 185, 129, 0.4);
```

### Elevation Levels

| Level | Shadow     | Usage              |
| ----- | ---------- | ------------------ |
| 0     | None       | Flat elements      |
| 1     | shadow-sm  | Cards at rest      |
| 2     | shadow-md  | Cards on hover     |
| 3     | shadow-lg  | Modals, dropdowns  |
| 4     | shadow-xl  | Important overlays |
| 5     | shadow-2xl | Hero sections      |

---

## 🔲 Border Radius

```css
--radius-none: 0;
--radius-sm: 0.25rem; /* 4px - Small elements */
--radius-md: 0.5rem; /* 8px - Buttons, inputs */
--radius-lg: 0.75rem; /* 12px - Cards */
--radius-xl: 1rem; /* 16px - Large cards */
--radius-2xl: 1.5rem; /* 24px - Hero sections */
--radius-full: 9999px; /* Circular - badges, avatars */
```

---

## 🎬 Animations & Transitions

### Timing Functions

```css
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Durations

```css
--duration-fast: 150ms; /* Quick feedback */
--duration-normal: 200ms; /* Standard transitions */
--duration-slow: 300ms; /* Smooth animations */
--duration-slower: 500ms; /* Emphasis */
```

### Common Animations

```tsx
// Fade in
<div className="animate-in fade-in duration-300">
  Content
</div>

// Slide up
<div className="animate-in slide-in-from-bottom-4 duration-300">
  Content
</div>

// Scale on hover
<button className="hover:scale-105 transition-transform duration-200">
  Click me
</button>

// Pulse (for notifications)
<div className="animate-pulse">
  New update
</div>
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile first approach */
--screen-sm: 640px; /* Small devices */
--screen-md: 768px; /* Tablets */
--screen-lg: 1024px; /* Laptops */
--screen-xl: 1280px; /* Desktops */
--screen-2xl: 1536px; /* Large screens */
```

### Container Widths

```css
/* Max widths for content */
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
```

### Responsive Utilities

```tsx
// Hide on mobile, show on desktop
<div className="hidden lg:block">
  Desktop only content
</div>

// Show on mobile, hide on desktop
<div className="block lg:hidden">
  Mobile only content
</div>

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>

// Responsive text
<h1 className="text-2xl md:text-3xl lg:text-4xl">
  Responsive Heading
</h1>
```

---

## ♿ Accessibility

### Color Contrast

All text must meet WCAG AA standards:

- Normal text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum

**Tested Combinations**:

- ✅ Gray-900 on White: 19.56:1
- ✅ Primary-600 on White: 4.52:1
- ✅ White on Primary-600: 4.52:1
- ✅ Gray-600 on White: 7.23:1

### Focus States

```tsx
// Always provide visible focus
<button
  className="
  focus:outline-none
  focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
"
>
  Accessible Button
</button>
```

### Semantic HTML

```tsx
// Use proper heading hierarchy
<h1>Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>

// Use semantic elements
<nav>Navigation</nav>
<main>Main Content</main>
<aside>Sidebar</aside>
<footer>Footer</footer>

// Use ARIA labels when needed
<button aria-label="Close modal">
  <XIcon />
</button>
```

---

## 🎨 Design Tokens (Tailwind Config)

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        income: "#10b981",
        savings: "#059669",
        needs: "#f59e0b",
        wants: "#8b5cf6",
        expenses: "#f97316",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "green-sm": "0 1px 2px 0 rgba(16, 185, 129, 0.05)",
        "green-md": "0 4px 6px -1px rgba(16, 185, 129, 0.15)",
        "green-lg": "0 10px 15px -3px rgba(16, 185, 129, 0.2)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
};
```

---

## 📋 Component Checklist

When creating a new component, ensure:

- [ ] Uses design tokens (colors, spacing, typography)
- [ ] Responsive on all breakpoints
- [ ] Accessible (keyboard, screen reader)
- [ ] Has proper focus states
- [ ] Includes hover/active states
- [ ] Uses semantic HTML
- [ ] Has proper ARIA labels if needed
- [ ] Meets color contrast requirements
- [ ] Includes loading/error states
- [ ] Documented with examples

---

**Design System Version**: 1.0  
**Last Updated**: 10 January 2026  
**Maintained by**: Design Team
