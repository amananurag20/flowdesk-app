'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchCustomerHealth } from '@/lib/api/customers';
import { Customer } from '@/lib/types/customer';
import { HealthBadge } from './HealthBadge';
import { formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';

interface CustomerDetailsPanelProps {
    customer: Customer;
    onClose: () => void;
}

export function CustomerDetailsPanel({ customer, onClose }: CustomerDetailsPanelProps) {
    const { data: healthDetails, isLoading, error } = useQuery({
        queryKey: ['customer-health', customer.id],
        queryFn: () => fetchCustomerHealth(customer.id),
    });

    const eventTypeIcons = {
        login: '🔐',
        feature_used: '✨',
        support_ticket: '🎫',
        upgrade: '📈',
        downgrade: '📉'
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/30 z-40 transition-opacity"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg font-semibold">
                                {customer.name.charAt(0)}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{customer.name}</h2>
                                <p className="text-sm text-gray-500">{customer.domain}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="px-6 py-6 space-y-8">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="text-sm text-gray-600 mb-1">MRR</div>
                            <div className="text-2xl font-bold text-gray-900">
                                ${customer.mrr.toLocaleString()}
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="text-sm text-gray-600 mb-1">Last Active</div>
                            <div className="text-sm font-semibold text-gray-900">
                                {new Date(customer.lastActive).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-gray-500">
                                {formatDistanceToNow(new Date(customer.lastActive), { addSuffix: true })}
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="text-sm text-gray-600 mb-1">Owner</div>
                            <div className="text-sm font-semibold text-gray-900">{customer.owner}</div>
                        </div>
                    </div>

                    {/* Health Score */}
                    {isLoading ? (
                        <div className="animate-pulse space-y-3">
                            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-20 bg-gray-200 rounded"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
                            Failed to load health details. Please try again.
                        </div>
                    ) : healthDetails ? (
                        <>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Health Status</h3>
                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <HealthBadge segment={healthDetails.healthSegment} score={healthDetails.healthScore} size="lg" />
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                        <div
                                            className={clsx(
                                                'h-full rounded-full transition-all',
                                                healthDetails.healthScore >= 80 ? 'bg-emerald-500' :
                                                    healthDetails.healthScore >= 50 ? 'bg-amber-500' : 'bg-red-500'
                                            )}
                                            style={{ width: `${healthDetails.healthScore}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Recent Events */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Activity</h3>
                                <div className="space-y-3">
                                    {healthDetails.recentEvents.map((event) => (
                                        <div
                                            key={event.id}
                                            className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                                        >
                                            <span className="text-2xl">{eventTypeIcons[event.type]}</span>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">{event.description}</p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Usage Trends */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Usage Trends</h3>
                                <div className="space-y-3">
                                    {healthDetails.usageTrends.map((trend, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-sm font-semibold text-gray-900">
                                                    {new Date(trend.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <div className="text-xs text-gray-600">Active Users</div>
                                                    <div className="text-lg font-bold text-blue-600">{trend.activeUsers}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-600">API Calls</div>
                                                    <div className="text-lg font-bold text-purple-600">{trend.apiCalls.toLocaleString()}</div>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <div className="text-xs text-gray-600 mb-1">Features Used</div>
                                                <div className="flex flex-wrap gap-1">
                                                    {trend.features.map((feature) => (
                                                        <span
                                                            key={feature}
                                                            className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700"
                                                        >
                                                            {feature}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Notes */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Notes</h3>
                                <div className="space-y-3">
                                    {healthDetails.notes.map((note) => (
                                        <div
                                            key={note.id}
                                            className="bg-amber-50 border border-amber-200 rounded-lg p-4"
                                        >
                                            <p className="text-sm text-gray-900 mb-2">{note.content}</p>
                                            <div className="flex items-center justify-between text-xs text-gray-600">
                                                <span className="font-medium">{note.author}</span>
                                                <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </>
    );
}
