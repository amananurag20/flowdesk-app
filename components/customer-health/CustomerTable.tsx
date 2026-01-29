'use client';

import { Customer } from '@/lib/types/customer';
import { CustomerRow } from './CustomerRow';
import { useState } from 'react';
import { CustomerDetailsPanel } from './CustomerDetailsPanel';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';

interface CustomerTableProps {
    customers: Customer[];
}

type SortField = 'name' | 'mrr' | 'lastActive' | 'healthScore';
type SortOrder = 'asc' | 'desc';

export function CustomerTable({ customers }: CustomerTableProps) {
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentSort = searchParams.get('sortBy') as SortField || 'name';
    const currentOrder = searchParams.get('sortOrder') as SortOrder || 'asc';

    const handleSort = (field: SortField) => {
        const newParams = new URLSearchParams(searchParams.toString());
        const newOrder = currentSort === field && currentOrder === 'asc' ? 'desc' : 'asc';

        newParams.set('sortBy', field);
        newParams.set('sortOrder', newOrder);

        router.push(`?${newParams.toString()}`, { scroll: false });
    };

    const SortIcon = ({ field }: { field: SortField }) => {
        if (currentSort !== field) {
            return (
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
            );
        }

        return currentOrder === 'asc' ? (
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
        ) : (
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        );
    };

    if (customers.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No customers found</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter to find what you're looking for.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="overflow-hidden bg-white shadow-sm ring-1 ring-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('name')}
                            >
                                <div className="flex items-center gap-2">
                                    Customer
                                    <SortIcon field="name" />
                                </div>
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('mrr')}
                            >
                                <div className="flex items-center justify-end gap-2">
                                    MRR
                                    <SortIcon field="mrr" />
                                </div>
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('lastActive')}
                            >
                                <div className="flex items-center gap-2">
                                    Last Active
                                    <SortIcon field="lastActive" />
                                </div>
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('healthScore')}
                            >
                                <div className="flex items-center gap-2">
                                    Health
                                    <SortIcon field="healthScore" />
                                </div>
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Owner
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {customers.map((customer) => (
                            <CustomerRow
                                key={customer.id}
                                customer={customer}
                                onClick={setSelectedCustomer}
                                isSelected={selectedCustomer?.id === customer.id}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedCustomer && (
                <CustomerDetailsPanel
                    customer={selectedCustomer}
                    onClose={() => setSelectedCustomer(null)}
                />
            )}
        </>
    );
}
