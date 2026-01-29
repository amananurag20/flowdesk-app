import { Customer, CustomerHealthDetails, Event, UsageTrend, Note } from '@/lib/types/customer';

// Mock customer data
export const mockCustomers: Customer[] = [
    {
        id: '1',
        name: 'Acme Corporation',
        domain: 'acme.com',
        mrr: 15000,
        lastActive: '2026-01-29T10:30:00Z',
        healthScore: 95,
        healthSegment: 'Healthy',
        owner: 'Sarah Johnson',
        avatar: '/avatars/acme.png'
    },
    {
        id: '2',
        name: 'TechStart Inc',
        domain: 'techstart.io',
        mrr: 8500,
        lastActive: '2026-01-28T15:45:00Z',
        healthScore: 72,
        healthSegment: 'Watch',
        owner: 'Michael Chen',
        avatar: '/avatars/techstart.png'
    },
    {
        id: '3',
        name: 'Global Solutions Ltd',
        domain: 'globalsolutions.com',
        mrr: 25000,
        lastActive: '2026-01-15T08:20:00Z',
        healthScore: 35,
        healthSegment: 'At Risk',
        owner: 'Sarah Johnson',
        avatar: '/avatars/global.png'
    },
    {
        id: '4',
        name: 'Innovation Labs',
        domain: 'innovationlabs.tech',
        mrr: 12000,
        lastActive: '2026-01-29T14:15:00Z',
        healthScore: 88,
        healthSegment: 'Healthy',
        owner: 'Emily Rodriguez',
        avatar: '/avatars/innovation.png'
    },
    {
        id: '5',
        name: 'Data Dynamics',
        domain: 'datadynamics.ai',
        mrr: 18500,
        lastActive: '2026-01-27T11:00:00Z',
        healthScore: 65,
        healthSegment: 'Watch',
        owner: 'Michael Chen',
        avatar: '/avatars/data.png'
    },
    {
        id: '6',
        name: 'CloudBurst Systems',
        domain: 'cloudburst.io',
        mrr: 9200,
        lastActive: '2026-01-10T09:30:00Z',
        healthScore: 28,
        healthSegment: 'At Risk',
        owner: 'Emily Rodriguez',
        avatar: '/avatars/cloud.png'
    },
    {
        id: '7',
        name: 'NextGen Analytics',
        domain: 'nextgen-analytics.com',
        mrr: 22000,
        lastActive: '2026-01-29T16:45:00Z',
        healthScore: 92,
        healthSegment: 'Healthy',
        owner: 'Sarah Johnson',
        avatar: '/avatars/nextgen.png'
    },
    {
        id: '8',
        name: 'Velocity Software',
        domain: 'velocitysoft.dev',
        mrr: 7800,
        lastActive: '2026-01-26T13:20:00Z',
        healthScore: 58,
        healthSegment: 'Watch',
        owner: 'Michael Chen',
        avatar: '/avatars/velocity.png'
    },
    {
        id: '9',
        name: 'Quantum Enterprises',
        domain: 'quantum-ent.com',
        mrr: 31000,
        lastActive: '2026-01-29T09:15:00Z',
        healthScore: 97,
        healthSegment: 'Healthy',
        owner: 'Emily Rodriguez',
        avatar: '/avatars/quantum.png'
    },
    {
        id: '10',
        name: 'Streamline Partners',
        domain: 'streamlinepartners.co',
        mrr: 5500,
        lastActive: '2026-01-12T10:00:00Z',
        healthScore: 42,
        healthSegment: 'At Risk',
        owner: 'Sarah Johnson',
        avatar: '/avatars/streamline.png'
    },
    {
        id: '11',
        name: 'Alpha Technologies',
        domain: 'alphatech.com',
        mrr: 14500,
        lastActive: '2026-01-29T12:30:00Z',
        healthScore: 85,
        healthSegment: 'Healthy',
        owner: 'Michael Chen',
        avatar: '/avatars/alpha.png'
    },
    {
        id: '12',
        name: 'Beta Innovations',
        domain: 'betainnovations.io',
        mrr: 10200,
        lastActive: '2026-01-25T14:40:00Z',
        healthScore: 68,
        healthSegment: 'Watch',
        owner: 'Emily Rodriguez',
        avatar: '/avatars/beta.png'
    },
    {
        id: '13',
        name: 'Gamma Ventures',
        domain: 'gammaventures.com',
        mrr: 19800,
        lastActive: '2026-01-08T08:15:00Z',
        healthScore: 22,
        healthSegment: 'At Risk',
        owner: 'Sarah Johnson',
        avatar: '/avatars/gamma.png'
    },
    {
        id: '14',
        name: 'Delta Systems',
        domain: 'deltasystems.tech',
        mrr: 27500,
        lastActive: '2026-01-29T11:20:00Z',
        healthScore: 94,
        healthSegment: 'Healthy',
        owner: 'Michael Chen',
        avatar: '/avatars/delta.png'
    },
    {
        id: '15',
        name: 'Epsilon Digital',
        domain: 'epsilondigital.com',
        mrr: 6700,
        lastActive: '2026-01-24T16:30:00Z',
        healthScore: 61,
        healthSegment: 'Watch',
        owner: 'Emily Rodriguez',
        avatar: '/avatars/epsilon.png'
    },
    {
        id: '16',
        name: 'Zenith Solutions',
        domain: 'zenithsolutions.co',
        mrr: 13200,
        lastActive: '2026-01-14T12:45:00Z',
        healthScore: 38,
        healthSegment: 'At Risk',
        owner: 'Sarah Johnson',
        avatar: '/avatars/zenith.png'
    },
    {
        id: '17',
        name: 'Phoenix Platform',
        domain: 'phoenixplatform.io',
        mrr: 21500,
        lastActive: '2026-01-29T15:10:00Z',
        healthScore: 91,
        healthSegment: 'Healthy',
        owner: 'Michael Chen',
        avatar: '/avatars/phoenix.png'
    },
    {
        id: '18',
        name: 'Nexus Networks',
        domain: 'nexusnetworks.com',
        mrr: 8900,
        lastActive: '2026-01-27T09:25:00Z',
        healthScore: 74,
        healthSegment: 'Watch',
        owner: 'Emily Rodriguez',
        avatar: '/avatars/nexus.png'
    },
    {
        id: '19',
        name: 'Horizon Ventures',
        domain: 'horizonventures.ai',
        mrr: 16800,
        lastActive: '2026-01-11T14:00:00Z',
        healthScore: 31,
        healthSegment: 'At Risk',
        owner: 'Sarah Johnson',
        avatar: '/avatars/horizon.png'
    },
    {
        id: '20',
        name: 'Pinnacle Group',
        domain: 'pinnaclegroup.com',
        mrr: 29000,
        lastActive: '2026-01-29T13:50:00Z',
        healthScore: 96,
        healthSegment: 'Healthy',
        owner: 'Emily Rodriguez',
        avatar: '/avatars/pinnacle.png'
    }
];

