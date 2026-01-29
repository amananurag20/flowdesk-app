'use client';

import { HealthSegment } from '@/lib/types/customer';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

export function CustomerFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') || '');

    const currentSegment = searchParams.get('segment') as HealthSegment | '' || '';

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            updateFilters({ search });
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const updateFilters = (updates: { search?: string; segment?: HealthSegment | '' }) => {
        const newParams = new URLSearchParams(searchParams.toString());

        if (updates.search !== undefined) {
            if (updates.search) {
                newParams.set('search', updates.search);
            } else {
                newParams.delete('search');
            }
        }

        if (updates.segment !== undefined) {
            if (updates.segment) {
                newParams.set('segment', updates.segment);
            } else {
                newParams.delete('segment');
            }
        }

        // Reset to page 1 when filters change
        newParams.set('page', '1');

        router.push(`?${newParams.toString()}`, { scroll: false });
    };

    const clearFilters = () => {
        setSearch('');
        router.push('/customer-health');
    };

    const hasFilters = search || currentSegment;

    const segments: (HealthSegment | '')[] = ['', 'Healthy', 'Watch', 'At Risk'];
    const segmentLabels = {
        '': 'All Customers',
        'Healthy': 'Healthy',
        'Watch': 'Watch',
        'At Risk': 'At Risk'
    };

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Search customers by name or domain..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* Segment Filters */}
            <div className="flex items-center gap-2">
                <div className="flex rounded-lg bg-gray-100 p-1">
                    {segments.map((segment) => (
                        <button
                            key={segment || 'all'}
                            onClick={() => updateFilters({ segment })}
                            className={clsx(
                                'rounded-md px-3 py-1.5 text-sm font-medium transition-all',
                                currentSegment === segment
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                            )}
                        >
                            {segmentLabels[segment]}
                        </button>
                    ))}
                </div>

                {hasFilters && (
                    <button
                        onClick={clearFilters}
                        className="text-sm text-gray-600 hover:text-gray-900 underline underline-offset-2"
                    >
                        Clear filters
                    </button>
                )}
            </div>
        </div>
    );
}
