# Customer Health Overview Page - Implementation Plan

## A. High-Level Estimation

**Estimated Timeline: 5-7 business days**

- **Component Structure & Basic UI**: 1-1.5 days
  - CustomerHealthPage layout
  - CustomerTable with mock data
  - HealthBadge and basic row components
  
- **Data Fetching & Pagination**: 1.5-2 days
  - Server component integration
  - API client setup
  - Pagination logic
  - Error/loading state handling
  
- **Customer Details Panel**: 1-1.5 days
  - Panel component (slide-in or route-based)
  - Health details API integration
  - Recent events & usage trends display
  
- **Filters & Search**: 1-1.5 days
  - URL-synced filters
  - Search implementation
  - Filter state management
  
- **Polish & Edge Cases**: 1 day
  - Loading states
  - Empty states
  - Error boundaries
  - Accessibility
  - Responsive design
  - Testing edge cases

---

## B. Architecture & Component Structure

### Next.js Route Structure

```
app/
├── customer-health/
│   ├── page.tsx                    # Main page (Server Component)
│   ├── loading.tsx                  # Loading UI
│   ├── error.tsx                    # Error boundary
│   └── [id]/                        # Optional: customer detail route
│       └── page.tsx
```

### Component Breakdown

#### 1. **CustomerHealthPage** (Server Component)
- **Location**: `app/customer-health/page.tsx`
- **Responsibility**: 
  - Parse URL search params (search, segment, page)
  - Fetch initial customer data server-side
  - Pass data to client components
- **Why Server Component**: 
  - SEO benefits
  - Faster initial load (data fetched on server)
  - Reduces client bundle size

#### 2. **CustomerTable** (Client Component)
- **Location**: `components/customer-health/CustomerTable.tsx`
- **Responsibility**:
  - Render table with customer rows
  - Handle sorting
  - Manage table state (selected row)
- **Why Client Component**: 
  - Interactive sorting
  - Row selection management
  - Event handlers

#### 3. **CustomerRow** (Client Component)
- **Location**: `components/customer-health/CustomerRow.tsx`
- **Responsibility**:
  - Display individual customer data
  - Handle click events
  - Visual states (hover, selected)
- **Why Client Component**: 
  - Click handlers
  - Interactive states

#### 4. **HealthBadge** (Server or Client Component)
- **Location**: `components/customer-health/HealthBadge.tsx`
- **Responsibility**:
  - Display health status with appropriate styling
  - Map health score to segment (Healthy/Watch/At Risk)
- **Why Can Be Server**: 
  - Purely presentational
  - No interactivity needed
  - Can be memoized

#### 5. **CustomerDetailsPanel** (Client Component)
- **Location**: `components/customer-health/CustomerDetailsPanel.tsx`
- **Responsibility**:
  - Slide-in panel or modal
  - Fetch and display detailed customer health data
  - Show recent events, usage trends, notes
- **Why Client Component**: 
  - Animation (slide-in/out)
  - Fetch data on demand
  - Close/open interactions

#### 6. **CustomerFilters** (Client Component)
- **Location**: `components/customer-health/CustomerFilters.tsx`
- **Responsibility**:
  - Search input
  - Segment filter (dropdown or tabs)
  - Update URL params
- **Why Client Component**: 
  - Form inputs
  - URL manipulation
  - Immediate feedback

#### 7. **Pagination** (Client Component)
- **Location**: `components/customer-health/Pagination.tsx`
- **Responsibility**:
  - Page navigation
  - Display current page and total
- **Why Client Component**: 
  - Navigation handlers
  - URL updates

### Server vs. Client Component Strategy

**Server Components (default):**
- Page-level components (`page.tsx`)
- Static display components (HealthBadge)
- Layout wrappers

**Client Components (when needed):**
- Interactive elements (tables, filters, panels)
- Event handlers
- State management
- URL manipulation
- Data fetching on user action

---

## C. Data Fetching & State Management

### 1. Fetching Paginated Customer List

**Approach: Server Components + URL State**

```typescript
// app/customer-health/page.tsx (Server Component)
async function CustomerHealthPage({ searchParams }: Props) {
  const params = {
    search: searchParams.search || '',
    segment: searchParams.segment || '',
    page: searchParams.page || '1',
    page_size: '20'
  };
  
  const customers = await fetchCustomers(params);
  
  return <CustomerHealthContent initialData={customers} />;
}
```

**Why this approach:**
- ✅ SEO-friendly (data in initial HTML)
- ✅ Fast first paint
- ✅ URL is source of truth
- ✅ Back button works naturally
- ✅ Shareable links

### 2. Fetching Customer Health Details

**Approach: Client-side fetch with caching**