// Mock customer health details generator
export function getMockCustomerHealthDetails(customerId: string): CustomerHealthDetails {
    const customer = mockCustomers.find(c => c.id === customerId);
    if (!customer) {
        throw new Error('Customer not found');
    }

    const mockEvents: Event[] = [
        {
            id: '1',
            type: 'login',
            description: 'User logged in from new device',
            timestamp: '2026-01-29T10:30:00Z'
        },
        {
            id: '2',
            type: 'feature_used',
            description: 'Used advanced analytics dashboard',
            timestamp: '2026-01-28T14:20:00Z'
        },
        {
            id: '3',
            type: 'support_ticket',
            description: 'Opened ticket: API integration help',
            timestamp: '2026-01-27T09:15:00Z'
        }
    ];

    const mockUsageTrends: UsageTrend[] = [
        {
            date: '2026-01-29',
            activeUsers: 45,
            apiCalls: 1250,
            features: ['analytics', 'reports', 'integrations']
        },
        {
            date: '2026-01-28',
            activeUsers: 38,
            apiCalls: 980,
            features: ['analytics', 'reports']
        },
        {
            date: '2026-01-27',
            activeUsers: 42,
            apiCalls: 1100,
            features: ['analytics', 'integrations']
        }
    ];

    const mockNotes: Note[] = [
        {
            id: '1',
            author: customer.owner,
            content: 'Customer is very engaged with the product. Looking to expand usage.',
            createdAt: '2026-01-25T10:00:00Z'
        },
        {
            id: '2',
            author: customer.owner,
            content: 'Discussed renewal timeline. All looks positive.',
            createdAt: '2026-01-20T15:30:00Z'
        }
    ];

    return {
        id: customerId,
        healthScore: customer.healthScore,
        healthSegment: customer.healthSegment,
        recentEvents: mockEvents,
        usageTrends: mockUsageTrends,
        notes: mockNotes
    };
}
