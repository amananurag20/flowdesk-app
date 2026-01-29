import { HealthSegment } from '@/lib/types/customer';
import clsx from 'clsx';

interface HealthBadgeProps {
    segment: HealthSegment;
    score: number;
    size?: 'sm' | 'md' | 'lg';
}

export function HealthBadge({ segment, score, size = 'md' }: HealthBadgeProps) {
    const sizeClasses = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base'
    };

    const segmentStyles = {
        'Healthy': 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
        'Watch': 'bg-amber-50 text-amber-700 ring-amber-600/20',
        'At Risk': 'bg-red-50 text-red-700 ring-red-600/20'
    };

    return (
        <div className="flex items-center gap-2">
            <span
                className={clsx(
                    'inline-flex items-center rounded-md font-medium ring-1 ring-inset',
                    sizeClasses[size],
                    segmentStyles[segment]
                )}
            >
                {segment}
            </span>
            <span className="text-sm text-gray-500">{score}</span>
        </div>
    );
}
