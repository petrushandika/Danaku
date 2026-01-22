# Danaku App - Frontend

Frontend application for Danaku, built with the latest bleeding-edge tech stack.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (Canary)
- **Styling**: Tailwind CSS 4 (Native CSS)
- **UI Components**: Shadcn UI (New York Style)
- **Icons**: Lucide React
- **Charts**: Shadcn Charts (Recharts wrapper)
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Typography**: Inter (Google Fonts)
- **Theme**: Money Green (Custom Emerald based)

## 📁 Architecture

The project uses a clean architecture with the Next.js App Router:

- `src/app/(dashboard)`: Grouped routes for the authenticated dashboard area.
- `src/components/ui`: Accessible primitives from Shadcn.
- `src/components/dashboard`: Feature-specific components for the dashboard.
- `src/lib`: Utilities and helpers.
- `src/store`: Client-side state management.

## 🚀 Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run development server:

   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## 🎨 Theme Colors

| Category | Color     | Usage              |
| -------- | --------- | ------------------ |
| Primary  | `#10b981` | Branding & CTAs    |
| Income   | `#10b981` | Revenue tracking   |
| Savings  | `#059669` | Wealth growth      |
| Needs    | `#f59e0b` | Essential expenses |
| Wants    | `#8b5cf6` | Lifestyle expenses |
| Expenses | `#f97316` | General spending   |

---

_Inspired by "Danaku" Movie_
