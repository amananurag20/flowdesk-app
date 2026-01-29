export type HealthSegment = 'Healthy' | 'Watch' | 'At Risk';

export interface Customer {
    id: string;
    name: string;
    domain: string;
    mrr: number;
    lastActive: string; // ISO date string
    healthScore: number; // 0-100
    healthSegment: HealthSegment;
    owner: string;
    avatar?: string;
}

export interface CustomerHealthDetails {
    id: string;
    healthScore: number;
    healthSegment: HealthSegment;
    recentEvents: Event[];
    usageTrends: UsageTrend[];
    notes: Note[];
}

export interface Event {
    id: string;
    type: 'login' | 'feature_used' | 'support_ticket' | 'upgrade' | 'downgrade';
    description: string;
    timestamp: string;
}

export interface UsageTrend {
    date: string;
    activeUsers: number;
    apiCalls: number;
    features: string[];
}

export interface Note {
    id: string;
    author: string;
    content: string;
    createdAt: string;
}

export interface CustomerListResponse {
    data: Customer[];
    pagination: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    };
}

export interface CustomerFilters {
    search?: string;
    segment?: HealthSegment | '';
    page?: number;
    pageSize?: number;
    sortBy?: 'name' | 'mrr' | 'lastActive' | 'healthScore';
    sortOrder?: 'asc' | 'desc';
}