**Option A: React Query (Recommended)**
```typescript
// hooks/useCustomerHealth.ts
import { useQuery } from '@tanstack/react-query';

export function useCustomerHealth(customerId: string) {
  return useQuery({
    queryKey: ['customer-health', customerId],
    queryFn: () => fetchCustomerHealth(customerId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
}
```

**Why React Query:**
- ✅ Built-in caching (avoid refetching same customer)
- ✅ Loading/error states handled
- ✅ Background refetching
- ✅ Request deduplication
- ✅ Developer tools

**Option B: SWR (Alternative)**
- Similar benefits to React Query
- Lighter weight
- Good choice if already in use

**Option C: Native fetch with custom hook**
- More boilerplate
- Manual cache management
- Suitable for simple cases

### 3. Managing Loading, Error, and Empty States

**Loading States:**
```typescript
// app/customer-health/loading.tsx
export default function Loading() {
  return <CustomerTableSkeleton />;
}

// For panel loading
{isLoading && <PanelSkeleton />}
```

**Error States:**
```typescript
// app/customer-health/error.tsx
export default function Error({ error, reset }: Props) {
  return <ErrorDisplay error={error} onRetry={reset} />;
}

// For panel errors
{error && <ErrorMessage error={error} />}
```

**Empty States:**
```typescript
{customers.length === 0 && (
  <EmptyState
    title={hasFilters ? "No customers found" : "No customers yet"}
    description={hasFilters ? "Try adjusting your filters" : "..."}
  />
)}
```

### Recommended Stack

**For this project: React Query + Server Components**
- Initial data from server (fast)
- Client-side updates use React Query (smooth)
- Best of both worlds

**Setup:**
```bash
npm install @tanstack/react-query
```

```typescript
// app/providers.tsx
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

---

## D. UX Details & Edge Cases

### 1. Slow Network Responses

**Solutions:**
- **Skeleton screens**: Show structured loading state (better than spinners)
- **Optimistic UI**: Update UI before server confirms (e.g., close panel immediately)
- **Progressive loading**: Show table first, then load details
- **Timeout handling**: Show error after 10s, with retry option
- **Debounced search**: Wait 300ms after typing before searching

```typescript
// Debounced search
const debouncedSearch = useDebouncedValue(searchTerm, 300);
```

### 2. Keeping Filters/Search in Sync with URL

**Approach: URL as single source of truth**

```typescript
// hooks/useCustomerFilters.ts
export function useCustomerFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const updateFilters = (updates: Partial<Filters>) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    
    // Reset to page 1 when filters change
    if ('search' in updates || 'segment' in updates) {
      newParams.set('page', '1');
    }
    
    router.push(`?${newParams.toString()}`, { scroll: false });
  };
  
  return { filters: Object.fromEntries(searchParams), updateFilters };
}
```

**Benefits:**
- ✅ Shareable URLs
- ✅ Browser back/forward works
- ✅ Refresh preserves state
- ✅ No sync bugs

### 3. Preserving Scroll Position

**Solutions:**
- **scroll: false in router.push**: Prevent scroll to top when updating filters
- **Return to table from detail**: Track scroll position in state or sessionStorage
- **Infinite scroll alternative**: Consider for very large datasets

```typescript
// Preserve scroll when updating URL
router.push(`?${params}`, { scroll: false });

// Restore scroll on back navigation
useEffect(() => {
  const scrollPos = sessionStorage.getItem('customer-list-scroll');
  if (scrollPos) {
    window.scrollTo(0, parseInt(scrollPos));
    sessionStorage.removeItem('customer-list-scroll');
  }
}, []);

