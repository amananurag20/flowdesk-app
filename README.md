# FlowDesk - Customer Success Platform

A modern customer success platform that gives customer success teams a 360° view of their customers. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## 🎯 Overview

FlowDesk helps Customer Success Managers (CSMs) quickly understand which customers are healthy and which are at risk, enabling them to prioritize their time effectively.

### Key Features

- **Customer Health Dashboard**: View all customers with key metrics at a glance
- **Health Scoring**: Automated health scores categorized into Healthy, Watch, and At Risk
- **Detailed Customer Views**: Slide-in panel with comprehensive customer details including:
  - Recent activity events
  - Usage trends and analytics
  - Team notes and collaboration
- **Advanced Filtering**: Search by name/domain and filter by health segment
- **Server-Side Pagination**: Efficient handling of large customer datasets
- **Sortable Tables**: Sort by name, MRR, last active date, or health score
- **Real-time Updates**: React Query for optimized data fetching and caching

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd flowdesk-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
flowdesk-app/
├── app/                          # Next.js App Router
│   ├── customer-health/          # Customer Health feature
│   │   ├── page.tsx             # Main page (Server Component)
│   │   ├── loading.tsx          # Loading skeleton
│   │   └── error.tsx            # Error boundary
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
│
├── components/                   # React components
│   ├── customer-health/         # Customer Health components
│   │   ├── CustomerTable.tsx   # Main table component
│   │   ├── CustomerRow.tsx     # Individual row
│   │   ├── CustomerDetailsPanel.tsx  # Side panel
│   │   ├── CustomerFilters.tsx # Search & filters
│   │   ├── Pagination.tsx      # Pagination controls
│   │   └── HealthBadge.tsx     # Health status badge
│   └── providers.tsx            # React Query provider
│
├── lib/                         # Utilities and data
│   ├── api/                     # API client functions
│   │   └── customers.ts         # Customer API calls
│   ├── data/                    # Mock data
│   │   └── mockData.ts          # Sample customer data
│   └── types/                   # TypeScript types
│       └── customer.ts          # Customer interfaces
│
└── IMPLEMENTATION_PLAN.md       # Detailed implementation plan

```

## 🏗️ Architecture

### Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **State Management**: React Query (TanStack Query)
- **Date Utilities**: date-fns
- **Class Management**: clsx

### Data Flow

1. **Server Components**: Initial data fetching happens on the server (`/customer-health/page.tsx`)
2. **Client Components**: Interactive elements (table, filters, panel) use client-side React
3. **React Query**: Caches and manages customer detail requests
4. **URL State**: Filters, search, sorting, and pagination synced with URL params

### Server vs Client Components

**Server Components:**
- Main page (`page.tsx`) - Fetches initial data
- HealthBadge - Pure presentational component

**Client Components:**
- CustomerTable - Interactive sorting and row selection
- CustomerFilters - Search and filter inputs
- CustomerDetailsPanel - Slide-in panel with data fetching
- Pagination - Navigation controls

## 🎨 Features in Detail

### Customer Health Table

- **Sortable columns**: Click headers to sort by name, MRR, last active, or health score
- **Row selection**: Click any row to open detailed view
- **Real-time updates**: Data stays fresh with React Query
- **Responsive design**: Works on desktop and mobile

### Filtering & Search

- **Debounced search**: 300ms delay to avoid excessive API calls
- **Segment filters**: Quick tabs for All, Healthy, Watch, At Risk
- **URL synchronization**: Filters persist in URL for shareable links
- **Clear filters**: One-click reset to default view

### Customer Details Panel

- **Slide-in animation**: Smooth transition from right side
- **Health visualization**: Progress bar with color-coded status
- **Recent events**: Timeline of customer activities
- **Usage trends**: Daily active users and API call metrics
- **Team notes**: Collaboration space for CSM team

### Pagination

- **Server-side**: Handles large datasets efficiently
- **Smart page numbers**: Shows relevant pages with ellipsis
- **Results count**: "Showing X-Y of Z results"
- **Keyboard accessible**: Full keyboard navigation support

## 📊 Mock Data

The application currently uses mock data defined in `lib/data/mockData.ts`:
- 20 sample customers
- Varied health scores (22-97)
- Realistic MRR values ($5,500 - $31,000)
- Multiple CSM owners
- Recent activity dates

### Replacing with Real API

To connect to real APIs, update the functions in `lib/api/customers.ts`:

```typescript
// Replace this:
export async function fetchCustomers(filters: CustomerFilters) {
  // Mock implementation
}

// With:
export async function fetchCustomers(filters: CustomerFilters) {
  const params = new URLSearchParams({
    search: filters.search || '',
    segment: filters.segment || '',
    page: filters.page?.toString() || '1',
    page_size: filters.pageSize?.toString() || '20'
  });
  
  const response = await fetch(`/api/customers?${params}`);
  return response.json();
}
```

## 🎯 User Stories Implemented

✅ **Story 1**: CSMs can see a sortable table of customers with key data
- Implemented with sortable columns for all fields
- Displays name, MRR, last active, health score, owner

✅ **Story 2**: CSMs can click a row to see detailed customer information
- Slide-in panel with comprehensive details
- Recent events, usage trends, and notes sections

✅ **Story 3**: CSMs can filter by health segment and search by name/domain
- Segment tabs (Healthy/Watch/At Risk)
- Live search with debouncing
- URL-synced filters

## 🔧 Development Scripts

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 📝 Implementation Timeline

- **Foundation**: Type definitions, mock data, routing (1 day)
- **Core Table**: Table structure, rows, sorting (1.5 days)
- **Filtering**: Search, segment filters, URL sync (1.5 days)
- **Details Panel**: Slide-in panel, data fetching (1.5 days)
- **Server Integration**: Server components, pagination (1 day)
- **Polish**: Loading states, errors, responsive design (1 day)

**Total Estimate**: 5-7 business days

## 🚀 Next Steps

- [ ] Connect to real API endpoints
- [ ] Add authentication and user management
- [ ] Implement note creation/editing
- [ ] Add WebSocket support for real-time updates
- [ ] Export customer data (CSV, PDF)
- [ ] Advanced analytics dashboard
- [ ] Email notifications for at-risk customers
- [ ] Mobile app (React Native)

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

This is a demo application. For production use, please:
1. Add comprehensive tests
2. Implement proper error handling
3. Add authentication and authorization
4. Set up CI/CD pipelines
5. Configure monitoring and logging

## 📄 License

This project is created for demonstration purposes.

---

**Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS**
