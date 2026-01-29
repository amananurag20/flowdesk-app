'use client';

import { Customer } from '@/lib/types/customer';
import { HealthBadge } from './HealthBadge';
import { formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';

interface CustomerRowProps {
    customer: Customer;
    onClick: (customer: Customer) => void;
    isSelected?: boolean;
}

export function CustomerRow({ customer, onClick, isSelected }: CustomerRowProps) {
    const lastActiveDate = new Date(customer.lastActive);
    const lastActiveText = formatDistanceToNow(lastActiveDate, { addSuffix: true });

    return (
        <tr
            onClick={() => onClick(customer)}
            className={clsx(
                'cursor-pointer transition-colors border-b border-gray-100',
                isSelected
                    ? 'bg-blue-50'
                    : 'hover:bg-gray-50'
            )}
        >
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                        {customer.name.charAt(0)}
                    </div>
                    <div>
                        <div className="font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.domain}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 text-right">
                <div className="font-semibold text-gray-900">
                    ${customer.mrr.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">MRR</div>
            </td>
            <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                    {lastActiveDate.toLocaleDateString()}
                </div>
                <div className="text-xs text-gray-500">{lastActiveText}</div>
            </td>
            <td className="px-6 py-4">
                <HealthBadge segment={customer.healthSegment} score={customer.healthScore} />
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700 text-sm font-medium">
                        {customer.owner.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm text-gray-700">{customer.owner}</span>
                </div>
            </td>
        </tr>
    );
}