// Save scroll before navigation
const handleRowClick = (customer) => {
  sessionStorage.setItem('customer-list-scroll', window.scrollY.toString());
  // ... open panel or navigate
};
```

### 4-8. Additional UX Edge Cases

#### 4. **Rapid Filter Changes**
- **Issue**: User changes filters 5 times quickly
- **Solution**: 
  - Debounce search input (300ms)
  - Cancel in-flight requests
  - Show loading state only after 200ms (avoid flash)
  
#### 5. **Empty Search/Filter Results**
- **Issue**: User searches for "xyz" but no results
- **Solution**:
  - Clear empty state with helpful message
  - "No customers found for 'xyz'"
  - Suggest clearing filters or checking spelling
  - Show total count without filters

#### 6. **Panel Open + Filter Change**
- **Issue**: User has panel open, then changes filters
- **Solution**:
  - Close panel when filters change
  - Or: Keep panel open but show warning if customer no longer in results
  
#### 7. **Stale Data After External Change**
- **Issue**: Customer health updated by another CSM
- **Solution**:
  - Poll for updates every 30-60s (when tab active)
  - Show "Data updated" toast with refresh option
  - Or use WebSockets for real-time updates (future enhancement)

#### 8. **Large Table + Slow Rendering**
- **Issue**: 20 rows with complex cells cause lag
- **Solution**:
  - Virtualized table (react-window) if > 50 rows
  - Memoize row components
  - Optimize re-renders (React.memo, useMemo)

#### 9. **Accessibility**
- **Issue**: Keyboard navigation, screen readers
- **Solution**:
  - Keyboard shortcuts (arrow keys, enter to open panel)
  - Focus management (trap focus in panel, return focus on close)
  - ARIA labels (table headers, status badges)
  - Skip links

#### 10. **Mobile Responsiveness**
- **Issue**: Table doesn't fit on mobile
- **Solution**:
  - Card layout on mobile (stack columns)
  - Horizontal scroll with sticky first column
  - Full-screen panel on mobile (not slide-in)

---

## E. Task Breakdown

### Phase 1: Foundation (Day 1)
1. ✅ **[TASK-001]** Create mock data structure and API utilities
   - Define TypeScript interfaces (Customer, HealthScore, etc.)
   - Create mock customer data (20+ entries)
   - Create API client functions (fetchCustomers, fetchCustomerHealth)

2. ✅ **[TASK-002]** Set up route and basic layout
   - Create `/app/customer-health/page.tsx`
   - Create loading.tsx and error.tsx
   - Update root layout metadata

3. ✅ **[TASK-003]** Implement HealthBadge component
   - Color coding (green, yellow, red)
   - Score to segment mapping
   - Accessible labels

### Phase 2: Core Table (Day 2)
4. ✅ **[TASK-004]** Build CustomerTable shell with mock data
   - Table structure (headers, body)
   - Map mock data to rows
   - Basic styling with Tailwind

5. ✅ **[TASK-005]** Implement CustomerRow component
   - Display all columns (name, MRR, last active, health, owner)
   - Hover states
   - Click handler placeholder

6. ✅ **[TASK-006]** Add table sorting
   - Sortable columns (MRR, last active, health score)
   - Sort indicators (arrows)
   - Update URL with sort params

### Phase 3: Filtering & Search (Day 3)
7. ✅ **[TASK-007]** Implement CustomerFilters component
   - Search input
   - Segment filter (tabs or dropdown)
   - Clear filters button

8. ✅ **[TASK-008]** Wire up filter logic
   - Update URL search params
   - Filter mock data based on params
   - Debounced search

9. ✅ **[TASK-009]** Implement Pagination component
   - Next/Previous buttons
   - Page numbers
   - Update URL page param

### Phase 4: Customer Details Panel (Day 4)
10. ✅ **[TASK-010]** Build CustomerDetailsPanel shell
    - Slide-in container
    - Close button
    - Header with customer name

11. ✅ **[TASK-011]** Fetch and display customer health data
    - Set up React Query
    - Fetch customer health on panel open
    - Display health score, recent events

12. ✅ **[TASK-012]** Add usage trends section
    - Mock chart/graph component
    - Recent activity timeline
    - Notes section (read-only for now)

### Phase 5: Server-Side Integration (Day 5)
13. ✅ **[TASK-013]** Wire up server-side pagination
    - Fetch data in server component
    - Pass initial data to client components
    - Handle page transitions

14. ✅ **[TASK-014]** Implement proper loading states
    - Skeleton for table
    - Skeleton for panel
    - Spinner for inline actions

15. ✅ **[TASK-015]** Implement error handling
    - Error boundary for page
    - Error display in panel
    - Retry mechanisms

### Phase 6: Polish & Edge Cases (Day 6-7)
16. ✅ **[TASK-016]** Add empty states
    - No customers message
    - No results for filters
    - Illustrations or icons

17. ✅ **[TASK-017]** Implement scroll position preservation
    - Save scroll on navigation
    - Restore on back

18. ✅ **[TASK-018]** Mobile responsiveness
    - Card layout for mobile
    - Full-screen panel
    - Touch interactions

19. ✅ **[TASK-019]** Accessibility audit
    - Keyboard navigation
    - ARIA labels
    - Focus management
    - Screen reader testing

20. ✅ **[TASK-020]** Performance optimization
    - Memoize components
    - Optimize re-renders
    - Bundle size check

21. ✅ **[TASK-021]** Testing & QA
    - Test all filter combinations
    - Test edge cases (slow network, errors)
    - Cross-browser testing
    - Final polish

---

## Dependencies to Add

```bash
npm install @tanstack/react-query
npm install clsx # utility for conditional classNames
npm install date-fns # date formatting
```

## Notes
- Start with mock data to validate UX before API integration
- Use TypeScript interfaces to match API contract
- Consider dark mode support (if design system supports it)
- Add loading states early to avoid janky UX later
- Test with realistic data volumes (100+ customers)
