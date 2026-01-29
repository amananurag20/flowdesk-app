import { fetchCustomers } from '@/lib/api/customers';
import { CustomerTable } from '@/components/customer-health/CustomerTable';
import { CustomerFilters } from '@/components/customer-health/CustomerFilters';
import { Pagination } from '@/components/customer-health/Pagination';
import { HealthSegment } from '@/lib/types/customer';

interface PageProps {
    searchParams: {
        search?: string;
        segment?: HealthSegment;
        page?: string;
        sortBy?: 'name' | 'mrr' | 'lastActive' | 'healthScore';
        sortOrder?: 'asc' | 'desc';
    };
}

export default async function CustomerHealthPage({ searchParams }: PageProps) {
    const filters = {
        search: searchParams.search || '',
        segment: searchParams.segment || ('' as HealthSegment | ''),
        page: parseInt(searchParams.page || '1', 10),
        pageSize: 20,
        sortBy: searchParams.sortBy || 'name',
        sortOrder: searchParams.sortOrder || 'asc',
    };

    const result = await fetchCustomers(filters);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Customer Health Overview
                    </h1>
                    <p className="text-gray-600">
                        Monitor customer health, engagement, and success metrics at a glance
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-6">
                    <CustomerFilters />
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 mb-6">
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                        <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Customers</dt>
                                        <dd className="text-2xl font-bold text-gray-900">{result.pagination.total}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                                        <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Healthy</dt>
                                        <dd className="text-2xl font-bold text-emerald-600">
                                            {result.data.filter(c => c.healthSegment === 'Healthy').length}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                                        <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Watch</dt>
                                        <dd className="text-2xl font-bold text-amber-600">
                                            {result.data.filter(c => c.healthSegment === 'Watch').length}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                                        <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">At Risk</dt>
                                        <dd className="text-2xl font-bold text-red-600">
                                            {result.data.filter(c => c.healthSegment === 'At Risk').length}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <CustomerTable customers={result.data} />

                {/* Pagination */}
                <Pagination
                    currentPage={result.pagination.page}
                    totalPages={result.pagination.totalPages}
                    total={result.pagination.total}
                />
            </div>
        </div>
    );
}
