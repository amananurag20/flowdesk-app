import { Customer, CustomerHealthDetails, CustomerListResponse, CustomerFilters, HealthSegment } from '@/lib/types/customer';
import { mockCustomers, getMockCustomerHealthDetails } from '@/lib/data/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch paginated customer list with filters
 * In production, this would call: GET /api/customers?search=&segment=&page=&page_size=
 */
export async function fetchCustomers(filters: CustomerFilters = {}): Promise<CustomerListResponse> {
    // Simulate network delay
    await delay(300);

    const {
        search = '',
        segment = '',
        page = 1,
        pageSize = 20,
        sortBy = 'name',
        sortOrder = 'asc'
    } = filters;

    // Filter customers
    let filteredCustomers = [...mockCustomers];

    // Apply search filter (name or domain)
    if (search) {
        const searchLower = search.toLowerCase();
        filteredCustomers = filteredCustomers.filter(
            customer =>
                customer.name.toLowerCase().includes(searchLower) ||
                customer.domain.toLowerCase().includes(searchLower)
        );
    }

    // Apply segment filter
    if (segment) {
        filteredCustomers = filteredCustomers.filter(
            customer => customer.healthSegment === segment
        );
    }

    // Sort customers
    filteredCustomers.sort((a, b) => {
        let aValue: any = a[sortBy as keyof Customer];
        let bValue: any = b[sortBy as keyof Customer];

        // Handle date strings
        if (sortBy === 'lastActive') {
            aValue = new Date(aValue).getTime();
            bValue = new Date(bValue).getTime();
        }

        // Handle strings
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    // Paginate
    const total = filteredCustomers.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

    return {
        data: paginatedCustomers,
        pagination: {
            page,
            pageSize,
            total,
            totalPages
        }
    };
}

/**
 * Fetch detailed health information for a specific customer
 * In production, this would call: GET /api/customers/{id}/health
 */
export async function fetchCustomerHealth(customerId: string): Promise<CustomerHealthDetails> {
    // Simulate network delay
    await delay(400);

    return getMockCustomerHealthDetails(customerId);
}

/**
 * Get health segment from health score
 */
export function getHealthSegmentFromScore(score: number): HealthSegment {
    if (score >= 80) return 'Healthy';
    if (score >= 50) return 'Watch';
    return 'At Risk';
}
